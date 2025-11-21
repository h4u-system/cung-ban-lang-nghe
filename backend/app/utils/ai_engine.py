# ============================================
# FREE AI INTEGRATION - GROQ API
# File: backend/app/utils/ai_engine.py
# ============================================

import os
import httpx
import logging
import re 
from typing import Dict, Optional, List

# --- Import từ knowledge_base ---
try:
    from .knowledge_base import KNOWLEDGE_BASE
except ImportError:
    KNOWLEDGE_BASE = {
        "NEN_TANG_TU_VAN": "",
        "VAN_DE_TAM_LY_PHO_BIEN": "",
        "KNS_LUA_TUOI": "",
        "KNS_PHAN_LOAI": "",
    }

logger = logging.getLogger(__name__)

# ============================================
# 1. DỮ LIỆU CỐ ĐỊNH & KIỂM SOÁT NỘI DUNG
# ============================================

# Groq API Configuration
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_API_BASE = "https://api.groq.com/openai/v1"
GROQ_MODEL = "llama-3.3-70b-versatile"

# Dữ liệu cố định (Thông tin hành chính)
ESSENTIAL_CONTEXT = """
DỮ LIỆU CỐ ĐỊNH VỀ DỊCH VỤ BANANA:
- Tên dịch vụ/trợ lý: Banana
- Mục tiêu: Hỗ trợ tâm lý học đường ẩn danh cho học sinh, sinh viên Việt Nam.
- Sứ mệnh: Mang đến không gian tư vấn tâm lý miễn phí, ẩn danh, và dễ tiếp cận cho học sinh, sinh viên Việt Nam thông qua ứng dụng đột phá của công nghệ Trí tuệ nhân tạo (AI).
"""

