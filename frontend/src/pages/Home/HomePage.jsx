// *************************************************
// File: frontend/src/pages/Home/HomePage.jsx
// Unified design
// *************************************************

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ChatInterface from '../../components/Chat/ChatInterface';

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const chatSectionRef = useRef(null);
  const [showPrivacyDetails, setShowPrivacyDetails] = useState(false);

  useEffect(() => {
    if (location.pathname === '/' && !location.hash && location.key === 'default') {
      return;
    }

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
      desc: 'Về chúng mình',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      hoverShadow: 'hover:shadow-orange-200'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-8 md:p-12 lg:p-14 text-center shadow-2xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 mb-5 md:mb-6 bg-white/20 backdrop-blur-sm rounded-3xl shadow-xl animate-bounce">
            <span className="text-5xl md:text-6xl">💙</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-5 text-white leading-tight">
            Chào mừng đến với
            <br className="sm:hidden" />
            <span className="block mt-2 md:mt-3">
              <span className="inline-block">Cùng Bạn Lắng Nghe</span>
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 md:mb-8 leading-relaxed px-4">
            Trợ lý tâm lý học đường với công nghệ AI
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 text-xs sm:text-sm md:text-base font-semibold text-white mb-6 md:mb-8 px-4">
            <span className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 md:px-4 py-2 rounded-full border border-white/30">
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="whitespace-nowrap">Miễn phí 100%</span>
            </span>
            <span className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 md:px-4 py-2 rounded-full border border-white/30">
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="whitespace-nowrap">Ẩn danh tuyệt đối</span>
            </span>
            <span className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 md:px-4 py-2 rounded-full border border-white/30">
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="whitespace-nowrap">Hỗ trợ 24/7</span>
            </span>
          </div>

          <button
            onClick={() => chatSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 md:gap-3 bg-white hover:bg-blue-50 text-blue-600 px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-base md:text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95"
          >
            <span className="text-xl md:text-2xl">💬</span>
            <span className="whitespace-nowrap">Bắt đầu trò chuyện ngay</span>
          </button>
        </div>
      </section>

      {/* Quick Access */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl md:text-4xl">🎯</span>
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">Truy cập nhanh</h2>
            <p className="text-sm md:text-base text-gray-600 mt-1">Khám phá các tính năng hỗ trợ</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
          {quickAccess.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`group ${item.bgColor} rounded-2xl p-4 md:p-6 lg:p-8 text-center border-2 ${item.borderColor} hover:shadow-2xl ${item.hoverShadow} transition-all duration-300 hover:-translate-y-2 focus:outline-none focus:ring-4 focus:ring-blue-300`}
            >
              <div className={`w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 mx-auto mb-3 md:mb-4 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-3xl md:text-4xl lg:text-5xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                {item.icon}
              </div>
              <h3 className="text-sm md:text-base lg:text-lg font-bold text-gray-800 mb-1">
                {item.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-600">
                {item.desc}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* Chat Section - MOBILE OPTIMIZED */}
      <section ref={chatSectionRef} id="chat-section" className="scroll-mt-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl md:text-4xl">💬</span>
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
              Trò chuyện với Banana
            </h2>
            <p className="text-sm md:text-base text-gray-600 mt-1">
              Chia sẻ những gì bạn đang cảm thấy...
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl border-2 border-gray-200 overflow-hidden">
          <ChatInterface />
        </div>
      </section>

      {/* ===== UNIFIED PRIVACY & SECURITY SECTION ===== */}
      <section className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 rounded-3xl p-6 md:p-10 border-2 border-purple-200 shadow-xl">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-5xl md:text-6xl mb-4">🔒</div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 leading-tight">
              Bảo mật & Quyền riêng tư tuyệt đối
            </h3>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed px-4">
              Chúng tôi cam kết bảo vệ quyền riêng tư của bạn với công nghệ mã hóa hàng đầu
            </p>
          </div>

          {/* Key Features Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
            {[
              { 
                icon: '🔐', 
                title: 'Mã hóa AES-256', 
                desc: 'Bảo mật với công nghệ mã hóa tiên tiến',
                color: 'blue'
              },
              { 
                icon: '🚫', 
                title: 'Zero PII Policy', 
                desc: 'Không thu thập dữ liệu cá nhân',
                color: 'purple'
              },
              { 
                icon: '⏱️', 
                title: 'Tự động xóa', 
                desc: 'Tin nhắn xóa sau 30 ngày',
                color: 'indigo'
              },
              { 
                icon: '🌐', 
                title: 'Hoàn toàn ẩn danh', 
                desc: 'Không cần đăng ký tài khoản',
                color: 'green'
              },
              { 
                icon: '⚖️', 
                title: 'Tuân thủ NĐ 13/2023', 
                desc: 'Đúng pháp luật Việt Nam',
                color: 'orange'
              },
              { 
                icon: '🛡️', 
                title: 'An toàn 24/7', 
                desc: 'Giám sát khủng hoảng liên tục bằng AI',
                color: 'red'
              }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className={`bg-white rounded-2xl p-5 md:p-6 border-2 border-${item.color}-200 hover:shadow-xl transition-all hover:-translate-y-1 group`}
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{item.icon}</div>
                <div className="font-bold text-gray-800 mb-2 text-base md:text-lg">{item.title}</div>
                <div className="text-sm text-gray-600">{item.desc}</div>
              </div>
            ))}
          </div>

          {/* Expandable Details Section */}
          <div className="bg-white rounded-2xl border-2 border-purple-200 overflow-hidden shadow-md">
            <button
              onClick={() => setShowPrivacyDetails(!showPrivacyDetails)}
              className="w-full px-6 py-5 flex items-center justify-between hover:bg-purple-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">📋</span>
                <div className="text-left">
                  <h4 className="font-bold text-gray-800 text-lg">Chi tiết Chính sách Bảo mật</h4>
                  <p className="text-sm text-gray-600">Xem đầy đủ cam kết bảo vệ quyền riêng tư</p>
                </div>
              </div>
              <svg 
                className={`w-6 h-6 text-purple-600 transition-transform duration-300 ${showPrivacyDetails ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Collapsible Content */}
            <div 
              className={`overflow-hidden transition-all duration-300 ${
                showPrivacyDetails ? 'max-h-[2000px]' : 'max-h-0'
              }`}
            >
              <div className="px-6 py-5 border-t-2 border-purple-100 space-y-6">
                {/* Core Commitments */}
                <div>
                  <h5 className="font-bold text-gray-800 mb-3 flex items-center text-lg">
                    <span className="mr-2">✅</span>
                    Cam kết của Banana
                  </h5>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">▪</span>
                      <span><strong>Không yêu cầu đăng ký:</strong> Truy cập ngay, Session ID tạm thời</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">▪</span>
                      <span><strong>Mã hóa End-to-End:</strong> Mọi tin nhắn được mã hóa AES-256 trên thiết bị của bạn</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">▪</span>
                      <span><strong>Zero-Knowledge:</strong> Chúng tôi KHÔNG THỂ đọc nội dung trò chuyện của bạn</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">▪</span>
                      <span><strong>Tự động xóa:</strong> Dữ liệu tự động bị xóa sau 30 ngày, KHÔNG THỂ khôi phục</span>
                    </div>
                  </div>
                </div>

                {/* Legal Compliance Badges */}
                <div>
                  <h5 className="font-bold text-gray-800 mb-3 flex items-center text-lg">
                    <span className="mr-2">⚖️</span>
                    Tuân thủ Pháp luật
                  </h5>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { 
                        title: 'Nghị định 13/2023/NĐ-CP', 
                        desc: 'Bảo vệ dữ liệu cá nhân',
                        icon: '📜'
                      },
                      { 
                        title: 'Luật An toàn Thông tin Mạng', 
                        desc: 'Đảm bảo an ninh hệ thống',
                        icon: '🔐'
                      },
                      { 
                        title: 'Luật Bảo vệ Trẻ em', 
                        desc: 'Ưu tiên an toàn học sinh',
                        icon: '👶'
                      },
                      { 
                        title: 'GDPR-compliant', 
                        desc: 'Chuẩn quốc tế về privacy',
                        icon: '🌍'
                      }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xl">{item.icon}</span>
                          <span className="font-semibold text-gray-800 text-sm">{item.title}</span>
                        </div>
                        <p className="text-xs text-gray-600">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA to Privacy Dashboard */}
                <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl p-5 border-2 border-purple-300">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-center sm:text-left">
                      <p className="font-bold text-gray-800 mb-1 text-base">Quản lý Quyền riêng tư của bạn</p>
                      <p className="text-sm text-gray-600">Xem, xuất, hoặc xóa dữ liệu bất cứ lúc nào</p>
                    </div>
                    <a
                      href="/quyen-rieng-tu"
                      className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 whitespace-nowrap"
                    >
                      <span>🔐</span>
                      <span>Privacy Dashboard</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Note */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              Mọi thắc mắc về quyền riêng tư, vui lòng liên hệ: <strong className="text-purple-600">privacy@banana.vn</strong>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;