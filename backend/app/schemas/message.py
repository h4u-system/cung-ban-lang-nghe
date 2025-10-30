# ============================================
# MESSAGE PYDANTIC SCHEMAS
# File: backend/app/schemas/message.py
# ============================================

from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field
from uuid import UUID


# ============================================
# REQUEST SCHEMAS
# ============================================

class MessageCreate(BaseModel):
    """Schema for creating a new message"""
    content: str = Field(
        ...,
        description="Message content (will be encrypted)",
        min_length=1,
        max_length=5000
    )
    session_token: str = Field(
        ...,
        description="Session token for authentication",
        min_length=10
    )
    
    model_config = {
        "json_schema_extra": {
            "example": {
                "content": "Tôi cảm thấy buồn và lo lắng",
                "session_token": "anon_abc123def456"
            }
        }
    }


# ============================================
# RESPONSE SCHEMAS
# ============================================

class MessageResponse(BaseModel):
    """Schema for message response (decrypted)"""
    id: UUID
    session_id: UUID
    role: str  # 'user' or 'assistant'
    content: str  # Decrypted content
    created_at: datetime
    model_used: Optional[str] = None
    processing_time_ms: Optional[int] = None
    is_crisis_detected: bool = False
    
    model_config = {
        "from_attributes": True,
        "json_schema_extra": {
            "example": {
                "id": "123e4567-e89b-12d3-a456-426614174000",
                "session_id": "123e4567-e89b-12d3-a456-426614174001",
                "role": "user",
                "content": "Tôi cảm thấy buồn",
                "created_at": "2025-10-29T10:00:00Z",
                "model_used": "phobert",
                "processing_time_ms": 250,
                "is_crisis_detected": False
            }
        }
    }


class AIMessageResponse(BaseModel):
    """Schema for AI response message"""
    user_message: MessageResponse
    ai_message: MessageResponse
    crisis_info: Optional[dict] = None  # Emergency info if crisis detected
    
    model_config = {
        "json_schema_extra": {
            "example": {
                "user_message": {
                    "id": "...",
                    "role": "user",
                    "content": "Tôi cảm thấy buồn"
                },
                "ai_message": {
                    "id": "...",
                    "role": "assistant",
                    "content": "Mình hiểu bạn đang cảm thấy buồn..."
                },
                "crisis_info": None
            }
        }
    }


class MessageListResponse(BaseModel):
    """Schema for list of messages"""
    messages: List[MessageResponse]
    total_count: int
    session_id: UUID
    has_crisis_history: bool = False
    
    model_config = {
        "json_schema_extra": {
            "example": {
                "messages": [],
                "total_count": 10,
                "session_id": "123e4567-e89b-12d3-a456-426614174000",
                "has_crisis_history": False
            }
        }
    }


class MessageDeleteResponse(BaseModel):
    """Schema for message deletion response"""
    message: str = "Message deleted successfully"
    deleted_at: datetime
    message_id: UUID


# ============================================
# CRISIS RESPONSE SCHEMAS
# ============================================

class CrisisDetectionResult(BaseModel):
    """Schema for crisis detection result"""
    is_crisis: bool
    severity: str  # 'none', 'low', 'medium', 'high', 'critical'
    categories: List[str]
    matched_keywords: List[str]
    confidence: float


class EmergencyHotline(BaseModel):
    """Schema for emergency hotline info"""
    name: str
    number: str
    available: str
    free: bool


class EmergencyResponse(BaseModel):
    """Schema for emergency response information"""
    hotlines: List[EmergencyHotline]
    message: dict  # {'vi': '...', 'en': '...'}
    immediate_actions: List[str]


# ============================================
# EXPORT ALL SCHEMAS
# ============================================

__all__ = [
    'MessageCreate',
    'MessageResponse',
    'AIMessageResponse',
    'MessageListResponse',
    'MessageDeleteResponse',
    'CrisisDetectionResult',
    'EmergencyHotline',
    'EmergencyResponse'
]