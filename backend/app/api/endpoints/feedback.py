# ============================================
# FEEDBACK API ENDPOINTS
# File: backend/app/api/endpoints/feedback.py
# ============================================

import logging
from datetime import datetime
from typing import Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app.models import Feedback as FeedbackModel, Session as SessionModel
from app.api.endpoints.sessions import get_session_by_token
from backend.app.utils.encryption_bk import encrypt_message

logger = logging.getLogger(__name__)

router = APIRouter()


# ============================================
# PYDANTIC SCHEMAS
# ============================================

from pydantic import BaseModel, Field


class FeedbackCreate(BaseModel):
    """Schema for creating feedback"""
    session_token: str = Field(..., description="Session token")
    rating: int = Field(..., ge=1, le=5, description="Rating (1-5 stars)")
    feedback_text: Optional[str] = Field(
        None,
        description="Optional feedback text",
        max_length=1000
    )
    category: Optional[str] = Field(
        None,
        description="Feedback category",
        pattern="^(helpful|not_helpful|inappropriate|other)$"
    )
    
    model_config = {
        "json_schema_extra": {
            "example": {
                "session_token": "anon_xyz...",
                "rating": 5,
                "feedback_text": "Rất hữu ích!",
                "category": "helpful"
            }
        }
    }


class FeedbackResponse(BaseModel):
    """Schema for feedback response"""
    id: UUID
    session_id: UUID
    rating: int
    category: Optional[str]
    created_at: datetime
    
    model_config = {
        "from_attributes": True
    }


class FeedbackCreateResponse(BaseModel):
    """Schema for feedback creation response"""
    feedback: FeedbackResponse
    message: str = "Cảm ơn bạn đã đánh giá!"


class FeedbackStatsResponse(BaseModel):
    """Schema for feedback statistics"""
    total_feedback: int
    average_rating: float
    rating_distribution: dict
    category_distribution: dict
    helpful_percentage: float
    
    model_config = {
        "json_schema_extra": {
            "example": {
                "total_feedback": 150,
                "average_rating": 4.3,
                "rating_distribution": {
                    "5": 80,
                    "4": 40,
                    "3": 20,
                    "2": 5,
                    "1": 5
                },
                "category_distribution": {
                    "helpful": 120,
                    "not_helpful": 20,
                    "other": 10
                },
                "helpful_percentage": 80.0
            }
        }
    }


# ============================================
# FEEDBACK ENDPOINTS
# ============================================

@router.post(
    "/",
    response_model=FeedbackCreateResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit Feedback",
    description="Submit feedback for a session (one feedback per session)"
)
async def submit_feedback(
    feedback_data: FeedbackCreate,
    db: Session = Depends(get_db)
):
    """
    Submit feedback for a session
    
    - **session_token**: Session token
    - **rating**: Rating from 1 to 5 stars
    - **feedback_text**: Optional text feedback (encrypted)
    - **category**: Optional category (helpful, not_helpful, inappropriate, other)
    
    Note: Each session can only submit feedback once
    """
    # Validate session
    session = get_session_by_token(db, feedback_data.session_token)
    
    # Check if feedback already exists for this session
    existing_feedback = db.query(FeedbackModel).filter(
        FeedbackModel.session_id == session.id
    ).first()
    
    if existing_feedback:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={
                "error": "Feedback Already Exists",
                "message": "Bạn đã gửi đánh giá cho session này rồi",
                "existing_feedback_id": str(existing_feedback.id)
            }
        )
    
    # Encrypt feedback text if provided
    encrypted_text = None
    encryption_iv = None
    
    if feedback_data.feedback_text:
        encrypted_text, encryption_iv = encrypt_message(feedback_data.feedback_text)
    
    # Create feedback
    feedback = FeedbackModel(
        session_id=session.id,
        rating=feedback_data.rating,
        feedback_text_encrypted=encrypted_text,
        encryption_iv=encryption_iv,
        category=feedback_data.category
    )
    
    db.add(feedback)
    db.commit()
    db.refresh(feedback)
    
    logger.info(
        f"Feedback submitted: session={session.id}, rating={feedback_data.rating}, "
        f"category={feedback_data.category}"
    )
    
    return FeedbackCreateResponse(
        feedback=FeedbackResponse.model_validate(feedback),
        message="Cảm ơn bạn đã đánh giá! Phản hồi của bạn giúp chúng mình cải thiện dịch vụ."
    )


