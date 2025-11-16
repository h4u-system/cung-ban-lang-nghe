# ============================================
# SQLALCHEMY MODELS: CÙNG BẠN LẮNG NGHE
# File: backend/app/models/blocked_keyword.py
# ============================================

from sqlalchemy import Column, String, Integer, Boolean, DateTime, Index
from sqlalchemy.sql import func

from .base import Base

class BlockedKeyword(Base):
    __tablename__ = "blocked_keywords"
    __table_args__ = (
        Index('idx_keyword_category', 'category', 'is_active'),
        Index('idx_keyword_language', 'language', 'is_active'),
        {'extend_existing': True}
    )
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    
    keyword = Column(String(100), nullable=False)
    category = Column(String(50), nullable=False)
    severity = Column(String(20), default='high')
    language = Column(String(5), default='vi')
    
    is_exact_match = Column(Boolean, default=True)
    is_case_sensitive = Column(Boolean, default=False)
    
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    created_by = Column(String(50), default='system')
    
    def __repr__(self):
        return f"<BlockedKeyword(keyword={self.keyword}, category={self.category})>"