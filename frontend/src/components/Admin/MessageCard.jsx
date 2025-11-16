// frontend/src/components/Admin/MessageCard.jsx

import React from 'react';

const MessageCard = ({ message, onClick, onFlag }) => {
  return (
    <div
      className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer ${
        message.crisis_detected ? 'border-2 border-red-500' : ''
      }`}
      onClick={onClick}
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
        {message.content || message.content_encrypted || 'Nội dung được mã hóa'}
      </p>

      <div className="mt-4 flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFlag(message.id);
          }}
          className="px-4 py-2 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-lg text-sm font-medium transition-all"
        >
          🚩 Đánh dấu
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-sm font-medium transition-all"
        >
          👁️ Chi tiết
        </button>
      </div>
    </div>
  );
};

export default MessageCard;