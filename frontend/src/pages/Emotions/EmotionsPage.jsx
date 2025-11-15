// frontend/src/pages/Emotions/EmotionsPage.jsx

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
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-10 text-white">
        <div className="text-6xl mb-4">💙</div>
        <h1 className="text-4xl font-bold mb-3">
          Chủ đề cảm xúc
        </h1>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto">
          Chọn chủ đề bạn quan tâm để tìm hiểu và được hỗ trợ
        </p>
      </div>

      {/* Emotion Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {emotionTopics.map((topic) => (
          <Link
            key={topic.id}
            to={topic.path}
            className="group bg-white rounded-2xl p-8 transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-2 border-2 border-gray-100 hover:border-transparent overflow-hidden relative"
          >
            {/* Gradient Background on Hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${topic.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
            
            <div className="relative">
              <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${topic.color} flex items-center justify-center text-4xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
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

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-center border-2 border-blue-100">
        <p className="text-gray-700 text-lg mb-4 font-medium">
          Không tìm thấy chủ đề phù hợp?
        </p>
        <Link
          to="/"
          className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105"
        >
          💬 Chat với Banana ngay
        </Link>
      </div>
    </div>
  );
};

export default EmotionsPage;