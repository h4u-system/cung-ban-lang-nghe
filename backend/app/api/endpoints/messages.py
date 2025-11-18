# ============================================
# MESSAGE API ENDPOINTS
# File: backend/app/api/endpoints/messages.py
# ============================================

import time
import logging
from datetime import datetime
from typing import List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Session as SessionModel, Message as MessageModel
from app.schemas.message import (
    MessageCreate,
    MessageResponse,
    AIMessageResponse,
    MessageListResponse,
    MessageDeleteResponse
)
from backend.app.utils.encryption_bk import encrypt_message, decrypt_message
from app.utils.crisis_detection import detect_crisis_in_message, get_emergency_info
from app.api.endpoints.sessions import get_session_by_token

from app.utils.ai_engine import GroqAI

logger = logging.getLogger(__name__)

router = APIRouter()


# ============================================
# HELPER FUNCTIONS
# ============================================

def decrypt_message_content(message: MessageModel) -> str:
    """Decrypt message content"""
    try:
        return decrypt_message(
            message.content_encrypted,
            message.encryption_iv
        )
    except Exception as e:
        logger.error(f"Decryption failed for message {message.id}: {e}")
        return "[Decryption failed]"


def create_message_response(message: MessageModel) -> MessageResponse:
    """Create MessageResponse with decrypted content"""
    decrypted_content = decrypt_message_content(message)
    
    return MessageResponse(
        id=message.id,
        session_id=message.session_id,
        role=message.role,
        content=decrypted_content,
        created_at=message.created_at,
        model_used=message.model_used,
        processing_time_ms=message.processing_time_ms,
        is_crisis_detected=message.is_crisis_detected
    )


#def generate_ai_response(user_message: str, is_crisis: bool = False) -> str:
#    """
#    Generate AI response (placeholder)
#    TODO: Integrate with PhoBERT/GPT-3.5-turbo
#    
#    Args:
#        user_message: User's message
#        is_crisis: Whether crisis was detected
#        
#    Returns:
#        AI response text
#    """
#   if is_crisis:
#        return (
#            "Mình thấy bạn đang trải qua giai đoạn rất khó khăn. "
#            "Mình ở đây để lắng nghe bạn. "
#            "Tuy nhiên, nếu bạn đang nghĩ đến việc tự làm hại bản thân, "
#            "hãy liên hệ ngay với đường dây nóng 111 (miễn phí 24/7). "
#            "An toàn của bạn là ưu tiên số một."
#        )
#    
#    # Simple echo response for now
#    return (
#        f"Cảm ơn bạn đã chia sẻ. Mình hiểu bạn đang cảm thấy như vậy. "
#        f"Bạn có thể kể thêm về điều gì đang khiến bạn cảm thấy vậy không?"
#    )

# REPLACE generate_ai_response() function with:

async def generate_ai_response_advanced(
    user_message: str,
    conversation_history: list = None,
    is_crisis: bool = False
) -> str:
    """
    Generate AI response using Groq API
    
    Args:
        user_message: User's message
        conversation_history: Previous messages for context
        is_crisis: Whether crisis was detected
    
    Returns:
        AI response text
    """
    ai = GroqAI()
    
    try:
        result = await ai.generate_response(
            user_message=user_message,
            conversation_history=conversation_history,
            is_crisis=is_crisis
        )
        
        if result["success"]:
            logger.info(f"AI response generated: {result['tokens_used']} tokens")
            return result["response"]
        else:
            logger.warning(f"AI fallback used: {result.get('error')}")
            return result["response"]
    
    finally:
        await ai.close()

# ============================================
# MESSAGE ENDPOINTS
# ============================================

@router.post(
    "/",
    response_model=AIMessageResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Send Message",
    description="Send a message and receive AI response"
)
async def send_message(
    message_data: MessageCreate,
    db: Session = Depends(get_db)
):
    """
    Send a message and receive AI response
    
    - **content**: Message content (will be encrypted)
    - **session_token**: Session token for authentication
    
    Process:
    1. Validate session
    2. Encrypt and store user message
    3. Detect crisis keywords
    4. Generate AI response
    5. Encrypt and store AI response
    6. Return both messages with crisis info if needed
    """
    start_time = time.time()
    
    # 1. Validate session
    session = get_session_by_token(db, message_data.session_token)
    
    # Update session activity
    session.touch()
    
    # 2. Detect crisis in user message
    crisis_result = detect_crisis_in_message(db, message_data.content)
    is_crisis = crisis_result['is_crisis']
    
    # Update session crisis mode if crisis detected
    if is_crisis and not session.is_crisis_mode:
        session.is_crisis_mode = True
        logger.warning(
            f"🚨 CRISIS MODE ACTIVATED for session {session.id}: "
            f"Categories={crisis_result['categories']}"
        )
    
    # 3. Encrypt and store user message
    encrypted_content, iv = encrypt_message(message_data.content)
    
    user_message = MessageModel(
        session_id=session.id,
        content_encrypted=encrypted_content,
        encryption_iv=iv,
        role="user",
        is_crisis_detected=is_crisis
    )
    
    db.add(user_message)
    db.flush()  # Get ID without committing
    
    # 4. Generate AI response
    # ai_response_text = generate_ai_response(message_data.content, is_crisis)
    
    # Get conversation history for context
    conversation_history = []
    previous_messages = db.query(MessageModel).filter(
        MessageModel.session_id == session.id
    ).order_by(MessageModel.created_at.desc()).limit(5).all()

    for msg in reversed(previous_messages):
        decrypted = decrypt_message_content(msg)
        conversation_history.append({
            "role": msg.role,
            "content": decrypted
        })

    # Generate AI response with full context
    ai_response_text = await generate_ai_response_advanced(
        user_message=message_data.content,
        conversation_history=conversation_history,
        is_crisis=is_crisis
    )

    # 5. Encrypt and store AI message
    ai_encrypted_content, ai_iv = encrypt_message(ai_response_text)
    
    processing_time_ms = int((time.time() - start_time) * 1000)
    
    ai_message = MessageModel(
        session_id=session.id,
        content_encrypted=ai_encrypted_content,
        encryption_iv=ai_iv,
        role="assistant",
        model_used="simple-response",  # TODO: Replace with actual model name
        processing_time_ms=processing_time_ms,
        is_crisis_detected=is_crisis
    )
    
    db.add(ai_message)
    db.commit()
    
    # Refresh to get timestamps
    db.refresh(user_message)
    db.refresh(ai_message)
    
    # 6. Prepare response
    response_data = {
        "user_message": create_message_response(user_message),
        "ai_message": create_message_response(ai_message),
        "crisis_info": None
    }
    
    # Add emergency info if crisis detected
    if is_crisis:
        response_data["crisis_info"] = get_emergency_info(
            db,
            crisis_result['categories']
        )
    
    return AIMessageResponse(**response_data)