@router.get(
    "/stats",
    response_model=FeedbackStatsResponse,
    summary="Get Feedback Statistics",
    description="Get aggregated feedback statistics (admin only in future)"
)
async def get_feedback_stats(
    db: Session = Depends(get_db)
):
    """
    Get feedback statistics
    
    Returns:
    - Total feedback count
    - Average rating
    - Rating distribution (1-5 stars)
    - Category distribution
    - Helpful percentage
    
    Note: This endpoint should be protected in production
    """
    # Get total count
    total_feedback = db.query(FeedbackModel).count()
    
    if total_feedback == 0:
        return FeedbackStatsResponse(
            total_feedback=0,
            average_rating=0.0,
            rating_distribution={},
            category_distribution={},
            helpful_percentage=0.0
        )
    
    # Calculate average rating
    avg_rating = db.query(func.avg(FeedbackModel.rating)).scalar() or 0.0
    
    # Get rating distribution
    rating_counts = db.query(
        FeedbackModel.rating,
        func.count(FeedbackModel.rating)
    ).group_by(FeedbackModel.rating).all()
    
    rating_distribution = {str(rating): count for rating, count in rating_counts}
    
    # Get category distribution
    category_counts = db.query(
        FeedbackModel.category,
        func.count(FeedbackModel.category)
    ).filter(
        FeedbackModel.category.isnot(None)
    ).group_by(FeedbackModel.category).all()
    
    category_distribution = {
        category: count for category, count in category_counts if category
    }
    
    # Calculate helpful percentage
    helpful_count = category_distribution.get('helpful', 0)
    helpful_percentage = (helpful_count / total_feedback * 100) if total_feedback > 0 else 0.0
    
    return FeedbackStatsResponse(
        total_feedback=total_feedback,
        average_rating=round(avg_rating, 2),
        rating_distribution=rating_distribution,
        category_distribution=category_distribution,
        helpful_percentage=round(helpful_percentage, 1)
    )


@router.get(
    "/{feedback_id}",
    response_model=FeedbackResponse,
    summary="Get Feedback by ID",
    description="Retrieve a specific feedback by ID"
)
async def get_feedback(
    feedback_id: UUID,
    session_token: str,
    db: Session = Depends(get_db)
):
    """
    Get a specific feedback by ID
    
    - **feedback_id**: Feedback UUID
    - **session_token**: Session token for authentication
    
    Returns feedback details (text will not be decrypted for privacy)
    """
    # Validate session
    session = get_session_by_token(db, session_token)
    
    # Get feedback
    feedback = db.query(FeedbackModel).filter(
        FeedbackModel.id == feedback_id,
        FeedbackModel.session_id == session.id
    ).first()
    
    if not feedback:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={
                "error": "Feedback Not Found",
                "message": f"Không tìm thấy feedback với ID: {feedback_id}",
                "feedback_id": str(feedback_id)
            }
        )
    
    return FeedbackResponse.model_validate(feedback)


@router.delete(
    "/{feedback_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete Feedback",
    description="Delete a feedback (admin only in future)"
)
async def delete_feedback(
    feedback_id: UUID,
    session_token: str,
    db: Session = Depends(get_db)
):
    """
    Delete a feedback
    
    - **feedback_id**: Feedback UUID to delete
    - **session_token**: Session token for authentication
    
    Note: In production, this should be admin-only
    """
    # Validate session
    session = get_session_by_token(db, session_token)
    
    # Get feedback
    feedback = db.query(FeedbackModel).filter(
        FeedbackModel.id == feedback_id,
        FeedbackModel.session_id == session.id
    ).first()
    
    if not feedback:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={
                "error": "Feedback Not Found",
                "message": f"Không tìm thấy feedback với ID: {feedback_id}",
                "feedback_id": str(feedback_id)
            }
        )
    
    # Delete feedback
    db.delete(feedback)
    db.commit()
    
    logger.info(f"Feedback deleted: {feedback_id}")
    
    return None  # 204 No Content


# ============================================
# EXPORT
# ============================================

__all__ = ['router']