# ****************************************************
# File: backend/app/utils/monitoring.py
# ***************************************************

import logging
from datetime import datetime

class ComplianceLogger:
    """Log tuân thủ pháp lý - KHÔNG lưu nội dung tin nhắn"""
    
    @staticmethod
    def log_crisis_detection(session_id: str, crisis_type: str):
        """Ghi log phát hiện khủng hoảng (chỉ metadata)"""
        logger.critical({
            "event": "CRISIS_DETECTED",
            "session_id": session_id[:8] + "***",  # Partial ID only
            "crisis_type": crisis_type,
            "timestamp": datetime.utcnow().isoformat(),
            "action": "Emergency contact displayed"
        })
    
    @staticmethod
    def log_violation(session_id: str, violation_type: str):
        """Ghi log vi phạm nội dung"""
        logger.warning({
            "event": "CONTENT_VIOLATION",
            "session_id": session_id[:8] + "***",
            "violation_type": violation_type,
            "timestamp": datetime.utcnow().isoformat(),
            "action": "Chat blocked"
        })