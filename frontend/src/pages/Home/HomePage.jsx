// *************************************************
// File: frontend/src/pages/Home/HomePage.jsx
// Unified design
// *************************************************


import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ChatInterface from '../../components/Chat/ChatInterface';

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const chatSectionRef = useRef(null);

  // ✅ FIX: Chặn cuộn tự động khi vào trang chủ lần đầu
  useEffect(() => {
    // ĐIỀU KIỆN CHẶN CUỘN:
    // 1. Đang ở trang chủ ('/')
    // 2. KHÔNG có hash trong URL (không phải từ link nội bộ)
    // 3. Key === 'default' (lần tải trang đầu tiên)
    if (location.pathname === '/' && !location.hash && location.key === 'default') {
      // Không làm gì cả - để người dùng ở vị trí đầu trang
      return;
    }

    // Chỉ cuộn khi:
    // - Có hash #chat-section
    // - HOẶC navigate từ nút "Bắt đầu trò chuyện"
    if (chatSectionRef.current && (location.hash === '#chat-section' || location.state?.scrollToChat)) {
      const timer = setTimeout(() => {
        chatSectionRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, location.hash, location.key, location.state]);

  const quickAccess = [
    {
      path: '/cam-xuc',
      icon: '😊',
      gradient: 'from-blue-500 to-blue-600',
      title: 'Cảm xúc',
      desc: 'Chia sẻ tâm trạng',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      hoverShadow: 'hover:shadow-blue-200'
    },
    {
      path: '/tam-su',
      icon: '📝',
      gradient: 'from-purple-500 to-purple-600',
      title: 'Tâm sự',
      desc: 'Đọc câu chuyện',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      hoverShadow: 'hover:shadow-purple-200'
    },
    {
      path: '/hoi-dap',
      icon: '❓',
      gradient: 'from-green-500 to-green-600',
      title: 'Hỏi đáp',
      desc: 'Giải đáp thắc mắc',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      hoverShadow: 'hover:shadow-green-200'
    },
    {
      path: '/gioi-thieu',
      icon: 'ℹ️',
      gradient: 'from-orange-500 to-orange-600',
      title: 'Giới thiệu',
      desc: 'Về chúng tôi',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      hoverShadow: 'hover:shadow-orange-200'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section - Consistent Design */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-10 md:p-14 text-center shadow-2xl">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center w-24 h-24 mb-6 bg-white/20 backdrop-blur-sm rounded-3xl shadow-xl animate-bounce">
            <span className="text-6xl">💙</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 text-white leading-tight">
            Chào mừng đến với<br className="md:hidden" />
            <span className="block md:inline"> Cùng Bạn Lắng Nghe</span>
          </h1>

          <p className="text-lg md:text-xl text-blue-100 mb-4 leading-relaxed">
            Trợ lý tâm lý học đường với công nghệ AI
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm md:text-base font-semibold text-white mb-8">
            <span className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Miễn phí 100%
            </span>
            <span className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Ẩn danh tuyệt đối
            </span>
            <span className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Hỗ trợ 24/7
            </span>
          </div>

          <button
            onClick={() => chatSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-3 bg-white hover:bg-blue-50 text-blue-600 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95"
          >
            <span>💬</span>
            <span>Bắt đầu trò chuyện ngay</span>
          </button>
        </div>
      </section>

      {/* Quick Access - Unified Card Design */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-4xl">🎯</span>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Truy cập nhanh</h2>
            <p className="text-gray-600 mt-1">Khám phá các tính năng hỗ trợ</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {quickAccess.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`group ${item.bgColor} rounded-2xl p-6 md:p-8 text-center border-2 ${item.borderColor} hover:shadow-2xl ${item.hoverShadow} transition-all duration-300 hover:-translate-y-2 focus:outline-none focus:ring-4 focus:ring-blue-300`}
            >
              <div className={`w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-4xl md:text-5xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                {item.icon}
              </div>
              <h3 className="text-base md:text-lg font-bold text-gray-800 mb-1">
                {item.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-600">
                {item.desc}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* Chat Section - Main Focus */}
      <section ref={chatSectionRef} id="chat-section" className="scroll-mt-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-4xl">💬</span>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Trò chuyện với Banana</h2>
            <p className="text-gray-600 mt-1">Chia sẻ những gì bạn đang cảm thấy...</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-200 overflow-hidden">
          <ChatInterface />
        </div>
      </section>

      {/* Security Section - Unified Design */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-10 border-2 border-blue-200 shadow-xl">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-5xl mb-5">🛡️</div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            An toàn & Bảo mật tuyệt đối
          </h3>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8">
            Tất cả cuộc trò chuyện được <strong className="text-blue-700">mã hóa đầu cuối (AES-256)</strong> và 
            <strong className="text-blue-700"> không lưu trữ thông tin cá nhân</strong>. 
            Chúng tôi cam kết bảo vệ quyền riêng tư của bạn tuyệt đối.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            {[
              { icon: '🔐', title: 'Mã hóa AES-256', desc: 'Bảo mật cấp ngân hàng' },
              { icon: '🚫', title: 'Zero PII Policy', desc: 'Không thu thập dữ liệu cá nhân' },
              { icon: '⏱️', title: 'Tự động xóa', desc: 'Tin nhắn xóa sau 30 ngày' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border-2 border-blue-200 hover:shadow-xl transition-all">
                <div className="text-4xl mb-3">{item.icon}</div>
                <div className="font-bold text-gray-800 mb-2 text-base">{item.title}</div>
                <div className="text-xs text-gray-600">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;