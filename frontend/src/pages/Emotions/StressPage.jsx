// ***************************************************************
// File: frontend/src/pages/Emotions/StressPage.jsx
// Unified Design
// ***************************************************************

import React from 'react';
import { Link } from 'react-router-dom';
import ChatInterface from '../../components/Chat/ChatInterface';
import RelatedStories from '../../components/Shared/RelatedStories';

const StressPage = () => {
  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600 flex items-center gap-2">
        <Link to="/cam-xuc" className="hover:text-primary-500 hover:underline transition">
          Chủ đề cảm xúc
        </Link>
        <span>›</span>
        <span className="font-semibold text-gray-800">Stress & Áp lực</span>
      </nav>

      {/* Header - Unified Design */}
      <div className="bg-gradient-to-br from-orange-500 via-red-500 to-red-600 rounded-3xl p-10 md:p-14 text-white text-center shadow-2xl">
        <div className="text-7xl mb-5 animate-bounce">😰</div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Stress & Áp lực học tập
        </h1>
        <p className="text-orange-100 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Cảm thấy quá tải? Áp lực học tập? Hãy cùng mình tìm cách giảm stress! 💪
        </p>
      </div>

      {/* Understanding Stress */}
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border-2 border-gray-200">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-gray-800">
          <span className="text-4xl">🧠</span>
          Hiểu về stress
        </h2>
        <div className="space-y-5 text-gray-700 text-base leading-relaxed">
          <p>
            <span className="font-semibold text-gray-800">Stress là phản ứng tự nhiên</span> của cơ thể khi đối mặt với thử thách. 
            Một chút stress giúp bạn tập trung, nhưng quá nhiều lại gây hại.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 shadow-md">
              <h3 className="font-bold text-green-700 mb-4 flex items-center gap-2 text-xl">
                <span className="text-3xl">✅</span>
                Stress tốt
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">•</span>
                  <span>Giúp tập trung học bài tốt hơn</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">•</span>
                  <span>Tạo động lực hoàn thành mục tiêu</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">•</span>
                  <span>Cải thiện khả năng ghi nhớ</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border-2 border-red-200 shadow-md">
              <h3 className="font-bold text-red-700 mb-4 flex items-center gap-2 text-xl">
                <span className="text-3xl">❌</span>
                Stress xấu
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span>Mất ngủ, mệt mỏi liên tục</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span>Đau đầu, đau bụng thường xuyên</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span>Khó tập trung, hay quên</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span>Cáu gắt, dễ bị kích động</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 md:p-10 border-2 border-orange-200 shadow-xl">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-orange-800">
          <span className="text-4xl">💡</span>
          5 cách giảm stress nhanh
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { 
              icon: '🫁', 
              title: 'Hít thở sâu', 
              desc: 'Hít vào 4 giây, giữ 7 giây, thở ra 8 giây. Lặp lại 3 lần để bình tĩnh ngay lập tức.',
              color: 'from-blue-500 to-blue-600'
            },
            { 
              icon: '🏃', 
              title: 'Vận động', 
              desc: 'Đi bộ 10 phút, nhảy nhót, hay giãn cơ đều giúp giải phóng endorphin - hormone hạnh phúc.',
              color: 'from-green-500 to-green-600'
            },
            { 
              icon: '🎵', 
              title: 'Nghe nhạc', 
              desc: 'Chọn nhạc yêu thích, giúp não tiết ra dopamine và giảm cortisol (hormone stress).',
              color: 'from-purple-500 to-purple-600'
            },
            { 
              icon: '🗣️', 
              title: 'Nói chuyện', 
              desc: 'Tâm sự với bạn bè, gia đình hoặc chat với Banana để giải tỏa cảm xúc.',
              color: 'from-pink-500 to-pink-600'
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
        category="stress" 
        categoryLabel="Stress & Áp lực"
        categoryColor="orange"
      />

      {/* Warning Box */}
      <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-l-4 border-yellow-400 rounded-r-2xl p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <span className="text-4xl flex-shrink-0">⚠️</span>
          <div>
            <p className="font-bold text-gray-800 mb-3 text-lg">
              Khi nào cần tìm sự giúp đỡ?
            </p>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">✓</span>
                <span>Stress kéo dài hơn 2 tuần không giảm</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">✓</span>
                <span>Ảnh hưởng nghiêm trọng đến học tập và sinh hoạt</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">✓</span>
                <span>Có ý nghĩ tự làm hại bản thân</span>
              </li>
            </ul>
            <p className="mt-4 font-bold text-red-600 text-base">
              → Gọi ngay: <a href="tel:111" className="underline hover:text-red-700">111</a> hoặc <a href="tel:1900636976" className="underline hover:text-red-700">1900 636 976</a>
            </p>
          </div>
        </div>
      </div>

      {/* Chat AI Section */}
      <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <span className="text-3xl">💬</span>
            Chat với Banana về stress
          </h2>
          <p className="text-orange-100 mt-2">Chia sẻ cảm xúc của bạn, Banana sẽ lắng nghe và hỗ trợ</p>
        </div>
        <ChatInterface />
      </div>
    </div>
  );
};

export default StressPage;