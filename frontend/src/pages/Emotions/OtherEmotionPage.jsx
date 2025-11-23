// **********************************************************
// File: frontend/src/pages/Emotions/OtherEmotionPage.jsx
// Page for "Other" emotion category
// **********************************************************

import React from 'react';
import { Link } from 'react-router-dom';
import ChatInterface from '../../components/Chat/ChatInterface';
import RelatedStories from '../../components/Shared/RelatedStories';

const OtherEmotionPage = () => {
  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600 flex items-center gap-2">
        <Link to="/cam-xuc" className="hover:text-primary-500 hover:underline transition">
          Chủ đề cảm xúc
        </Link>
        <span>›</span>
        <span className="font-semibold text-gray-800">Khác</span>
      </nav>

      {/* Header - Unified Design */}
      <div className="bg-gradient-to-br from-gray-500 via-gray-600 to-gray-700 rounded-3xl p-10 md:p-14 text-white text-center shadow-2xl">
        <div className="text-7xl mb-5 animate-bounce">💭</div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Các vấn đề tâm lý khác
        </h1>
        <p className="text-gray-100 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Mọi cảm xúc đều quan trọng. Hãy chia sẻ với mình những gì bạn đang trải qua!
        </p>
      </div>

      {/* Introduction */}
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border-2 border-gray-200">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-gray-800">
          <span className="text-4xl">🤗</span>
          Không phải lúc nào cũng phân loại được
        </h2>
        <div className="space-y-5 text-gray-700 text-base leading-relaxed">
          <p>
            <span className="font-semibold text-gray-800">Cảm xúc con người rất phức tạp</span> và không phải lúc nào cũng dễ dàng gán nhãn. 
            Có những lúc bạn:
          </p>
          
          <ul className="space-y-3 ml-4">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>Cảm thấy <strong>mơ hồ</strong>, không rõ mình đang cảm thấy thế nào</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>Trải qua <strong>nhiều cảm xúc cùng lúc</strong> (vừa vui vừa buồn, vừa hào hứng vừa lo lắng)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>Gặp vấn đề <strong>không thuộc các chủ đề phổ biến</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>Chỉ đơn giản muốn <strong>tâm sự</strong> mà không cần nhãn dán</span>
            </li>
          </ul>

          <p className="text-sm italic bg-blue-50 p-4 rounded-xl border-2 border-blue-200 mt-4">
            <span className="text-2xl mr-2">💙</span>
            <strong>Điều quan trọng:</strong> Mọi cảm xúc đều hợp lệ. Bạn không cần phải "hiểu đúng" cảm xúc của mình. 
            Chỉ cần chia sẻ, và chúng mình sẽ lắng nghe.
          </p>
        </div>
      </div>

      {/* Common "Other" Topics */}
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border-2 border-gray-200">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-gray-800">
          <span className="text-4xl">📋</span>
          Các vấn đề thường gặp khác
        </h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { 
              icon: '🤔', 
              title: 'Tự nhận thức', 
              desc: 'Không biết mình thích gì, muốn gì, là ai',
              color: 'from-purple-500 to-purple-600'
            },
            { 
              icon: '😴', 
              title: 'Rối loạn giấc ngủ', 
              desc: 'Mất ngủ, ngủ quá nhiều, ác mộng',
              color: 'from-indigo-500 to-indigo-600'
            },
            { 
              icon: '🎭', 
              title: 'Hình ảnh bản thân', 
              desc: 'Body image, tự ti về ngoại hình',
              color: 'from-pink-500 to-pink-600'
            },
            { 
              icon: '👥', 
              title: 'Kỹ năng xã hội', 
              desc: 'Khó giao tiếp, ngại nói chuyện, social anxiety',
              color: 'from-green-500 to-green-600'
            },
            { 
              icon: '🎯', 
              title: 'Định hướng tương lai', 
              desc: 'Chọn ngành, trường, nghề nghiệp',
              color: 'from-orange-500 to-orange-600'
            },
            { 
              icon: '🌐', 
              title: 'Nghiện internet/game', 
              desc: 'Dùng mạng xã hội, game quá nhiều',
              color: 'from-blue-500 to-blue-600'
            },
            { 
              icon: '🏫', 
              title: 'Bạo lực học đường', 
              desc: 'Bị bắt nạt, bạo lực ngôn từ/thể xác',
              color: 'from-red-500 to-red-600'
            },
            { 
              icon: '🧩', 
              title: 'LGBTQ+ identity', 
              desc: 'Khám phá giới tính, xu hướng tính dục',
              color: 'from-rainbow-500 to-rainbow-600'
            },
          ].map((topic, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-5 border-2 border-gray-200 hover:shadow-lg transition-all">
              <div className={`w-12 h-12 mb-3 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center text-2xl shadow-md`}>
                {topic.icon}
              </div>
              <h3 className="font-bold text-gray-800 mb-2">{topic.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{topic.desc}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Và còn nhiều vấn đề khác mà bạn có thể chia sẻ với Banana...
        </p>
      </div>

      {/* ===== RELATED STORIES SECTION ===== */}
      <RelatedStories 
        category="other" 
        categoryLabel="Các vấn đề khác"
        categoryColor="gray"
      />

      {/* Support Resources */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-10 border-2 border-blue-200 shadow-xl">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-blue-800">
          <span className="text-4xl">🆘</span>
          Nguồn hỗ trợ chuyên nghiệp
        </h2>
        
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-5 border-2 border-blue-200">
            <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
              <span className="text-2xl">📞</span>
              Đường dây nóng
            </h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li><strong>111</strong> - Tổng đài Bảo vệ Trẻ em (Miễn phí 24/7)</li>
              <li><strong>115</strong> - Cấp cứu Y tế (Khẩn cấp)</li>
              <li><strong>1900 636 976</strong> - Đường dây nóng Ngày Mai (Tâm lý)</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-5 border-2 border-green-200">
            <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
              <span className="text-2xl">🏥</span>
              Cơ sở y tế
            </h3>
            <p className="text-sm text-gray-700">
              Bệnh viện Nhi Trung ương, Viện Tâm lý học ĐHQGHN, các phòng khám tâm lý uy tín
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border-2 border-purple-200">
            <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
              <span className="text-2xl">👨‍🏫</span>
              Tại trường
            </h3>
            <p className="text-sm text-gray-700">
              Giáo viên chủ nhiệm, cố vấn học đường, y tế trường học
            </p>
          </div>
        </div>
      </div>

      {/* Chat AI Section */}
      <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-500 to-gray-700 p-6 text-white">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <span className="text-3xl">💬</span>
            Chat với Banana về bất cứ điều gì
          </h2>
          <p className="text-gray-100 mt-2">Mọi cảm xúc đều quan trọng. Banana luôn lắng nghe bạn 💙</p>
        </div>
        <ChatInterface />
      </div>
    </div>
  );
};

export default OtherEmotionPage;