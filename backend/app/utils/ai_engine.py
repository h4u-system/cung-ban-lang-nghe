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
    # Fallback cho testing, nếu KNOWLEDGE_BASE không tồn tại.
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
    { "nhom": "Ngôn từ thô tục", "tu_khoa": "dm", "regex": r"(?:\s|^)dm(?:\s|$|\.|\!|\?)" },
    { "nhom": "Ngôn từ thô tục", "tu_khoa": "đm", "regex": r"(?:\s|^)đm(?:\s|$|\.|\!|\?)" },
    { "nhom": "Ngôn từ thô tục", "tu_khoa": "vl", "regex": r"(?:\s|^)vl(?:\s|$|\.|\!|\?)" },
    { "nhom": "Ngôn từ thô tục", "tu_khoa": "cc", "regex": r"(?:\s|^)cc(?:\s|$|\.|\!|\?)" },
    { "nhom": "Ngôn từ thô tục", "tu_khoa": "vkl", "regex": r"(?:\s|^)vkl(?:\s|$|\.|\!|\?)" },
    { "nhom": "Ngôn từ thô tục", "tu_khoa": "m*", "regex": r"(?:\s|^)m\*(?:\s|$|\.|\!|\?)" },
    { "nhom": "Ngôn từ thô tục", "tu_khoa": "địt", "regex": r"\bđịt\b" },
    { "nhom": "Ngôn từ thô tục", "tu_khoa": "đếch", "regex": r"\bđếch\b" },
    { "nhom": "Ngôn từ thô tục", "tu_khoa": "l*", "regex": r"(?:\s|^)l\*(?:\s|$|\.|\!|\?)" },
    { "nhom": "Ngôn từ thô tục", "tu_khoa": "cặc", "regex": r"\bcặc\b" },
    { "nhom": "Ngôn từ thô tục", "tu_khoa": "buồi", "regex": r"\bbuồi\b" },
    { "nhom": "Ngôn từ thô tục", "tu_khoa": "lồn", "regex": r"\blồn\b" },
    { "nhom": "Ngôn từ thô tục", "tu_khoa": "lol", "regex": r"(?:\s|^)lol(?:\s|$|\.|\!|\?)" },
    { "nhom": "Ngôn từ thô tục", "tu_khoa": "cu", "regex": r"\bcu\b" },
    { "nhom": "Ngôn từ thô tục", "tu_khoa": "phò", "regex": r"\bphò\b" },
    { "nhom": "Ngôn từ thô tục", "tu_khoa": "cave", "regex": r"\bcave\b" },
    { "nhom": "Ngôn từ thô tục", "tu_khoa": "bú liếm", "regex": r"\bbú\sliếm\b" },
    { "nhom": "Ngôn từ thô tục", "tu_khoa": "bú mồm", "regex": r"\bbú\smồm\b" },
    { "nhom": "Ngôn từ thô tục", "tu_khoa": "bú bím", "regex": r"\bbú\sbím\b" },
    { "nhom": "Ngôn từ thô tục", "tu_khoa": "con đĩ", "regex": r"\bcon\sđĩ\b" },
    { "nhom": "Ngôn từ thô tục", "tu_khoa": "thằng chó", "regex": r"\bthằng\schó\b" },
    { "nhom": "Ngôn từ thô tục", "tu_khoa": "đồ khốn", "regex": r"\bđồ\skhốn\b" },
    { "nhom": "Bạo lực", "tu_khoa": "đánh chết", "regex": r"\bđánh\schết\b" },
    { "nhom": "Bạo lực", "tu_khoa": "chém", "regex": r"\bchém\b" },
    { "nhom": "Bạo lực", "tu_khoa": "giết", "regex": r"\bgiết\b" },
    { "nhom": "Bạo lực", "tu_khoa": "đâm", "regex": r"\bđâm\b" },
    { "nhom": "Bạo lực", "tu_khoa": "xử đẹp", "regex": r"\bxử\sđẹp\b" },
    { "nhom": "Bạo lực", "tu_khoa": "đập đầu", "regex": r"\bđập\sđầu\b" },
    { "nhom": "Bạo lực", "tu_khoa": "bắn súng", "regex": r"\bbắn\ssúng\b" },
    { "nhom": "Bạo lực", "tu_khoa": "nổ bom", "regex": r"\bnổ\sbom\b" },
    { "nhom": "Bạo lực", "tu_khoa": "đốt xác", "regex": r"\bđốt\sxác\b" },
    { "nhom": "Bạo lực", "tu_khoa": "hành hạ", "regex": r"\bhành\shạ\b" },
    { "nhom": "Bạo lực", "tu_khoa": "cưỡng bức", "regex": r"\bcưỡng\sbức\b" },
    { "nhom": "Bạo lực", "tu_khoa": "tra tấn", "regex": r"\btra\stấn\b" },
    { "nhom": "Khiêu dâm", "tu_khoa": "sex", "regex": r"\bsex\b" },
    { "nhom": "Khiêu dâm", "tu_khoa": "xxx", "regex": r"\bxxx\b" },
    { "nhom": "Khiêu dâm", "tu_khoa": "làm tình", "regex": r"\blàm\stình\b" },
    { "nhom": "Khiêu dâm", "tu_khoa": "hiếp", "regex": r"\bhiếp\b" },
    { "nhom": "Khiêu dâm", "tu_khoa": "khoả thân", "regex": r"\bkhoả\sthân\b" },
    { "nhom": "Khiêu dâm", "tu_khoa": "dâm đãng", "regex": r"\bdâm\sđãng\b" },
    { "nhom": "Khiêu dâm", "tu_khoa": "thủ dâm", "regex": r"\bthủ\sdâm\b" },
    { "nhom": "Khiêu dâm", "tu_khoa": "cực khoái", "regex": r"\bcực\skhoái\b" },
    { "nhom": "Khiêu dâm", "tu_khoa": "lên đỉnh", "regex": r"\blên\sđỉnh\b" },
    { "nhom": "Khiêu dâm", "tu_khoa": "phim nóng", "regex": r"\bphim\snóng\b" },
    { "nhom": "Khiêu dâm", "tu_khoa": "18+", "regex": r"\b18\+\b" },
    { "nhom": "Khiêu dâm", "tu_khoa": "địt nhau", "regex": r"\bđịt\snhau\b" },
    { "nhom": "Khiêu dâm", "tu_khoa": "porn", "regex": r"\bporn\b" },
    { "nhom": "Khiêu dâm", "tu_khoa": "rape", "regex": r"\brape\b" },
    { "nhom": "Khiêu dâm", "tu_khoa": "blowjob", "regex": r"\bblowjob\b" },
    { "nhom": "Khiêu dâm", "tu_khoa": "handjob", "regex": r"\bhandjob\b" },
    { "nhom": "Khiêu dâm", "tu_khoa": "oral sex", "regex": r"\boral\ssex\b" },
    { "nhom": "Khiêu dâm", "tu_khoa": "gangbang", "regex": r"\bgangbang\b" },
    { "nhom": "Khiêu dâm", "tu_khoa": "sờ mó", "regex": r"\bsờ\smó\b" },
    { "nhom": "Khiêu dâm", "tu_khoa": "liếm", "regex": r"\bliếm\b" },
    { "nhom": "Khiêu dâm", "tu_khoa": "kích dục", "regex": r"\bkích\sdục\b" },
    { "nhom": "Khiêu dâm", "tu_khoa": "lộ hàng", "regex": r"\blộ\shàng\b" },
    { "nhom": "Phân biệt giới tính", "tu_khoa": "đàn bà ngu", "regex": r"\bđàn\sbà\sngu\b" },
    { "nhom": "Phân biệt giới tính", "tu_khoa": "đồ đàn bà", "regex": r"\bđồ\sđàn\sbà\b" },
    { "nhom": "Phân biệt giới tính", "tu_khoa": "phụ nữ không nên", "regex": r"\bphụ\snữ\skhông\snên\b" },
    { "nhom": "Phân biệt giới tính", "tu_khoa": "con gái thì", "regex": r"\bcon\sgái\sthì\b" },
    { "nhom": "Phân biệt giới tính", "tu_khoa": "đàn ông mới là trụ cột", "regex": r"\bđàn\sông\smới\slà\strụ\scột\b" },
    { "nhom": "Phân biệt giới tính", "tu_khoa": "chỉ có đàn ông mới làm được việc lớn", "regex": r"\bchỉ\scó\sđàn\sông\smới\slàm\sđược\sviệc\slớn\b" },
    { "nhom": "Phân biệt chủng tộc", "tu_khoa": "dân da đen", "regex": r"\bdân\sda\sđen\b" },
    { "nhom": "Phân biệt chủng tộc", "tu_khoa": "dân mọi", "regex": r"\bdân\smọi\b" },
    { "nhom": "Phân biệt chủng tộc", "tu_khoa": "dân thiểu số ngu dốt", "regex": r"\bdân\sthiểu\ssố\sngu\sdốt\b" },
    { "nhom": "Phân biệt chủng tộc", "tu_khoa": "người da vàng kém thông minh", "regex": r"\bngười\sda\svàng\ském\sthông\sminh\b" },
    { "nhom": "Phân biệt chủng tộc", "tu_khoa": "dân châu Phi bẩn", "regex": r"\bdân\schâu\sphi\sbẩn\b" },
    { "nhom": "Phân biệt tôn giáo", "tu_khoa": "đạo Hồi là khủng bố", "regex": r"\bđạo\shồi\slà\skhủng\sbố\b" },
    { "nhom": "Phân biệt tôn giáo", "tu_khoa": "Công giáo ngu tín", "regex": r"\bcông\sgiáo\sngu\stín\b" },
    { "nhom": "Phân biệt tôn giáo", "tu_khoa": "bài Do Thái", "regex": r"\bbài\sdo\sthái\b" },
    { "nhom": "Phân biệt tôn giáo", "tu_khoa": "Phật giáo là mê tín", "regex": r"\bphật\sgiáo\slà\smê\stín\b" },
    { "nhom": "Phân biệt tôn giáo", "tu_khoa": "Thiên Chúa là lừa đảo", "regex": r"\bthiên\schúa\slà\slừa\sđảo\b" },
    { "nhom": "Phân biệt tôn giáo", "tu_khoa": "mỉa mai người theo đạo", "regex": r"\bmỉa\smai\sngười\stheo\sđạo\b" },
    { "nhom": "Phân biệt tôn giáo", "tu_khoa": "xúc phạm giáo lý", "regex": r"\bxúc\sphạm\sgiáo\slý\b" },
    { "nhom": "Lừa đảo, gian lận", "tu_khoa": "hack tài khoản", "regex": r"\bhack\stài\skhoản\b" },
    { "nhom": "Lừa đảo, gian lận", "tu_khoa": "tạo thẻ tín dụng giả", "regex": r"\btạo\sthẻ\stín\sdụng\sgiả\b" },
    { "nhom": "Lừa đảo, gian lận", "tu_khoa": "bypass OTP", "regex": r"\bbypass\sotp\b" },
    { "nhom": "Lừa đảo, gian lận", "tu_khoa": "DDoS", "regex": r"\bddos\b" },
    { "nhom": "Lừa đảo, gian lận", "tu_khoa": "spam SMS", "regex": r"\bspam\ssms\b" },
    { "nhom": "Lừa đảo, gian lận", "tu_khoa": "mã độc", "regex": r"\bmã\sđộc\b" },
    { "nhom": "Lừa đảo, gian lận", "tu_khoa": "phishing", "regex": r"\bphishing\b" },
    { "nhom": "Lừa đảo, gian lận", "tu_khoa": "fake ID", "regex": r"\bfake\sid\b" },
    { "nhom": "Lừa đảo, gian lận", "tu_khoa": "chiếm đoạt tài sản", "regex": r"\bchiếm\sđoạt\stài\ssản\b" },
    { "nhom": "Lừa đảo, gian lận", "tu_khoa": "trúng thưởng giả", "regex": r"\btrúng\sthưởng\sgiả\b" },
    { "nhom": "Lừa đảo, gian lận", "tu_khoa": "giả làm công an", "regex": r"\bgiả\slàm\scông\san\b" },
    { "nhom": "Lừa đảo, gian lận", "tu_khoa": "nhà đầu tư", "regex": r"\bnhà\sđầu\stư\b" },
    { "nhom": "Sai lệch y tế", "tu_khoa": "chữa ung thư bằng lá đu đủ", "regex": r"\bchữa\sung\sthư\sbằng\slá\sđu\sđủ\b" },
    { "nhom": "Sai lệch y tế", "tu_khoa": "không cần tiêm vaccine", "regex": r"\bkhông\scần\stiêm\svaccine\b" },
    { "nhom": "Sai lệch y tế", "tu_khoa": "uống nước muối chữa COVID", "regex": r"\buống\snước\smuối\schữa\scovid\b" },
    { "nhom": "Sai lệch y tế", "tu_khoa": "bỏ thuốc tây", "regex": r"\bbỏ\sthốc\stây\b" },
    { "nhom": "Sai lệch y tế", "tu_khoa": "ăn chay trị HIV", "regex": r"\băn\schay\strị\shiv\b" },
    { "nhom": "Sai lệch y tế", "tu_khoa": "dùng đá lạnh để ngưng tim", "regex": r"\bdùng\sđá\slạnh\sđể\sngưng\stim\b" },
    { "nhom": "Sai lệch pháp lý", "tu_khoa": "ký tên giả", "regex": r"\bký\stên\sgiả\b" },
    { "nhom": "Sai lệch pháp lý", "tu_khoa": "ly hôn cứ bỏ nhà", "regex": r"\bly\shôn\scứ\sbỏ\snhà\b" },
    { "nhom": "Sai lệch pháp lý", "tu_khoa": "không cần hợp đồng", "regex": r"\bkhông\scần\shợp\sđồng\b" },
    { "nhom": "Sai lệch pháp lý", "tu_khoa": "đánh người không sao nếu không có bằng chứng", "regex": r"\bđánh\sngười\skhông\ssao\snếu\skhông\scó\sbằng\schứng\b" },
    { "nhom": "Sai lệch pháp lý", "tu_khoa": "giả chữ ký thoải mái", "regex": r"\bgiả\schữ\ský\sthoải\smái\b" },
    { "nhom": "Sai lệch trong giáo dục", "tu_khoa": "thầy cô ngu", "regex": r"\bthầy\scô\sngu\b" },
    { "nhom": "Sai lệch trong giáo dục", "tu_khoa": "giáo viên ăn lương mà không làm gì", "regex": r"\bgiáo\sviên\săn\slương\smà\skhông\slàm\sgì\b" },
    { "nhom": "Sai lệch trong giáo dục", "tu_khoa": "bỏ học vẫn thành công", "regex": r"\bbỏ\shọc\svẫn\sthành\scông\b" },
    { "nhom": "Sai lệch trong giáo dục", "tu_khoa": "trường học vô dụng", "regex": r"\btrường\shọc\svô\sdụng\b" },
    { "nhom": "Sai lệch trong giáo dục", "tu_khoa": "chửi thầy cô", "regex": r"\bchửi\sthầy\scô\b" },
    { "nhom": "Sai lệch trong giáo dục", "tu_khoa": "đánh giáo viên", "regex": r"\bđánh\sgiáo\sviên\b" }
]


