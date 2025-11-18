# ============================================
# SQLALCHEMY MODELS: CÙNG BẠN LẮNG NGHE
# File: backend/app/models/session.py
# ============================================

from datetime import datetime, timedelta, timezone
from sqlalchemy import Column, String, Boolean, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid

from .base import Base

class Session(Base):
    __tablename__ = "sessions"
    __table_args__ = {'extend_existing': True}  # Safety net
    
    # Primary key
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    # Session identification (no PII)
    session_token = Column(String(64), unique=True, nullable=False, index=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    last_activity = Column(DateTime(timezone=True), server_default=func.now(), index=True)
    expires_at = Column(
        DateTime(timezone=True), 
        default=lambda: datetime.utcnow() + timedelta(days=30),
        index=True
    )
    
    # Metadata (no PII)
    user_agent_hash = Column(String(64))
    language_preference = Column(String(5), default='vi')
    
    # Status flags
    is_active = Column(Boolean, default=True)
    is_crisis_mode = Column(Boolean, default=False)
    
    # Soft delete
    deleted_at = Column(DateTime(timezone=True), nullable=True)
    
    # Relationships
    messages = relationship(
        "Message", 
        back_populates="session", 
        cascade="all, delete-orphan"
    )
    conversation_context = relationship(
        "ConversationContext", 
        back_populates="session",
        uselist=False,
        cascade="all, delete-orphan"
    )
    feedback = relationship(
        "Feedback",
        back_populates="session",
        uselist=False,
        cascade="all, delete-orphan"
    )
    
    def __repr__(self):
        return f"<Session(id={self.id}, token={self.session_token[:8]}..., active={self.is_active})>"
    
    def is_expired(self) -> bool:
        return self.expires_at < datetime.now(timezone.utc)
    
    def touch(self):
        self.last_activity = datetime.now(timezone.utc)