// frontend/src/components/Layout/Header.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shadow-xl sticky top-0 z-50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Title - CLICKABLE */}
            <button 
              onClick={handleLogoClick}
              className="flex items-center space-x-3 hover:opacity-80 transition-all duration-200 group"
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <span className="text-4xl">💙</span>
              </div>
              <div className="text-left">
                <h1 className="text-xl md:text-2xl font-bold tracking-tight group-hover:scale-105 transition-transform">
                  Cùng Bạn Lắng Nghe
                </h1>
                <p className="text-xs md:text-sm text-blue-100 font-medium">
                  Trợ lý tâm lý học đường AI
                </p>
              </div>
            </button>

            {/* Info Button */}
            <button 
              onClick={() => setShowInfo(true)}
              className="p-3 hover:bg-white/10 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95"
              aria-label="Thông tin"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Info Modal */}
      {showInfo && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowInfo(false)}
        >
          <div 
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-3xl">ℹ️</span>
                  Về chúng tôi
                </h2>
              </div>
              <button 
                onClick={() => setShowInfo(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4 text-sm text-gray-600">
              <p className="leading-relaxed">
                <strong className="text-blue-600 text-base">Cùng Bạn Lắng Nghe</strong> là nền tảng hỗ trợ 
                tâm lý học đường đầu tiên tại Việt Nam sử dụng công nghệ AI.
              </p>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 space-y-3 border border-blue-100">
                <p className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</span>
                  <span><strong className="text-gray-800">100% miễn phí</strong> cho học sinh, sinh viên</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</span>
                  <span><strong className="text-gray-800">Hoàn toàn ẩn danh</strong>, không lưu thông tin</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</span>
                  <span><strong className="text-gray-800">Hoạt động 24/7</strong>, sẵn sàng lắng nghe</span>
                </p>
              </div>
              
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl">
                <p className="text-xs text-amber-800">
                  ⚠️ <strong>Lưu ý:</strong> Đây là công cụ hỗ trợ, không thay thế tư vấn chuyên nghiệp
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setShowInfo(false)}
              className="mt-6 w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3.5 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              Đã hiểu
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;