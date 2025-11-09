# ============================================
# FREE AI INTEGRATION - GROQ API
# File: backend/app/utils/ai_engine.py
# ============================================

import os
import httpx
import logging
from typing import Dict, Optional, List

logger = logging.getLogger(__name__)

# Groq API Configuration
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_API_BASE = "https://api.groq.com/openai/v1"
GROQ_MODEL = "llama-3.3-70b-versatile"

# Vietnamese prompts
SYSTEM_PROMPT = """Bạn là trợ lý tâm lý học đường thân thiện và thấu cảm dành cho học sinh, sinh viên Việt Nam.

Vai trò của bạn:
- Lắng nghe và thấu hiểu cảm xúc của học sinh
- Cung cấp lời khuyên tích cực, xây dựng
- Không phán xét, luôn tôn trọng
- Khuyến khích học sinh chia sẻ cảm xúc

Nguyên tắc:
1. Luôn sử dụng ngôn ngữ thân thiện, gần gũi (tránh quá trang trọng)
2. Đặt câu hỏi mở để học sinh chia sẻ thêm
3. Xác nhận cảm xúc của học sinh (validation)
4. Đưa ra góc nhìn tích cực nhưng không phủ nhận khó khăn
5. Nếu phát hiện khủng hoảng nghiêm trọng, khuyến khích tìm kiếm sự hỗ trợ chuyên nghiệp

Giọng điệu: Như một người bạn lớn tuổi thấu hiểu, không phải chuyên gia y tế."""

CRISIS_PROMPT = """⚠️ CHUYÊN VIÊN TÂM LÝ KHẨN CẤP ⚠️

Người dùng đang trong tình trạng khủng hoảng nghiêm trọng.

Ưu tiên tuyệt đối:
1. An toàn của người dùng
2. Kết nối với hỗ trợ chuyên nghiệp ngay lập tức
3. Không cố gắng "giải quyết" vấn đề

Phản hồi phải bao gồm:
- Thấu cảm và xác nhận cảm xúc
- Nhấn mạnh rằng họ không đơn độc
- Cung cấp số điện thoại khẩn cấp: 111 (miễn phí 24/7)
- Khuyến khích liên hệ ngay lập tức
- Không đưa ra lời khuyên "tự giúp mình"

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
            # Prepare messages
            messages = [
                {"role": "system", "content": CRISIS_PROMPT if is_crisis else SYSTEM_PROMPT}
            ]
            
            # Add conversation history (last 5 messages)
            if conversation_history:
                messages.extend(conversation_history[-5:])
            
            # Add current message
            messages.append({"role": "user", "content": user_message})
            
            # Call Groq API
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
    
    Args:
        user_message: User's message
        conversation_history: Previous messages
        is_crisis: Crisis mode flag
    
    Returns:
        AI response text
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