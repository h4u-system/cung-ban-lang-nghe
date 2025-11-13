// frontend/src/pages/Home/HomePage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChatInterface from '../../components/Chat/ChatInterface';

const HomePage = () => {
  const navigate = useNavigate();

  const quickAccess = [
    {
      path: '/cam-xuc',
      icon: '😊',
      gradient: 'from-blue-400 to-blue-600',
      title: 'Cảm xúc',
      desc: 'Chia sẻ tâm trạng',
      bgColor: 'bg-blue-50',
      hoverShadow: 'hover:shadow-blue-200'
    },
    {
      path: '/tam-su',
      icon: '📝',
      gradient: 'from-purple-400 to-purple-600',
      title: 'Tâm sự',
      desc: 'Tâm sự riêng tư',
      bgColor: 'bg-purple-50',
      hoverShadow: 'hover:shadow-purple-200'
    },
    {
      path: '/hoi-dap',
      icon: '❓',
      gradient: 'from-green-400 to-green-600',
      title: 'Hỏi đáp',
      desc: 'Giải đáp thắc mắc',
      bgColor: 'bg-green-50',
      hoverShadow: 'hover:shadow-green-200'
    },
    {
      path: '/gioi-thieu',
      icon: 'ℹ️',
      gradient: 'from-orange-400 to-orange-600',
      title: 'Giới thiệu',
      desc: 'Về chúng tôi',
      bgColor: 'bg-orange-50',
      hoverShadow: 'hover:shadow-orange-200'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section - Cải thiện */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-10 text-center shadow-2xl">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <div className="inline-block mb-4 animate-bounce">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center text-5xl">
              💙
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Chào mừng đến với Cùng Bạn Lắng Nghe
          </h1>
          
          <p className="text-blue-100 text-base md:text-lg max-w-2xl mx-auto mb-6 leading-relaxed">
            Trợ lý tâm lý học đường với công nghệ AI
            <span className="block mt-1 font-semibold text-white">
              Miễn phí • Ẩn danh 100% • Hỗ trợ 24/7
            </span>
          </p>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { icon: '🔓', text: 'Không cần đăng ký' },
              { icon: '⏰', text: 'Hỗ trợ 24/7' },
              { icon: '🔒', text: 'An toàn tuyệt đối' }
            ].map((badge, index) => (
              <div 
                key={index}
                className="bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full text-sm font-medium text-white border border-white/30 hover:bg-white/30 transition-all"
              >
                <span className="mr-2">{badge.icon}</span>
                {badge.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Access - Cải thiện */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <span className="text-3xl">🎯</span>
          <h2 className="text-2xl font-bold text-gray-800">Truy cập nhanh</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickAccess.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`group ${item.bgColor} rounded-2xl p-6 text-center hover:shadow-2xl ${item.hoverShadow} transition-all duration-300 border-2 border-transparent hover:border-current hover:-translate-y-2`}
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-4xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                {item.icon}
              </div>
              <div className="text-base font-bold text-gray-800 mb-1">
                {item.title}
              </div>
              <div className="text-xs text-gray-600">
                {item.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Interface */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <span className="text-3xl">💬</span>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Bắt đầu trò chuyện</h2>
            <p className="text-sm text-gray-600">Hãy chia sẻ những gì bạn đang cảm thấy...</p>
          </div>
        </div>
        <ChatInterface />
      </div>
    </div>
  );
};

export default HomePage;