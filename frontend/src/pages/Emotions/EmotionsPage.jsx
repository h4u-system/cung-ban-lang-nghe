// ***************************************************************
// File: frontend/src/pages/Emotions/EmotionsPage.jsx
// Unified card design
// ***************************************************************

import React from 'react';
import { Link } from 'react-router-dom';

const emotionTopics = [
  {
    id: 'stress',
    title: 'Stress & Áp lực',
    icon: '😰',
    description: 'Giảm căng thẳng, quản lý stress học tập',
    color: 'from-orange-400 to-orange-500',
    path: '/cam-xuc/stress'
  },
  {
    id: 'lonely',
    title: 'Cô đơn',
    icon: '😔',
    description: 'Vượt qua cảm giác cô đơn, tìm kết nối',
    color: 'from-blue-400 to-blue-500',
    path: '/cam-xuc/co-don'
  },
  {
    id: 'love',
    title: 'Tình yêu học trò',
    icon: '💕',
    description: 'Tư vấn về tình cảm tuổi teen',
    color: 'from-pink-400 to-pink-500',
    path: '/cam-xuc/tinh-yeu-hoc-tro'
  },
  {
    id: 'exam',
    title: 'Thi cử & Áp lực',
    icon: '📚',
    description: 'Chuẩn bị tinh thần cho kỳ thi',
    color: 'from-purple-400 to-purple-500',
    path: '/cam-xuc/thi-cu-ap-luc'
  },
  {
    id: 'family',
    title: 'Gia đình',
    icon: '🏠',
    description: 'Quan hệ với bố mẹ, anh chị em',
    color: 'from-green-400 to-green-500',
    path: '/cam-xuc/gia-dinh'
  }
];

const EmotionsPage = () => {
  return (
    <div className="space-y-10">
      {/* Header - Unified Design */}
      <div className="text-center bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-10 md:p-14 text-white shadow-2xl">
        <div className="text-6xl md:text-7xl mb-6 animate-bounce">💙</div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
          Chủ đề cảm xúc
        </h1>
        <p className="text-blue-100 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          Chọn chủ đề bạn quan tâm để tìm hiểu và nhận được hỗ trợ tâm lý
        </p>
      </div>

      {/* Emotion Cards Grid - Consistent Spacing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {emotionTopics.map((topic) => (
          <Link
            key={topic.id}
            to={topic.path}
            className="group bg-white rounded-2xl p-8 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-2 border-2 border-gray-100 hover:border-transparent overflow-hidden relative"
          >
            {/* Gradient Background on Hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${topic.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
            
            <div className="relative">
              <div className={`w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br ${topic.color} flex items-center justify-center text-5xl shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                {topic.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                {topic.title}
              </h3>
              <p className="text-sm text-gray-600 text-center leading-relaxed">
                {topic.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA Section - Unified Design */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 md:p-10 text-center border-2 border-blue-200 shadow-xl">
        <p className="text-gray-700 text-lg md:text-xl mb-6 font-medium">
          Không tìm thấy chủ đề phù hợp?
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95"
        >
          <span>💬</span>
          <span>Chat với Banana ngay</span>
        </Link>
      </div>
    </div>
  );
};

export default EmotionsPage;