# ============================================
# LỚP 1: HỆ THỐNG PHÁT HIỆN VI PHẠM (Dùng Regex)
# ============================================
TU_KHOA_VI_PHAM = [
    # Nhóm Ngôn từ thô tục
    { "nhom": "Ngôn từ thô tục", "tu_khoa": "dm", "regex": r"(?:\s|^)dm(?:\s|$|\.|\!|\?)" },
    { "nhom": "Ngôn từ thô tục", "tu_khoa": "đm", "regex": r"(?:\s|^)đm(?:\s|$|\.|\!|\?)" },
    { "nhom": "Ngôn từ thô tục", "tu_khoa": "vl", "regex": r"(?:\s|^)vl(?:\s|$|\.|\!|\?)" },
    { "nhom": "Ngôn từ thô tục", "tu_khoa": "cc", "regex": r"(?:\s|^)cc(?:\s|$|\.|\!|\?)" },
    { "nhom": "Ngôn từ thô tục", "tu_khoa": "vkl", "regex": r"(?:\s|^)vkl(?:\s|$|\.|\!|\?)" },
    { "nhom": "Ngôn từ thô tục", "tu_khoa": "m*", "regex": r"(?:\s|^)m\*(?:\s|$|\.|\!|\?)" },
    { "nhom": "Ngôn từ thô tục", "tu_khoa": "địt", "regex": r"(?:\s|^)địt(?:\s|$|\.|\!|\?)" },
    { "nhom": "Ngôn từ thô tục", "tu_khoa": "đếch", "regex": r"(?:\s|^)đếch(?:\s|$|\.|\!|\?)" },
    { "nhom": "Ngôn từ thô tục", "tu_khoa": "l*", "regex": r"(?:\s|^)l\*(?:\s|$|\.|\!|\?)" },
    { "nhom": "Ngôn từ thô tục", "tu_khoa": "cặc", "regex": r"(?:\s|^)cặc(?:\s|$|\.|\!|\?)" },
    { "nhom": "Ngôn từ thô tục", "tu_khoa": "buồi", "regex": r"(?:\s|^)buồi(?:\s|$|\.|\!|\?)" },
    { "nhom": "Ngôn từ thô tục", "tu_khoa": "lồn", "regex": r"(?:\s|^)lồn(?:\s|$|\.|\!|\?)" },
    { "nhom": "Ngôn từ thô tục", "tu_khoa": "lol", "regex": r"(?:\s|^)lol(?:\s|$|\.|\!|\?)" },
    { "nhom": "Ngôn từ thô tục", "tu_khoa": "cu", "regex": r"(?:\s|^)cu(?:\s|$|\.|\!|\?)" },
    { "nhom": "Ngôn từ thô tục", "tu_khoa": "phò", "regex": r"(?:\s|^)phò(?:\s|$|\.|\!|\?)" },
    { "nhom": "Ngôn từ thô tục", "tu_khoa": "cave", "regex": r"(?:\s|^)cave(?:\s|$|\.|\!|\?)" },
    { "nhom": "Ngôn từ thô tục", "tu_khoa": "bú liếm", "regex": r"(?:\s|^)bú\sliếm(?:\s|$|\.|\!|\?)" },
    { "nhom": "Ngôn từ thô tục", "tu_khoa": "bú mồm", "regex": r"(?:\s|^)bú\smồm(?:\s|$|\.|\!|\?)" },
    { "nhom": "Ngôn từ thô tục", "tu_khoa": "bú bím", "regex": r"(?:\s|^)bú\sbím(?:\s|$|\.|\!|\?)" },
    { "nhom": "Ngôn từ thô tục", "tu_khoa": "con đĩ", "regex": r"(?:\s|^)con\sđĩ(?:\s|$|\.|\!|\?)" },
    { "nhom": "Ngôn từ thô tục", "tu_khoa": "thằng chó", "regex": r"(?:\s|^)thằng\schó(?:\s|$|\.|\!|\?)" },
    { "nhom": "Ngôn từ thô tục", "tu_khoa": "đồ khốn", "regex": r"(?:\s|^)đồ\skhốn(?:\s|$|\.|\!|\?)" },
    
    # Nhóm Phân biệt giới tính
    { "nhom": "Phân biệt giới tính", "tu_khoa": "đàn bà ngu", "regex": r"(?:\s|^)đàn\sbà\sngu(?:\s|$|\.|\!|\?)" },
    { "nhom": "Phân biệt giới tính", "tu_khoa": "đồ đàn bà", "regex": r"(?:\s|^)đồ\sđàn\sbà(?:\s|$|\.|\!|\?)" },
    { "nhom": "Phân biệt giới tính", "tu_khoa": "phụ nữ không nên", "regex": r"(?:\s|^)phụ\snữ\skhông\snên(?:\s|$|\.|\!|\?)" },
    { "nhom": "Phân biệt giới tính", "tu_khoa": "con gái thì", "regex": r"(?:\s|^)con\sgái\sthì(?:\s|$|\.|\!|\?)" },
    
    # Nhóm Phân biệt chủng tộc
    { "nhom": "Phân biệt chủng tộc", "tu_khoa": "dân da đen", "regex": r"(?:\s|^)dân\sda\sđen(?:\s|$|\.|\!|\?)" },
    { "nhom": "Phân biệt chủng tộc", "tu_khoa": "dân mọi", "regex": r"(?:\s|^)dân\smọi(?:\s|$|\.|\!|\?)" },
    { "nhom": "Phân biệt chủng tộc", "tu_khoa": "dân thiểu số ngu dốt", "regex": r"(?:\s|^)dân\sthiểu\ssố\sngu\sdốt(?:\s|$|\.|\!|\?)" },
    
    # Nhóm Phân biệt tôn giáo
    { "nhom": "Phân biệt tôn giáo", "tu_khoa": "đạo Hồi là khủng bố", "regex": r"(?:\s|^)đạo\sHồi\slà\skhủng\sbố(?:\s|$|\.|\!|\?)" },
    { "nhom": "Phân biệt tôn giáo", "tu_khoa": "Công giáo ngu tín", "regex": r"(?:\s|^)Công\sgiáo\sngu\stín(?:\s|$|\.|\!|\?)" },
    
    # Nhóm Khiêu dâm (KHÔNG phải khủng hoảng)
    { "nhom": "Khiêu dâm", "tu_khoa": "sex", "regex": r"(?:\s|^)sex(?:\s|$|\.|\!|\?)" },
    { "nhom": "Khiêu dâm", "tu_khoa": "xxx", "regex": r"(?:\s|^)xxx(?:\s|$|\.|\!|\?)" },
    { "nhom": "Khiêu dâm", "tu_khoa": "làm tình", "regex": r"(?:\s|^)làm\stình(?:\s|$|\.|\!|\?)" },
    { "nhom": "Khiêu dâm", "tu_khoa": "khoả thân", "regex": r"(?:\s|^)khoả\sthân(?:\s|$|\.|\!|\?)" },
    { "nhom": "Khiêu dâm", "tu_khoa": "dâm đãng", "regex": r"(?:\s|^)dâm\sđãng(?:\s|$|\.|\!|\?)" },
    { "nhom": "Khiêu dâm", "tu_khoa": "thủ dâm", "regex": r"(?:\s|^)thủ\sdâm(?:\s|$|\.|\!|\?)" },
    { "nhom": "Khiêu dâm", "tu_khoa": "porn", "regex": r"(?:\s|^)porn(?:\s|$|\.|\!|\?)" },
    { "nhom": "Khiêu dâm", "tu_khoa": "18+", "regex": r"(?:\s|^)18\+(?:\s|$|\.|\!|\?)" },
]


