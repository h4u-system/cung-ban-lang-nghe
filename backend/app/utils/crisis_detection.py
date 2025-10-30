# ============================================
# CRISIS DETECTION SYSTEM
# File: backend/app/utils/crisis_detection.py
# ============================================

import logging
from typing import Dict, List, Tuple
from sqlalchemy.orm import Session

from app.models import BlockedKeyword

logger = logging.getLogger(__name__)


# ============================================
# CRISIS DETECTION ENGINE
# ============================================

class CrisisDetector:
    """
    Multi-tier crisis detection system
    Tier 1: Keyword matching
    Tier 2: Pattern detection (future)
    Tier 3: Context analysis (future)
    """
    
    def __init__(self, db: Session):
        self.db = db
        self._keywords_cache = None
        self._load_keywords()
    
    def _load_keywords(self):
        """Load crisis keywords from database"""
        try:
            keywords = self.db.query(BlockedKeyword).filter(
                BlockedKeyword.is_active == True
            ).all()
            
            # Group by category
            self._keywords_cache = {
                'suicide': [],
                'self_harm': [],
                'violence': [],
                'abuse': []
            }
            
            for kw in keywords:
                category = kw.category
                if category in self._keywords_cache:
                    self._keywords_cache[category].append({
                        'keyword': kw.keyword.lower(),
                        'severity': kw.severity,
                        'is_exact_match': kw.is_exact_match,
                        'is_case_sensitive': kw.is_case_sensitive
                    })
            
            logger.info(f"Loaded {len(keywords)} crisis keywords from database")
        
        except Exception as e:
            logger.error(f"Failed to load crisis keywords: {e}")
            self._keywords_cache = {'suicide': [], 'self_harm': [], 'violence': [], 'abuse': []}
    
    def detect_crisis(self, message: str) -> Dict:
        """
        Detect if message contains crisis indicators
        
        Args:
            message: User message text
            
        Returns:
            Dict with detection results:
            {
                'is_crisis': bool,
                'severity': str,  # 'critical', 'high', 'medium', 'low'
                'categories': list,  # ['suicide', 'self_harm', etc.]
                'matched_keywords': list,
                'confidence': float  # 0.0 to 1.0
            }
        """
        if not message or not self._keywords_cache:
            return self._no_crisis_result()
        
        message_lower = message.lower()
        
        detected_categories = []
        matched_keywords = []
        max_severity = 'low'
        
        # Check each category
        for category, keywords in self._keywords_cache.items():
            for kw_data in keywords:
                keyword = kw_data['keyword']
                
                # Check for match
                if kw_data['is_exact_match']:
                    # Exact word boundary match
                    if f" {keyword} " in f" {message_lower} ":
                        matched_keywords.append(keyword)
                        detected_categories.append(category)
                        
                        # Update severity
                        if self._compare_severity(kw_data['severity'], max_severity) > 0:
                            max_severity = kw_data['severity']
                else:
                    # Substring match
                    if keyword in message_lower:
                        matched_keywords.append(keyword)
                        detected_categories.append(category)
                        
                        if self._compare_severity(kw_data['severity'], max_severity) > 0:
                            max_severity = kw_data['severity']
        
        # Remove duplicates
        detected_categories = list(set(detected_categories))
        matched_keywords = list(set(matched_keywords))
        
        # Determine if crisis
        is_crisis = len(matched_keywords) > 0
        
        # Calculate confidence (simple version)
        confidence = min(len(matched_keywords) * 0.3, 1.0) if is_crisis else 0.0
        
        if is_crisis:
            logger.warning(
                f"🚨 CRISIS DETECTED: "
                f"Categories={detected_categories}, "
                f"Keywords={matched_keywords}, "
                f"Severity={max_severity}"
            )
        
        return {
            'is_crisis': is_crisis,
            'severity': max_severity if is_crisis else 'none',
            'categories': detected_categories,
            'matched_keywords': matched_keywords,
            'confidence': confidence
        }
    
    def _compare_severity(self, sev1: str, sev2: str) -> int:
        """
        Compare severity levels
        Returns: 1 if sev1 > sev2, -1 if sev1 < sev2, 0 if equal
        """
        severity_order = ['low', 'medium', 'high', 'critical']
        try:
            idx1 = severity_order.index(sev1)
            idx2 = severity_order.index(sev2)
            if idx1 > idx2:
                return 1
            elif idx1 < idx2:
                return -1
            return 0
        except ValueError:
            return 0
    
    def _no_crisis_result(self) -> Dict:
        """Return default no-crisis result"""
        return {
            'is_crisis': False,
            'severity': 'none',
            'categories': [],
            'matched_keywords': [],
            'confidence': 0.0
        }
    
    def get_emergency_response(self, categories: List[str]) -> Dict:
        """
        Get emergency response information based on crisis categories
        
        Returns:
            Dict with emergency contact info and instructions
        """
        return {
            'hotlines': [
                {
                    'name': 'Tổng đài Bảo vệ trẻ em',
                    'number': '111',
                    'available': '24/7',
                    'free': True
                },
                {
                    'name': 'Cấp cứu Y tế',
                    'number': '115',
                    'available': '24/7',
                    'free': True
                },
                {
                    'name': 'Đường dây nóng Ngày Mai',
                    'number': '1900 636 976',
                    'available': '24/7',
                    'free': False
                }
            ],
            'message': {
                'vi': 'Chúng mình nhận thấy bạn đang trải qua giai đoạn rất khó khăn. '
                      'An toàn của bạn là ưu tiên số 1. Hãy liên hệ ngay với các đường dây nóng bên dưới.',
                'en': 'We notice you\'re going through a very difficult time. '
                      'Your safety is our top priority. Please contact the hotlines below immediately.'
            },
            'immediate_actions': [
                'Gọi ngay 111 (miễn phí 24/7)',
                'Nói chuyện với người lớn đáng tin cậy',
                'Không ở một mình',
                'Loại bỏ các vật dụng nguy hiểm xung quanh'
            ]
        }


# ============================================
# CONVENIENCE FUNCTIONS
# ============================================

def detect_crisis_in_message(db: Session, message: str) -> Dict:
    """
    Convenience function to detect crisis in a message
    
    Args:
        db: Database session
        message: Message text to analyze
        
    Returns:
        Crisis detection result dict
    """
    detector = CrisisDetector(db)
    return detector.detect_crisis(message)


def get_emergency_info(db: Session, categories: List[str] = None) -> Dict:
    """
    Get emergency response information
    
    Args:
        db: Database session
        categories: Crisis categories (optional)
        
    Returns:
        Emergency information dict
    """
    detector = CrisisDetector(db)
    return detector.get_emergency_response(categories or [])


# ============================================
# TESTING
# ============================================

def test_crisis_detection(db: Session):
    """Test crisis detection with sample messages"""
    detector = CrisisDetector(db)
    
    test_cases = [
        ("Tôi muốn tự tử", True),
        ("Hôm nay thật vui", False),
        ("Tôi bị trầm cảm và muốn cắt tay", True),
        ("Học quá nhiều, mệt mỏi", False),
        ("Bị bạo lực gia đình", True)
    ]
    
    for message, expected_crisis in test_cases:
        result = detector.detect_crisis(message)
        status = "✅" if result['is_crisis'] == expected_crisis else "❌"
        print(f"{status} Message: '{message}'")
        print(f"   Crisis: {result['is_crisis']}, Severity: {result['severity']}")
        print(f"   Keywords: {result['matched_keywords']}\n")


# ============================================
# EXPORT
# ============================================

__all__ = [
    'CrisisDetector',
    'detect_crisis_in_message',
    'get_emergency_info'
]