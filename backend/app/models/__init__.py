# ============================================
# SQLALCHEMY MODELS: CÙNG BẠN LẮNG NGHE
# File: backend/app/models/__init__.py
# ============================================

from datetime import datetime, timedelta, timezone
from typing import Optional, List
from sqlalchemy import (
    Column, String, Integer, Boolean, DateTime, Text,
    ForeignKey, CheckConstraint, UniqueConstraint, Index,
    ARRAY, DECIMAL, BigInteger
)
from sqlalchemy.dialects.postgresql import UUID, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid

from app.admin.models import AdminUser, ContentItem, AnalyticsEvent

Base = declarative_base()

# ============================================
# MODEL 1: Session (Anonymous User Sessions)
# ============================================
class Session(Base):
    __tablename__ = "sessions"
    
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
    user_agent_hash = Column(String(64))  # SHA-256 hash
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
        uselist=False,  # One-to-one
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
        """Check if session has expired"""
        return self.expires_at < datetime.now(timezone.utc)
    
    def touch(self):
        """Update last activity timestamp"""
        self.last_activity = datetime.now(timezone.utc)


# ============================================
# MODEL 2: Message (Encrypted Chat Messages)
# ============================================
class Message(Base):
    __tablename__ = "messages"
    
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
    
    # Sentiment analysis (aggregate only)
    sentiment_score = Column(DECIMAL(3, 2))
    emotion_tags = Column(ARRAY(Text))
    
    # Crisis detection (real-time, not persisted long-term)
    is_crisis_detected = Column(Boolean, default=False)
    
    # Auto-delete
    expires_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.utcnow() + timedelta(days=30),
        index=True
    )
    
    # Constraints
    __table_args__ = (
        CheckConstraint("role IN ('user', 'assistant')", name='check_role'),
        Index('idx_session_messages', 'session_id', 'created_at'),
    )
    
    # Relationship
    session = relationship("Session", back_populates="messages")
    
    def __repr__(self):
        return f"<Message(id={self.id}, role={self.role}, session={self.session_id})>"


# ============================================
# MODEL 3: ConversationContext (AI Memory)
# ============================================
class ConversationContext(Base):
    __tablename__ = "conversation_context"
    
    # Primary key
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    # Foreign key (unique - one context per session)
    session_id = Column(UUID(as_uuid=True), ForeignKey('sessions.id', ondelete='CASCADE'), unique=True, nullable=False)
    
    # Encrypted context data
    context_data_encrypted = Column(Text, nullable=False)
    encryption_iv = Column(String(32), nullable=False)
    
    # Metadata
    message_count = Column(Integer, default=0)
    last_updated = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Auto-delete
    expires_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.utcnow() + timedelta(days=30)
    )
    
    # Relationship
    session = relationship("Session", back_populates="conversation_context")
    
    def __repr__(self):
        return f"<ConversationContext(session={self.session_id}, messages={self.message_count})>"


# ============================================
# MODEL 4: BlockedKeyword (Crisis Detection)
# ============================================
class BlockedKeyword(Base):
    __tablename__ = "blocked_keywords"
    
    # Primary key
    id = Column(Integer, primary_key=True, autoincrement=True)
    
    # Keyword data
    keyword = Column(String(100), nullable=False)
    category = Column(String(50), nullable=False)
    severity = Column(String(20), default='high')
    language = Column(String(5), default='vi')
    
    # Pattern matching settings
    is_exact_match = Column(Boolean, default=True)
    is_case_sensitive = Column(Boolean, default=False)
    
    # Status
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    created_by = Column(String(50), default='system')
    
    # Indexes
    __table_args__ = (
        Index('idx_keyword_category', 'category', 'is_active'),
        Index('idx_keyword_language', 'language', 'is_active'),
    )
    
    def __repr__(self):
        return f"<BlockedKeyword(keyword={self.keyword}, category={self.category}, severity={self.severity})>"