# ============================================
# LỚP 2: HỆ THỐNG PHÁT HIỆN KHỦNG HOẢNG
# ============================================
TU_KHOA_KHUNG_HOANG = [
    # Nhóm Tự tử
    { "nhom": "tu_tu", "tu_khoa": "tự tử", "regex": r"(?:\s|^)tự\stử(?:\s|$|\.|\!|\?)" },
    { "nhom": "tu_tu", "tu_khoa": "tự sát", "regex": r"(?:\s|^)tự\ssát(?:\s|$|\.|\!|\?)" },
    { "nhom": "tu_tu", "tu_khoa": "kết thúc cuộc đời", "regex": r"(?:\s|^)kết\sthúc\scuộc\sđời(?:\s|$|\.|\!|\?)" },
    { "nhom": "tu_tu", "tu_khoa": "muốn chết", "regex": r"(?:\s|^)muốn\schết(?:\s|$|\.|\!|\?)" },
    { "nhom": "tu_tu", "tu_khoa": "biến mất", "regex": r"(?:\s|^)biến\smất(?:\s|$|\.|\!|\?)" },
    { "nhom": "tu_tu", "tu_khoa": "chết", "regex": r"(?:\s|^)chết(?:\s|$|\.|\!|\?)" },
    { "nhom": "tu_tu", "tu_khoa": "chấm dứt", "regex": r"(?:\s|^)chấm\sdứt(?:\s|$|\.|\!|\?)" },

    # Nhóm Tự làm hại
    { "nhom": "tu_lam_hai", "tu_khoa": "cắt tay", "regex": r"(?:\s|^)cắt\stay(?:\s|$|\.|\!|\?)" },
    { "nhom": "tu_lam_hai", "tu_khoa": "tự làm đau", "regex": r"(?:\s|^)tự\slàm\sđau(?:\s|$|\.|\!|\?)" },
    { "nhom": "tu_lam_hai", "tu_khoa": "làm hại bản thân", "regex": r"(?:\s|^)làm\shại\sbản\sthân(?:\s|$|\.|\!|\?)" },
    { "nhom": "tu_lam_hai", "tu_khoa": "tự hành xác", "regex": r"(?:\s|^)tự\shành\sxác(?:\s|$|\.|\!|\?)" },
    { "nhom": "tu_lam_hai", "tu_khoa": "tự hành hạ", "regex": r"(?:\s|^)tự\shành\shạ(?:\s|$|\.|\!|\?)" },
    { "nhom": "tu_lam_hai", "tu_khoa": "đâm bản thân", "regex": r"(?:\s|^)đâm\sbản\sthân(?:\s|$|\.|\!|\?)" },

    # Nhóm Tuyệt vọng
    { "nhom": "tuyet_vong", "tu_khoa": "tuyệt vọng", "regex": r"(?:\s|^)tuyệt\svọng(?:\s|$|\.|\!|\?)" },
    { "nhom": "tuyet_vong", "tu_khoa": "vô vọng", "regex": r"(?:\s|^)vô\svọng(?:\s|$|\.|\!|\?)" },
    { "nhom": "tuyet_vong", "tu_khoa": "cuộc sống vô nghĩa", "regex": r"(?:\s|^)cuộc\ssống\svô\snghĩa(?:\s|$|\.|\!|\?)" },
    { "nhom": "tuyet_vong", "tu_khoa": "không còn hy vọng", "regex": r"(?:\s|^)không\scòn\shy\svọng(?:\s|$|\.|\!|\?)" },
    { "nhom": "tuyet_vong", "tu_khoa": "khủng hoảng", "regex": r"(?:\s|^)khủng\shoảng(?:\s|$|\.|\!|\?)" },

    # ===== KHỐI MỚI: NHÓM BẠO LỰC & XÂM HẠI (KHỦNG HOẢNG) =====
    { "nhom": "bao_luc_khung_hoang", "tu_khoa": "bị đánh đập", "regex": r"(?:\s|^)bị\sđánh\sđập(?:\s|$|\.|\!|\?)" },
    { "nhom": "bao_luc_khung_hoang", "tu_khoa": "bạo lực gia đình", "regex": r"(?:\s|^)bạo\slực\sgia\sđình(?:\s|$|\.|\!|\?)" },
    { "nhom": "bao_luc_khung_hoang", "tu_khoa": "xâm hại", "regex": r"(?:\s|^)xâm\shại(?:\s|$|\.|\!|\?)" },
    { "nhom": "bao_luc_khung_hoang", "tu_khoa": "bạo lực học đường", "regex": r"(?:\s|^)bạo\slực\shọc\sđường(?:\s|$|\.|\!|\?)" },
    
    # QUAN TRỌNG: Các từ khóa về xâm hại tình dục (YÊU CẦU HỖ TRỢ KHẨN CẤP)
    { "nhom": "xam_hai_tinh_duc", "tu_khoa": "quấy rối tình dục", "regex": r"(?:\s|^)quấy\srối\stình\sdục(?:\s|$|\.|\!|\?)" },
    { "nhom": "xam_hai_tinh_duc", "tu_khoa": "hiếp dâm", "regex": r"(?:\s|^)hiếp\sdâm(?:\s|$|\.|\!|\?)" },
    { "nhom": "xam_hai_tinh_duc", "tu_khoa": "cưỡng bức", "regex": r"(?:\s|^)cưỡng\sbức(?:\s|$|\.|\!|\?)" },
    { "nhom": "xam_hai_tinh_duc", "tu_khoa": "lạm dụng tình dục", "regex": r"(?:\s|^)lạm\sdụng\stình\sdục(?:\s|$|\.|\!|\?)" },
    { "nhom": "xam_hai_tinh_duc", "tu_khoa": "xâm hại tình dục", "regex": r"(?:\s|^)xâm\shại\stình\sdục(?:\s|$|\.|\!|\?)" },
    { "nhom": "xam_hai_tinh_duc", "tu_khoa": "bị cưỡng hiếp", "regex": r"(?:\s|^)bị\scưỡng\shiếp(?:\s|$|\.|\!|\?)" },
    { "nhom": "xam_hai_tinh_duc", "tu_khoa": "bị sờ mó", "regex": r"(?:\s|^)bị\ssờ\smó(?:\s|$|\.|\!|\?)" },
    { "nhom": "xam_hai_tinh_duc", "tu_khoa": "bị xâm hại", "regex": r"(?:\s|^)bị\sxâm\shại(?:\s|$|\.|\!|\?)" },
    
    # Bạo lực nghiêm trọng khác
    { "nhom": "bao_luc_nghiem_trong", "tu_khoa": "đánh chết", "regex": r"(?:\s|^)đánh\schết(?:\s|$|\.|\!|\?)" },
    { "nhom": "bao_luc_nghiem_trong", "tu_khoa": "chém", "regex": r"(?:\s|^)chém(?:\s|$|\.|\!|\?)" },
    { "nhom": "bao_luc_nghiem_trong", "tu_khoa": "giết", "regex": r"(?:\s|^)giết(?:\s|$|\.|\!|\?)" },
    { "nhom": "bao_luc_nghiem_trong", "tu_khoa": "hành hạ", "regex": r"(?:\s|^)hành\shạ(?:\s|$|\.|\!|\?)" },
    { "nhom": "bao_luc_nghiem_trong", "tu_khoa": "tra tấn", "regex": r"(?:\s|^)tra\stấn(?:\s|$|\.|\!|\?)" },
]