# ============================================
# LỚP 2: HỆ THỐNG PHÁT HIỆN KHỦNG HOẢNG (Dùng Regex Word Boundary)
# Đã chuyển đổi từ Dict sang List[Dict] để dùng logic Regex an toàn hơn
# ============================================
TU_KHOA_KHUNG_HOANG_REGEX = [
    # Nhóm Tự tử
    { "nhom": "tu_tu", "tu_khoa": "tự tử", "regex": r"\btự\stử\b" },
    { "nhom": "tu_tu", "tu_khoa": "tự sát", "regex": r"\btự\ssát\b" },
    { "nhom": "tu_tu", "tu_khoa": "kết thúc cuộc đời", "regex": r"\bkết\sthúc\scuộc\sđời\b" },
    { "nhom": "tu_tu", "tu_khoa": "muốn chết", "regex": r"\bmuốn\schết\b" },
    { "nhom": "tu_tu", "tu_khoa": "biến mất", "regex": r"\bbiến\smất\b" },
    { "nhom": "tu_tu", "tu_khoa": "check out", "regex": r"\bcheck\sout\b" },
    { "nhom": "tu_tu", "tu_khoa": "đăng xuất", "regex": r"\bđăng\sxuất\b" },
    { "nhom": "tu_tu", "tu_khoa": "chết", "regex": r"\bchết\b" },
    { "nhom": "tu_tu", "tu_khoa": "chấm dứt", "regex": r"\bchấm\sdứt\b" },

    # Nhóm Tự làm hại
    { "nhom": "tu_lam_hai", "tu_khoa": "cắt tay", "regex": r"\bcắt\stay\b" },
    { "nhom": "tu_lam_hai", "tu_khoa": "tự làm đau", "regex": r"\btự\slàm\sđau\b" },
    { "nhom": "tu_lam_hai", "tu_khoa": "làm hại bản thân", "regex": r"\blàm\shại\sbản\sthân\b" },
    { "nhom": "tu_lam_hai", "tu_khoa": "tự hành xác", "regex": r"\btự\shành\sxác\b" },
    { "nhom": "tu_lam_hai", "tu_khoa": "tự hành hạ", "regex": r"\btự\shành\shạ\b" },
    { "nhom": "tu_lam_hai", "tu_khoa": "đâm bản thân", "regex": r"\bđâm\sbản\sthân\b" },
    { "nhom": "tu_lam_hai", "tu_khoa": "đau khổ quá", "regex": r"\bđau\skhổ\squá\b" },

    # Nhóm Tuyệt vọng
    { "nhom": "tuyet_vong", "tu_khoa": "tuyệt vọng", "regex": r"\btuyệt\svọng\b" },
    { "nhom": "tuyet_vong", "tu_khoa": "vô vọng", "regex": r"\bvô\svọng\b" },
    { "nhom": "tuyet_vong", "tu_khoa": "cuộc sống vô nghĩa", "regex": r"\bcuộc\ssống\svô\snghĩa\b" },
    { "nhom": "tuyet_vong", "tu_khoa": "không còn hy vọng", "regex": r"\bkhông\scòn\shy\svọng\b" },
    { "nhom": "tuyet_vong", "tu_khoa": "khủng hoảng", "regex": r"\bkhủng\shoảng\b" },

    # Nhóm Bạo lực (Đã thêm quấy rối tình dục chính xác)
    { "nhom": "bao_luc", "tu_khoa": "bị đánh đập", "regex": r"\bbị\sđánh\sđập\b" },
    { "nhom": "bao_luc", "tu_khoa": "bạo lực gia đình", "regex": r"\bbạo\slực\sgia\sđình\b" },
    { "nhom": "bao_luc", "tu_khoa": "xâm hại", "regex": r"\bxâm\shại\b" },
    { "nhom": "bao_luc", "tu_khoa": "bạo lực", "regex": r"\bbạo\slực\b" },
    { "nhom": "bao_luc", "tu_khoa": "quấy rối tình dục", "regex": r"\bquấy\srối\stình\sdục\b" },
    { "nhom": "bao_luc", "tu_khoa": "hiếp dâm", "regex": r"\bhiếp\sdâm\b" },
    { "nhom": "bao_luc", "tu_khoa": "cưỡng bức", "regex": r"\bcưỡng\sbức\b" },
    { "nhom": "bao_luc", "tu_khoa": "lạm dụng tình dục", "regex": r"\blạm\sdụng\stình\sdục\b" }
]


