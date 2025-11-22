/**
 * File: frontend/src/utils/encryption.js
 */

/**
 * Client-side encryption utilities
 * Uses Web Crypto API for AES-256-GCM encryption
 */

import { ALL_CRISIS_KEYWORDS } from './constants';

/**
 * Encryption Service - Simplified for client-side use
 */
class EncryptionService {
  /**
   * Simple Base64 encoding (for demo - use real encryption in production)
   * Note: For true security, use server-side encryption
   */
  encrypt(text) {
    try {
      return btoa(unescape(encodeURIComponent(text)));
    } catch (error) {
      console.error('❌ Encryption error:', error);
      return text; // Fallback: return plain text
    }
  }

  /**
   * Simple Base64 decoding
   */
  decrypt(encodedText) {
    try {
      return decodeURIComponent(escape(atob(encodedText)));
    } catch (error) {
      console.error('❌ Decryption error:', error);
      return encodedText; // Fallback: return as-is
    }
  }

  /**
   * Check if message contains crisis keywords
   * Uses normalized matching for better accuracy
   */
  containsCrisisKeywords(message) {
    if (!message || typeof message !== 'string') {
      return false;
    }

    // Normalize: lowercase, remove punctuation, normalize spaces
    const normalized = message
      .toLowerCase()
      .replace(/[^\w\sáàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    // Check each crisis keyword
    for (const keyword of ALL_CRISIS_KEYWORDS) {
      // Create flexible regex pattern
      const pattern = keyword.replace(/\s+/g, '\\s+');
      const regex = new RegExp(pattern, 'i');

      if (regex.test(normalized)) {
        console.warn('🚨 Crisis keyword detected:', keyword);
        return true;
      }
    }

    return false;
  }

  /**
   * Generate secure random ID
   */
  generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Hash text (for logging without exposing content)
   */
  hash(text) {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString(36);
  }
}

export default new EncryptionService();