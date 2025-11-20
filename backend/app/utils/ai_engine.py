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

# Dữ liệu cố định (Thông tin hành chính)
ESSENTIAL_CONTEXT = """
DỮ LIỆU CỐ ĐỊNH VỀ DỊCH VỤ BANANA:
- Tên dịch vụ/trợ lý: Banana
- Mục tiêu: Hỗ trợ tâm lý học đường ẩn danh cho học sinh, sinh viên Việt Nam.
- Sứ mệnh: Mang đến không gian tư vấn tâm lý miễn phí, ẩn danh, và dễ tiếp cận cho học sinh, sinh viên Việt Nam thông qua ứng dụng đột phá của công nghệ Trí tuệ nhân tạo (AI).
"""

def rule_based_retrieve_context(user_message: str) -> str:
    """
    Truy xuất ngữ cảnh dựa trên từ khóa đơn giản từ KNOWLEDGE_BASE.
    Logic được tối ưu để trả về nội dung chuyên môn và trọng tâm nhất.
    """
    message_lower = user_message.lower()
    
    # 0. KIỂM TRA KHẨN CẤP (Ưu tiên: Tự tử, tuyệt vọng, nguy hiểm)
    # Nếu phát hiện khủng hoảng, chèn nguyên tắc tư vấn khẩn cấp (E.2) để AI tuân thủ.
    if any(keyword in message_lower for keyword in ["tự tử", "tuyệt vọng", "chết", "chấm dứt", "khủng hoảng", "đau khổ quá", "đăng xuất", "check out"]):
        return KNOWLEDGE_BASE["NEN_TANG_TU_VAN"] 

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
# 2. SYSTEM PROMPTS ĐÃ CẬP NHẬT (Định hình chuyên gia)
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
- Không khuyến khích hay đề nghị thực hiện các hành động nguy hiểm gây ảnh hưởng đến bản thân và người khác

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
            
            # Add conversation history (last 10 messages, đã được cập nhật theo yêu cầu)
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