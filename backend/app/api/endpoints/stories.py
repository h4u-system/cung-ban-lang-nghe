# ============================================
# STORIES API ENDPOINTS
# File: backend/app/api/endpoints/stories.py
# ============================================

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import desc
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
import logging
import os
import base64

from app.database import get_db
from app.models.story import Story
from app.utils.encryption import encrypt_message, decrypt_message, ENCRYPTION_KEY

from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import padding

router = APIRouter()
logger = logging.getLogger(__name__)

# ============================================
# HELPER FUNCTIONS
# ============================================

def encrypt_with_shared_iv(plaintext: str, iv_bytes: bytes) -> str:
    """Encrypt text with specific IV"""
    cipher = Cipher(
        algorithms.AES(ENCRYPTION_KEY),
        modes.CBC(iv_bytes),
        backend=default_backend()
    )
    encryptor = cipher.encryptor()
    
    padder = padding.PKCS7(128).padder()
    padded_data = padder.update(plaintext.encode('utf-8')) + padder.finalize()
    
    ciphertext = encryptor.update(padded_data) + encryptor.finalize()
    
    return base64.b64encode(ciphertext).decode('utf-8')

# ============================================
# SCHEMAS
# ============================================

class StoryCreate(BaseModel):
    title: str
    content: str
    category: str

# ============================================
# TEST ENDPOINT
# ============================================

@router.get("/test-encryption")
async def test_encryption():
    """Test encryption roundtrip"""
    
    test_message = "Tôi cảm thấy áp lực khi học tập và thi cử"
    
    try:
        encrypted, iv = encrypt_message(test_message)
        decrypted = decrypt_message(encrypted, iv)
        
        return {
            "test_message": test_message,
            "decrypted": decrypted,
            "success": test_message == decrypted,
            "key_length": len(ENCRYPTION_KEY)
        }
    except Exception as e:
        return {"success": False, "error": str(e)}

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
    
    logger.info(f"🔐 Encrypting story with key length: {len(ENCRYPTION_KEY)}")
    logger.info(f"📝 Story title preview: {story_data.title[:20]}...")
    
    try:
        # ✅ FIX: Generate 1 shared IV for both title and content
        shared_iv_bytes = os.urandom(16)
        shared_iv_b64 = base64.b64encode(shared_iv_bytes).decode('utf-8')
        
        # Encrypt both with same IV
        title_encrypted = encrypt_with_shared_iv(story_data.title, shared_iv_bytes)
        content_encrypted = encrypt_with_shared_iv(story_data.content, shared_iv_bytes)
        
        logger.info(f"✅ Story encrypted with shared IV")
        logger.info(f"📦 Lengths: title={len(title_encrypted)}, content={len(content_encrypted)}")
        
        story = Story(
            title_encrypted=title_encrypted,
            content_encrypted=content_encrypted,
            encryption_iv=shared_iv_b64,  # ✅ Same IV for both
            category=story_data.category,
            is_approved=False,
            is_published=False
        )
        
        db.add(story)
        db.commit()
        db.refresh(story)
        
        logger.info(f"✅ Story saved: {story.id}")
        
        return {
            "success": True,
            "message": "Câu chuyện của bạn đã được gửi! Sẽ được kiểm duyệt và hiển thị sớm.",
            "story_id": str(story.id)
        }
    
    except Exception as e:
        logger.error(f"❌ Failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/stories")
async def get_published_stories(
    category: Optional[str] = None,
    limit: int = 20,
    offset: int = 0,
    db: Session = Depends(get_db)
):
    """Get published stories"""
    
    query = db.query(Story).filter(
        Story.is_published == True,
        Story.flagged == False
    )
    
    if category:
        query = query.filter(Story.category == category)
    
    query = query.order_by(desc(Story.published_at))
    
    total = query.count()
    stories = query.offset(offset).limit(limit).all()
    
    result_stories = []
    for story in stories:
        try:
            title = decrypt_message(story.title_encrypted, story.encryption_iv)
            content = decrypt_message(story.content_encrypted, story.encryption_iv)
            
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
            logger.warning(f"⚠️ Failed to decrypt story {story.id}: {e}")
            continue
    
    return {
        "stories": result_stories,
        "total": total,
        "limit": limit,
        "offset": offset
    }


@router.get("/stories/{story_id}")
async def get_story_detail(story_id: str, db: Session = Depends(get_db)):
    """Get full story"""
    
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
async def like_story(story_id: str, db: Session = Depends(get_db)):
    """Like a story"""
    
    story = db.query(Story).filter(Story.id == story_id).first()
    if not story:
        raise HTTPException(status_code=404, detail="Story not found")
    
    story.likes_count += 1
    db.commit()
    
    return {"success": True, "likes_count": story.likes_count}