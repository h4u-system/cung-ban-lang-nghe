# ============================================
# SESSION API ENDPOINTS
# File: backend/app/api/endpoints/sessions.py
# ============================================

import secrets
import hashlib
from datetime import datetime, timedelta
from typing import Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Header, Body, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Session as SessionModel
from app.schemas.session import (
    SessionCreate,
    SessionUpdate,
    SessionResponse,
    SessionCreateResponse,
    SessionDeleteResponse
)

router = APIRouter()


# ============================================
# HELPER FUNCTIONS
# ============================================

def generate_session_token() -> str:
    """
    Generate cryptographically secure session token
    Format: anon_<32_random_chars>
    """
    random_part = secrets.token_urlsafe(24)  # 32 chars after encoding
    return f"anon_{random_part}"


def hash_user_agent(user_agent: str) -> str:
    """
    Hash user agent string with SHA-256
    Used for abuse detection without storing PII
    """
    if not user_agent:
        return None
    return hashlib.sha256(user_agent.encode()).hexdigest()


def get_session_by_token(
    db: Session,
    session_token: str,
    check_expired: bool = True
) -> SessionModel:
    """
    Get session by token with optional expiry check
    
    Args:
        db: Database session
        session_token: Session token
        check_expired: Whether to check if session is expired
        
    Returns:
        SessionModel instance
        
    Raises:
        HTTPException: If session not found or expired
    """
    session = db.query(SessionModel).filter(
        SessionModel.session_token == session_token
    ).first()
    
    if not session:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={
                "error": "Session Not Found",
                "message": f"No session found with token: {session_token[:16]}...",
                "session_token": session_token
            }
        )
    
    if check_expired and session.is_expired():
        raise HTTPException(
            status_code=status.HTTP_410_GONE,
            detail={
                "error": "Session Expired",
                "message": "This session has expired",
                "expired_at": session.expires_at.isoformat(),
                "session_token": session_token
            }
        )
    
    return session


# ============================================
# SESSION ENDPOINTS
# ============================================

@router.post(
    "/",
    response_model=SessionCreateResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create Anonymous Session",
    description="Create a new anonymous session. No body required - all fields optional."
)
async def create_session(
    session_data: Optional[SessionCreate] = Body(None),
    user_agent: Optional[str] = Header(None, alias="User-Agent"),
    db: Session = Depends(get_db)
):
    """
    Create a new anonymous session
    
    - **Body**: Optional. Can send empty body or {"language_preference": "vi"}
    - **language_preference**: Optional. Defaults to "vi" if not provided
    - **user_agent**: Automatically extracted from headers
    
    Returns session token that should be stored securely on client-side
    """
    # Handle empty body or None
    if session_data is None:
        session_data = SessionCreate()
    
    # Generate session token
    session_token = generate_session_token()
    
    # Hash user agent for abuse detection
    user_agent_hash = hash_user_agent(user_agent) if user_agent else None
    
    # Create session
    new_session = SessionModel(
        session_token=session_token,
        language_preference=session_data.language_preference or "vi",
        user_agent_hash=user_agent_hash,
        is_active=True,
        is_crisis_mode=False
    )
    
    db.add(new_session)
    db.commit()
    db.refresh(new_session)
    
    return SessionCreateResponse(
        session=SessionResponse.model_validate(new_session),
        message="Session created successfully"
    )


@router.get(
    "/{session_token}",
    response_model=SessionResponse,
    summary="Get Session Info",
    description="Retrieve information about an existing session"
)
async def get_session(
    session_token: str,
    db: Session = Depends(get_db)
):
    """
    Get session information by token
    
    - **session_token**: The session token to look up
    
    Returns session details including expiry time
    """
    session = get_session_by_token(db, session_token)
    
    return SessionResponse.model_validate(session)


@router.put(
    "/{session_token}",
    response_model=SessionResponse,
    summary="Update Session",
    description="Update session (touch activity time or change crisis mode)"
)
async def update_session(
    session_token: str,
    session_update: SessionUpdate,
    db: Session = Depends(get_db)
):
    """
    Update session properties
    
    - **session_token**: The session token to update
    - **is_crisis_mode**: Optional flag to enable crisis mode
    
    Automatically updates last_activity timestamp
    """
    session = get_session_by_token(db, session_token)
    
    # Update last activity (touch)
    session.touch()
    
    # Update crisis mode if provided
    if session_update.is_crisis_mode is not None:
        session.is_crisis_mode = session_update.is_crisis_mode
    
    db.commit()
    db.refresh(session)
    
    return SessionResponse.model_validate(session)


@router.delete(
    "/{session_token}",
    response_model=SessionDeleteResponse,
    summary="Delete Session",
    description="Permanently delete a session and all associated data"
)
async def delete_session(
    session_token: str,
    db: Session = Depends(get_db)
):
    """
    Delete session and all associated data
    
    - **session_token**: The session token to delete
    
    This will cascade delete:
    - All messages
    - Conversation context
    - Feedback
    
    Returns confirmation of deletion
    """
    session = get_session_by_token(db, session_token, check_expired=False)
    
    # Delete session (cascade will delete related records)
    db.delete(session)
    db.commit()
    
    return SessionDeleteResponse(
        message="Session and all associated data deleted successfully",
        deleted_at=datetime.utcnow()
    )


@router.post(
    "/{session_token}/touch",
    response_model=SessionResponse,
    summary="Touch Session",
    description="Update session activity timestamp without other changes"
)
async def touch_session(
    session_token: str,
    db: Session = Depends(get_db)
):
    """
    Touch session to update last_activity timestamp
    
    - **session_token**: The session token to touch
    
    Use this endpoint to keep session alive during user activity
    """
    session = get_session_by_token(db, session_token)
    
    # Update last activity
    session.touch()
    
    db.commit()
    db.refresh(session)
    
    return SessionResponse.model_validate(session)


# ============================================
# SESSION VALIDATION DEPENDENCY
# ============================================

async def get_current_session(
    x_session_token: str = Header(..., alias="X-Session-Token"),
    db: Session = Depends(get_db)
) -> SessionModel:
    """
    Dependency to validate and retrieve current session from header
    
    Usage:
        @router.get("/protected")
        async def protected_route(
            session: SessionModel = Depends(get_current_session)
        ):
            # session is validated and available
    """
    return get_session_by_token(db, x_session_token)


# ============================================
# EXPORT
# ============================================

__all__ = ['router', 'get_current_session']
