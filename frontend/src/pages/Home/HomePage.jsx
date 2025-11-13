// frontend/src/pages/Home/HomePage.jsx

import React from 'react';
import ChatInterface from '../../components/Chat/ChatInterface';

const HomePage = () => {
  const quickAccess = [
    {
      href: '/cam-xuc',
      icon: '😊',
      title: 'Cảm xúc',
      desc: 'Chia sẻ tâm trạng',
      color: 'from-blue-400 to-blue-500'
    },
    {
      href: '/tam-su',
      icon: '📝',
      title: 'Tâm sự',
      desc: 'Tâm sự riêng tư',
      color: 'from-purple-400 to-purple-500'
    },
    {
      href: '/hoi-dap',
      icon: '❓',
      title: 'Hỏi đáp',
      desc: 'Giải đáp thắc mắc',
      color: 'from-green-400 to-green-500'
    },
    {
      href: '/gioi-thieu',
      icon: 'ℹ️',
      title: 'Giới thiệu',
      desc: 'Về chúng tôi',
      color: 'from-orange-400 to-orange-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 text-center shadow-xl text-white">
        <div className="text-5xl mb-3">💙</div>
        <h1 className="text-2xl md:text-3xl font-bold mb-3">
          Chào mừng đến với Cùng Bạn Lắng Nghe
        </h1>
        <p className="text-primary-100 text-sm md:text-base max-w-2xl mx-auto">
          Trợ lý tâm lý học đường với công nghệ AI
          <span className="font-semibold"> • Miễn phí & Ẩn danh 100%</span>
        </p>
        
        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-xs md:text-sm font-medium">
            ✓ Không cần đăng ký
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-xs md:text-sm font-medium">
            ✓ Hỗ trợ 24/7
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-xs md:text-sm font-medium">
            ✓ An toàn tuyệt đối
          </div>
        </div>
      </div>

      {/* Quick Access */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-3 px-1">
          🎯 Truy cập nhanh
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickAccess.map((item, index) => (
            <a 
              key={index}
              href={item.href} 
              className="group bg-white rounded-xl p-5 text-center hover:shadow-xl transition-all duration-200 border border-gray-200 hover:border-primary-300 hover:-translate-y-1"
            >
              <div className={`w-14 h-14 mx-auto mb-3 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <div className="text-sm font-bold text-gray-800 mb-1">
                {item.title}
              </div>
              <div className="text-xs text-gray-500">
                {item.desc}
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Chat Interface */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-primary-50 to-blue-50 px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <span className="text-2xl">💬</span>
            Bắt đầu trò chuyện
          </h2>
          <p className="text-xs text-gray-600 mt-1">
            Hãy chia sẻ những gì bạn đang cảm thấy...
          </p>
        </div>
        <ChatInterface />
      </div>
    </div>
  );
};

export default HomePage;