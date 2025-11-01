import React from 'react';
import ChatInterface from '../../components/Chat/ChatInterface';

const HomePage = () => {
  return (
    <div className="space-y-4">
      {/* Hero Section */}
      <div className="bg-primary-50 rounded-lg p-6 text-center">
        <h1 className="text-2xl font-bold text-primary-700 mb-2">
          💙 Chào mừng đến với Cùng Bạn Lắng Nghe
        </h1>
        <p className="text-gray-600">
          Trợ lý tâm lý học đường với công nghệ AI - Miễn phí & Ẩn danh 100%
        </p>
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <a href="/camxuc" className="bg-white rounded-lg p-4 text-center hover:shadow-md transition">
          <div className="text-3xl mb-2">😊</div>
          <div className="text-sm font-semibold">Chủ đề cảm xúc</div>
        </a>
        <a href="/chuyen-cua-ban" className="bg-white rounded-lg p-4 text-center hover:shadow-md transition">
          <div className="text-3xl mb-2">📝</div>
          <div className="text-sm font-semibold">Tâm sự</div>
        </a>
        <a href="/hoi-dap" className="bg-white rounded-lg p-4 text-center hover:shadow-md transition">
          <div className="text-3xl mb-2">❓</div>
          <div className="text-sm font-semibold">Hỏi đáp</div>
        </a>
        <a href="/gioi-thieu" className="bg-white rounded-lg p-4 text-center hover:shadow-md transition">
          <div className="text-3xl mb-2">ℹ️</div>
          <div className="text-sm font-semibold">Giới thiệu</div>
        </a>
      </div>

      {/* Chat Interface */}
      <ChatInterface />
    </div>
  );
};

export default HomePage;
