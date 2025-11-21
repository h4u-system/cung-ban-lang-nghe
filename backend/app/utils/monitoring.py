# ****************************************************
# File: backend/app/utils/monitoring.py
# ***************************************************

import logging
from datetime import datetime

# Tạo logger instance
logger = logging.getLogger(__name__)

class ComplianceLogger:
    """Log tuân thủ pháp lý - KHÔNG lưu nội dung tin nhắn"""
    
    @staticmethod
    def log_crisis_detection(session_id: str, crisis_type: str):
        """
        Ghi log phát hiện khủng hoảng (chỉ metadata)
        
        Args:
            session_id: ID phiên chat (sẽ được ẩn một phần)
            crisis_type: Loại khủng hoảng (tu_tu, xam_hai_tinh_duc, etc.)
        
        Returns:
            dict: Log data đã được ghi
        """
        log_data = {
            "event": "CRISIS_DETECTED",
            "session_id": session_id[:8] + "***",  # Partial ID only
            "crisis_type": crisis_type,
            "timestamp": datetime.utcnow().isoformat(),
            "action": "Emergency contact displayed"
        }
        logger.critical(f"🚨 CRISIS DETECTED: {log_data}")
        return log_data
    
    @staticmethod
    def log_violation(session_id: str, violation_type: str):
        """
        Ghi log vi phạm nội dung
        
        Args:
            session_id: ID phiên chat
            violation_type: Loại vi phạm (Ngôn từ thô tục, Khiêu dâm, etc.)
        
        Returns:
            dict: Log data đã được ghi
        """
        log_data = {
            "event": "CONTENT_VIOLATION",
            "session_id": session_id[:8] + "***",
            "violation_type": violation_type,
            "timestamp": datetime.utcnow().isoformat(),
            "action": "Chat blocked"
        }
        logger.warning(f"🚫 CONTENT VIOLATION: {log_data}")
        return log_data
    
    @staticmethod
    def log_message_sent(session_id: str, message_count: int):
        """
        Ghi log tin nhắn được gửi (không có nội dung)
        
        Args:
            session_id: ID phiên chat
            message_count: Số lượng tin nhắn trong phiên
        
        Returns:
            dict: Log data đã được ghi
        """
        log_data = {
            "event": "MESSAGE_SENT",
            "session_id": session_id[:8] + "***",
            "message_count": message_count,
            "timestamp": datetime.utcnow().isoformat()
        }
        logger.info(f"✉️ MESSAGE SENT: {log_data}")
        return log_data
    
    @staticmethod
    def log_session_created(session_id: str):
        """
        Ghi log tạo session mới
        
        Args:
            session_id: ID phiên chat mới
        
        Returns:
            dict: Log data đã được ghi
        """
        log_data = {
            "event": "SESSION_CREATED",
            "session_id": session_id[:8] + "***",
            "timestamp": datetime.utcnow().isoformat()
        }
        logger.info(f"🆕 SESSION CREATED: {log_data}")
        return log_data
    
    @staticmethod
    def log_disclaimer_accepted(user_agent: str = None):
        """
        Ghi log khi user accept disclaimer
        (Optional - có thể dùng nếu muốn track ở server)
        
        Args:
            user_agent: Browser user agent (optional)
        
        Returns:
            dict: Log data đã được ghi
        """
        log_data = {
            "event": "DISCLAIMER_ACCEPTED",
            "user_agent": user_agent[:50] if user_agent else "unknown",
            "timestamp": datetime.utcnow().isoformat()
        }
        logger.info(f"✅ DISCLAIMER ACCEPTED: {log_data}")
        return log_data
    
    @staticmethod
    def log_privacy_dashboard_accessed(session_id: str = None):
        """
        Ghi log khi user truy cập Privacy Dashboard
        
        Args:
            session_id: ID phiên chat (optional)
        
        Returns:
            dict: Log data đã được ghi
        """
        log_data = {
            "event": "PRIVACY_DASHBOARD_ACCESSED",
            "session_id": session_id[:8] + "***" if session_id else "anonymous",
            "timestamp": datetime.utcnow().isoformat()
        }
        logger.info(f"🔐 PRIVACY DASHBOARD ACCESSED: {log_data}")
        return log_data


# ============================================
# HELPER FUNCTIONS (OPTIONAL)
# ============================================

def log_api_request(endpoint: str, method: str, status_code: int, duration_ms: float):
    """
    Ghi log API request (general purpose)
    
    Args:
        endpoint: API endpoint được gọi
        method: HTTP method (GET, POST, etc.)
        status_code: HTTP status code
        duration_ms: Thời gian xử lý (milliseconds)
    """
    log_data = {
        "event": "API_REQUEST",
        "endpoint": endpoint,
        "method": method,
        "status_code": status_code,
        "duration_ms": duration_ms,
        "timestamp": datetime.utcnow().isoformat()
    }
    
    if status_code >= 500:
        logger.error(f"❌ API ERROR: {log_data}")
    elif status_code >= 400:
        logger.warning(f"⚠️ API WARNING: {log_data}")
    else:
        logger.info(f"✅ API SUCCESS: {log_data}")


def log_ai_processing(session_id: str, model: str, tokens_used: int, processing_time_ms: float):
    """
    Ghi log AI processing (không có nội dung tin nhắn)
    
    Args:
        session_id: ID phiên chat
        model: Model AI được sử dụng
        tokens_used: Số tokens đã dùng
        processing_time_ms: Thời gian xử lý
    """
    log_data = {
        "event": "AI_PROCESSING",
        "session_id": session_id[:8] + "***",
        "model": model,
        "tokens_used": tokens_used,
        "processing_time_ms": processing_time_ms,
        "timestamp": datetime.utcnow().isoformat()
    }
    logger.info(f"🤖 AI PROCESSING: {log_data}")


# ============================================
# EXPORT
# ============================================

__all__ = [
    'ComplianceLogger',
    'log_api_request',
    'log_ai_processing'
]