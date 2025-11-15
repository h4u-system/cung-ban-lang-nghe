// frontend/src/pages/Emotions/FamilyPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import ChatInterface from '../../components/Chat/ChatInterface';

const LonelyPage = () => {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600">
        <Link to="/camxuc" className="hover:text-primary-500">Chủ đề cảm xúc</Link>
        {' > '}
        <span className="font-semibold">Cô đơn</span>
      </nav>

      {/* Header */}
      <div className="bg-blue-50 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-3">
          <span className="text-4xl">😔</span>
          <h1 className="text-2xl font-bold text-gray-800">
            Vượt qua cảm giác cô đơn
          </h1>
        </div>
        <p className="text-gray-700">
          Cảm thấy cô đơn là điều bình thường. Hãy chia sẻ với mình, bạn không đơn độc đâu! 💙
        </p>
      </div>

      {/* Understanding Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">🤔 Hiểu về cô đơn</h2>
        <div className="space-y-3 text-gray-700">
          <p>
            <span className="font-semibold">Cô đơn không phải là yếu đuối.</span> 
            {' '}Đây là cảm xúc tự nhiên mà ai cũng trải qua, đặc biệt ở tuổi teen.
          </p>
          <p>
            Có 3 loại cô đơn phổ biến:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Cô đơn xã hội:</strong> Thiếu bạn bè, không có ai để nói chuyện</li>
            <li><strong>Cô đơn cảm xúc:</strong> Có bạn nhưng không ai hiểu mình</li>
            <li><strong>Cô đơn tạm thời:</strong> Rời xa nhà, chuyển trường, mất đi một mối quan hệ</li>
          </ul>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">💡 Cách vượt qua cô đơn</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl mb-2">🎨</div>
            <h3 className="font-semibold mb-2">Tìm sở thích mới</h3>
            <p className="text-sm text-gray-600">
              Tham gia CLB, học vẽ, chơi nhạc cụ - Gặp người cùng đam mê
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl mb-2">🤝</div>
            <h3 className="font-semibold mb-2">Kết nối lại</h3>
            <p className="text-sm text-gray-600">
              Nhắn tin cho bạn cũ, chủ động hỏi thăm người khác
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl mb-2">📝</div>
            <h3 className="font-semibold mb-2">Viết nhật ký</h3>
            <p className="text-sm text-gray-600">
              Ghi lại cảm xúc giúp hiểu rõ bản thân hơn
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl mb-2">🏃</div>
            <h3 className="font-semibold mb-2">Vận động</h3>
            <p className="text-sm text-gray-600">
              Tập thể dục giúp giảm cảm giác cô đơn và cải thiện tâm trạng
            </p>
          </div>
        </div>
      </div>

      {/* Emergency Box */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded p-4">
        <div className="flex items-start space-x-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <p className="font-semibold text-gray-800 mb-1">
              Nếu cảm giác cô đơn quá nặng nề:
            </p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>✓ Nói chuyện với bố mẹ, thầy cô</li>
              <li>✓ Gọi đường dây nóng tâm lý: <strong>1900 636 976</strong></li>
              <li>✓ Gặp chuyên gia tâm lý nếu kéo dài hơn 2 tuần</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Chat AI */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">💬 Chat với AI về cô đơn</h2>
        <ChatInterface />
      </div>
    </div>
  );
};

export default LonelyPage;
