# ============================================
# ADMIN STORIES ROUTES
# File: backend/app/admin/routes/stories.py
# ============================================

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import desc
from datetime import datetime
from typing import Optional

from app.database import get_db
from app.admin.auth import get_current_admin
from app.admin.models import AdminUser
from app.models.story import Story
from backend.app.utils.encryption_bk import decrypt_message

router = APIRouter()

# ============================================
# ENDPOINTS
# ============================================

@router.get("/pending")
async def get_pending_stories(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    admin: AdminUser = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """
    Get all pending stories for moderation
    
    Final URL: /api/v1/admin/stories/pending
    """
    
    skip = (page - 1) * limit
    
    # Query pending stories
    stories_query = db.query(Story).filter(
        Story.is_approved == False,
        Story.flagged == False
    ).order_by(desc(Story.created_at))
    
    total = stories_query.count()
    stories = stories_query.offset(skip).limit(limit).all()
    
    # Decrypt and format (with fallback for corrupted data)
    result_stories = []
    corrupted_count = 0
    
    for story in stories:
        try:
            # Try to decrypt
            title = decrypt_message(story.title_encrypted, story.encryption_iv)
            content = decrypt_message(story.content_encrypted, story.encryption_iv)
            
            result_stories.append({
                "id": str(story.id),
                "title": title,
                "content": content,
                "category": story.category,
                "created_at": story.created_at.isoformat() if story.created_at else None,
                "status": "pending",
                "decryption_failed": False
            })
            
        except Exception as e:
            # If decryption fails, still show metadata with warning
            print(f"⚠️  Failed to decrypt story {story.id}: {e}")
            corrupted_count += 1
            
            result_stories.append({
                "id": str(story.id),
                "title": f"⚠️ [Lỗi decrypt] Story {str(story.id)[:8]}...",
                "content": (
                    f"⚠️ **Không thể giải mã nội dung**\n\n"
                    f"Có thể do encryption key thay đổi hoặc dữ liệu bị corrupt.\n\n"
                    f"**Thông tin:**\n"
                    f"- Category: {story.category}\n"
                    f"- Created: {story.created_at.strftime('%Y-%m-%d %H:%M:%S') if story.created_at else 'N/A'}\n"
                    f"- Story ID: {story.id}\n\n"
                    f"**Hành động:** Bạn có thể xóa vĩnh viễn story này."
                ),
                "category": story.category,
                "created_at": story.created_at.isoformat() if story.created_at else None,
                "status": "pending",
                "decryption_failed": True  # ✅ Flag for frontend
            })
    
    return {
        "stories": result_stories,
        "total": total,
        "page": page,
        "limit": limit,
        "corrupted_count": corrupted_count
    }


@router.post("/{story_id}/approve")
async def approve_story(
    story_id: str,
    admin: AdminUser = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """
    Approve a pending story
    
    Final URL: /api/v1/admin/stories/{story_id}/approve
    """
    
    story = db.query(Story).filter(Story.id == story_id).first()
    
    if not story:
        raise HTTPException(status_code=404, detail="Story not found")
    
    if story.is_approved:
        raise HTTPException(status_code=400, detail="Story already approved")
    
    # ✅ Verify decryption before approving
    try:
        decrypt_message(story.title_encrypted, story.encryption_iv)
        decrypt_message(story.content_encrypted, story.encryption_iv)
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Cannot approve story with corrupted encryption: {str(e)}"
        )
    
    # Approve and publish
    story.is_approved = True
    story.is_published = True
    story.approved_at = datetime.utcnow()
    story.approved_by = str(admin.id)
    story.published_at = datetime.utcnow()
    
    db.commit()
    
    return {
        "success": True,
        "message": "Story approved and published successfully",
        "story_id": story_id
    }


@router.post("/{story_id}/reject")
async def reject_story(
    story_id: str,
    admin: AdminUser = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """
    Reject a pending story
    
    Final URL: /api/v1/admin/stories/{story_id}/reject
    """
    
    story = db.query(Story).filter(Story.id == story_id).first()
    
    if not story:
        raise HTTPException(status_code=404, detail="Story not found")
    
    if story.is_approved:
        raise HTTPException(status_code=400, detail="Story already approved")
    
    # Mark as rejected (soft delete)
    story.flagged = True
    story.flag_reason = "Rejected by admin"
    
    db.commit()
    
    return {
        "success": True,
        "message": "Story rejected successfully",
        "story_id": story_id
    }


@router.delete("/{story_id}")
async def delete_corrupted_story(
    story_id: str,
    admin: AdminUser = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """
    ✅ NEW: Delete permanently corrupted stories
    
    Final URL: /api/v1/admin/stories/{story_id}
    """
    
    story = db.query(Story).filter(Story.id == story_id).first()
    
    if not story:
        raise HTTPException(status_code=404, detail="Story not found")
    
    db.delete(story)
    db.commit()
    
    return {
        "success": True,
        "message": "Story deleted permanently",
        "story_id": story_id
    }