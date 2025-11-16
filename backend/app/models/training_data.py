# ============================================
# SQLALCHEMY MODELS: CÙNG BẠN LẮNG NGHE
# File: backend/app/models/training_data.py
# ============================================

from sqlalchemy import (
    Column, String, BigInteger, Boolean, DateTime, Text, 
    ARRAY, Index
)
from sqlalchemy.sql import func

from .base import Base

class TrainingData(Base):
    __tablename__ = "training_data"
    __table_args__ = (
        Index('idx_source_verified', 'source', 'is_verified'),
        Index('idx_crisis_level', 'crisis_level', 'is_active'),
        {'extend_existing': True}
    )
    
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    
    source = Column(String(50), nullable=False)
    source_id = Column(String(100))
    
    content_encrypted = Column(Text, nullable=False)
    encryption_iv = Column(String(32), nullable=False)
    
    sentiment = Column(String(20))
    emotion_tags = Column(ARRAY(Text))
    crisis_level = Column(String(20))
    
    age_group = Column(String(20))
    school_type = Column(String(20))
    location = Column(String(50))
    
    is_verified = Column(Boolean, default=False)
    verified_by = Column(String(50))
    verified_at = Column(DateTime(timezone=True))
    
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    def __repr__(self):
        return f"<TrainingData(id={self.id}, source={self.source})>"