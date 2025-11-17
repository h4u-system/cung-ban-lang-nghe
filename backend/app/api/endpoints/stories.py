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

from app.database import get_db
from app.models.story import Story
from app.utils.encryption import encrypt_message, decrypt_message

router = APIRouter()

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
    
    # Encrypt title and content
    title_encrypted, title_iv = encrypt_message(story_data.title)
    content_encrypted, content_iv = encrypt_message(story_data.content)
    
    # Use same IV for simplicity (or generate separate)
    story = Story(
        title_encrypted=title_encrypted,
        content_encrypted=content_encrypted,
        encryption_iv=title_iv,  # Using title's IV for both
        category=story_data.category,
        is_approved=False,  # Needs admin approval
        is_published=False
    )
    
    db.add(story)
    db.commit()
    db.refresh(story)
    
    return {
        "success": True,
        "message": "Câu chuyện của bạn đã được gửi! Sẽ được kiểm duyệt và hiển thị sớm.",
        "story_id": str(story.id)
    }


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
            continue  # Skip if decryption fails
    
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