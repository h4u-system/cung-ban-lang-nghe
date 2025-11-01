// File: src/services/message.js

import api from './api';
import encryptionService from '../utils/encryption';

/**
 * Message Service
 * Đã cấu hình thêm logic giải mã cho phản hồi và lịch sử.
 */
class MessageService {
    
    /**
     * Send message: Mã hóa tin nhắn người dùng, gọi API, và Giải mã phản hồi AI.
     * @param {string} sessionId - ID của phiên chat hiện tại (Chính là Session Token).
     * @param {string} content - Nội dung tin nhắn CHƯA MÃ HÓA.
     * @param {boolean} [isEncrypted=true] - Cờ xác định có mã hóa hay không.
     */
    async sendMessage(sessionId, content, isEncrypted = true) {
        try {
            let finalContent = content;
            
            // 1. MÃ HÓA TIN NHẮN NGƯỜI DÙNG
            if (isEncrypted) {
                console.log(`[MessageService] Encrypting user message for session: ${sessionId}`);
                finalContent = await encryptionService.encrypt(content, sessionId);
            }

            // 2. GỌI API BACKEND
            // 🔥 SỬA LỖI: Thêm 'session_token' vào body theo yêu cầu của Pydantic schema MessageCreate
            const response = await api.post(`/sessions/${sessionId}/messages`, {
                content: finalContent,
                session_token: sessionId, // <--- KHẮC PHỤC LỖI 400 Bad Request
                encrypted: isEncrypted     // Giữ lại cờ E2E
            });

            const responseData = response.data;

            // 3. XỬ LÝ VÀ GIẢI MÃ PHẢN HỒI TỪ AI (Dựa trên AIMessageResponse schema)
            const aiMessage = responseData.ai_message;
            const userMessageEcho = responseData.user_message; // Tin nhắn người dùng được gửi lại

            // Giải mã tin nhắn AI
            if (aiMessage && aiMessage.content && aiMessage.encrypted) {
                console.log(`[MessageService] Decrypting AI response for session: ${sessionId}`);
                aiMessage.content = await encryptionService.decrypt(
                    aiMessage.content,
                    sessionId
                );
            }
            
            // Giải mã tin nhắn người dùng echo
            if (userMessageEcho && userMessageEcho.content && userMessageEcho.encrypted) {
                console.log(`[MessageService] Decrypting user message echo for session: ${sessionId}`);
                userMessageEcho.content = await encryptionService.decrypt(
                    userMessageEcho.content,
                    sessionId
                );
            }

            return responseData; // Trả về toàn bộ data đã được xử lý (và giải mã)

        } catch (error) {
            console.error('[MessageService] Failed to send message:', error);
            throw error;
        }
    }

    /**
     * Get session messages: Lấy lịch sử tin nhắn và Giải mã TẤT CẢ tin nhắn.
     * @param {string} sessionId - ID của phiên chat hiện tại.
     */
    async getMessages(sessionId) {
        try {
            const response = await api.get(`/sessions/${sessionId}/messages`);
            let messages = response.data.messages || []; // Giả định messages nằm trong response.data.messages
            
            // 2. GIẢI MÃ TẤT CẢ TIN NHẮN
            console.log(`[MessageService] Decrypting ${messages.length} messages for session: ${sessionId}`);
            
            const decryptedMessages = await Promise.all(
                messages.map(async (message) => {
                    // Chỉ giải mã nếu message có nội dung và được đánh dấu là 'encrypted'
                    if (message.content && message.encrypted) {
                        try {
                            message.content = await encryptionService.decrypt(
                                message.content, 
                                sessionId
                            );
                        } catch (decryptError) {
                            console.error(`[MessageService] Failed to decrypt message ID ${message.id}:`, decryptError);
                            // Đánh dấu nội dung là lỗi
                            message.content = "⚠️ Lỗi: Không thể giải mã tin nhắn này."; 
                        }
                    }
                    return message;
                })
            );

            return decryptedMessages;

        } catch (error) {
            console.error('[MessageService] Failed to get messages:', error);
            throw error;
        }
    }

    /**
     * Submit feedback (Không thay đổi logic mã hóa/giải mã ở đây)
     */
    async submitFeedback(sessionId, messageId, rating, comment = null) {
        try {
            const response = await api.post(`/sessions/${sessionId}/feedback`, {
                message_id: messageId,
                rating,
                comment
            });
            return response.data;
        } catch (error) {
            console.error('Failed to submit feedback:', error);
            throw error;
        }
    }
}

export default new MessageService();