# ============================================
# 2. RULE-BASED RETRIEVAL & CHECK FUNCTIONS
# ============================================

def check_for_crisis(user_message: str) -> bool:
    """
    Kiểm tra tin nhắn người dùng có chứa từ khóa khủng hoảng không. (LỚP 2 - Cấp độ 1)
    Sử dụng Regex để đảm bảo độ chính xác.
    
    Returns:
        bool: True nếu phát hiện khủng hoảng, False nếu không
    """
    message_lower = user_message.lower()
    
    for crisis_item in TU_KHOA_KHUNG_HOANG:
        try:
            if re.search(crisis_item["regex"], message_lower, re.I | re.U):
                logger.critical(
                    f"🚨 CRISIS ALERT DETECTED (REGEX) - "
                    f"Group: {crisis_item['nhom']}, Keyword: {crisis_item['tu_khoa']}"
                )
                return True
        except re.error as e:
            logger.error(f"Crisis Regex error for {crisis_item['tu_khoa']}: {e}")
            continue
            
    return False


def check_content_violation(user_message: str) -> Optional[str]:
    """
    Kiểm tra tin nhắn người dùng có chứa từ khóa vi phạm. (LỚP 1)
    
    Returns:
        str: Tên nhóm vi phạm nếu phát hiện, None nếu không
    """
    message_lower = user_message.lower()
    
    for violation_item in TU_KHOA_VI_PHAM:
        try:
            if re.search(violation_item["regex"], message_lower, re.I | re.U): 
                logger.warning(
                    f"🚫 VIOLATION DETECTED - "
                    f"Group: {violation_item['nhom']}, Keyword: {violation_item['tu_khoa']}"
                )
                return violation_item["nhom"]
        except re.error as e:
            logger.error(f"Regex error for keyword {violation_item['tu_khoa']}: {e}")
            continue
            
    return None


