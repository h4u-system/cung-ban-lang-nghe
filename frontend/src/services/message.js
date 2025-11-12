/**
 * File: frontend/src/services/message.js
 * Fixed version with proper response handling
 */

import api from './api';

/**
 * Message Service
 */
class MessageService {
  /**
   * Send message and return structured response
   */
  async sendMessage(sessionId, content) {
    try {
      // Backend endpoint: POST /api/v1/messages/
      const response = await api.post('/messages/', {
        content: content,
        session_token: sessionId
      });

      // ✅ FIX: Return structured response matching backend format
      return {
        user_message: response.data.user_message,
        ai_message: response.data.ai_message,
        crisis_info: response.data.crisis_info,
        // Legacy fields for backward compatibility
        message_id: response.data.ai_message.id,
        ai_response: response.data.ai_message.content,
        crisis_detected: response.data.ai_message.is_crisis_detected || false
      };
    } catch (error) {
      console.error('Failed to send message:', error);
      console.error('Error response:', error.response?.data);
      throw error;
    }
  }

  /**
   * Get session messages
   */
  async getMessages(sessionId) {
    try {
      // ✅ FIX: Add trailing slash
      const response = await api.get('/messages/', {
        params: {
          session_token: sessionId
        }
      });
      return response.data.messages || [];
    } catch (error) {
      console.error('Failed to get messages:', error);
      throw error;
    }
  }

  /**
   * Submit feedback
   */
  async submitFeedback(sessionId, rating, comment = null) {
    try {
      // ✅ FIX: Add trailing slash
      const response = await api.post('/feedback/', {
        session_token: sessionId,
        rating: rating,
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