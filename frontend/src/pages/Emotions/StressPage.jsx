import React from 'react';
import { Link } from 'react-router-dom';
import ChatInterface from '../../components/Chat/ChatInterface';

const StressPage = () => {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600">
        <Link to="/camxuc" className="hover:text-primary-500">Chủ đề cảm xúc</Link>
        {' > '}
        <span className="font-semibold">Stress & Áp lực</span>
      </nav>

      {/* Header */}
      <div className="bg-orange-50 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-3">
          <span className="text-4xl">😰</span>
          <h1 className="text-2xl font-bold text-gray-800">
            Stress & Áp lực học tập
          </h1>
        </div>
        <p className="text-gray-700">
          Cảm thấy quá tải? Áp lực học tập? Hãy chia sẻ với mình nhé!
        </p>
      </div>

      {/* Tips Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">💡 Mẹo giảm stress nhanh</h2>
        <ul className="space-y-2 text-gray-700">
          <li>✓ Thở sâu 5-5-5: Hít vào 5 giây, giữ 5 giây, thở ra 5 giây</li>
          <li>✓ Nghỉ ngơi 10 phút mỗi giờ học</li>
          <li>✓ Viết ra những gì đang lo lắng</li>
          <li>✓ Tập thể dục nhẹ hoặc đi bộ</li>
        </ul>
      </div>

      {/* Chat AI */}
      <ChatInterface contextTopic="stress" />
    </div>
  );
};

export default StressPage;
