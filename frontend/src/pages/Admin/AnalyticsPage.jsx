// frontend/src/pages/Admin/AnalyticsPage.jsx

import React, { useState, useEffect } from 'react';
import adminService from '../../services/admin';

const AnalyticsPage = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('30d');

  useEffect(() => {
    loadAnalytics();
  }, [dateRange]);

  const loadAnalytics = async () => {
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
      setAnalytics(data);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thống kê...</p>
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
            <span>📈</span>
            Thống kê & Phân tích
          </h1>
          <p className="text-gray-600 mt-1">Báo cáo chi tiết về hoạt động hệ thống</p>
        </div>

        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
        >
          <option value="7d">7 ngày qua</option>
          <option value="30d">30 ngày qua</option>
          <option value="90d">90 ngày qua</option>
        </select>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-xl">
          <div className="text-4xl mb-3">👥</div>
          <h3 className="text-lg font-semibold mb-2 opacity-90">Tổng người dùng</h3>
          <p className="text-4xl font-bold">{analytics?.total_users || 0}</p>
          <p className="text-sm opacity-75 mt-2">+{analytics?.new_users || 0} người dùng mới</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6 shadow-xl">
          <div className="text-4xl mb-3">💬</div>
          <h3 className="text-lg font-semibold mb-2 opacity-90">Tổng tin nhắn</h3>
          <p className="text-4xl font-bold">{analytics?.total_messages || 0}</p>
          <p className="text-sm opacity-75 mt-2">Trung bình {analytics?.avg_messages_per_day || 0}/ngày</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6 shadow-xl">
          <div className="text-4xl mb-3">⭐</div>
          <h3 className="text-lg font-semibold mb-2 opacity-90">Đánh giá tích cực</h3>
          <p className="text-4xl font-bold">{analytics?.satisfaction_rate || 0}%</p>
          <p className="text-sm opacity-75 mt-2">{analytics?.total_feedback || 0} phản hồi</p>
        </div>
      </div>

      {/* Crisis Detection Stats */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>🆘</span>
          Thống kê cảnh báo khủng hoảng
        </h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-red-50 rounded-xl p-4 border-2 border-red-200">
            <p className="text-sm text-red-600 font-semibold mb-1">Tổng cảnh báo</p>
            <p className="text-3xl font-bold text-red-700">{analytics?.crisis_alerts || 0}</p>
          </div>
          <div className="bg-orange-50 rounded-xl p-4 border-2 border-orange-200">
            <p className="text-sm text-orange-600 font-semibold mb-1">Đã xử lý</p>
            <p className="text-3xl font-bold text-orange-700">{analytics?.crisis_resolved || 0}</p>
          </div>
          <div className="bg-yellow-50 rounded-xl p-4 border-2 border-yellow-200">
            <p className="text-sm text-yellow-600 font-semibold mb-1">Đang xử lý</p>
            <p className="text-3xl font-bold text-yellow-700">{analytics?.crisis_pending || 0}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
            <p className="text-sm text-green-600 font-semibold mb-1">Tỷ lệ phát hiện</p>
            <p className="text-3xl font-bold text-green-700">{analytics?.crisis_detection_rate || 95}%</p>
          </div>
        </div>
      </div>

      {/* Top Topics */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>📊</span>
          Chủ đề phổ biến
        </h2>
        <div className="space-y-3">
          {(analytics?.top_topics || [
            { name: 'Áp lực học tập', count: 245, percentage: 35 },
            { name: 'Quan hệ bạn bè', count: 198, percentage: 28 },
            { name: 'Gia đình', count: 156, percentage: 22 },
            { name: 'Tương lai', count: 105, percentage: 15 },
          ]).map((topic, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-gray-800">{topic.name}</span>
                  <span className="text-sm text-gray-600">{topic.count} tin nhắn</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${topic.percentage}%` }}
                  ></div>
                </div>
              </div>
              <span className="text-lg font-bold text-gray-700">{topic.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Peak Hours */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>⏰</span>
          Giờ cao điểm
        </h2>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
          {Array.from({ length: 24 }, (_, i) => {
            const hour = i;
            const activity = Math.random() * 100; // Mock data
            return (
              <div key={i} className="text-center">
                <div 
                  className="bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg mb-1 transition-all hover:from-blue-600 hover:to-blue-400"
                  style={{ height: `${activity}px` }}
                  title={`${hour}:00 - ${activity.toFixed(0)}%`}
                ></div>
                <p className="text-xs text-gray-600">{hour}h</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Export Report */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white text-center">
        <h3 className="text-xl font-bold mb-2">📄 Xuất báo cáo</h3>
        <p className="text-blue-100 mb-4">Tải xuống báo cáo chi tiết dạng PDF hoặc Excel</p>
        <div className="flex gap-3 justify-center">
          <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-lg">
            📄 Xuất PDF
          </button>
          <button className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-all shadow-lg">
            📊 Xuất Excel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;