// **********************************************************
// File: frontend/src/pages/Emotions/ExamPage.jsx
// Unified Design
// **********************************************************

import React from 'react';
import { Link } from 'react-router-dom';
import ChatInterface from '../../components/Chat/ChatInterface';

const ExamPage = () => {
  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600 flex items-center gap-2">
        <Link to="/cam-xuc" className="hover:text-primary-500 hover:underline transition">
          Chủ đề cảm xúc
        </Link>
        <span>›</span>
        <span className="font-semibold text-gray-800">Thi cử & Áp lực</span>
      </nav>

      {/* Header - Unified Design */}
      <div className="bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-700 rounded-3xl p-10 md:p-14 text-white text-center shadow-2xl">
        <div className="text-7xl mb-5 animate-bounce">📚</div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Thi cử & Áp lực thành tích
        </h1>
        <p className="text-purple-100 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Căng thẳng trước kỳ thi? Áp lực điểm số? Mình sẽ giúp bạn vượt qua! 💪
        </p>
      </div>

      {/* Understanding Exam Anxiety */}
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border-2 border-gray-200">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-gray-800">
          <span className="text-4xl">🧠</span>
          Hiểu về lo âu thi cử
        </h2>
        <div className="space-y-5 text-gray-700 text-base leading-relaxed">
          <p>
            <span className="font-semibold text-gray-800">Lo lắng trước thi là bình thường,</span> 
            {' '}nhưng quá mức sẽ ảnh hưởng đến kết quả. Hãy học cách quản lý!
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 shadow-md">
              <h3 className="font-bold text-green-700 mb-4 flex items-center gap-2 text-xl">
                <span className="text-3xl">✅</span>
                Lo lắng lành mạnh
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">•</span>
                  <span>Giúp tập trung học tốt hơn</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">•</span>
                  <span>Tạo động lực ôn tập</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">•</span>
                  <span>Tỉnh táo trong kỳ thi</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border-2 border-red-200 shadow-md">
              <h3 className="font-bold text-red-700 mb-4 flex items-center gap-2 text-xl">
                <span className="text-3xl">❌</span>
                Lo lắng quá mức
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span>Mất ngủ, ác mộng</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span>Đau đầu, đau bụng</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span>Blank đầu óc khi thi</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span>Tránh né ôn bài</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Study Tips */}
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border-2 border-gray-200">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-gray-800">
          <span className="text-4xl">📖</span>
          Mẹo học và thi hiệu quả
        </h2>
        
        {/* Before Exam */}
        <div className="mb-8">
          <h3 className="font-bold text-purple-700 mb-4 text-xl flex items-center gap-2">
            <span className="text-2xl">📅</span>
            Trước kỳ thi (1-2 tuần):
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: '⏰', title: 'Lập kế hoạch rõ ràng', desc: 'Chia nhỏ kiến thức, ôn từng phần mỗi ngày' },
              { icon: '🔄', title: 'Kỹ thuật Pomodoro', desc: 'Học 25 phút, nghỉ 5 phút, hiệu quả hơn học dài' },
              { icon: '✍️', title: 'Làm đề thi thử', desc: 'Làm quen với format, quản lý thời gian' },
              { icon: '👥', title: 'Học nhóm', desc: 'Giải thích cho người khác giúp nhớ lâu hơn' },
            ].map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4 border-2 border-purple-200">
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <div className="font-bold text-gray-800 mb-1">{item.title}</div>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Day Before */}
        <div className="mb-8">
          <h3 className="font-bold text-purple-700 mb-4 text-xl flex items-center gap-2">
            <span className="text-2xl">🌙</span>
            Đêm trước thi:
          </h3>
          <ul className="space-y-3 text-gray-700">
            {[
              { icon: '📝', text: 'Ôn nhẹ', detail: 'Không học khuya, chỉ xem lại tóm tắt' },
              { icon: '😴', text: 'Ngủ đủ 7-8 tiếng', detail: 'Não cần nghỉ để ghi nhớ' },
              { icon: '🎒', text: 'Chuẩn bị đồ dùng', detail: 'Bút, thẻ, đồng hồ... để sáng không vội' },
              { icon: '🛁', text: 'Tắm nước ấm', detail: 'Giúp thư giãn, ngủ ngon hơn' },
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3 bg-purple-50 rounded-xl p-4">
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                <div>
                  <strong className="text-gray-800">{item.text}</strong>
                  <span className="text-gray-600"> - {item.detail}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* During Exam */}
        <div>
          <h3 className="font-bold text-purple-700 mb-4 text-xl flex items-center gap-2">
            <span className="text-2xl">✏️</span>
            Trong khi thi:
          </h3>
          <ul className="space-y-3 text-gray-700">
            {[
              { icon: '👓', text: 'Đọc kỹ đề', detail: 'Hiểu rõ yêu cầu trước khi làm' },
              { icon: '🎯', text: 'Làm dễ trước', detail: 'Tạo tự tin, tiết kiệm thời gian' },
              { icon: '🫁', text: 'Thở sâu nếu căng thẳng', detail: '3 lần hít thở sâu giúp bình tĩnh' },
              { icon: '✔️', text: 'Kiểm tra lại', detail: 'Dành 10 phút cuối xem lại bài' },
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3 bg-indigo-50 rounded-xl p-4">
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                <div>
                  <strong className="text-gray-800">{item.text}</strong>
                  <span className="text-gray-600"> - {item.detail}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Relaxation Techniques */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-8 md:p-10 border-2 border-purple-200 shadow-xl">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-purple-800">
          <span className="text-4xl">🧘</span>
          Kỹ thuật giảm stress nhanh
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: '🫁',
              title: 'Hít thở 4-7-8',
              steps: ['Hít vào 4 giây', 'Giữ 7 giây', 'Thở ra 8 giây', 'Lặp lại 4 lần'],
              color: 'from-blue-500 to-blue-600'
            },
            {
              icon: '🤲',
              title: 'Thư giãn cơ',
              steps: ['Căng chặt tay 5s', 'Thả lỏng hoàn toàn', 'Làm với các nhóm cơ', 'Cảm nhận sự khác biệt'],
              color: 'from-green-500 to-green-600'
            },
            {
              icon: '🎵',
              title: 'Nghe nhạc',
              steps: ['Chọn nhạc không lời', 'Nhịp chậm, thư giãn', 'Giúp não tập trung', 'Giảm cortisol'],
              color: 'from-purple-500 to-purple-600'
            },
          ].map((technique, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${technique.color} flex items-center justify-center text-4xl shadow-md`}>
                {technique.icon}
              </div>
              <h3 className="font-bold text-lg mb-3 text-gray-800 text-center">{technique.title}</h3>
              <ul className="text-xs text-gray-600 space-y-1">
                {technique.steps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-purple-600 mt-0.5">→</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Important Note */}
      <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-l-4 border-yellow-400 rounded-r-2xl p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <span className="text-4xl flex-shrink-0">💡</span>
          <div>
            <p className="font-bold text-gray-800 mb-2 text-lg">
              Nhớ rằng: Điểm số không định nghĩa bạn!
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              Một kỳ thi không quyết định cả tương lai. Quan trọng là bạn đã cố gắng hết sức. 
              Nếu kết quả không như ý, hãy học hỏi và cải thiện lần sau. Bạn vẫn có giá trị! ❤️
            </p>
          </div>
        </div>
      </div>

      {/* Motivation */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-3xl p-8 text-white text-center shadow-2xl">
        <div className="text-5xl mb-4">🌟</div>
        <h3 className="text-2xl font-bold mb-3">Bạn làm được!</h3>
        <p className="text-purple-100 text-lg max-w-2xl mx-auto leading-relaxed">
          Mỗi kỳ thi là một bài học, không phải đích đến. 
          Hãy tin vào bản thân, chuẩn bị tốt và làm hết khả năng của mình. 
          Dù kết quả thế nào, bạn vẫn là người tuyệt vời! 💪
        </p>
      </div>

      {/* Chat AI Section */}
      <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 text-white">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <span className="text-3xl">💬</span>
            Chat với Banana về thi cử
          </h2>
          <p className="text-purple-100 mt-2">Chia sẻ lo lắng về kỳ thi, Banana sẽ giúp bạn!</p>
        </div>
        <ChatInterface />
      </div>
    </div>
  );
};

export default ExamPage;