# ============================================
# STORY MODEL
# File: backend/app/models/story.py
# ============================================

from sqlalchemy import Column, String, Text, Boolean, DateTime, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid

from .base import Base

class Story(Base):
    """User-submitted stories (anonymous)"""
    __tablename__ = "stories"
    __table_args__ = {'extend_existing': True}
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    # Content (encrypted)
    title_encrypted = Column(Text, nullable=False)
    content_encrypted = Column(Text, nullable=False)
    encryption_iv = Column(String(32), nullable=False)
    
    # Metadata
    category = Column(String(50), nullable=False)  # stress, lonely, love, exam, family
    
    # Moderation
    is_approved = Column(Boolean, default=False)
    is_published = Column(Boolean, default=False)
    flagged = Column(Boolean, default=False)
    flag_reason = Column(String(200))
    
    # Engagement
    likes_count = Column(Integer, default=0)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    approved_at = Column(DateTime(timezone=True))
    published_at = Column(DateTime(timezone=True))
    
    def __repr__(self):
        return f"<Story(id={self.id}, category={self.category})>"