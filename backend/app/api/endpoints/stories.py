# ============================================
# STORIES API ENDPOINTS (WITH DEBUG)
# File: backend/app/api/endpoints/stories.py
# ============================================

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import desc
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
import logging

from app.database import get_db
from app.models.story import Story
from app.utils.encryption import encrypt_message, decrypt_message, ENCRYPTION_KEY

router = APIRouter()
logger = logging.getLogger(__name__)

# ============================================
# SCHEMAS
# ============================================

class StoryCreate(BaseModel):
    title: str
    content: str
    category: str

class StoryResponse(BaseModel):
    id: str
    title: str
    content: str
    category: str
    likes_count: int
    created_at: datetime

# ============================================
# TEST ENDPOINT
# ============================================

@router.get("/test-encryption")
async def test_encryption():
    """Test encryption roundtrip - FOR DEBUGGING"""
    
    test_message = "Tôi cảm thấy áp lực khi học tập và thi cử"
    
    try:
        # Encrypt
        encrypted, iv = encrypt_message(test_message)
        
        # Decrypt
        decrypted = decrypt_message(encrypted, iv)
        
        return {
            "test_message": test_message,
            "encrypted_preview": encrypted[:50] + "..." if len(encrypted) > 50 else encrypted,
            "iv": iv,
            "decrypted": decrypted,
            "success": test_message == decrypted,
            "key_length": len(ENCRYPTION_KEY),
            "key_preview": ENCRYPTION_KEY[:4].decode() + "****" + ENCRYPTION_KEY[-4:].decode()
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }

# ============================================
# ENDPOINTS
# ============================================

@router.post("/stories")
async def submit_story(
    story_data: StoryCreate,
    db: Session = Depends(get_db)
):
    """Submit a new anonymous story"""
    
    # Validate category
    valid_categories = ['stress', 'lonely', 'love', 'exam', 'family', 'other']
    if story_data.category not in valid_categories:
        raise HTTPException(status_code=400, detail="Invalid category")
    
    # ✅ DEBUG LOG
    logger.info(f"🔐 Encrypting story with key length: {len(ENCRYPTION_KEY)}")
    logger.info(f"📝 Story title preview: {story_data.title[:20]}...")
    
    try:
        # Encrypt title and content
        title_encrypted, title_iv = encrypt_message(story_data.title)
        content_encrypted, content_iv = encrypt_message(story_data.content)
        
        logger.info(f"✅ Story encrypted successfully")
        logger.info(f"📦 Encrypted data lengths: title={len(title_encrypted)}, content={len(content_encrypted)}")
        
        # Use same IV for both (or generate separate - your choice)
        story = Story(
            title_encrypted=title_encrypted,
            content_encrypted=content_encrypted,
            encryption_iv=title_iv,  # Using title's IV for both
            category=story_data.category,
            is_approved=False,
            is_published=False
        )
        
        db.add(story)
        db.commit()
        db.refresh(story)
        
        logger.info(f"✅ Story saved to database: {story.id}")
        
        return {
            "success": True,
            "message": "Câu chuyện của bạn đã được gửi! Sẽ được kiểm duyệt và hiển thị sớm.",
            "story_id": str(story.id)
        }
    
    except Exception as e:
        logger.error(f"❌ Failed to encrypt/save story: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to save story: {str(e)}")


@router.get("/stories")
async def get_published_stories(
    category: Optional[str] = None,
    limit: int = 20,
    offset: int = 0,
    db: Session = Depends(get_db)
):
    """Get published stories (public endpoint)"""
    
    query = db.query(Story).filter(
        Story.is_published == True,
        Story.flagged == False
    )
    
    if category:
        query = query.filter(Story.category == category)
    
    query = query.order_by(desc(Story.published_at))
    
    total = query.count()
    stories = query.offset(offset).limit(limit).all()
    
    # Decrypt and format
    result_stories = []
    for story in stories:
        try:
            title = decrypt_message(story.title_encrypted, story.encryption_iv)
            content = decrypt_message(story.content_encrypted, story.encryption_iv)
            
            # Truncate content for list view
            excerpt = content[:200] + "..." if len(content) > 200 else content
            
            result_stories.append({
                "id": str(story.id),
                "title": title,
                "excerpt": excerpt,
                "category": story.category,
                "likes_count": story.likes_count,
                "created_at": story.created_at.isoformat()
            })
        except Exception as e:
            logger.warning(f"⚠️  Failed to decrypt published story {story.id}: {e}")
            continue  # Skip corrupted stories
    
    return {
        "stories": result_stories,
        "total": total,
        "limit": limit,
        "offset": offset
    }


@router.get("/stories/{story_id}")
async def get_story_detail(
    story_id: str,
    db: Session = Depends(get_db)
):
    """Get full story content"""
    
    story = db.query(Story).filter(
        Story.id == story_id,
        Story.is_published == True,
        Story.flagged == False
    ).first()
    
    if not story:
        raise HTTPException(status_code=404, detail="Story not found")
    
    try:
        title = decrypt_message(story.title_encrypted, story.encryption_iv)
        content = decrypt_message(story.content_encrypted, story.encryption_iv)
        
        return {
            "id": str(story.id),
            "title": title,
            "content": content,
            "category": story.category,
            "likes_count": story.likes_count,
            "created_at": story.created_at.isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to load story")


@router.post("/stories/{story_id}/like")
async def like_story(
    story_id: str,
    db: Session = Depends(get_db)
):
    """Like a story (increment counter)"""
    
    story = db.query(Story).filter(Story.id == story_id).first()
    if not story:
        raise HTTPException(status_code=404, detail="Story not found")
    
    story.likes_count += 1
    db.commit()
    
    return {
        "success": True,
        "likes_count": story.likes_count
    }