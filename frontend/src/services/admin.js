// ============================================
// ADMIN SERVICE
// File: frontend/src/services/admin.js
// ============================================

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.cungbanlangnghe.vn';

class AdminService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add token to requests
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('admin_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Handle response errors
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          this.logout();
          if (window.location.pathname !== '/admin/login') {
            window.location.href = '/admin/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // Authentication
  async login(email, password) {
    try {
      const response = await this.api.post('/admin/auth/login', {
        email,
        password,
      });
      
      if (response.data.access_token) {
        localStorage.setItem('admin_token', response.data.access_token);
        localStorage.setItem('admin_user', JSON.stringify(response.data.admin));
      }
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Đăng nhập thất bại');
    }
  }

  logout() {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
  }

  isAuthenticated() {
    return !!localStorage.getItem('admin_token');
  }

  getCurrentAdmin() {
    const user = localStorage.getItem('admin_user');
    return user ? JSON.parse(user) : null;
  }

  // Analytics
  async getAnalytics(startDate, endDate) {
    try {
      const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
      const response = await this.api.get('/admin/analytics/dashboard', {
        params: { days },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Không thể tải thống kê');
    }
  }

  // Messages Management
  async getMessages(page = 1, limit = 20, filters = {}) {
    try {
      const response = await this.api.get('/admin/messages', {
        params: { page, limit, ...filters },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Không thể tải tin nhắn');
    }
  }

  async getMessageById(messageId) {
    try {
      const response = await this.api.get(`/admin/messages/${messageId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Không thể tải chi tiết tin nhắn');
    }
  }

  async flagMessage(messageId, reason) {
    try {
      const response = await this.api.post(`/admin/messages/${messageId}/flag`, {
        reason,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Không thể đánh dấu tin nhắn');
    }
  }

  // Content Management
  async getContent(type, page = 1, limit = 20) {
    try {
      const response = await this.api.get('/admin/content', {
        params: { type, page, limit },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Không thể tải nội dung');
    }
  }

  async createContent(data) {
    try {
      const response = await this.api.post('/admin/content', data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Không thể tạo nội dung');
    }
  }

  async updateContent(contentId, data) {
    try {
      const response = await this.api.put(`/admin/content/${contentId}`, data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Không thể cập nhật nội dung');
    }
  }

  async deleteContent(contentId) {
    try {
      const response = await this.api.delete(`/admin/content/${contentId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Không thể xóa nội dung');
    }
  }
}

export default new AdminService();