// **********************************************************
// File: frontend/src/pages/Emotions/LonelyPage.jsx
// Unified Design
// **********************************************************

import React from 'react';
import { Link } from 'react-router-dom';
import ChatInterface from '../../components/Chat/ChatInterface';
import RelatedStories from '../../components/Shared/RelatedStories';

const LonelyPage = () => {
  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600 flex items-center gap-2">
        <Link to="/cam-xuc" className="hover:text-primary-500 hover:underline transition">
          Chủ đề cảm xúc
        </Link>
        <span>›</span>
        <span className="font-semibold text-gray-800">Cô đơn</span>
      </nav>

      {/* Header - Unified Design */}
      <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 rounded-3xl p-10 md:p-14 text-white text-center shadow-2xl">
        <div className="text-7xl mb-5 animate-bounce">😔</div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Vượt qua cảm giác cô đơn
        </h1>
        <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Cảm thấy cô đơn là điều bình thường. Hãy chia sẻ với mình, bạn không đơn độc đâu! 💙
        </p>
      </div>

      {/* Understanding Section */}
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border-2 border-gray-200">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-gray-800">
          <span className="text-4xl">🤔</span>
          Hiểu về cô đơn
        </h2>
        <div className="space-y-5 text-gray-700 text-base leading-relaxed">
          <p>
            <span className="font-semibold text-gray-800">Cô đơn không phải là yếu đuối.</span> 
            {' '}Đây là cảm xúc tự nhiên mà ai cũng trải qua, đặc biệt ở tuổi teen.
          </p>
          <p className="font-medium text-gray-800">
            Có 3 loại cô đơn phổ biến:
          </p>
          <ul className="space-y-4 ml-4">
            <li className="bg-blue-50 rounded-2xl p-4 border-2 border-blue-200">
              <strong className="text-blue-700 text-lg">💬 Cô đơn xã hội:</strong>
              <p className="text-sm mt-2">Thiếu bạn bè, không có ai để nói chuyện hoặc chia sẻ</p>
            </li>
            <li className="bg-purple-50 rounded-2xl p-4 border-2 border-purple-200">
              <strong className="text-purple-700 text-lg">💔 Cô đơn cảm xúc:</strong>
              <p className="text-sm mt-2">Có bạn nhưng không ai thật sự hiểu mình, cảm thấy xa cách</p>
            </li>
            <li className="bg-indigo-50 rounded-2xl p-4 border-2 border-indigo-200">
              <strong className="text-indigo-700 text-lg">⏳ Cô đơn tạm thời:</strong>
              <p className="text-sm mt-2">Rời xa nhà, chuyển trường, mất đi một mối quan hệ quan trọng</p>
            </li>
          </ul>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-10 border-2 border-blue-200 shadow-xl">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-blue-800">
          <span className="text-4xl">💡</span>
          Cách vượt qua cô đơn
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              icon: '🎨',
              title: 'Tìm sở thích mới',
              desc: 'Tham gia CLB, học vẽ, chơi nhạc cụ - Gặp người cùng đam mê',
              color: 'from-pink-500 to-pink-600'
            },
            {
              icon: '🤝',
              title: 'Kết nối lại',
              desc: 'Nhắn tin cho bạn cũ, chủ động hỏi thăm người khác',
              color: 'from-green-500 to-green-600'
            },
            {
              icon: '📝',
              title: 'Viết nhật ký',
              desc: 'Ghi lại cảm xúc giúp hiểu rõ bản thân hơn và giải tỏa nội tâm',
              color: 'from-purple-500 to-purple-600'
            },
            {
              icon: '🏃',
              title: 'Vận động',
              desc: 'Tập thể dục giúp giảm cảm giác cô đơn và cải thiện tâm trạng',
              color: 'from-orange-500 to-orange-600'
            },
            {
              icon: '🌱',
              title: 'Tình nguyện',
              desc: 'Tham gia hoạt động cộng đồng, giúp đỡ người khác',
              color: 'from-emerald-500 to-emerald-600'
            },
            {
              icon: '📚',
              title: 'Đọc sách',
              desc: 'Kết nối với nhân vật, mở rộng thế giới nội tâm',
              color: 'from-blue-500 to-blue-600'
            },
          ].map((tip, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border-2 border-gray-100 hover:-translate-y-1">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${tip.color} flex items-center justify-center text-4xl shadow-md`}>
                {tip.icon}
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-800 text-center">{tip.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed text-center">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== RELATED STORIES SECTION ===== */}
      <RelatedStories 
        category="lonely" 
        categoryLabel="Cô đơn"
        categoryColor="blue"
      />

      {/* Emergency Box */}
      <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-l-4 border-yellow-400 rounded-r-2xl p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <span className="text-4xl flex-shrink-0">⚠️</span>
          <div>
            <p className="font-bold text-gray-800 mb-3 text-lg">
              Nếu cảm giác cô đơn quá nặng nề:
            </p>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">✓</span>
                <span>Nói chuyện với bố mẹ, thầy cô người bạn tin tưởng</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">✓</span>
                <span>Gọi đường dây nóng tâm lý: <strong>1900 636 976</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">✓</span>
                <span>Gặp chuyên gia tâm lý nếu kéo dài hơn 2 tuần</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Positive Message */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl p-8 text-white text-center shadow-2xl">
        <div className="text-5xl mb-4">💙</div>
        <h3 className="text-2xl font-bold mb-3">Bạn không cô đơn!</h3>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto leading-relaxed">
          Có hàng nghìn bạn trẻ khác cũng đang trải qua cảm giác tương tự. 
          Hãy nhớ rằng, cô đơn là tạm thời và bạn hoàn toàn có thể vượt qua. 
          Chúng mình luôn ở đây để lắng nghe bạn! ❤️
        </p>
      </div>

      {/* Chat AI Section */}
      <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <span className="text-3xl">💬</span>
            Chat với Banana về cô đơn
          </h2>
          <p className="text-blue-100 mt-2">Chia sẻ cảm giác của bạn, Banana luôn sẵn sàng lắng nghe</p>
        </div>
        <ChatInterface />
      </div>
    </div>
  );
};

export default LonelyPage;