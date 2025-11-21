# ============================================
# SESSION API ENDPOINTS
# File: backend/app/api/endpoints/sessions.py
# ============================================

import logging
from datetime import datetime, timedelta
from typing import Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel, Field

from app.database import get_db
from app.models.session import Session as SessionModel
from app.models.message import Message
from app.utils.session_manager import generate_session_token, hash_user_agent

logger = logging.getLogger(__name__)

router = APIRouter()


# ============================================
# PYDANTIC SCHEMAS
# ============================================

class SessionCreateRequest(BaseModel):
    """Schema for creating a new session"""
    user_agent: Optional[str] = Field(default=None)
    language_preference: str = Field(default="vi")
    
    model_config = {
        "json_schema_extra": {
            "example": {
                "user_agent": "Mozilla/5.0...",
                "language_preference": "vi"
            }
        }
    }


class SessionData(BaseModel):
    """Inner session data schema"""
    session_token: str
    expires_at: datetime
    language_preference: str
    is_crisis_mode: bool
    
    model_config = {
        "from_attributes": True
    }


# Nested response wrapper
class SessionResponse(BaseModel):
    """Schema for session response - NESTED STRUCTURE"""
    session: SessionData
    
    model_config = {
        "json_schema_extra": {
            "example": {
                "session": {
                    "session_token": "anon_abc123...",
                    "expires_at": "2025-12-18T10:30:00Z",
                    "language_preference": "vi",
                    "is_crisis_mode": False
                }
            }
        }
    }


class SessionStatusResponse(BaseModel):
    """Schema for session status check"""
    is_valid: bool
    is_expired: bool
    is_active: bool
    is_crisis_mode: bool
    created_at: datetime
    last_activity: datetime
    expires_at: datetime
    message_count: int


# ============================================
# HELPER FUNCTIONS
# ============================================

def get_session_by_token(db: Session, session_token: str) -> SessionModel:
    """
    Get session by token and validate
    
    Args:
        db: Database session
        session_token: Session token
        
    Returns:
        SessionModel instance
        
    Raises:
        HTTPException: If session not found or invalid
    """
    session = db.query(SessionModel).filter(
        SessionModel.session_token == session_token
    ).first()
    
    if not session:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={
                "error": "Session Not Found",
                "message": "Session không tồn tại hoặc đã hết hạn",
                "session_token": session_token[:8] + "..."
            }
        )
    
    # Check if expired
    if session.is_expired():
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                "error": "Session Expired",
                "message": "Session đã hết hạn. Vui lòng tạo session mới.",
                "expired_at": session.expires_at.isoformat()
            }
        )
    
    # Check if deleted
    if session.deleted_at is not None:
        raise HTTPException(
            status_code=status.HTTP_410_GONE,
            detail={
                "error": "Session Deleted",
                "message": "Session đã bị xóa",
                "deleted_at": session.deleted_at.isoformat()
            }
        )
    
    return session


# ============================================
# SESSION ENDPOINTS
# ============================================

@router.post(
    "",
    response_model=SessionResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create New Session",
    description="Create a new anonymous session for chatting"
)
async def create_session(
    session_data: SessionCreateRequest = SessionCreateRequest(),
    db: Session = Depends(get_db)
):
    """
    Create a new anonymous session
    
    - **user_agent**: Optional browser user agent (will be hashed)
    - **language_preference**: Preferred language (default: 'vi')
    
    Returns a session token that should be used for all subsequent requests.
    Session tokens are anonymous and don't require any personal information.
    """
    # Generate session token
    session_token = generate_session_token()
    
    # Hash user agent if provided (for analytics, not tracking)
    user_agent_hash = None
    if session_data.user_agent:
        user_agent_hash = hash_user_agent(session_data.user_agent)
    
    # Create session
    new_session = SessionModel(
        session_token=session_token,
        user_agent_hash=user_agent_hash,
        language_preference=session_data.language_preference
    )
    
    db.add(new_session)
    db.commit()
    db.refresh(new_session)
    
    logger.info(f"✅ New session created: {new_session.id} - Token: {session_token[:12]}...")
    
    # Return nested structure that frontend expects
    return SessionResponse(
        session=SessionData(
            session_token=new_session.session_token,
            expires_at=new_session.expires_at,
            language_preference=new_session.language_preference,
            is_crisis_mode=new_session.is_crisis_mode
        )
    )


