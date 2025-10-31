import api from './api';
import encryptionService from '../utils/encryption';

/**
 * Message Service
 */
class MessageService {
  /**
   * Send message
   */
  async sendMessage(sessionId, content, isEncrypted = true) {
    try {
      let finalContent = content;
      
      // Client-side encryption if enabled
      if (isEncrypted) {
        finalContent = await encryptionService.encrypt(content, sessionId);
      }

      const response = await api.post(`/sessions/${sessionId}/messages`, {
        content: finalContent,
        role: 'user',
        encrypted: isEncrypted
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
      const response = await api.get(`/sessions/${sessionId}/messages`);
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