def rule_based_retrieve_context(user_message: str) -> str:
    """Truy xuất ngữ cảnh dựa trên từ khóa đơn giản từ KNOWLEDGE_BASE."""
    message_lower = user_message.lower()
    
    if any(keyword in message_lower for keyword in ["tham vấn", "tư vấn", "lắng nghe thấu hiểu", "nguyên tắc tư vấn"]):
        return KNOWLEDGE_BASE["NEN_TANG_TU_VAN"]
    
    if any(keyword in message_lower for keyword in ["stress", "căng thẳng", "mâu thuẫn", "bạo lực", "nguồn gốc căng thẳng"]):
        return KNOWLEDGE_BASE["VAN_DE_TAM_LY_PHO_BIEN"]
    
    if any(keyword in message_lower for keyword in ["tiểu học", "thcs", "thpt", "sinh viên", "định hướng nghề nghiệp"]):
        return KNOWLEDGE_BASE["KNS_LUA_TUOI"]
        
    if any(keyword in message_lower for keyword in ["kỹ năng sống", "kns", "phân loại", "tự nhận thức", "kiểm soát cảm xúc"]):
        return KNOWLEDGE_BASE["KNS_PHAN_LOAI"]
        
    return ""


# ============================================
# 3. SYSTEM PROMPTS
# ============================================

SYSTEM_PROMPT = f"""Bạn là trợ lý tâm lý học đường thân thiện và thấu cảm dành cho học sinh, sinh viên Việt Nam, được đặt tên là Banana.

{ESSENTIAL_CONTEXT}

Vai trò cốt lõi của bạn (Phải tuân thủ):
1. **Lắng nghe Thấu cảm (Empathy First):** Luôn xác nhận cảm xúc và sự khó khăn của người dùng trước khi đưa ra bất kỳ lời khuyên nào. KHÔNG phán xét hay áp đặt.
2. **Áp dụng Kiến thức Chuyên môn:** Khi có Dữ liệu Kiến thức (trong [CONTEXT]), bạn phải sử dụng nó để phân tích, giải thích vấn đề và đề xuất giải pháp theo cách thức của một nhà tham vấn được đào tạo.
3. **Mô hình Tư vấn Cơ bản (Tập trung vào giải pháp):**
    a. **Xác định:** Giúp người dùng gọi tên cảm xúc/vấn đề (Hiện hữu/Tiềm ẩn).
    b. **Khai thác:** Hỏi câu hỏi mở (WHO, WHAT, WHEN, HOW) để hiểu rõ hơn về nguồn gốc vấn đề.
    c. **Đề xuất:** Cung cấp các công cụ hoặc kỹ năng liên quan từ [CONTEXT] để người dùng tự triển khai giải pháp khả thi (KHÔNG ÁP ĐẶT).

Nguyên tắc bắt buộc:
- Luôn gọi mình là **Banana** và sử dụng ngôn ngữ thân thiện, gần gũi (như một người bạn lớn tuổi).
- **BẮT BUỘC SỬ DỤNG DỮ LIỆU THAM KHẢO được cung cấp trong [CONTEXT]** khi trả lời các câu hỏi về Kỹ năng sống, Phân loại KNS, Vấn đề tâm lý, hoặc Quy trình tư vấn.
- **Nếu không liên quan đến tâm lý học đường (tình yêu, học tập, gia đình, cảm xúc, KNS), TUYỆT ĐỐI TỪ CHỐI** một cách lịch sự.

Giọng điệu: Thấu hiểu, chuyên nghiệp nhưng ấm áp, định hướng giải pháp.
"""

