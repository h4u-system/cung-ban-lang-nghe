import React from 'react';
import { Link } from 'react-router-dom';

const emotionTopics = [
  {
    id: 'stress',
    title: 'Stress & Áp lực',
    icon: '😰',
    description: 'Giảm căng thẳng, quản lý stress học tập',
    color: 'bg-orange-100 hover:bg-orange-200',
    path: '/camxuc/stress'
  },
  {
    id: 'lonely',
    title: 'Cô đơn',
    icon: '😔',
    description: 'Vượt qua cảm giác cô đơn, tìm kết nối',
    color: 'bg-blue-100 hover:bg-blue-200',
    path: '/camxuc/co-don'
  },
  {
    id: 'love',
    title: 'Tình yêu học trò',
    icon: '💕',
    description: 'Tư vấn về tình cảm tuổi teen',
    color: 'bg-pink-100 hover:bg-pink-200',
    path: '/camxuc/tinh-yeu-hoc-tro'
  },
  {
    id: 'exam',
    title: 'Thi cử & Áp lực',
    icon: '📚',
    description: 'Chuẩn bị tinh thần cho kỳ thi',
    color: 'bg-purple-100 hover:bg-purple-200',
    path: '/camxuc/thi-cu-ap-luc'
  },
  {
    id: 'family',
    title: 'Gia đình',
    icon: '🏠',
    description: 'Quan hệ với bố mẹ, anh chị em',
    color: 'bg-green-100 hover:bg-green-200',
    path: '/camxuc/gia-dinh'
  }
];

const EmotionsPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Chủ đề cảm xúc
        </h1>
        <p className="text-gray-600">
          Chọn chủ đề bạn quan tâm để tìm hiểu và được hỗ trợ
        </p>
      </div>

      {/* Emotion Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {emotionTopics.map((topic) => (
          <Link
            key={topic.id}
            to={topic.path}
            className={`${topic.color} rounded-lg p-6 transition shadow-sm hover:shadow-md`}
          >
            <div className="text-4xl mb-3">{topic.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {topic.title}
            </h3>
            <p className="text-sm text-gray-600">{topic.description}</p>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-primary-50 rounded-lg p-6 text-center">
        <p className="text-gray-700 mb-4">
          Không tìm thấy chủ đề phù hợp?
        </p>
        <Link
          to="/"
          className="inline-block bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Chat với AI ngay
        </Link>
      </div>
    </div>
  );
};

export default EmotionsPage;