# ============================================
# MODEL 5: Feedback (User Ratings)
# ============================================
class Feedback(Base):
    __tablename__ = "feedback"
    
    # Primary key
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    # Foreign key (unique - one feedback per session)
    session_id = Column(UUID(as_uuid=True), ForeignKey('sessions.id', ondelete='CASCADE'), unique=True)
    
    # Feedback data
    rating = Column(Integer, CheckConstraint('rating BETWEEN 1 AND 5'))
    feedback_text_encrypted = Column(Text, nullable=True)
    encryption_iv = Column(String(32), nullable=True)
    
    # Category
    category = Column(String(50))
    
    # Timestamp
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationship
    session = relationship("Session", back_populates="feedback")
    
    def __repr__(self):
        return f"<Feedback(session={self.session_id}, rating={self.rating}, category={self.category})>"


# ============================================
# MODEL 6: SystemHealthMetric (Monitoring)
# ============================================
class SystemHealthMetric(Base):
    __tablename__ = "system_health_metrics"
    
    # Primary key
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    
    # Metric data
    metric_name = Column(String(100), nullable=False)
    metric_value = Column(DECIMAL(10, 2), nullable=False)
    metric_unit = Column(String(20))
    
    # Dimensions
    service_name = Column(String(50))
    environment = Column(String(20), default='production')
    
    # Timestamp
    recorded_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Indexes
    __table_args__ = (
        Index('idx_metric_name_time', 'metric_name', 'recorded_at'),
        Index('idx_service_time', 'service_name', 'recorded_at'),
    )
    
    def __repr__(self):
        return f"<SystemHealthMetric(name={self.metric_name}, value={self.metric_value}, service={self.service_name})>"


# ============================================
# MODEL 7: TrainingData (AI Dataset)
# ============================================
class TrainingData(Base):
    __tablename__ = "training_data"
    
    # Primary key
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    
    # Data source
    source = Column(String(50), nullable=False)
    source_id = Column(String(100))
    
    # Encrypted content
    content_encrypted = Column(Text, nullable=False)
    encryption_iv = Column(String(32), nullable=False)
    
    # Annotations
    sentiment = Column(String(20))
    emotion_tags = Column(ARRAY(Text))
    crisis_level = Column(String(20))
    
    # Metadata (anonymized)
    age_group = Column(String(20))
    school_type = Column(String(20))
    location = Column(String(50))
    
    # Quality control
    is_verified = Column(Boolean, default=False)
    verified_by = Column(String(50))
    verified_at = Column(DateTime(timezone=True))
    
    # Status
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Indexes
    __table_args__ = (
        Index('idx_source_verified', 'source', 'is_verified'),
        Index('idx_crisis_level', 'crisis_level', 'is_active'),
    )
    
    def __repr__(self):
        return f"<TrainingData(id={self.id}, source={self.source}, verified={self.is_verified})>"


# ============================================
# MODEL 8: SchemaVersion (Migrations Tracking)
# ============================================
class SchemaVersion(Base):
    __tablename__ = "schema_version"
    
    version = Column(String(10), primary_key=True)
    applied_at = Column(DateTime(timezone=True), server_default=func.now())
    description = Column(Text)
    
    def __repr__(self):
        return f"<SchemaVersion(version={self.version}, applied={self.applied_at})>"


# ============================================
# HELPER FUNCTIONS
# ============================================

def get_or_create(session, model, defaults=None, **kwargs):
    """Get existing instance or create new one"""
    instance = session.query(model).filter_by(**kwargs).first()
    if instance:
        return instance, False
    else:
        params = dict((k, v) for k, v in kwargs.items())
        params.update(defaults or {})
        instance = model(**params)
        session.add(instance)
        return instance, True


# ============================================
# DATABASE UTILITIES
# ============================================

def init_db(engine):
    """Initialize database - create all tables"""
    Base.metadata.create_all(bind=engine)


def drop_db(engine):
    """Drop all tables - USE WITH CAUTION"""
    Base.metadata.drop_all(bind=engine)


# ============================================
# EXPORT ALL MODELS
# ============================================

__all__ = [
    'Base',
    'Session',
    'Message',
    'ConversationContext',
    'BlockedKeyword',
    'Feedback',
    'SystemHealthMetric',
    'TrainingData',
    'SchemaVersion',
    'get_or_create',
    'init_db',
    'drop_db',
    # Admin models
    'AdminUser',
    'ContentItem',
    'AnalyticsEvent'
]