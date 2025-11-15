// frontend/src/pages/Emotions/ExamPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import ChatInterface from '../../components/Chat/ChatInterface';

const ExamPage = () => {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600">
        <Link to="/camxuc" className="hover:text-primary-500">Chủ đề cảm xúc</Link>
        {' > '}
        <span className="font-semibold">Thi cử & Áp lực</span>
      </nav>

      {/* Header */}
      <div className="bg-purple-50 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-3">
          <span className="text-4xl">📚</span>
          <h1 className="text-2xl font-bold text-gray-800">
            Thi cử & Áp lực thành tích
          </h1>
        </div>
        <p className="text-gray-700">
          Căng thẳng trước kỳ thi? Áp lực điểm số? Mình sẽ giúp bạn vượt qua! 💪
        </p>
      </div>

      {/* Understanding Exam Anxiety */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">🧠 Hiểu về lo âu thi cử</h2>
        <div className="space-y-3 text-gray-700">
          <p>
            <span className="font-semibold">Lo lắng trước thi là bình thường,</span> 
            {' '}nhưng quá mức sẽ ảnh hưởng đến kết quả. Hãy học cách quản lý!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-green-700 mb-2">✅ Lo lắng lành mạnh</h3>
              <ul className="text-sm space-y-1">
                <li>• Giúp tập trung học tốt hơn</li>
                <li>• Tạo động lực ôn tập</li>
                <li>• Tỉnh táo trong kỳ thi</li>
              </ul>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <h3 className="font-semibold text-red-700 mb-2">❌ Lo lắng quá mức</h3>
              <ul className="text-sm space-y-1">
                <li>• Mất ngủ, ác mộng</li>
                <li>• Đau đầu, đau bụng</li>
                <li>• Blank đầu óc khi thi</li>
                <li>• Tránh né ôn bài</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Study Tips */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">📖 Mẹo học và thi hiệu quả</h2>
        
        {/* Before Exam */}
        <div className="mb-6">
          <h3 className="font-semibold text-purple-700 mb-3">Trước kỳ thi (1-2 tuần):</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-purple-50 rounded p-3">
              <div className="font-semibold mb-1">⏰ Lập kế hoạch rõ ràng</div>
              <p className="text-sm text-gray-600">Chia nhỏ kiến thức, ôn từng phần mỗi ngày</p>
            </div>
            <div className="bg-purple-50 rounded p-3">
              <div className="font-semibold mb-1">🔄 Kỹ thuật Pomodoro</div>
              <p className="text-sm text-gray-600">Học 25 phút, nghỉ 5 phút, hiệu quả hơn học dài</p>
            </div>
            <div className="bg-purple-50 rounded p-3">
              <div className="font-semibold mb-1">✍️ Làm đề thi thử</div>
              <p className="text-sm text-gray-600">Làm quen với format, quản lý thời gian</p>
            </div>
            <div className="bg-purple-50 rounded p-3">
              <div className="font-semibold mb-1">👥 Học nhóm</div>
              <p className="text-sm text-gray-600">Giải thích cho người khác giúp nhớ lâu hơn</p>
            </div>
          </div>
        </div>

        {/* Day Before */}
        <div className="mb-6">
          <h3 className="font-semibold text-purple-700 mb-3">Đêm trước thi:</h3>
          <ul className="space-y-2 text-gray-700">
            <li>✓ <strong>Ôn nhẹ</strong> - Không học khuya, chỉ xem lại tóm tắt</li>
            <li>✓ <strong>Ngủ đủ 7-8 tiếng</strong> - Não cần nghỉ để ghi nhớ</li>
            <li>✓ <strong>Chuẩn bị đồ dùng</strong> - Bút, thẻ, đồng hồ... để sáng không vội</li>
            <li>✓ <strong>Tắm nước ấm</strong> - Giúp thư giãn, ngủ ngon hơn</li>
          </ul>
        </div>

        {/* During Exam */}
        <div>
          <h3 className="font-semibold text-purple-700 mb-3">Trong khi thi:</h3>
          <ul className="space-y-2 text-gray-700">
            <li>✓ <strong>Đọc kỹ đề</strong> - Hiểu rõ yêu cầu trước khi làm</li>
            <li>✓ <strong>Làm dễ trước</strong> - Tạo tự tin, tiết kiệm thời gian</li>
            <li>✓ <strong>Thở sâu nếu căng thẳng</strong> - 3 lần hít thở sâu giúp bình tĩnh</li>
            <li>✓ <strong>Kiểm tra lại</strong> - Dành 10 phút cuối xem lại bài</li>
          </ul>
        </div>
      </div>

      {/* Relaxation Techniques */}
      <div className="bg-purple-50 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">🧘 Kỹ thuật giảm stress nhanh</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <div className="text-3xl mb-2">🫁</div>
            <h3 className="font-semibold mb-2">Hít thở 4-7-8</h3>
            <p className="text-sm text-gray-600">
              Hít vào 4 giây<br/>
              Giữ 7 giây<br/>
              Thở ra 8 giây<br/>
              Lặp lại 4 lần
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-3xl mb-2">🤲</div>
            <h3 className="font-semibold mb-2">Thư giãn cơ</h3>
            <p className="text-sm text-gray-600">
              Căng chặt các nhóm cơ 5 giây, sau đó thả lỏng hoàn toàn
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-3xl mb-2">🎵</div>
            <h3 className="font-semibold mb-2">Nghe nhạc</h3>
            <p className="text-sm text-gray-600">
              Nhạc không lời, nhịp chậm giúp não tập trung tốt hơn
            </p>
          </div>
        </div>
      </div>

      {/* Important Note */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded p-4">
        <div className="flex items-start space-x-3">
          <span className="text-2xl">💡</span>
          <div>
            <p className="font-semibold text-gray-800 mb-1">
              Nhớ rằng: Điểm số không định nghĩa bạn!
            </p>
            <p className="text-sm text-gray-700">
              Một kỳ thi không quyết định cả tương lai. Quan trọng là bạn đã cố gắng hết sức. 
              Nếu kết quả không như ý, hãy học hỏi và cải thiện lần sau. Bạn vẫn có giá trị! ❤️
            </p>
          </div>
        </div>
      </div>

      {/* Chat AI */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">💬 Chat với AI về thi cử</h2>
        <ChatInterface />
      </div>
    </div>
  );
};

export default ExamPage;
