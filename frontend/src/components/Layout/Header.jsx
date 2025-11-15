// frontend/src/components/Layout/Header.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shadow-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            
              href="/"
              onClick={handleLogoClick}
              className="flex items-center gap-3 hover:opacity-90 transition-all duration-200 group cursor-pointer"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <span className="text-3xl md:text-4xl">💙</span>
              </div>
              <div className="text-left">
                <h1 className="text-lg md:text-xl font-bold tracking-tight">
                  Cùng Bạn Lắng Nghe
                </h1>
                <p className="text-xs md:text-sm text-blue-100 font-medium">
                  Trợ lý tâm lý học đường AI
                </p>
              </div>
            </a>

            <button
              onClick={() => setShowInfo(true)}
              className="p-3 hover:bg-white/10 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/50"
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

      {showInfo && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowInfo(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-3xl">ℹ️</span>
                  Về chúng tôi
                </h2>
              </div>
              <button
                onClick={() => setShowInfo(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-all focus:outline-none focus:ring-2 focus:ring-gray-300"
                aria-label="Đóng"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-4 text-sm text-gray-700">
              <p className="leading-relaxed">
                <strong className="text-blue-600 text-base">Cùng Bạn Lắng Nghe</strong> là một trong những nền tảng hỗ trợ
                tâm lý học đường đầu tiên tại Việt Nam sử dụng công nghệ AI.
              </p>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 space-y-3 border-2 border-blue-100">
                {[
                  { icon: '✓', text: '100% miễn phí', sub: 'cho học sinh, sinh viên' },
                  { icon: '✓', text: 'Hoàn toàn ẩn danh', sub: 'không lưu thông tin' },
                  { icon: '✓', text: 'Hoạt động 24/7', sub: 'sẵn sàng lắng nghe' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {item.icon}
                    </span>
                    <div className="flex-1">
                      <span className="font-semibold text-gray-800">{item.text}</span>
                      <span className="text-gray-600"> - {item.sub}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl">
                <p className="text-xs text-amber-800">
                  <strong>⚠️ Lưu ý:</strong> Đây là công cụ hỗ trợ, không thay thế tư vấn chuyên nghiệp.
                </p>
              </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-b-3xl border-t border-gray-200">
              <button
                onClick={() => setShowInfo(false)}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Đã hiểu
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;