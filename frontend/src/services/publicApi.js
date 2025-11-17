// ============================================
// PUBLIC API SERVICE
// File: frontend/src/services/publicApi.js
// ============================================

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.cungbanlangnghe.vn';

class PublicApiService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // ============================================
  // STORIES
  // ============================================

  async submitStory(storyData) {
    try {
      const response = await this.api.post('/api/v1/stories', storyData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Không thể gửi câu chuyện');
    }
  }

  async getStories(category = null, limit = 20, offset = 0) {
    try {
      const params = { limit, offset };
      if (category) params.category = category;
      
      const response = await this.api.get('/api/v1/stories', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Không thể tải câu chuyện');
    }
  }

  async getStoryDetail(storyId) {
    try {
      const response = await this.api.get(`/api/v1/stories/${storyId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Không thể tải chi tiết câu chuyện');
    }
  }

  async likeStory(storyId) {
    try {
      const response = await this.api.post(`/api/v1/stories/${storyId}/like`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Không thể like câu chuyện');
    }
  }

  // ============================================
  // CONTACT FORM
  // ============================================

  async submitContactForm(formData) {
    try {
      const response = await this.api.post('/api/v1/contact', formData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Không thể gửi tin nhắn');
    }
  }

  // ============================================
  // ANALYTICS (OPTIONAL - TRACK PAGE VIEWS)
  // ============================================

  async trackTopicView(topic) {
    try {
      await this.api.post('/api/v1/analytics/topic-view', { topic });
    } catch (error) {
      // Silent fail - analytics shouldn't block user experience
      console.warn('Analytics tracking failed:', error);
    }
  }
}

export default new PublicApiService();