# ============================================
# 2. RULE-BASED RETRIEVAL & CHECK FUNCTIONS
# ============================================

def check_for_crisis(user_message: str) -> bool:
    """Kiểm tra tin nhắn người dùng có chứa từ khóa khủng hoảng không. (LỚP 2 - Cấp độ 1)
    Sử dụng Regex Word Boundary (\b) để đảm bảo độ chính xác.
    """
    message_lower = user_message.lower()
    
    # Sử dụng danh sách Regex mới
    for crisis_item in TU_KHOA_KHUNG_HOANG_REGEX:
        try:
            # re.I (IGNORECASE) và re.U (UNICODE)
            if re.search(crisis_item["regex"], message_lower, re.I | re.U):
                # Ghi log sự cố khủng hoảng 
                logger.critical(
                    f"🚨 CRISIS ALERT DETECTED (REGEX) - Keyword matched by user: {crisis_item['tu_khoa']}"
                )
                return True
        except re.error as e:
            logger.error(f"Crisis Regex error for {crisis_item['tu_khoa']}: {e}")
            continue # Tiếp tục với các regex khác
            
    return False

def check_content_violation(user_message: str) -> Optional[str]:
    """Kiểm tra tin nhắn người dùng có chứa từ khóa vi phạm. (LỚP BẢO MẬT)"""
    message_lower = user_message.lower()
    
    # Sử dụng regex để đảm bảo phát hiện chính xác
    for violation_item in TU_KHOA_VI_PHAM:
        try:
            # re.IGNORECASE (re.I) được thêm để phát hiện cả chữ hoa/chữ thường
            # re.UNICODE (re.U) để hỗ trợ \b hoạt động tốt hơn với Unicode (ký tự tiếng Việt có dấu)
            # Đã thay thế '\\' bằng 'r' string để code dễ đọc hơn
            if re.search(violation_item["regex"], message_lower, re.I | re.U): 
                logger.warning(f"🚫 VIOLATION DETECTED - Group: {violation_item['nhom']}, Keyword: {violation_item['tu_khoa']}")
                # Trả về thông báo vi phạm
                return violation_item["nhom"]
        except re.error as e:
            logger.error(f"Regex error for keyword {violation_item['tu_khoa']}: {e}")
            continue # Tiếp tục với các regex khác
            
    return None


