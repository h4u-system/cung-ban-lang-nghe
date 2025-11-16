# ============================================
# SQLALCHEMY MODELS: CÙNG BẠN LẮNG NGHE
# File: backend/app/models/conversation_context.py
# ============================================

from datetime import datetime, timedelta
from sqlalchemy import Column, String, Integer, DateTime, Text, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid

from .base import Base

class ConversationContext(Base):
    __tablename__ = "conversation_context"
    __table_args__ = {'extend_existing': True}
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    session_id = Column(UUID(as_uuid=True), ForeignKey('sessions.id', ondelete='CASCADE'), unique=True, nullable=False)
    
    context_data_encrypted = Column(Text, nullable=False)
    encryption_iv = Column(String(32), nullable=False)
    
    message_count = Column(Integer, default=0)
    last_updated = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    expires_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.utcnow() + timedelta(days=30)
    )
    
    session = relationship("Session", back_populates="conversation_context")
    
    def __repr__(self):
        return f"<ConversationContext(session={self.session_id}, messages={self.message_count})>"