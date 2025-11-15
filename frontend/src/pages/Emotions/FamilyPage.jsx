// frontend/src/pages/Emotions/FamilyPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import ChatInterface from '../../components/Chat/ChatInterface';

const FamilyPage = () => {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600">
        <Link to="/camxuc" className="hover:text-primary-500">Chủ đề cảm xúc</Link>
        {' > '}
        <span className="font-semibold">Gia đình</span>
      </nav>

      {/* Header */}
      <div className="bg-green-50 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-3">
          <span className="text-4xl">🏠</span>
          <h1 className="text-2xl font-bold text-gray-800">
            Quan hệ gia đình
          </h1>
        </div>
        <p className="text-gray-700">
          Mâu thuẫn với bố mẹ? Không hiểu nhau? Hãy cùng mình tìm cách cải thiện nhé!
        </p>
      </div>

      {/* Understanding Family Conflicts */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">💭 Tại sao hay xung đột gia đình?</h2>
        <div className="space-y-3 text-gray-700">
          <p>
            Tuổi teen là giai đoạn <span className="font-semibold">muốn tự do, độc lập</span> 
            {' '}nhưng bố mẹ vẫn muốn bảo vệ. Đây là điều bình thường!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-700 mb-2">👦 Góc nhìn của con</h3>
              <ul className="text-sm space-y-1">
                <li>• "Bố mẹ không hiểu mình"</li>
                <li>• "Quản quá nhiều, không có tự do"</li>
                <li>• "So sánh mình với con người ta"</li>
                <li>• "Chỉ quan tâm điểm số"</li>
              </ul>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <h3 className="font-semibold text-orange-700 mb-2">👨‍👩‍👦 Góc nhìn của bố mẹ</h3>
              <ul className="text-sm space-y-1">
                <li>• "Con không nghe lời"</li>
                <li>• "Lo cho tương lai của con"</li>
                <li>• "Muốn con tốt hơn mình"</li>
                <li>• "Áp lực công việc, kinh tế"</li>
              </ul>
            </div>
          </div>
          <p className="text-sm italic bg-gray-50 p-3 rounded">
            💡 <strong>Chìa khóa:</strong> Cả hai đều yêu thương nhau, chỉ là cách thể hiện khác nhau.
          </p>
        </div>
      </div>

      {/* Common Situations */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">🗣️ Tình huống thường gặp & Cách giải quyết</h2>
        <div className="space-y-4">
          {/* Situation 1 */}
          <details className="bg-gray-50 rounded-lg p-4 cursor-pointer">
            <summary className="font-semibold">
              😤 Bố mẹ cấm dùng điện thoại/game
            </summary>
            <div className="mt-3 text-sm text-gray-700 space-y-2">
              <p className="font-semibold">💡 Cách giải quyết:</p>
              <p>✓ <strong>Hiểu lý do:</strong> Bố mẹ lo bạn nghiện, ảnh hưởng học tập</p>
              <p>✓ <strong>Thỏa thuận:</strong> Đề xuất khung giờ cụ thể (VD: 1 tiếng sau khi làm bài)</p>
              <p>✓ <strong>Chứng minh:</strong> Học tốt, làm việc nhà đầy đủ</p>
              <p>✓ <strong>Thỏa hiệp:</strong> Cuối tuần được chơi lâu hơn nếu hoàn thành mục tiêu</p>
            </div>
          </details>

          {/* Situation 2 */}
          <details className="bg-gray-50 rounded-lg p-4 cursor-pointer">
            <summary className="font-semibold">
              😔 Bố mẹ so sánh với người khác
            </summary>
            <div className="mt-3 text-sm text-gray-700 space-y-2">
              <p className="font-semibold">💡 Cách giải quyết:</p>
              <p>✓ <strong>Bình tĩnh nói chuyện:</strong> "Con biết bố mẹ muốn con tốt, nhưng con cảm thấy buồn khi bị so sánh"</p>
              <p>✓ <strong>Giải thích cảm xúc:</strong> "Con đang cố gắng hết sức rồi"</p>
              <p>✓ <strong>Đề xuất:</strong> "Bố mẹ có thể khen con khi con tiến bộ được không?"</p>
              <p>✓ <strong>Hiểu bố mẹ:</strong> Họ cũng bị người khác so sánh, nên vô tình lặp lại</p>
            </div>
          </details>

          {/* Situation 3 */}
          <details className="bg-gray-50 rounded-lg p-4 cursor-pointer">
            <summary className="font-semibold">
              🤐 Không dám nói chuyện với bố mẹ
            </summary>
            <div className="mt-3 text-sm text-gray-700 space-y-2">
              <p className="font-semibold">💡 Cách giải quyết:</p>
              <p>✓ <strong>Bắt đầu nhỏ:</strong> Chia sẻ những chuyện vui trước (hài, sở thích)</p>
              <p>✓ <strong>Chọn thời điểm:</strong> Khi bố mẹ thư giãn, không bận việc</p>
              <p>✓ <strong>Viết thư:</strong> Nếu khó nói trực tiếp, viết ra cảm xúc</p>
              <p>✓ <strong>Nhờ người thứ 3:</strong> Ông bà, cô chú, thầy cô làm cầu nối</p>
            </div>
          </details>

          {/* Situation 4 */}
          <details className="bg-gray-50 rounded-lg p-4 cursor-pointer">
            <summary className="font-semibold">
              😭 Bố mẹ ly hôn/cãi nhau thường xuyên
            </summary>
            <div className="mt-3 text-sm text-gray-700 space-y-2">
              <p className="font-semibold">💡 Cách đối phó:</p>
              <p>✓ <strong>Không phải lỗi của con:</strong> Vấn đề của người lớn, con không có lỗi</p>
              <p>✓ <strong>Tìm người hỗ trợ:</strong> Ông bà, thầy cô, bạn thân</p>
              <p>✓ <strong>Chăm sóc bản thân:</strong> Tập trung học tập, sở thích</p>
              <p>✓ <strong>Nói rõ cảm xúc:</strong> "Con buồn khi thấy bố mẹ cãi nhau"</p>
              <p>✓ <strong>Tìm chuyên gia:</strong> Nếu quá nặng nề, cần tư vấn tâm lý</p>
            </div>
          </details>

          {/* Situation 5 */}
          <details className="bg-gray-50 rounded-lg p-4 cursor-pointer">
            <summary className="font-semibold">
              👶 Bị ưu ái anh chị em khác
            </summary>
            <div className="mt-3 text-sm text-gray-700 space-y-2">
              <p className="font-semibold">💡 Cách giải quyết:</p>
              <p>✓ <strong>Nói thẳng:</strong> "Con cảm thấy bố mẹ thiên vị em/anh"</p>
              <p>✓ <strong>Đưa ví dụ cụ thể:</strong> Không nói chung chung, nêu tình huống</p>
              <p>✓ <strong>Yêu cầu công bằng:</strong> "Con cũng muốn được bố mẹ khen khi làm tốt"</p>
              <p>✓ <strong>Hiểu hoàn cảnh:</strong> Em nhỏ cần chăm sóc nhiều, anh/chị có áp lực riêng</p>
            </div>
          </details>
        </div>
      </div>

      {/* Communication Tips */}
      <div className="bg-green-50 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">💬 Kỹ năng giao tiếp với bố mẹ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl mb-2">✅</div>
            <h3 className="font-semibold text-green-700 mb-2">NÊN</h3>
            <ul className="text-sm space-y-1">
              <li>• Chọn thời điểm phù hợp để nói chuyện</li>
              <li>• Dùng "con cảm thấy..." thay vì "bố mẹ luôn..."</li>
              <li>• Lắng nghe quan điểm của bố mẹ</li>
              <li>• Giữ bình tĩnh, không la hét</li>
              <li>• Đề xuất giải pháp cụ thể</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl mb-2">❌</div>
            <h3 className="font-semibold text-red-700 mb-2">KHÔNG NÊN</h3>
            <ul className="text-sm space-y-1">
              <li>• Cãi lại khi bố mẹ đang giận</li>
              <li>• Nói "bố mẹ không hiểu gì cả"</li>
              <li>• Đóng sầm cửa, im lặng dài ngày</li>
              <li>• So sánh "bố mẹ bạn A cho..."</li>
              <li>• Đổ lỗi hoàn toàn cho bố mẹ</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Building Better Relationship */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">❤️ Cải thiện quan hệ gia đình</h2>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 bg-gray-50 rounded p-3">
            <span className="text-2xl">🍽️</span>
            <div>
              <h3 className="font-semibold">Ăn cơm cùng nhau</h3>
              <p className="text-sm text-gray-600">Dành 15-30 phút mỗi ngày để trò chuyện tự nhiên</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 bg-gray-50 rounded p-3">
            <span className="text-2xl">🤝</span>
            <div>
              <h3 className="font-semibold">Giúp việc nhà</h3>
              <p className="text-sm text-gray-600">Chủ động rửa bát, quét nhà - Bố mẹ sẽ thấy con trưởng thành</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 bg-gray-50 rounded p-3">
            <span className="text-2xl">🎁</span>
            <div>
              <h3 className="font-semibold">Những điều nhỏ</h3>
              <p className="text-sm text-gray-600">Gửi tin nhắn "Bố mẹ ơi về nhớ ăn cơm nhé", nói lời cảm ơn</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 bg-gray-50 rounded p-3">
            <span className="text-2xl">📱</span>
            <div>
              <h3 className="font-semibold">Chia sẻ cuộc sống</h3>
              <p className="text-sm text-gray-600">Kể chuyện ở trường, show ảnh bạn bè - Bố mẹ muốn hiểu con hơn</p>
            </div>
          </div>
        </div>
      </div>

      {/* When to Seek Help */}
      <div className="bg-red-50 border-l-4 border-red-400 rounded p-4">
        <div className="flex items-start space-x-3">
          <span className="text-2xl">🚨</span>
          <div>
            <p className="font-semibold text-gray-800 mb-2">
              Khi nào cần tìm người lớn giúp đỡ:
            </p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>❌ Bị bạo lực gia đình (đánh đập, chửi bới thường xuyên)</li>
              <li>❌ Bị bỏ bê, không được chăm sóc</li>
              <li>❌ Bố mẹ nghiện rượu/ma túy</li>
              <li>❌ Bị xâm hại tình dục</li>
              <li>❌ Bị ép làm điều trái pháp luật</li>
            </ul>
            <p className="text-sm font-semibold mt-3 text-red-600">
              → Gọi ngay 111 (Tổng đài Bảo vệ trẻ em) hoặc nói với thầy cô!
            </p>
          </div>
        </div>
      </div>

      {/* Positive Note */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <span className="text-2xl">💚</span>
          <div>
            <p className="font-semibold text-gray-800 mb-1">
              Nhớ rằng: Bố mẹ cũng đang học cách làm cha mẹ
            </p>
            <p className="text-sm text-gray-700">
              Họ không hoàn hảo, nhưng họ yêu thương con. Mâu thuẫn là bình thường, 
              quan trọng là cách giải quyết. Hãy kiên nhẫn và cho nhau cơ hội để hiểu hơn. 
              Cùng nhau cải thiện, gia đình sẽ hạnh phúc hơn! 🏠❤️
            </p>
          </div>
        </div>
      </div>

      {/* Chat AI */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">💬 Chat với AI về gia đình</h2>
        <ChatInterface />
      </div>
    </div>
  );
};

export default FamilyPage;