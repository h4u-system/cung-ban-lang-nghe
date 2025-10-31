import api from './api';

/**
 * Session Management Service
 */
class SessionService {
  /**
   * Create new session
   */
  async createSession() {
    try {
      const response = await api.post('/sessions');
      const { session_id, expires_at } = response.data;
      
      // Store session ID in localStorage
      localStorage.setItem('sessionId', session_id);
      localStorage.setItem('sessionExpiresAt', expires_at);
      
      console.log('Session created:', session_id);
      return { sessionId: session_id, expiresAt: expires_at };
    } catch (error) {
      console.error('Failed to create session:', error);
      throw error;
    }
  }

  /**
   * Get current session
   */
  getCurrentSession() {
    const sessionId = localStorage.getItem('sessionId');
    const expiresAt = localStorage.getItem('sessionExpiresAt');
    
    if (!sessionId || !expiresAt) {
      return null;
    }

    // Check if session expired
    if (new Date(expiresAt) < new Date()) {
      this.clearSession();
      return null;
    }

    return { sessionId, expiresAt };
  }

  /**
   * Clear session
   */
  clearSession() {
    localStorage.removeItem('sessionId');
    localStorage.removeItem('sessionExpiresAt');
    console.log('Session cleared');
  }

  /**
   * Check session validity
   */
  async validateSession(sessionId) {
    try {
      const response = await api.get(`/sessions/${sessionId}`);
      return response.data.is_active;
    } catch (error) {
      console.error('Session validation failed:', error);
      return false;
    }
  }

  /**
   * Get or create session
   */
  async getOrCreateSession() {
    const currentSession = this.getCurrentSession();
    
    if (currentSession) {
      const isValid = await this.validateSession(currentSession.sessionId);
      if (isValid) {
        return currentSession;
      }
    }

    return await this.createSession();
  }
}

export default new SessionService();
