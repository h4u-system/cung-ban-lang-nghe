# ============================================
# ADMIN MODELS
# File: backend/app/admin/models.py
# ============================================

from datetime import datetime
from uuid import uuid4
from sqlalchemy import Column, String, Boolean, Integer, Text, ARRAY, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship

from app.models import Base


class AdminUser(Base):
    """Admin users table"""
    __tablename__ = "admin_users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    full_name = Column(String(255))
    role = Column(String(50), default="editor")  # admin, editor, viewer
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    last_login = Column(DateTime)
    created_by = Column(UUID(as_uuid=True), ForeignKey("admin_users.id"))

    # Relationships
    created_content = relationship(
        "ContentItem", 
        back_populates="creator", 
        foreign_keys="ContentItem.created_by"
    )


class ContentItem(Base):
    """Content management table"""
    __tablename__ = "content_items"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    type = Column(String(50), nullable=False, index=True)
    title = Column(String(500))
    content = Column(Text, nullable=False)
    category = Column(String(100))
    tags = Column(ARRAY(String))
    is_published = Column(Boolean, default=False)
    order_index = Column(Integer, default=0)
    metadata = Column(JSONB)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    created_by = Column(UUID(as_uuid=True), ForeignKey("admin_users.id"))
    updated_by = Column(UUID(as_uuid=True), ForeignKey("admin_users.id"))

    # Relationships
    creator = relationship(
        "AdminUser", 
        foreign_keys=[created_by], 
        back_populates="created_content"
    )


class AnalyticsEvent(Base):
    """Analytics events table"""
    __tablename__ = "analytics_events"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    event_type = Column(String(100), nullable=False, index=True)
    session_id = Column(UUID(as_uuid=True), ForeignKey("sessions.id"))
    metadata = Column(JSONB)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)