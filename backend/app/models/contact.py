# ============================================
# CONTACT FORM MODEL
# File: backend/app/models/contact.py
# ============================================

from sqlalchemy import Column, String, Text, DateTime, Boolean
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid

from .base import Base

class ContactForm(Base):
    """Contact form submissions"""
    __tablename__ = "contact_forms"
    __table_args__ = {'extend_existing': True}
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    # Optional fields (encrypted if provided)
    name_encrypted = Column(Text)
    email_encrypted = Column(Text)
    encryption_iv = Column(String(32))
    
    # Required fields
    subject = Column(String(100), nullable=False)  # feedback, bug, feature, partnership, other
    message_encrypted = Column(Text, nullable=False)
    message_iv = Column(String(32), nullable=False)
    
    # Status
    is_read = Column(Boolean, default=False)
    is_replied = Column(Boolean, default=False)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    read_at = Column(DateTime(timezone=True))
    replied_at = Column(DateTime(timezone=True))
    
    def __repr__(self):
        return f"<ContactForm(id={self.id}, subject={self.subject})>"