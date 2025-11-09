# ============================================
# File: backend/app/admin/routes/content.py
# ============================================

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from uuid import UUID
from sqlalchemy.orm import Session

from app.database import get_db
from app.admin.models import ContentItem, AdminUser
from app.admin.auth import get_current_admin, require_role

router = APIRouter(prefix="/admin/content", tags=["Content Management"])


class ContentCreate(BaseModel):
    type: str
    title: Optional[str] = None
    content: str
    category: Optional[str] = None
    tags: List[str] = []
    is_published: bool = False
    metadata: Optional[dict] = None


class ContentUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[List[str]] = None
    is_published: Optional[bool] = None
    metadata: Optional[dict] = None


class ContentResponse(BaseModel):
    id: UUID
    type: str
    title: Optional[str]
    content: str
    category: Optional[str]
    tags: List[str]
    is_published: bool
    order_index: int
    metadata: Optional[dict]
    created_at: str
    updated_at: str

    class Config:
        from_attributes = True


@router.get("/", response_model=List[ContentResponse])
async def list_content(
    type: Optional[str] = None,
    category: Optional[str] = None,
    is_published: Optional[bool] = None,
    admin: AdminUser = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """List all content items with optional filters"""
    query = db.query(ContentItem)
    
    if type:
        query = query.filter(ContentItem.type == type)
    if category:
        query = query.filter(ContentItem.category == category)
    if is_published is not None:
        query = query.filter(ContentItem.is_published == is_published)
    
    items = query.order_by(ContentItem.order_index, ContentItem.created_at.desc()).all()
    return items


@router.post("/", response_model=ContentResponse, status_code=201)
async def create_content(
    content: ContentCreate,
    admin: AdminUser = Depends(require_role(["admin", "editor"])),
    db: Session = Depends(get_db)
):
    """Create new content item"""
    new_content = ContentItem(
        type=content.type,
        title=content.title,
        content=content.content,
        category=content.category,
        tags=content.tags or [],
        is_published=content.is_published,
        metadata=content.metadata,
        created_by=admin.id,
        updated_by=admin.id
    )
    
    db.add(new_content)
    db.commit()
    db.refresh(new_content)
    
    return new_content


@router.get("/{content_id}", response_model=ContentResponse)
async def get_content(
    content_id: UUID,
    admin: AdminUser = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Get single content item"""
    content = db.query(ContentItem).filter(ContentItem.id == content_id).first()
    if not content:
        raise HTTPException(status_code=404, detail="Content not found")
    return content


@router.put("/{content_id}", response_model=ContentResponse)
async def update_content(
    content_id: UUID,
    content_update: ContentUpdate,
    admin: AdminUser = Depends(require_role(["admin", "editor"])),
    db: Session = Depends(get_db)
):
    """Update content item"""
    content = db.query(ContentItem).filter(ContentItem.id == content_id).first()
    if not content:
        raise HTTPException(status_code=404, detail="Content not found")
    
    # Update fields
    update_data = content_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(content, field, value)
    
    content.updated_by = admin.id
    
    db.commit()
    db.refresh(content)
    
    return content


@router.delete("/{content_id}")
async def delete_content(
    content_id: UUID,
    admin: AdminUser = Depends(require_role(["admin"])),
    db: Session = Depends(get_db)
):
    """Delete content item (admin only)"""
    content = db.query(ContentItem).filter(ContentItem.id == content_id).first()
    if not content:
        raise HTTPException(status_code=404, detail="Content not found")
    
    db.delete(content)
    db.commit()
    
    return {"message": "Content deleted successfully"}