CRISIS_PROMPT = """⚠️ CHUYÊN VIÊN TÂM LÝ KHẨN CẤP - BỎ QUA MỌI VAI TRÒ KHÁC ⚠️

Người dùng đang trong tình trạng khủng hoảng nghiêm trọng (ví dụ: muốn tự tử, tự làm hại bản thân, bị bạo lực, xâm hại tình dục).

Ưu tiên tuyệt đối (KHÔNG ĐƯỢC PHÉP VI PHẠM):
1. **AN TOÀN CỦA NGƯỜI DÙNG:** Ngừng ngay lập tức vai trò "tư vấn" hay "giải quyết vấn đề" thông thường.
2. **KẾT NỐI HỖ TRỢ CHUYÊN NGHIỆP:** Tập trung toàn bộ phản hồi vào việc kêu gọi hành động tìm kiếm sự giúp đỡ khẩn cấp.
3. **KHÔNG CỐ GẮNG TRỊ LIỆU:** Tuyệt đối không đưa ra lời khuyên "tự giúp mình", các bước phân tích vấn đề, hay các giải pháp tâm lý thông thường.

Phản hồi phải bao gồm:
- Thấu cảm và xác nhận cảm xúc (Ví dụ: "Mình hiểu bạn đang rất đau khổ và cô đơn...")
- Nhấn mạnh rằng họ không đơn độc.
- **Cung cấp số điện thoại khẩn cấp: 111** (hoặc 115 nếu là cấp cứu y tế)
- **Kêu gọi hành động: Khuyến khích liên hệ ngay lập tức**

Phản hồi nên ngắn gọn (dưới 5 câu), tập trung vào việc kêu gọi hành động tìm kiếm sự giúp đỡ chuyên nghiệp.
Giọng điệu: Nghiêm túc nhưng đầy sự quan tâm, không gây hoảng loạn.
"""


# ============================================
# 4. GROQ CLIENT CLASS
# ============================================

