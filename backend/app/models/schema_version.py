# ============================================
# SQLALCHEMY MODELS: CÙNG BẠN LẮNG NGHE
# File: backend/app/models/schema_version.py
# ============================================

from sqlalchemy import Column, String, DateTime, Text
from sqlalchemy.sql import func

from .base import Base

class SchemaVersion(Base):
    __tablename__ = "schema_version"
    __table_args__ = {'extend_existing': True}
    
    version = Column(String(10), primary_key=True)
    applied_at = Column(DateTime(timezone=True), server_default=func.now())
    description = Column(Text)
    
    def __repr__(self):
        return f"<SchemaVersion(version={self.version})>"