# ============================================
# ADMIN MESSAGES ROUTES
# File: backend/app/admin/routes/messages.py
# ============================================

from datetime import datetime
from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import desc, and_
from typing import Optional
from pydantic import BaseModel

from app.database import get_db
from app.admin.auth import get_current_admin
from app.admin.models import AdminUser
from app.models.message import Message
from app.models.session import Session as ChatSession
from backend.app.utils.encryption_bk import decrypt_message

router = APIRouter()

# ============================================
# SCHEMAS
# ============================================

class FlagRequest(BaseModel):
    reason: str

# ============================================
# ENDPOINTS
# ============================================

@router.get("/")
async def get_messages(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    crisis_only: bool = Query(False),
    flagged_only: bool = Query(False),
    search: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    admin: AdminUser = Depends(get_current_admin)
):
    """
    Get paginated messages with filters
    
    Final URL: /api/v1/admin/messages
    """
    
    # Base query
    query = db.query(Message)
    
    # Apply filters
    filters = []
    if crisis_only:
        filters.append(Message.is_crisis_detected == True)
    if flagged_only:
        filters.append(Message.flagged == True)
    
    if filters:
        query = query.filter(and_(*filters))
    
    # Order by newest first
    query = query.order_by(desc(Message.created_at))
    
    # Pagination
    total = query.count()
    messages = query.offset((page - 1) * limit).limit(limit).all()
    
    # Decrypt messages for display
    decrypted_messages = []
    for msg in messages:
        try:
            decrypted_content = decrypt_message(
                msg.content_encrypted,
                msg.encryption_iv
            )
            # Truncate for list view
            preview = decrypted_content[:200] + "..." if len(decrypted_content) > 200 else decrypted_content
        except Exception as e:
            preview = "[Decryption failed]"
        
        decrypted_messages.append({
            "id": str(msg.id),
            "session_id": str(msg.session_id),
            "role": msg.role,
            "content": preview,
            "created_at": msg.created_at.isoformat() if msg.created_at else None,
            "crisis_detected": msg.is_crisis_detected,
            "flagged": msg.flagged,
            "model_used": msg.model_used
        })
    
    return {
        "messages": decrypted_messages,
        "total": total,
        "page": page,
        "limit": limit,
        "total_pages": (total + limit - 1) // limit if total > 0 else 0
    }


@router.get("/{message_id}") 
async def get_message_detail(
    message_id: str,
    db: Session = Depends(get_db),
    admin: AdminUser = Depends(get_current_admin)
):
    """
    Get full message details
    
    Final URL: /api/v1/admin/messages/{message_id}
    """
    
    message = db.query(Message).filter(Message.id == message_id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    
    # Decrypt full content
    try:
        decrypted_content = decrypt_message(
            message.content_encrypted,
            message.encryption_iv
        )
    except Exception as e:
        decrypted_content = "[Decryption failed]"
    
    return {
        "id": str(message.id),
        "session_id": str(message.session_id),
        "role": message.role,
        "content": decrypted_content,
        "created_at": message.created_at.isoformat() if message.created_at else None,
        "crisis_detected": message.is_crisis_detected,
        "crisis_info": None,  # Add if you store crisis details
        "flagged": message.flagged,
        "flag_reason": message.flag_reason,
        "model_used": message.model_used,
        "processing_time_ms": message.processing_time_ms
    }


@router.post("/{message_id}/flag")
async def flag_message(
    message_id: str,
    flag_data: FlagRequest,
    db: Session = Depends(get_db),
    admin: AdminUser = Depends(get_current_admin)
):
    """
    Flag a message for review
    
    Final URL: /api/v1/admin/messages/{message_id}/flag
    """
    
    message = db.query(Message).filter(Message.id == message_id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    
    # Update flag
    message.flagged = True
    message.flag_reason = flag_data.reason
    message.flagged_at = datetime.utcnow()
    message.flagged_by = admin.id
    
    db.commit()
    
    return {
        "success": True,
        "message": "Message flagged successfully"
    }


@router.delete("/{message_id}/flag")
async def unflag_message(
    message_id: str,
    db: Session = Depends(get_db),
    admin: AdminUser = Depends(get_current_admin)
):
    """
    Remove flag from a message
    
    Final URL: /api/v1/admin/messages/{message_id}/flag
    """
    
    message = db.query(Message).filter(Message.id == message_id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    
    message.flagged = False
    message.flag_reason = None
    message.flagged_at = None
    message.flagged_by = None
    
    db.commit()
    
    return {
        "success": True,
        "message": "Flag removed successfully"
    }