import api from './api';
import encryptionService from '../utils/encryption';

/**
 * Message Service
 */
class MessageService {
  /**
   * Send message
   */
  async sendMessage(sessionId, content, isEncrypted = false) {
    try {
      // Client-side encryption if enabled (optional for now)
      let finalContent = content;
      
      // Backend endpoint: POST /api/v1/messages/
      const response = await api.post('/messages', {
        content: finalContent,
        session_token: sessionId  // ✅ Gửi session_token trong body
      });

      return response.data;
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  }

  /**
   * Get session messages
   */
  async getMessages(sessionId) {
    try {
      // Backend endpoint: GET /api/v1/messages/?session_token=xxx
      const response = await api.get('/messages', {
        params: {
          session_token: sessionId
        }
      });
      return response.data.messages;
    } catch (error) {
      console.error('Failed to get messages:', error);
      throw error;
    }
  }

  /**
   * Submit feedback
   */
  async submitFeedback(sessionId, messageId, rating, comment = null) {
    try {
      const response = await api.post('/feedback', {
        session_token: sessionId,
        rating,
        feedback_text: comment,
        category: rating >= 4 ? 'helpful' : 'not_helpful'
      });
      return response.data;
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      throw error;
    }
  }
}

export default new MessageService();
