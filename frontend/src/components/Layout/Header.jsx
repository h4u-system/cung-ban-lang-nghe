// frontend/src/components/Layout/Header.jsx

import React, { useState } from 'react';

const Header = () => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      <header className="bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Title */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                <span className="text-3xl">💙</span>
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold tracking-tight">
                  Cùng Bạn Lắng Nghe
                </h1>
                <p className="text-xs md:text-sm text-primary-100 font-medium">
                  Trợ lý tâm lý học đường AI
                </p>
              </div>
            </div>

            {/* Info Button */}
            <button 
              onClick={() => setShowInfo(true)}
              className="p-2.5 hover:bg-primary-600/50 rounded-full transition-all duration-200 hover:scale-110"
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
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowInfo(false)}
        >
          <div 
            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                ℹ️ Về chúng tôi
              </h2>
              <button 
                onClick={() => setShowInfo(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-3 text-sm text-gray-600">
              <p>
                <strong className="text-primary-600">Cùng Bạn Lắng Nghe</strong> là một trong những nền tảng hỗ trợ 
                tâm lý học đường đầu tiên tại Việt Nam sử dụng công nghệ AI.
              </p>
              <div className="bg-primary-50 rounded-lg p-3 space-y-2">
                <p className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span><strong>100% miễn phí</strong> cho học sinh, sinh viên</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span><strong>Hoàn toàn ẩn danh</strong>, không lưu thông tin</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span><strong>Hoạt động 24/7</strong>, sẵn sàng lắng nghe</span>
                </p>
              </div>
              <p className="text-xs text-gray-500 italic">
                * Đây là công cụ hỗ trợ, không thay thế tư vấn chuyên nghiệp
              </p>
            </div>
            
            <button
              onClick={() => setShowInfo(false)}
              className="mt-6 w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
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