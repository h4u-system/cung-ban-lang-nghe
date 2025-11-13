// frontend/src/pages/Admin/MessagesPage.jsx

import React, { useState, useEffect } from 'react';
import adminService from '../../services/admin';

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filters, setFilters] = useState({
    crisis_only: false,
    flagged_only: false,
  });
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadMessages();
  }, [page, filters]);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const data = await adminService.getMessages(page, 20, filters);
      setMessages(data.messages || []);
    } catch (error) {
      console.error('Failed to load messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFlagMessage = async (messageId, reason) => {
    try {
      await adminService.flagMessage(messageId, reason);
      alert('Đã đánh dấu tin nhắn thành công');
      loadMessages();
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading && messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải tin nhắn...</p>
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
            <span>💬</span>
            Quản lý tin nhắn
          </h1>
          <p className="text-gray-600 mt-1">Xem và kiểm duyệt tin nhắn từ người dùng</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-lg flex gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.crisis_only}
            onChange={(e) => setFilters({ ...filters, crisis_only: e.target.checked })}
            className="w-5 h-5 rounded border-gray-300 text-red-500 focus:ring-red-500"
          />
          <span className="font-medium text-gray-700">🆘 Chỉ cảnh báo khủng hoảng</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.flagged_only}
            onChange={(e) => setFilters({ ...filters, flagged_only: e.target.checked })}
            className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
          />
          <span className="font-medium text-gray-700">🚩 Đã đánh dấu</span>
        </label>
      </div>

      {/* Messages List */}
      <div className="grid gap-4">
        {messages.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Không có tin nhắn</h3>
            <p className="text-gray-600">Chưa có tin nhắn nào phù hợp với bộ lọc</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer ${
                message.crisis_detected ? 'border-2 border-red-500' : ''
              }`}
              onClick={() => setSelectedMessage(message)}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl ${
                    message.role === 'user' 
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                      : 'bg-gradient-to-br from-purple-500 to-purple-600'
                  } flex items-center justify-center text-white text-xl`}>
                    {message.role === 'user' ? '👤' : '🤖'}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {message.role === 'user' ? 'Người dùng' : 'AI Assistant'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(message.created_at).toLocaleString('vi-VN')}
                    </p>
                  </div>
                </div>

                {message.crisis_detected && (
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">
                    🆘 Khủng hoảng
                  </span>
                )}
              </div>

              <p className="text-gray-700 line-clamp-3 leading-relaxed">
                {message.content}
              </p>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFlagMessage(message.id, 'review_needed');
                  }}
                  className="px-4 py-2 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-lg text-sm font-medium transition-all"
                >
                  🚩 Đánh dấu
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedMessage(message);
                  }}
                  className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-sm font-medium transition-all"
                >
                  👁️ Chi tiết
                </button>
              </div>
              </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-white hover:bg-gray-100 disabled:bg-gray-100 disabled:cursor-not-allowed rounded-xl font-medium transition-all shadow-md"
        >
          ← Trước
        </button>
        <span className="px-4 py-2 bg-white rounded-xl font-medium shadow-md">
          Trang {page}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={messages.length < 20}
          className="px-4 py-2 bg-white hover:bg-gray-100 disabled:bg-gray-100 disabled:cursor-not-allowed rounded-xl font-medium transition-all shadow-md"
        >
          Sau →
        </button>
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedMessage(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl animate-slide-up max-h-[80vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 rounded-t-3xl">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Chi tiết tin nhắn</h2>
                  <p className="text-purple-100 text-sm">
                    {new Date(selectedMessage.created_at).toLocaleString('vi-VN')}
                  </p>
                </div>
                <button 
                  onClick={() => setSelectedMessage(null)}
                  className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Message Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-600 mb-1">ID tin nhắn</p>
                  <p className="text-sm font-mono text-gray-800 truncate">{selectedMessage.id}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-600 mb-1">Vai trò</p>
                  <p className="text-sm font-medium text-gray-800">
                    {selectedMessage.role === 'user' ? '👤 Người dùng' : '🤖 AI Assistant'}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-600 mb-1">Phiên chat</p>
                  <p className="text-sm font-mono text-gray-800 truncate">{selectedMessage.session_id}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-600 mb-1">Trạng thái</p>
                  {selectedMessage.crisis_detected ? (
                    <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">
                      🆘 Cảnh báo khủng hoảng
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                      ✅ Bình thường
                    </span>
                  )}
                </div>
              </div>

              {/* Message Content */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-100">
                <p className="text-xs font-semibold text-blue-700 mb-3">NỘI DUNG TIN NHẮN</p>
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.content}
                </p>
              </div>

              {/* AI Metadata (if assistant message) */}
              {selectedMessage.role === 'assistant' && selectedMessage.model_used && (
                <div className="bg-purple-50 rounded-2xl p-6 border-2 border-purple-100">
                  <p className="text-xs font-semibold text-purple-700 mb-3">THÔNG TIN AI</p>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 mb-1">Model sử dụng:</p>
                      <p className="font-mono font-medium text-gray-800">{selectedMessage.model_used}</p>
                    </div>
                    {selectedMessage.processing_time_ms && (
                      <div>
                        <p className="text-gray-600 mb-1">Thời gian xử lý:</p>
                        <p className="font-medium text-gray-800">{selectedMessage.processing_time_ms}ms</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Crisis Info */}
              {selectedMessage.crisis_detected && selectedMessage.crisis_info && (
                <div className="bg-red-50 rounded-2xl p-6 border-2 border-red-200">
                  <p className="text-xs font-semibold text-red-700 mb-3">🆘 THÔNG TIN KHỦNG HOẢNG</p>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-semibold">Mức độ:</span> {selectedMessage.crisis_info.severity || 'Cao'}</p>
                    <p><span className="font-semibold">Từ khóa phát hiện:</span> {selectedMessage.crisis_info.keywords?.join(', ') || 'N/A'}</p>
                    <p><span className="font-semibold">Khuyến nghị:</span> {selectedMessage.crisis_info.recommendation || 'Liên hệ khẩn cấp'}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="sticky bottom-0 bg-gray-50 p-6 rounded-b-3xl border-t border-gray-200 flex gap-3">
              <button
                onClick={() => {
                  handleFlagMessage(selectedMessage.id, 'inappropriate');
                  setSelectedMessage(null);
                }}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition-all shadow-lg"
              >
                🚩 Đánh dấu không phù hợp
              </button>
              <button
                onClick={() => setSelectedMessage(null)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold transition-all"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesPage;