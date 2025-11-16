# ============================================
# SQLALCHEMY MODELS: CÙNG BẠN LẮNG NGHE
# File: backend/app/models/feedback.py
# ============================================

from sqlalchemy import Column, String, Integer, DateTime, Text, ForeignKey, CheckConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid

from .base import Base

class Feedback(Base):
    __tablename__ = "feedback"
    __table_args__ = {'extend_existing': True}
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    session_id = Column(UUID(as_uuid=True), ForeignKey('sessions.id', ondelete='CASCADE'), unique=True)
    
    rating = Column(Integer, CheckConstraint('rating BETWEEN 1 AND 5'))
    feedback_text_encrypted = Column(Text, nullable=True)
    encryption_iv = Column(String(32), nullable=True)
    
    category = Column(String(50))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    session = relationship("Session", back_populates="feedback")
    
    def __repr__(self):
        return f"<Feedback(session={self.session_id}, rating={self.rating})>"