def rule_based_retrieve_context(user_message: str) -> str:
    """
    Truy xuất ngữ cảnh dựa trên từ khóa đơn giản từ KNOWLEDGE_BASE.
    """
    message_lower = user_message.lower()
    
    # 1. Kiểm tra TƯ VẤN & QUY TRÌNH (Nguyên tắc tham vấn/lắng nghe)
    if any(keyword in message_lower for keyword in ["tham vấn", "tư vấn", "lắng nghe thấu hiểu", "nguyên tắc tư vấn", "tham vấn học đường", "giải quyết vấn đề"]):
        return KNOWLEDGE_BASE["NEN_TANG_TU_VAN"]
    
    # 2. Kiểm tra VẤN ĐỀ VÀ ỨNG PHÓ (Stress, bạo lực, rủi ro)
    if any(keyword in message_lower for keyword in ["stress", "căng thẳng", "mâu thuẫn", "bạo lực", "nguồn gốc căng thẳng", "giải quyết xung đột", "phòng tránh rủi ro", "lừa đảo"]):
        return KNOWLEDGE_BASE["VAN_DE_TAM_LY_PHO_BIEN"]
    
    # 3. Kiểm tra KNS THEO LỨA TUỔI (Chính xác)
    if any(keyword in message_lower for keyword in ["tiểu học", "thcs", "thpt", "sinh viên", "định hướng nghề nghiệp", "chọn nghề"]):
        return KNOWLEDGE_BASE["KNS_LUA_TUOI"]
        
    # 4. Kiểm tra KNS & PHÂN LOẠI (Chung chung)
    if any(keyword in message_lower for keyword in ["kỹ năng sống", "kns", "phân loại", "tự nhận thức", "kiểm soát cảm xúc", "tư duy"]):
        # Chỉ trả về phần Phân loại (B) để đi vào trọng tâm kỹ năng
        return KNOWLEDGE_BASE["KNS_PHAN_LOAI"]
        
    return ""