class GroqAI:
    """Groq AI client for mental health chat"""
    
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or GROQ_API_KEY
        if not self.api_key:
            logger.error("GROQ_API_KEY not set!")
            raise ValueError("GROQ_API_KEY environment variable required")
        
        self.client = httpx.AsyncClient(
            base_url=GROQ_API_BASE,
            headers={
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json"
            },
            timeout=30.0
        )
    
    async def generate_response(
        self,
        user_message: str,
        conversation_history: Optional[List[Dict]] = None,
        is_crisis: bool = False
    ) -> Dict:
        """Generate AI response using Groq API"""
        
        # Lớp 1: KIỂM TRA VI PHẠM (Content Moderation)
        violation_type = check_content_violation(user_message)
        if violation_type:
            return {
                "success": False,
                "response": (
                    f"⚠️ **Cảnh báo Vi phạm Nội dung:** Mình là Banana, trợ lý tâm lý học đường. "
                    f"Tin nhắn của bạn chứa ngôn ngữ không phù hợp ({violation_type}). "
                    f"Để đảm bảo môi trường an toàn và lành mạnh, mình xin phép không tiếp tục xử lý nội dung này. "
                    f"Nếu bạn cần chia sẻ về vấn đề tâm lý học đường, mình luôn sẵn lòng lắng nghe."
                ),
                "error": f"Content violation detected: {violation_type}",
                "is_crisis": False
            }
            
        try:
            # 1. TRUY XUẤT DỮ LIỆU RAG DỰA TRÊN QUY TẮC
            retrieved_context = rule_based_retrieve_context(user_message)
            
            # 2. CHÈN DỮ LIỆU VÀO SYSTEM PROMPT
            final_system_prompt = SYSTEM_PROMPT
            
            if is_crisis:
                final_system_prompt = CRISIS_PROMPT
            elif retrieved_context:
                final_system_prompt += (
                    "\n\n[CONTEXT TỪ DỮ LIỆU CƠ SỞ]\n"
                    "BẠN PHẢI SỬ DỤNG THÔNG TIN SAU ĐÂY ĐỂ TRẢ LỜI: \n"
                    f"{retrieved_context}\n"
                    "[KẾT THÚC CONTEXT]"
                )

            # 3. Chuẩn bị messages
            messages = [
                {"role": "system", "content": final_system_prompt}
            ]
            
            if conversation_history:
                history_limit = 1 if is_crisis else 10
                messages.extend(conversation_history[-history_limit:]) 
            
            messages.append({"role": "user", "content": user_message})
            
            # 4. Call Groq API
            response = await self.client.post(
                "/chat/completions",
                json={
                    "model": GROQ_MODEL,
                    "messages": messages,
                    "temperature": 0.7 if not is_crisis else 0.1,
                    "max_tokens": 500,
                    "top_p": 0.9,
                    "stream": False
                }
            )
            
            response.raise_for_status()
            data = response.json()
            
            ai_message = data["choices"][0]["message"]["content"]
            
            return {
                "success": True,
                "response": ai_message,
                "model": GROQ_MODEL,
                "tokens_used": data.get("usage", {}).get("total_tokens", 0),
                "is_crisis": is_crisis
            }
            
        except httpx.HTTPStatusError as e:
            logger.error(f"Groq API error: {e.response.status_code} - {e.response.text}")
            return {
                "success": False,
                "response": self._get_fallback_response(is_crisis),
                "error": f"API error: {e.response.status_code}",
                "is_crisis": is_crisis
            }
        
        except Exception as e:
            logger.error(f"Unexpected error: {e}")
            return {
                "success": False,
                "response": self._get_fallback_response(is_crisis),
                "error": str(e),
                "is_crisis": is_crisis
            }
    
    def _get_fallback_response(self, is_crisis: bool) -> str:
        """Fallback response when AI fails"""
        if is_crisis:
            return (
                "🚨 **THÔNG BÁO KHẨN CẤP** 🚨\n\n"
                "Xin lỗi, có lỗi hệ thống xảy ra. Nhưng mình cần bạn chú ý: "
                "**An toàn của bạn là quan trọng nhất.** "
                "Hãy gọi ngay đường dây nóng **111** (Tổng đài Bảo vệ Trẻ em, miễn phí 24/7) hoặc **115** (cấp cứu y tế). "
                "Bạn không đơn độc, hãy tìm sự giúp đỡ ngay bây giờ."
            )
        else:
            return (
                "Có vẻ hệ thống đang gặp một chút vấn đề, mình xin lỗi. "
                "Bạn có thể nhắc lại câu hỏi hoặc chia sẻ điều gì đang khiến bạn bận tâm không? "
                "Mình sẽ cố gắng hết sức để hỗ trợ bạn."
            )
    
    async def close(self):
        """Close HTTP client"""
        await self.client.aclose()


# Helper function for easy use
async def generate_ai_response(
    user_message: str,
    conversation_history: Optional[List[Dict]] = None
) -> Dict:
    """
    Generate AI response - simplified interface
    
    Returns:
        Dict với các key: success, response, is_crisis, error (optional)
    """
    # Lớp 2: Kiểm tra Khủng hoảng (Được thực hiện trước cả API call)
    crisis_status = check_for_crisis(user_message)
    
    ai = GroqAI()
    try:
        result = await ai.generate_response(
            user_message=user_message,
            conversation_history=conversation_history,
            is_crisis=crisis_status 
        )
        
        if result["success"]:
            logger.info(f"✅ AI response: {result.get('tokens_used', 0)} tokens, Crisis: {result['is_crisis']}")
        else:
            if "Content violation" in result.get("error", ""):
                 logger.warning(f"🚫 Content Violation Fallback: {result.get('error')}")
            else:
                 logger.warning(f"⚠️  AI fallback: {result.get('error')}")
            
        return result
    
    finally:
        await ai.close()