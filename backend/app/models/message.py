# ============================================
# SQLALCHEMY MODELS: CÙNG BẠN LẮNG NGHE
# File: backend/app/models/message.py
# ============================================

from datetime import datetime, timedelta
from sqlalchemy import (
    Column, String, Integer, Boolean, DateTime, Text,
    ForeignKey, CheckConstraint, Index, DECIMAL, ARRAY
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid

from .base import Base

class Message(Base):
    __tablename__ = "messages"  # ← CHỈ CÓ 1 DÒNG NÀY!
    __table_args__ = (
        CheckConstraint("role IN ('user', 'assistant')", name='check_role'),
        Index('idx_session_messages', 'session_id', 'created_at'),
        {'extend_existing': True}  # Safety net
    )
    
    # Primary key
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    # Foreign key
    session_id = Column(UUID(as_uuid=True), ForeignKey('sessions.id', ondelete='CASCADE'), nullable=False)
    
    # Encrypted content
    content_encrypted = Column(Text, nullable=False)
    encryption_iv = Column(String(32), nullable=False)
    
    # Message metadata
    role = Column(String(10), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # AI processing metadata
    model_used = Column(String(50))
    processing_time_ms = Column(Integer)
    
    # Sentiment analysis
    sentiment_score = Column(DECIMAL(3, 2))
    emotion_tags = Column(ARRAY(Text))
    
    # Crisis detection
    is_crisis_detected = Column(Boolean, default=False)
    
    # Auto-delete
    expires_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.utcnow() + timedelta(days=30),
        index=True
    )
    
    # Relationship
    session = relationship("Session", back_populates="messages")
    
    def __repr__(self):
        return f"<Message(id={self.id}, role={self.role}, session={self.session_id})>"