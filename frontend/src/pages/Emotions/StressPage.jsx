// frontend/src/pages/Emotions/StressPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import ChatInterface from '../../components/Chat/ChatInterface';

const StressPage = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600 flex items-center gap-2">
        <Link to="/cam-xuc" className="hover:text-primary-500 transition">Chủ đề cảm xúc</Link>
        <span>›</span>
        <span className="font-semibold text-gray-800">Stress & Áp lực</span>
      </nav>

      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 text-white text-center shadow-xl">
        <div className="text-6xl mb-4">😰</div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Stress & Áp lực học tập
        </h1>
        <p className="text-orange-100 text-lg">
          Cảm thấy quá tải? Áp lực học tập? Hãy cùng mình tìm cách giảm stress! 💪
        </p>
      </div>

      {/* Understanding Stress */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span>🧠</span>
          Hiểu về stress
        </h2>
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            <span className="font-semibold">Stress là phản ứng tự nhiên</span> của cơ thể khi đối mặt với thử thách. 
            Một chút stress giúp bạn tập trung, nhưng quá nhiều lại gây hại.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
              <h3 className="font-bold text-green-700 mb-3 flex items-center gap-2">
                <span className="text-2xl">✅</span>
                Stress tốt
              </h3>
              <ul className="space-y-2 text-sm">
                <li>• Giúp tập trung học bài</li>
                <li>• Tạo động lực hoàn thành mục tiêu</li>
                <li>• Cải thiện khả năng ghi nhớ</li>
              </ul>
            </div>
            
            <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
              <h3 className="font-bold text-red-700 mb-3 flex items-center gap-2">
                <span className="text-2xl">❌</span>
                Stress xấu
              </h3>
              <ul className="space-y-2 text-sm">
                <li>• Mất ngủ, mệt mỏi liên tục</li>
                <li>• Đau đầu, đau bụng thường xuyên</li>
                <li>• Khó tập trung, hay quên</li>
                <li>• Cáu gắt, dễ bị kích động</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-orange-50 rounded-2xl shadow-lg p-8 border-2 border-orange-200">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span>💡</span>
          5 cách giảm stress nhanh
        </h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { icon: '🫁', title: 'Hít thở sâu', desc: 'Hít vào 4 giây, giữ 7 giây, thở ra 8 giây. Lặp lại 3 lần.' },
            { icon: '🏃', title: 'Vận động', desc: 'Đi bộ 10 phút, nhảy nhót, hay giãn cơ đều có hiệu quả.' },
            { icon: '🎵', title: 'Nghe nhạc', desc: 'Chọn nhạc yêu thích, giúp não tiết ra hormone hạnh phúc.' },
            { icon: '🗣️', title: 'Nói chuyện', desc: 'Tâm sự với bạn bè, gia đình hoặc chat với AI.' },
          ].map((tip, index) => (
            <div key={index} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <div className="text-4xl mb-3">{tip.icon}</div>
              <h3 className="font-bold text-lg mb-2">{tip.title}</h3>
              <p className="text-sm text-gray-600">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Warning Box */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-xl p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <span className="text-3xl">⚠️</span>
          <div>
            <p className="font-bold text-gray-800 mb-2">
              Khi nào cần tìm sự giúp đỡ?
            </p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>✓ Stress kéo dài hơn 2 tuần</li>
              <li>✓ Ảnh hưởng nghiêm trọng đến học tập</li>
              <li>✓ Có ý nghĩ tự làm hại bản thân</li>
            </ul>
            <p className="mt-3 font-semibold text-red-600">
              → Gọi ngay: <a href="tel:111" className="underline">111</a> hoặc <a href="tel:1900636976" className="underline">1900 636 976</a>
            </p>
          </div>
        </div>
      </div>

      {/* Chat AI */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-gray-200">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span>💬</span>
          Chat với Banana về stress
        </h2>
        <ChatInterface />
      </div>
    </div>
  );
};

export default StressPage;