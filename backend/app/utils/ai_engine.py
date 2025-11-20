# ============================================
# FREE AI INTEGRATION - GROQ API
# File: backend/app/utils/ai_engine.py
# ============================================

import os
import httpx
import logging
from typing import Dict, Optional, List
from .knowledge_base import KNOWLEDGE_BASE

logger = logging.getLogger(__name__)

# Groq API Configuration
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_API_BASE = "https://api.groq.com/openai/v1"
GROQ_MODEL = "llama-3.3-70b-versatile"

# ============================================
# 1. DỮ LIỆU CỐ ĐỊNH & RULE-BASED RETRIEVAL LOGIC
# ============================================

# Dữ liệu cố định (Không phải kiến thức 6000 token, chỉ thông tin hành chính)
ESSENTIAL_CONTEXT = """
DỮ LIỆU CỐ ĐỊNH VỀ DỊCH VỤ BANANA:
- Tên dịch vụ/trợ lý: Banana
- Mục tiêu: Hỗ trợ tâm lý học đường ẩn danh cho học sinh, sinh viên Việt Nam.
- Sứ mệnh: Mang đến không gian tư vấn tâm lý miễn phí, ẩn danh, và dễ tiếp cận cho học sinh, sinh viên Việt Nam thông qua ứng dụng đột phá của công nghệ Trí tuệ nhân tạo (AI).
"""

def rule_based_retrieve_context(user_message: str) -> str:
    """Truy xuất ngữ cảnh dựa trên từ khóa đơn giản từ KNOWLEDGE_BASE."""
    message_lower = user_message.lower()
    
    # 1. Kiểm tra từ khóa KNS & Phân loại
    if any(keyword in message_lower for keyword in ["kỹ năng sống", "kns", "phân loại", "tự nhận thức", "kiểm soát cảm xúc", "tư duy"]):
        # Trả về cả Khái niệm và Phân loại nếu người dùng hỏi chung chung
        return KNOWLEDGE_BASE["KNS_KHAI_NIEM"] + KNOWLEDGE_BASE["KNS_PHAN_LOAI"]
    
    # 2. Kiểm tra từ khóa Lứa tuổi/Học tập
    if any(keyword in message_lower for keyword in ["tiểu học", "thcs", "thpt", "sinh viên", "định hướng nghề nghiệp", "chọn nghề"]):
        return KNOWLEDGE_BASE["KNS_LUA_TUOI"]
    
    # 3. Kiểm tra từ khóa Vấn đề/Căng thẳng/Xung đột
    if any(keyword in message_lower for keyword in ["căng thẳng", "stress", "mâu thuẫn", "bạo lực", "sống ảo", "ứng phó"]):
        return KNOWLEDGE_BASE["VAN_DE_TAM_LY_PHO_BIEN"]
    
    # 4. Kiểm tra từ khóa Tư vấn/Quy trình
    if any(keyword in message_lower for keyword in ["tham vấn", "tư vấn", "lắng nghe", "giải quyết vấn đề", "nguyên tắc tư vấn"]):
        return KNOWLEDGE_BASE["NEN_TANG_TU_VAN"]
        
    return ""

# ============================================
# 2. SYSTEM PROMPTS ĐÃ CẬP NHẬT
# ============================================

SYSTEM_PROMPT = f"""Bạn là trợ lý tâm lý học đường thân thiện và thấu cảm dành cho học sinh, sinh viên Việt Nam.

{ESSENTIAL_CONTEXT}

Vai trò của bạn:
- Lắng nghe và thấu hiểu cảm xúc của học sinh.
- Cung cấp lời khuyên tích cực, xây dựng.
- **BẮT BUỘC SỬ DỤNG DỮ LIỆU THAM KHẢO được cung cấp trong [CONTEXT] (nếu có) để trả lời các câu hỏi về Kỹ năng sống, Vấn đề tâm lý, hoặc Nguyên tắc tư vấn.**
- **TUYỆT ĐỐI KHÔNG trả lời các câu hỏi về thông tin cá nhân, chính trị, tôn giáo, lịch sử, hoặc bất kỳ chủ đề không liên quan nào khác.**
- **Nếu câu hỏi không liên quan, hãy từ chối một cách lịch sự:** "Xin lỗi, mình là Banana, trợ lý tâm lý học đường, mình chỉ chuyên về các vấn đề tâm lý học đường thôi. Bạn có điều gì muốn chia sẻ về học tập, tình yêu, gia đình hay cảm xúc của mình không?"

Nguyên tắc:
1. Luôn sử dụng tên của mình là Banana để cho thân thiện với học sinh, sinh viên.
2. Luôn sử dụng ngôn ngữ thân thiện, gần gũi.
3. Đặt câu hỏi mở để học sinh chia sẻ thêm.
4. Xác nhận cảm xúc của học sinh (validation) nhưng không áp đặt hay phán xét.
5. Đưa ra góc nhìn tích cực nhưng không phủ nhận khó khăn.
6. Nếu phát hiện khủng hoảng nghiêm trọng, khuyến khích tìm kiếm sự hỗ trợ chuyên nghiệp (111).

Giọng điệu: Như một người bạn lớn tuổi thấu hiểu, không phải chuyên gia y tế."""

