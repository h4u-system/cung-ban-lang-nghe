// frontend/src/pages/Admin/DashboardPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import adminService from '../../services/admin';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('7d');

  useEffect(() => {
    loadStats();
  }, [dateRange]);

  const loadStats = async () => {
    try {
      setLoading(true);
      const endDate = new Date();
      const startDate = new Date();
      
      if (dateRange === '7d') startDate.setDate(startDate.getDate() - 7);
      else if (dateRange === '30d') startDate.setDate(startDate.getDate() - 30);
      else if (dateRange === '90d') startDate.setDate(startDate.getDate() - 90);

      const data = await adminService.getAnalytics(
        startDate.toISOString(),
        endDate.toISOString()
      );
      setStats(data);
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statsCards = stats ? [
    {
      title: 'Tổng phiên chat',
      value: stats.total_sessions || 0,
      icon: '👥',
      color: 'from-blue-500 to-blue-600',
      change: '+12%'
    },
    {
      title: 'Tin nhắn',
      value: stats.total_messages || 0,
      icon: '💬',
      color: 'from-purple-500 to-purple-600',
      change: '+8%'
    },
    {
      title: 'Cảnh báo khủng hoảng',
      value: stats.crisis_detected || 0,
      icon: '🆘',
      color: 'from-red-500 to-red-600',
      change: '-5%'
    },
    {
      title: 'Phản hồi tích cực',
      value: stats.positive_feedback || 0,
      icon: '⭐',
      color: 'from-green-500 to-green-600',
      change: '+15%'
    },
  ] : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <span>📊</span>
            Dashboard
          </h1>
          <p className="text-gray-600 mt-1">Tổng quan hệ thống</p>
        </div>

        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
        >
          <option value="7d">7 ngày qua</option>
          <option value="30d">30 ngày qua</option>
          <option value="90d">90 ngày qua</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center text-3xl shadow-lg`}>
                {card.icon}
              </div>
              <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                {card.change}
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">{card.title}</h3>
            <p className="text-3xl font-bold text-gray-800">{card.value.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>⚡</span>
          Thao tác nhanh
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => navigate('/admin/messages')}
            className="bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 p-4 rounded-xl transition-all text-left">
            <div className="text-2xl mb-2">👀</div>
            <div className="font-semibold text-gray-800">Xem tin nhắn mới</div>
          </button>
          <button 
            onClick={() => navigate('/admin/analytics')}
            className="bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 p-4 rounded-xl transition-all text-left">
            <div className="text-2xl mb-2">📊</div>
            <div className="font-semibold text-gray-800">Xem báo cáo</div>
          </button>
          <button 
            onClick={() => navigate('/admin/content')}
            className="bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 p-4 rounded-xl transition-all text-left">
            <div className="text-2xl mb-2">✅</div>
            <div className="font-semibold text-gray-800">Duyệt nội dung</div>
          </button>
          <button className="bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 p-4 rounded-xl transition-all text-left">
            <div className="text-2xl mb-2">⚙️</div>
            <div className="font-semibold text-gray-800">Cài đặt</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;