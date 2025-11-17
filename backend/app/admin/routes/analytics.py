# ============================================
# File: backend/app/admin/routes/analytics.py
# ============================================

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from datetime import datetime, timedelta
from typing import Optional

from app.database import get_db
from app.admin.auth import get_current_admin
from app.models import Session as ChatSession, Message

#router = APIRouter(prefix="/admin/analytics", tags=["Analytics"])
router = APIRouter(tags=["Analytics"])

@router.get("/dashboard")
async def get_dashboard_stats(
    days: int = Query(7, ge=1, le=90),
    admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Get dashboard statistics"""
    cutoff_date = datetime.utcnow() - timedelta(days=days)
    
    # Total sessions
    total_sessions = db.query(func.count(ChatSession.id)).scalar()
    
    # Active sessions (last 7 days)
    active_sessions = db.query(func.count(ChatSession.id)).filter(
        ChatSession.created_at >= cutoff_date
    ).scalar()
    
    # Total messages
    total_messages = db.query(func.count(Message.id)).scalar()
    
    # Messages in period
    period_messages = db.query(func.count(Message.id)).filter(
        Message.created_at >= cutoff_date
    ).scalar()
    
    # Crisis sessions
    crisis_sessions = db.query(func.count(ChatSession.id)).filter(
        ChatSession.is_crisis_mode == True
    ).scalar()
    
    # Daily breakdown
    daily_stats = db.query(
        func.date(ChatSession.created_at).label('date'),
        func.count(ChatSession.id).label('sessions')
    ).filter(
        ChatSession.created_at >= cutoff_date
    ).group_by(func.date(ChatSession.created_at)).order_by(desc('date')).all()
    
    return {
        "period": f"{days} days",
        "total_sessions": total_sessions,
        "active_sessions": active_sessions,
        "total_messages": total_messages,
        "period_messages": period_messages,
        "crisis_sessions": crisis_sessions,
        "crisis_rate": round(crisis_sessions / total_sessions * 100, 2) if total_sessions > 0 else 0,
        "avg_messages_per_session": round(total_messages / total_sessions, 2) if total_sessions > 0 else 0,
        "daily_breakdown": [
            {"date": str(stat.date), "sessions": stat.sessions}
            for stat in daily_stats
        ]
    }


@router.get("/crisis-events")
async def get_crisis_events(
    limit: int = Query(50, le=100),
    admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Get recent crisis events"""
    crisis_sessions = db.query(ChatSession).filter(
        ChatSession.is_crisis_mode == True
    ).order_by(desc(ChatSession.created_at)).limit(limit).all()
    
    return [
        {
            "session_id": str(session.id),
            "created_at": session.created_at.isoformat(),
            "last_activity": session.last_activity.isoformat(),
            "is_active": session.is_active
        }
        for session in crisis_sessions
    ]