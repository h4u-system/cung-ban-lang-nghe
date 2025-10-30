# ============================================
# SESSION PYDANTIC SCHEMAS
# File: backend/app/schemas/session.py
# ============================================

from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, field_validator
from uuid import UUID


# ============================================
# REQUEST SCHEMAS
# ============================================

class SessionCreate(BaseModel):
    """Schema for creating anonymous session"""
    language_preference: str = Field(
        default="vi",
        description="User's language preference",
        pattern="^(vi|en)$"
    )
    user_agent: Optional[str] = Field(
        None,
        description="Browser user agent (will be hashed)",
        max_length=500
    )
    
    @field_validator('language_preference')
    @classmethod
    def validate_language(cls, v):
        if v not in ['vi', 'en']:
            raise ValueError('Language must be "vi" or "en"')
        return v


class SessionUpdate(BaseModel):
    """Schema for updating session"""
    is_crisis_mode: Optional[bool] = Field(
        None,
        description="Flag to indicate user is in crisis mode"
    )


# ============================================
# RESPONSE SCHEMAS
# ============================================

class SessionResponse(BaseModel):
    """Schema for session response"""
    id: UUID
    session_token: str
    created_at: datetime
    last_activity: datetime
    expires_at: datetime
    language_preference: str
    is_active: bool
    is_crisis_mode: bool
    
    # Computed fields
    @property
    def is_expired(self) -> bool:
        """Check if session has expired"""
        return datetime.utcnow() > self.expires_at
    
    @property
    def time_remaining(self) -> int:
        """Get remaining time in seconds"""
        if self.is_expired:
            return 0
        delta = self.expires_at - datetime.utcnow()
        return int(delta.total_seconds())
    
    model_config = {
        "from_attributes": True,
        "json_schema_extra": {
            "example": {
                "id": "123e4567-e89b-12d3-a456-426614174000",
                "session_token": "anon_abc123def456",
                "created_at": "2025-10-29T10:00:00Z",
                "last_activity": "2025-10-29T10:30:00Z",
                "expires_at": "2025-11-28T10:00:00Z",
                "language_preference": "vi",
                "is_active": True,
                "is_crisis_mode": False
            }
        }
    }


class SessionCreateResponse(BaseModel):
    """Schema for session creation response"""
    session: SessionResponse
    message: str = "Session created successfully"
    instructions: dict = {
        "store_token": "Save session_token securely on client-side",
        "expiry": "Session expires in 30 days",
        "usage": "Include session_token in X-Session-Token header for all requests"
    }


class SessionDeleteResponse(BaseModel):
    """Schema for session deletion response"""
    message: str = "Session deleted successfully"
    deleted_at: datetime


# ============================================
# ERROR SCHEMAS
# ============================================

class SessionNotFoundError(BaseModel):
    """Schema for session not found error"""
    error: str = "Session Not Found"
    message: str
    session_token: str


class SessionExpiredError(BaseModel):
    """Schema for session expired error"""
    error: str = "Session Expired"
    message: str
    expired_at: datetime
    session_token: str


# ============================================
# EXPORT ALL SCHEMAS
# ============================================

__all__ = [
    'SessionCreate',
    'SessionUpdate',
    'SessionResponse',
    'SessionCreateResponse',
    'SessionDeleteResponse',
    'SessionNotFoundError',
    'SessionExpiredError'
]