@router.get(
    "/",
    response_model=MessageListResponse,
    summary="Get Message History",
    description="Retrieve all messages for a session"
)
async def get_messages(
    session_token: str,
    limit: int = 100,
    offset: int = 0,
    db: Session = Depends(get_db)
):
    """
    Get message history for a session
    
    - **session_token**: Session token
    - **limit**: Maximum number of messages (default: 100)
    - **offset**: Number of messages to skip (default: 0)
    
    Returns messages in chronological order (oldest first)
    """
    # Validate session
    session = get_session_by_token(db, session_token)
    
    # Get messages
    messages_query = db.query(MessageModel).filter(
        MessageModel.session_id == session.id
    ).order_by(MessageModel.created_at.asc())
    
    # Count total
    total_count = messages_query.count()
    
    # Apply pagination
    messages = messages_query.offset(offset).limit(limit).all()
    
    # Check if any crisis was detected
    has_crisis_history = any(msg.is_crisis_detected for msg in messages)
    
    # Decrypt and build response
    decrypted_messages = [
        create_message_response(msg) for msg in messages
    ]
    
    return MessageListResponse(
        messages=decrypted_messages,
        total_count=total_count,
        session_id=session.id,
        has_crisis_history=has_crisis_history
    )


@router.get(
    "/{message_id}",
    response_model=MessageResponse,
    summary="Get Single Message",
    description="Retrieve a specific message by ID"
)
async def get_message(
    message_id: UUID,
    session_token: str,
    db: Session = Depends(get_db)
):
    """
    Get a specific message by ID
    
    - **message_id**: Message UUID
    - **session_token**: Session token for authentication
    """
    # Validate session
    session = get_session_by_token(db, session_token)
    
    # Get message
    message = db.query(MessageModel).filter(
        MessageModel.id == message_id,
        MessageModel.session_id == session.id
    ).first()
    
    if not message:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={
                "error": "Message Not Found",
                "message": f"No message found with ID: {message_id}",
                "message_id": str(message_id)
            }
        )
    
    return create_message_response(message)


@router.delete(
    "/{message_id}",
    response_model=MessageDeleteResponse,
    summary="Delete Message",
    description="Delete a specific message"
)
async def delete_message(
    message_id: UUID,
    session_token: str,
    db: Session = Depends(get_db)
):
    """
    Delete a specific message
    
    - **message_id**: Message UUID to delete
    - **session_token**: Session token for authentication
    """
    # Validate session
    session = get_session_by_token(db, session_token)
    
    # Get message
    message = db.query(MessageModel).filter(
        MessageModel.id == message_id,
        MessageModel.session_id == session.id
    ).first()
    
    if not message:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={
                "error": "Message Not Found",
                "message": f"No message found with ID: {message_id}",
                "message_id": str(message_id)
            }
        )
    
    # Delete message
    db.delete(message)
    db.commit()
    
    return MessageDeleteResponse(
        message="Message deleted successfully",
        deleted_at=datetime.utcnow(),
        message_id=message_id
    )


@router.delete(
    "/",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete All Messages",
    description="Delete all messages for a session"
)
async def delete_all_messages(
    session_token: str,
    db: Session = Depends(get_db)
):
    """
    Delete all messages for a session
    
    - **session_token**: Session token for authentication
    """
    # Validate session
    session = get_session_by_token(db, session_token)
    
    # Delete all messages
    deleted_count = db.query(MessageModel).filter(
        MessageModel.session_id == session.id
    ).delete()
    
    db.commit()
    
    logger.info(f"Deleted {deleted_count} messages for session {session.id}")
    
    return None  # 204 No Content


# ============================================
# EXPORT
# ============================================

__all__ = ['router']