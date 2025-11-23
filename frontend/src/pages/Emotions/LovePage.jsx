// **********************************************************
// File: frontend/src/pages/Emotions/LovePage.jsx
// Unified Design
// **********************************************************

import React from 'react';
import { Link } from 'react-router-dom';
import ChatInterface from '../../components/Chat/ChatInterface';
import RelatedStories from '../../components/Shared/RelatedStories';

const LovePage = () => {
  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600 flex items-center gap-2">
        <Link to="/cam-xuc" className="hover:text-primary-500 hover:underline transition">
          Chủ đề cảm xúc
        </Link>
        <span>›</span>
        <span className="font-semibold text-gray-800">Tình yêu học trò</span>
      </nav>

      {/* Header - Unified Design */}
      <div className="bg-gradient-to-br from-pink-500 via-pink-600 to-rose-600 rounded-3xl p-10 md:p-14 text-white text-center shadow-2xl">
        <div className="text-7xl mb-5 animate-bounce">💕</div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Tình yêu học trò
        </h1>
        <p className="text-pink-100 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Tình cảm tuổi teen, crush, thích ai đó? Hãy chia sẻ với mình một cách an toàn nhé!
        </p>
      </div>

      {/* Understanding Section */}
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border-2 border-gray-200">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-gray-800">
          <span className="text-4xl">💖</span>
          Hiểu về tình yêu tuổi teen
        </h2>
        <div className="space-y-5 text-gray-700 text-base leading-relaxed">
          <p>
            <span className="font-semibold text-gray-800">Thích ai đó là cảm xúc bình thường</span> 
            {' '}ở lứa tuổi này. Đây là giai đoạn khám phá cảm xúc và học cách yêu thương.
          </p>
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 border-2 border-pink-200 mt-4">
            <h3 className="font-bold text-pink-700 mb-3 text-lg">📚 Học tập vẫn là ưu tiên số 1</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Tình yêu đẹp khi không làm ảnh hưởng đến việc học và tương lai. 
              Hãy cân bằng giữa tình cảm và học tập. Người thích bạn sẽ tôn trọng mục tiêu của bạn!
            </p>
          </div>
        </div>
      </div>

      {/* Common Scenarios */}
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border-2 border-gray-200">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-gray-800">
          <span className="text-4xl">🤔</span>
          Tình huống thường gặp
        </h2>
        <div className="space-y-4">
          {[
            {
              icon: '😊',
              title: 'Crush không biết mình tồn tại',
              tips: [
                'Tự tin hơn: Chăm sóc bản thân, phát triển điểm mạnh',
                'Tương tác tự nhiên: Chào hỏi, hỏi về bài tập',
                'Không nên quá ám ảnh: Tập trung vào bản thân',
                'Nhớ rằng: Nếu không phù hợp, sẽ có người khác dành cho bạn'
              ],
              color: 'from-blue-500 to-blue-600'
            },
            {
              icon: '💔',
              title: 'Thất tình, chia tay',
              tips: [
                'Cho phép bản thân buồn: Khóc ra, viết nhật ký',
                'Dành thời gian với bạn bè, gia đình',
                'Tập trung vào sở thích, mục tiêu cá nhân',
                'Nhớ rằng: Thời gian sẽ chữa lành mọi vết thương'
              ],
              color: 'from-red-500 to-red-600'
            },
            {
              icon: '🤷',
              title: 'Không biết nên tỏ tình hay không',
              tips: [
                'Cân nhắc: Bạn có đủ trưởng thành để chấp nhận kết quả?',
                'Thời điểm: Không nên tỏ tình giữa mùa thi cử',
                'Cách thức: Tự nhiên, chân thành, không gây áp lực',
                'Chuẩn bị: Nếu bị từ chối, vẫn giữ thái độ tốt'
              ],
              color: 'from-purple-500 to-purple-600'
            },
            {
              icon: '😰',
              title: 'Bố mẹ không cho yêu',
              tips: [
                'Hiểu quan điểm: Bố mẹ lo cho tương lai của bạn',
                'Trò chuyện cởi mở: Giải thích cảm xúc một cách trưởng thành',
                'Chứng minh: Học tập vẫn tốt, không bị ảnh hưởng',
                'Tôn trọng: Nếu bố mẹ vẫn không đồng ý, hãy kiên nhẫn'
              ],
              color: 'from-orange-500 to-orange-600'
            },
          ].map((scenario, index) => (
            <details key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border-2 border-gray-200 hover:border-pink-300 transition-all cursor-pointer group">
              <summary className="p-6 font-bold text-lg text-gray-800 flex items-center gap-3">
                <span className="text-3xl">{scenario.icon}</span>
                <span>{scenario.title}</span>
                <svg className="w-5 h-5 ml-auto transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-6 space-y-3">
                <div className={`h-1 w-20 rounded-full bg-gradient-to-r ${scenario.color} mb-4`}></div>
                {scenario.tips.map((tip, tipIndex) => (
                  <div key={tipIndex} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
                    <span className="text-green-600 font-bold mt-0.5">✓</span>
                    <p className="text-sm text-gray-700 leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* ===== RELATED STORIES SECTION ===== */}
      <RelatedStories 
        category="love" 
        categoryLabel="Tình yêu học trò"
        categoryColor="pink"
      />

      {/* Red Flags */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 border-l-4 border-red-500 rounded-r-2xl p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <span className="text-4xl flex-shrink-0">🚨</span>
          <div>
            <p className="font-bold text-gray-800 mb-3 text-lg">
              Dấu hiệu mối quan hệ không lành mạnh:
            </p>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">❌</span>
                <span><strong>Bị kiểm soát:</strong> Không cho gặp bạn, kiểm tra điện thoại</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">❌</span>
                <span><strong>Bị đe dọa:</strong> "Nếu chia tay, tôi sẽ..."</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">❌</span>
                <span><strong>Bị xúc phạm:</strong> Chửi mắng, hạ thấp nhân phẩm</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">❌</span>
                <span><strong>Áp lực tình dục:</strong> Ép buộc làm điều không muốn</span>
              </li>
            </ul>
            <p className="mt-4 font-bold text-red-600 text-base">
              → Hãy nói với người lớn tin tưởng hoặc gọi <a href="tel:111" className="underline hover:text-red-700">111</a> ngay!
            </p>
          </div>
        </div>
      </div>

      {/* Positive Message */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl p-8 text-white text-center shadow-2xl">
        <div className="text-5xl mb-4">💝</div>
        <h3 className="text-2xl font-bold mb-3">Tình yêu đẹp là tình yêu lành mạnh</h3>
        <p className="text-pink-100 text-lg max-w-2xl mx-auto leading-relaxed">
          Tình yêu đúng nghĩa là sự tôn trọng, tin tưởng và hỗ trợ lẫn nhau. 
          Nếu một mối quan hệ khiến bạn cảm thấy tồi tệ về bản thân, 
          đó không phải là tình yêu thật sự. Bạn xứng đáng được yêu thương đúng cách! ❤️
        </p>
      </div>

      {/* Chat AI Section */}
      <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-pink-500 to-rose-600 p-6 text-white">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <span className="text-3xl">💬</span>
            Chat với Banana về tình yêu học trò
          </h2>
          <p className="text-pink-100 mt-2">Chia sẻ tâm sự của bạn một cách an toàn và ẩn danh</p>
        </div>
        <ChatInterface />
      </div>
    </div>
  );
};

export default LovePage;