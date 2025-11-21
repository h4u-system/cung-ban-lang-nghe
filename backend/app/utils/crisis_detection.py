# ============================================
# CRISIS DETECTION SYSTEM
# File: backend/app/utils/crisis_detection.py
# ============================================

import logging
import re
from typing import Dict, List, Tuple, Optional
from sqlalchemy.orm import Session

from app.models import BlockedKeyword

logger = logging.getLogger(__name__)


# ============================================
# CRISIS DETECTION ENGINE
# ============================================

class CrisisDetector:
    """
    Enhanced Multi-tier crisis detection system
    Tier 1: Database keyword matching (dynamic)
    Tier 2: Pattern detection (regex-based)
    Tier 3: Context analysis (future ML enhancement)
    """
    
    def __init__(self, db: Session):
        self.db = db
        self._keywords_cache = None
        self._load_keywords()
    
    def _load_keywords(self):
        """Load crisis keywords from database with improved organization"""
        try:
            keywords = self.db.query(BlockedKeyword).filter(
                BlockedKeyword.is_active == True
            ).all()
            
            # Group by category với structure tốt hơn
            self._keywords_cache = {
                'suicide': [],
                'self_harm': [],
                'violence': [],
                'abuse': []
            }
            
            for kw in keywords:
                category = kw.category
                if category in self._keywords_cache:
                    # Tạo regex pattern linh hoạt từ keyword
                    keyword_normalized = re.escape(kw.keyword.lower())
                    # Cho phép khoảng trắng linh hoạt giữa các từ
                    flexible_pattern = keyword_normalized.replace(r'\ ', r'\s+')
                    
                    self._keywords_cache[category].append({
                        'keyword': kw.keyword.lower(),
                        'severity': kw.severity,
                        'is_exact_match': kw.is_exact_match,
                        'is_case_sensitive': kw.is_case_sensitive,
                        'regex_pattern': flexible_pattern
                    })
            
            total = sum(len(v) for v in self._keywords_cache.values())
            logger.info(f"✅ Loaded {total} crisis keywords from database")
            logger.info(f"   - Suicide: {len(self._keywords_cache['suicide'])}")
            logger.info(f"   - Self-harm: {len(self._keywords_cache['self_harm'])}")
            logger.info(f"   - Violence: {len(self._keywords_cache['violence'])}")
            logger.info(f"   - Abuse: {len(self._keywords_cache['abuse'])}")
        
        except Exception as e:
            logger.error(f"❌ Failed to load crisis keywords: {e}")
            self._keywords_cache = {'suicide': [], 'self_harm': [], 'violence': [], 'abuse': []}
    
    def _normalize_message(self, message: str) -> str:
        """
        Chuẩn hóa tin nhắn để tăng độ chính xác phát hiện
        - Loại bỏ dấu câu
        - Chuẩn hóa khoảng trắng
        - Giữ nguyên tiếng Việt có dấu
        """
        # Loại bỏ dấu câu nhưng giữ nguyên chữ cái tiếng Việt
        normalized = re.sub(
            r'[^\w\sáàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ]',
            ' ',
            message.lower()
        )
        # Chuẩn hóa nhiều khoảng trắng thành 1
        normalized = re.sub(r'\s+', ' ', normalized).strip()
        return normalized
    
    def detect_crisis(self, message: str) -> Dict:
        """
        ENHANCED: Detect if message contains crisis indicators
        
        Args:
            message: User message text
            
        Returns:
            Dict with detection results:
            {
                'is_crisis': bool,
                'severity': str,  # 'critical', 'high', 'medium', 'low'
                'categories': list,  # ['suicide', 'self_harm', etc.]
                'matched_keywords': list,
                'confidence': float,  # 0.0 to 1.0
                'detection_method': str  # 'database' or 'pattern'
            }
        """
        if not message or not self._keywords_cache:
            return self._no_crisis_result()
        
        # Chuẩn hóa tin nhắn
        message_normalized = self._normalize_message(message)
        
        detected_categories = []
        matched_keywords = []
        max_severity = 'low'
        detection_method = 'none'
        
        # Check each category với improved matching
        for category, keywords in self._keywords_cache.items():
            for kw_data in keywords:
                keyword = kw_data['keyword']
                pattern = kw_data['regex_pattern']
                
                try:
                    # Sử dụng regex pattern đã được tối ưu
                    if re.search(pattern, message_normalized, re.I | re.U):
                        matched_keywords.append(keyword)
                        detected_categories.append(category)
                        detection_method = 'database'
                        
                        # Update severity
                        if self._compare_severity(kw_data['severity'], max_severity) > 0:
                            max_severity = kw_data['severity']
                        
                        logger.warning(
                            f"🚨 CRISIS KEYWORD MATCHED: '{keyword}' "
                            f"(Category: {category}, Severity: {kw_data['severity']})"
                        )
                
                except re.error as e:
                    logger.error(f"Regex error for keyword '{keyword}': {e}")
                    continue
        
        # Remove duplicates
        detected_categories = list(set(detected_categories))
        matched_keywords = list(set(matched_keywords))
        
        # Determine if crisis
        is_crisis = len(matched_keywords) > 0
        
        # Calculate confidence
        if is_crisis:
            base_confidence = min(len(matched_keywords) * 0.25, 0.8)
            # Tăng confidence nếu phát hiện critical severity
            severity_boost = 0.2 if max_severity == 'critical' else 0.1 if max_severity == 'high' else 0
            confidence = min(base_confidence + severity_boost, 1.0)
        else:
            confidence = 0.0
        
        if is_crisis:
            logger.critical(
                f"🚨 CRISIS DETECTED 🚨\n"
                f"   Categories: {detected_categories}\n"
                f"   Keywords: {matched_keywords}\n"
                f"   Severity: {max_severity}\n"
                f"   Confidence: {confidence:.2%}\n"
                f"   Message preview: '{message[:50]}...'"
            )
        
        return {
            'is_crisis': is_crisis,
            'severity': max_severity if is_crisis else 'none',
            'categories': detected_categories,
            'matched_keywords': matched_keywords,
            'confidence': confidence,
            'detection_method': detection_method
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
            'confidence': 0.0,
            'detection_method': 'none'
        }
    
    def get_emergency_response(self, categories: List[str], severity: str = 'high') -> Dict:
        """
        ENHANCED: Get emergency response information based on crisis categories
        
        Returns:
            Dict with emergency contact info and tailored instructions
        """
        # Tùy chỉnh message dựa trên category
        if 'abuse' in categories:
            priority_message = (
                "Mình hiểu bạn đang trải qua điều rất khó khăn và đau đớn. "
                "Điều quan trọng nhất bây giờ là **AN TOÀN** của bạn. "
                "Bạn không đơn độc và không phải lỗi của bạn."
            )
        elif 'suicide' in categories:
            priority_message = (
                "Mình biết bạn đang trong giai đoạn rất đau khổ. "
                "Nhưng cuộc sống của bạn rất quan trọng. "
                "Có những người sẵn sàng lắng nghe và giúp đỡ bạn ngay bây giờ."
            )
        else:
            priority_message = (
                "Mình nhận thấy bạn đang gặp tình huống nghiêm trọng. "
                "An toàn của bạn là ưu tiên hàng đầu. "
                "Hãy để chúng mình kết nối bạn với sự hỗ trợ chuyên nghiệp."
            )
        
        return {
            'priority_message': priority_message,
            'hotlines': [
                {
                    'name': 'Tổng đài Bảo vệ trẻ em',
                    'number': '111',
                    'available': '24/7',
                    'free': True,
                    'priority': 1,
                    'description': 'Hỗ trợ khẩn cấp cho trẻ em và thanh thiếu niên'
                },
                {
                    'name': 'Cấp cứu Y tế',
                    'number': '115',
                    'available': '24/7',
                    'free': True,
                    'priority': 1,
                    'description': 'Trường hợp cần can thiệp y tế ngay lập tức'
                },
                {
                    'name': 'Đường dây nóng Ngày Mai',
                    'number': '1900 636 976',
                    'available': '24/7',
                    'free': False,
                    'priority': 2,
                    'description': 'Tư vấn tâm lý từ chuyên gia'
                }
            ],
            'immediate_actions': [
                '🔴 Gọi ngay 111 (miễn phí 24/7) hoặc 115 nếu cần cấp cứu',
                '🟡 Nói chuyện với người lớn đáng tin cậy (cha mẹ, thầy cô, người thân)',
                '🟢 Không ở một mình - tìm đến nơi an toàn',
                '🔵 Loại bỏ các vật dụng nguy hiểm xung quanh (nếu có thể)'
            ],
            'reassurance': 'Bạn đã rất dũng cảm khi chia sẻ. Hãy tin rằng mọi thứ có thể tốt hơn với sự hỗ trợ đúng đắn.'
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


def get_emergency_info(db: Session, categories: List[str] = None, severity: str = 'high') -> Dict:
    """
    Get emergency response information
    
    Args:
        db: Database session
        categories: Crisis categories (optional)
        severity: Crisis severity level
        
    Returns:
        Emergency information dict
    """
    detector = CrisisDetector(db)
    return detector.get_emergency_response(categories or [], severity)


# ============================================
# TESTING & VALIDATION
# ============================================

def test_crisis_detection(db: Session):
    """Test crisis detection with comprehensive sample messages"""
    detector = CrisisDetector(db)
    
    test_cases = [
        # Suicide cases
        ("Tôi muốn tự tử", True, "suicide"),
        ("em không muốn sống nữa", True, "suicide"),
        ("Kết thúc cuộc đời cho xong", True, "suicide"),
        
        # Self-harm cases
        ("em bị cắt tay", True, "self_harm"),
        ("Tự làm đau bản thân", True, "self_harm"),
        
        # Abuse cases (CRITICAL TEST)
        ("em bị quấy rối tình dục", True, "abuse"),
        ("Bị xâm hại tình dục ở trường", True, "abuse"),
        ("thầy giáo sờ mó em", True, "abuse"),
        ("bị cưỡng hiếp", True, "abuse"),
        
        # Violence cases
        ("Bị đánh đập ở nhà", True, "violence"),
        ("bạo lực gia đình mỗi ngày", True, "violence"),
        
        # False positives (should NOT trigger)
        ("Hôm nay thật vui", False, None),
        ("Học quá nhiều, mệt mỏi", False, None),
        ("Tôi chết mệt rồi", False, None),  # "chết" trong ngữ cảnh không nghiêm trọng
    ]
    
    print("\n" + "="*60)
    print("🧪 CRISIS DETECTION SYSTEM TEST")
    print("="*60 + "\n")
    
    passed = 0
    failed = 0
    
    for message, expected_crisis, expected_category in test_cases:
        result = detector.detect_crisis(message)
        
        # Check if detection matches expectation
        detection_correct = result['is_crisis'] == expected_crisis
        category_correct = (
            expected_category in result['categories'] 
            if expected_crisis and expected_category 
            else True
        )
        
        test_passed = detection_correct and category_correct
        
        if test_passed:
            status = "✅ PASS"
            passed += 1
        else:
            status = "❌ FAIL"
            failed += 1
        
        print(f"{status} | Message: '{message}'")
        print(f"         Expected: Crisis={expected_crisis}, Category={expected_category}")
        print(f"         Got: Crisis={result['is_crisis']}, Categories={result['categories']}")
        print(f"         Severity: {result['severity']}, Confidence: {result['confidence']:.2%}")
        print(f"         Matched: {result['matched_keywords']}\n")
    
    print("="*60)
    print(f"📊 TEST SUMMARY: {passed} passed, {failed} failed out of {passed+failed} tests")
    print("="*60 + "\n")
    
    return passed, failed


# ============================================
# EXPORT
# ============================================

__all__ = [
    'CrisisDetector',
    'detect_crisis_in_message',
    'get_emergency_info',
    'test_crisis_detection'
]