# ============================================
# 3. SYSTEM PROMPTS (Định hình chuyên gia)
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
- **Nếu không liên quan đến tâm lý học đường (tình yêu, học tập, gia đình, cảm xúc, KNS), TUYỆT ĐỐI TỪ CHỐI** một cách lịch sự. Ví dụ: "Xin lỗi, mình là Banana, trợ lý tâm lý học đường, mình chỉ chuyên về các vấn đề tâm lý học đường thôi. Bạn có điều gì muốn chia sẻ về học tập, tình yêu, gia đình hay cảm xúc của mình không?"

Giọng điệu: Thấu hiểu, chuyên nghiệp nhưng ấm áp, định hướng giải pháp.
"""

CRISIS_PROMPT = """⚠️ CHUYÊN VIÊN TÂM LÝ KHẨN CẤP - BỎ QUA MỌI VAI TRÒ KHÁC ⚠️

Người dùng đang trong tình trạng khủng hoảng nghiêm trọng (ví dụ: muốn tự tử, tự làm hại bản thân, bị bạo lực, quấy rối tình dục).

Ưu tiên tuyệt đối (KHÔNG ĐƯỢC PHÉP VI PHẠM):
1. **AN TOÀN CỦA NGƯỜI DÙNG:** Ngừng ngay lập tức vai trò "tư vấn" hay "giải quyết vấn đề" thông thường.
2. **KẾT NỐI HỖ TRỢ CHUYÊN NGHIỆP:** Tập trung toàn bộ phản hồi vào việc kêu gọi hành động tìm kiếm sự giúp đỡ khẩn cấp.
3. **KHÔNG CỐ GẮNG TRỊ LIỆU:** Tuyệt đối không đưa ra lời khuyên "tự giúp mình", các bước phân tích vấn đề, hay các giải pháp tâm lý thông thường. Bất kể câu hỏi tiếp theo của người dùng là gì, bạn chỉ trả lời bằng thông điệp khẩn cấp.

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
            # Dừng chat và trả về thông báo lỗi/cảnh cáo 
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
            # Dữ liệu này chỉ được sử dụng nếu KHÔNG phải là khủng hoảng
            retrieved_context = rule_based_retrieve_context(user_message)
            
            # 2. CHÈN DỮ LIỆU VÀO SYSTEM PROMPT
            final_system_prompt = SYSTEM_PROMPT
            
            if is_crisis:
                # Nếu là Khủng hoảng, sử dụng CRISIS_PROMPT và bỏ qua Context thông thường/RAG
                final_system_prompt = CRISIS_PROMPT
            elif retrieved_context:
                # Nếu KHÔNG phải Khủng hoảng VÀ có Context, chèn Context vào System Prompt thông thường
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
            
            # Add conversation history (last 10 messages)
            if conversation_history:
                # Với Khủng hoảng, chỉ giữ lại tin nhắn cuối cùng để tập trung vào hành động khẩn cấp
                history_limit = 1 if is_crisis else 10
                messages.extend(conversation_history[-history_limit:]) 
            
            # Add current message
            messages.append({"role": "user", "content": user_message})
            
            # 4. Call Groq API
            response = await self.client.post(
                "/chat/completions",
                json={
                    "model": GROQ_MODEL,
                    "messages": messages,
                    "temperature": 0.7 if not is_crisis else 0.1, # Giảm nhiệt độ nếu khủng hoảng để phản hồi nghiêm túc, tập trung
                    "max_tokens": 500,
                    "top_p": 0.9,
                    "stream": False
                }
            )
            
            response.raise_for_status()
            data = response.json()
            
            # Extract response
            ai_message = data["choices"][0]["message"]["content"]
            
            return {
                "success": True,
                "response": ai_message,
                "model": GROQ_MODEL,
                "tokens_used": data.get("usage", {}).get("total_tokens", 0),
                "is_crisis": is_crisis # TRẢ VỀ TRẠNG THÁI KHỦNG HOẢNG
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
            # Fallback cho trường hợp API thất bại khi đang khủng hoảng
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
    Generate AI response - simplified interface, trả về Dict bao gồm is_crisis
    """
    # Lớp 2: Kiểm tra Khủng hoảng (Được thực hiện trước cả API call)
    crisis_status = check_for_crisis(user_message)
    
    ai = GroqAI()
    try:
        # Gọi API với trạng thái crisis_status
        result = await ai.generate_response(
            user_message=user_message,
            conversation_history=conversation_history,
            is_crisis=crisis_status 
        )
        
        if result["success"]:
            logger.info(f"✅ AI response: {result.get('tokens_used', 0)} tokens, Crisis: {result['is_crisis']}")
        else:
            # Ghi log rõ ràng nếu là lỗi API hoặc lỗi Content Violation
            if "Content violation" in result.get("error", ""):
                 logger.warning(f"🚫 Content Violation Fallback: {result.get('error')}")
            else:
                 logger.warning(f"⚠️  AI fallback: {result.get('error')}")
            
        # Trả về toàn bộ Dict kết quả (bao gồm success, response, is_crisis, error)
        return result
    
    finally:
        await ai.close()