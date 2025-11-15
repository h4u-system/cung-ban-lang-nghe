// frontend/src/pages/Emotions/FamilyPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import ChatInterface from '../../components/Chat/ChatInterface';

const LovePage = () => {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600">
        <Link to="/camxuc" className="hover:text-primary-500">Chủ đề cảm xúc</Link>
        {' > '}
        <span className="font-semibold">Tình yêu học trò</span>
      </nav>

      {/* Header */}
      <div className="bg-pink-50 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-3">
          <span className="text-4xl">💕</span>
          <h1 className="text-2xl font-bold text-gray-800">
            Tình yêu học trò
          </h1>
        </div>
        <p className="text-gray-700">
          Tình cảm tuổi teen, crush, thích ai đó? Hãy chia sẻ với mình một cách an toàn nhé!
        </p>
      </div>

      {/* Understanding Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">💖 Hiểu về tình yêu tuổi teen</h2>
        <div className="space-y-3 text-gray-700">
          <p>
            <span className="font-semibold">Thích ai đó là cảm xúc bình thường</span> 
            {' '}ở lứa tuổi này. Đây là giai đoạn khám phá cảm xúc và học cách yêu thương.
          </p>
          <div className="bg-pink-50 rounded-lg p-4 mt-4">
            <h3 className="font-semibold mb-2">📚 Học tập vẫn là ưu tiên số 1</h3>
            <p className="text-sm">
              Tình yêu đẹp khi không làm ảnh hưởng đến việc học và tương lai. 
              Hãy cân bằng giữa tình cảm và học tập nhé!
            </p>
          </div>
        </div>
      </div>

      {/* Common Scenarios */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">🤔 Tình huống thường gặp</h2>
        <div className="space-y-4">
          {/* Scenario 1 */}
          <details className="bg-gray-50 rounded-lg p-4 cursor-pointer">
            <summary className="font-semibold">
              😊 Crush không biết mình tồn tại
            </summary>
            <div className="mt-3 text-sm text-gray-700 space-y-2">
              <p>✓ Tự tin hơn: Chăm sóc bản thân, phát triển điểm mạnh</p>
              <p>✓ Tương tác tự nhiên: Chào hỏi, hỏi về bài tập</p>
              <p>✓ Không nên quá ám ảnh: Tập trung vào bản thân</p>
              <p>✓ Nhớ rằng: Nếu không phù hợp, sẽ có người khác dành cho bạn</p>
            </div>
          </details>

          {/* Scenario 2 */}
          <details className="bg-gray-50 rounded-lg p-4 cursor-pointer">
            <summary className="font-semibold">
              💔 Thất tình, chia tay
            </summary>
            <div className="mt-3 text-sm text-gray-700 space-y-2">
              <p>✓ Cho phép bản thân buồn: Khóc ra, viết nhật ký</p>
              <p>✓ Dành thời gian với bạn bè, gia đình</p>
              <p>✓ Tập trung vào sở thích, mục tiêu cá nhân</p>
              <p>✓ Nhớ rằng: Thời gian sẽ chữa lành mọi vết thương</p>
            </div>
          </details>

          {/* Scenario 3 */}
          <details className="bg-gray-50 rounded-lg p-4 cursor-pointer">
            <summary className="font-semibold">
              🤷 Không biết nên tỏ tình hay không
            </summary>
            <div className="mt-3 text-sm text-gray-700 space-y-2">
              <p>✓ Cân nhắc: Bạn có đủ trưởng thành để chấp nhận kết quả?</p>
              <p>✓ Thời điểm: Không nên tỏ tình giữa mùa thi cử</p>
              <p>✓ Cách thức: Tự nhiên, chân thành, không gây áp lực</p>
              <p>✓ Chuẩn bị: Nếu bị từ chối, vẫn giữ thái độ tốt</p>
            </div>
          </details>

          {/* Scenario 4 */}
          <details className="bg-gray-50 rounded-lg p-4 cursor-pointer">
            <summary className="font-semibold">
              😰 Bố mẹ không cho yêu
            </summary>
            <div className="mt-3 text-sm text-gray-700 space-y-2">
              <p>✓ Hiểu quan điểm: Bố mẹ lo cho tương lai của bạn</p>
              <p>✓ Trò chuyện cởi mở: Giải thích cảm xúc một cách trưởng thành</p>
              <p>✓ Chứng minh: Học tập vẫn tốt, không bị ảnh hưởng</p>
              <p>✓ Tôn trọng: Nếu bố mẹ vẫn không đồng ý, hãy kiên nhẫn</p>
            </div>
          </details>
        </div>
      </div>

      {/* Red Flags */}
      <div className="bg-red-50 border-l-4 border-red-400 rounded p-4">
        <div className="flex items-start space-x-3">
          <span className="text-2xl">🚨</span>
          <div>
            <p className="font-semibold text-gray-800 mb-2">
              Dấu hiệu mối quan hệ không lành mạnh:
            </p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>❌ Bị kiểm soát: Không cho gặp bạn, kiểm tra điện thoại</li>
              <li>❌ Bị đe dọa: "Nếu chia tay, tôi sẽ..."</li>
              <li>❌ Bị xúc phạm: Chửi mắng, hạ thấp nhân phẩm</li>
              <li>❌ Áp lực tình dục: Ép buộc làm điều không muốn</li>
            </ul>
            <p className="text-sm font-semibold mt-3 text-red-600">
              → Hãy nói với người lớn tin tưởng hoặc gọi 111 ngay!
            </p>
          </div>
        </div>
      </div>

      {/* Chat AI */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">💬 Chat với AI về tình yêu học trò</h2>
        <ChatInterface />
      </div>
    </div>
  );
};

export default LovePage;