@router.get(
    "/{session_token}",
    response_model=SessionStatusResponse,
    summary="Get Session by Token",
    description="Validate and get session details by token"
)
async def get_session(
    session_token: str,
    db: Session = Depends(get_db)
):
    """
    Get session details by token
    
    - **session_token**: Session token to validate
    
    Returns session details if valid, otherwise 404/401/410 error.
    """
    session = get_session_by_token(db, session_token)
    
    # Count messages
    message_count = db.query(Message).filter(
        Message.session_id == session.id
    ).count()
    
    logger.info(f"✅ Session validated: {session.id}")
    
    return SessionStatusResponse(
        is_valid=True,
        is_expired=session.is_expired(),
        is_active=session.is_active,
        is_crisis_mode=session.is_crisis_mode,
        created_at=session.created_at,
        last_activity=session.last_activity,
        expires_at=session.expires_at,
        message_count=message_count
    )


@router.get(
    "/status",
    response_model=SessionStatusResponse,
    summary="Check Session Status",
    description="Check if a session is valid and get its status"
)
async def check_session_status(
    session_token: str,
    db: Session = Depends(get_db)
):
    """
    Check session status via query parameter
    
    - **session_token**: Session token to check (query param)
    
    Returns detailed session status including validity, expiration, and activity.
    """
    session = get_session_by_token(db, session_token)
    
    # Count messages
    message_count = db.query(Message).filter(
        Message.session_id == session.id
    ).count()
    
    return SessionStatusResponse(
        is_valid=True,
        is_expired=session.is_expired(),
        is_active=session.is_active,
        is_crisis_mode=session.is_crisis_mode,
        created_at=session.created_at,
        last_activity=session.last_activity,
        expires_at=session.expires_at,
        message_count=message_count
    )


@router.post(
    "/refresh",
    response_model=SessionResponse,
    summary="Refresh Session",
    description="Refresh session to extend expiration time"
)
async def refresh_session(
    session_token: str,
    db: Session = Depends(get_db)
):
    """
    Refresh session to extend expiration
    
    - **session_token**: Session token to refresh
    
    Extends the session expiration by 30 days from now.
    """
    session = get_session_by_token(db, session_token)
    
    # Update expiration and activity
    session.expires_at = datetime.utcnow() + timedelta(days=30)
    session.touch()
    
    db.commit()
    db.refresh(session)
    
    logger.info(f"✅ Session refreshed: {session.id}")
    
    # Return nested structure
    return SessionResponse(
        session=SessionData(
            session_token=session.session_token,
            expires_at=session.expires_at,
            language_preference=session.language_preference,
            is_crisis_mode=session.is_crisis_mode
        )
    )


@router.delete(
    "",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete Session",
    description="Soft delete a session and all its data"
)
async def delete_session(
    session_token: str,
    db: Session = Depends(get_db)
):
    """
    Delete session (soft delete)
    
    - **session_token**: Session token to delete
    
    This will mark the session as deleted and make it inaccessible.
    All associated messages will also be inaccessible.
    """
    session = get_session_by_token(db, session_token)
    
    # Soft delete
    session.deleted_at = datetime.utcnow()
    session.is_active = False
    
    db.commit()
    
    logger.info(f"✅ Session deleted: {session.id}")
    
    return None  # 204 No Content


# ============================================
# EXPORT
# ============================================

__all__ = ['router', 'get_session_by_token']