CRISIS_PROMPT = """⚠️ CHUYÊN VIÊN TÂM LÝ KHẨN CẤP ⚠️

Người dùng đang trong tình trạng khủng hoảng nghiêm trọng.

Ưu tiên tuyệt đối:
1. An toàn của người dùng
2. Kết nối với hỗ trợ chuyên nghiệp ngay lập tức
3. Ngừng ngay lập tức và không cố gắng "giải quyết" vấn đề

Phản hồi phải bao gồm:
- Thấu cảm và xác nhận cảm xúc
- Nhấn mạnh rằng họ không đơn độc
- Cung cấp số điện thoại khẩn cấp: 111 (miễn phí 24/7)
- Khuyến khích liên hệ ngay lập tức
- Không đưa ra lời khuyên "tự giúp mình"
- Không khuyến khích hay đề nghị thực hiện các hành động nguy hiểm gây ảnh hưoởng đến bản thân và người khác

Giọng điệu: Nghiêm túc nhưng đầy sự quan tâm, không gây hoảng loạn."""


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
        try:
            # 1. TRUY XUẤT DỮ LIỆU RAG DỰA TRÊN QUY TẮC
            retrieved_context = rule_based_retrieve_context(user_message)
            
            # 2. CHÈN DỮ LIỆU VÀO SYSTEM PROMPT (nếu có)
            final_system_prompt = SYSTEM_PROMPT
            
            if retrieved_context and not is_crisis:
                # Nếu không phải khủng hoảng, chèn context vào SYSTEM_PROMPT
                final_system_prompt += (
                    "\n\n[CONTEXT TỪ DỮ LIỆU CƠ SỞ]\n"
                    "BẠN PHẢI SỬ DỤNG THÔNG TIN SAU ĐÂY ĐỂ TRẢ LỜI: \n"
                    f"{retrieved_context}\n"
                    "[KẾT THÚC CONTEXT]"
                )

            # 3. Chuẩn bị messages
            messages = [
                {"role": "system", "content": CRISIS_PROMPT if is_crisis else final_system_prompt}
            ]
            
            # Add conversation history (last 10 messages)
            if conversation_history:
                messages.extend(conversation_history[-10:])
            
            # Add current message
            messages.append({"role": "user", "content": user_message})
            
            # 4. Call Groq API
            response = await self.client.post(
                "/chat/completions",
                json={
                    "model": GROQ_MODEL,
                    "messages": messages,
                    "temperature": 0.7,
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
                "tokens_used": data.get("usage", {}).get("total_tokens", 0)
            }
            
        except httpx.HTTPStatusError as e:
            logger.error(f"Groq API error: {e.response.status_code} - {e.response.text}")
            return {
                "success": False,
                "response": self._get_fallback_response(is_crisis),
                "error": f"API error: {e.response.status_code}"
            }
        
        except Exception as e:
            logger.error(f"Unexpected error: {e}")
            return {
                "success": False,
                "response": self._get_fallback_response(is_crisis),
                "error": str(e)
            }
    
    def _get_fallback_response(self, is_crisis: bool) -> str:
        """Fallback response when AI fails"""
        if is_crisis:
            return (
                "Mình nhận thấy bạn đang trải qua giai đoạn rất khó khăn. "
                "An toàn của bạn là ưu tiên số một. "
                "Hãy liên hệ ngay với đường dây nóng 111 (miễn phí 24/7) "
                "hoặc 115 (cấp cứu y tế). "
                "Bạn không đơn độc - luôn có người sẵn sàng giúp đỡ bạn."
            )
        else:
            return (
                "Cảm ơn bạn đã chia sẻ. Mình hiểu bạn đang cảm thấy như vậy. "
                "Bạn có thể kể thêm về điều gì đang khiến bạn cảm thấy vậy không? "
                "Mình ở đây để lắng nghe bạn."
            )
    
    async def close(self):
        """Close HTTP client"""
        await self.client.aclose()


# Helper function for easy use
async def generate_ai_response(
    user_message: str,
    conversation_history: Optional[List[Dict]] = None,
    is_crisis: bool = False
) -> str:
    """
    Generate AI response - simplified interface
    """
    ai = GroqAI()
    try:
        result = await ai.generate_response(
            user_message=user_message,
            conversation_history=conversation_history,
            is_crisis=is_crisis
        )
        
        if result["success"]:
            logger.info(f"✅ AI response: {result['tokens_used']} tokens")
        else:
            logger.warning(f"⚠️  AI fallback: {result.get('error')}")
        
        return result["response"]
    
    finally:
        await ai.close()