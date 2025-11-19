// **********************************************************  
// File: frontend/src/pages/Emotions/FamilyPage.jsx
// Unified Design
// **********************************************************

import React from 'react';
import { Link } from 'react-router-dom';
import ChatInterface from '../../components/Chat/ChatInterface';

const FamilyPage = () => {
  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600 flex items-center gap-2">
        <Link to="/cam-xuc" className="hover:text-primary-500 hover:underline transition">
          Chủ đề cảm xúc
        </Link>
        <span>›</span>
        <span className="font-semibold text-gray-800">Gia đình</span>
      </nav>

      {/* Header - Unified Design */}
      <div className="bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700 rounded-3xl p-10 md:p-14 text-white text-center shadow-2xl">
        <div className="text-7xl mb-5 animate-bounce">🏠</div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Quan hệ gia đình
        </h1>
        <p className="text-green-100 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Mâu thuẫn với bố mẹ? Không hiểu nhau? Hãy cùng mình tìm cách cải thiện nhé!
        </p>
      </div>

      {/* Understanding Family Conflicts */}
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border-2 border-gray-200">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-gray-800">
          <span className="text-4xl">💭</span>
          Tại sao hay xung đột gia đình?
        </h2>
        <div className="space-y-5 text-gray-700 text-base leading-relaxed">
          <p>
            Tuổi teen là giai đoạn <span className="font-semibold text-gray-800">muốn tự do, độc lập</span> 
            {' '}nhưng bố mẹ vẫn muốn bảo vệ. Đây là điều bình thường!
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200 shadow-md">
              <h3 className="font-bold text-blue-700 mb-4 flex items-center gap-2 text-xl">
                <span className="text-3xl">👦</span>
                Góc nhìn của con
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>"Bố mẹ không hiểu mình"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>"Quản quá nhiều, không có tự do"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>"So sánh mình với con người ta"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>"Chỉ quan tâm điểm số"</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border-2 border-orange-200 shadow-md">
              <h3 className="font-bold text-orange-700 mb-4 flex items-center gap-2 text-xl">
                <span className="text-3xl">👨‍👩‍👦</span>
                Góc nhìn của bố mẹ
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span>"Con không nghe lời"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span>"Lo cho tương lai của con"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span>"Muốn con tốt hơn mình"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span>"Áp lực công việc, kinh tế"</span>
                </li>
              </ul>
            </div>
          </div>
          <p className="text-sm italic bg-gray-50 p-4 rounded-xl border-2 border-gray-200">
            <span className="text-2xl mr-2">💡</span>
            <strong>Chìa khóa:</strong> Cả hai đều yêu thương nhau, chỉ là cách thể hiện khác nhau.
          </p>
        </div>
      </div>

      {/* Common Situations */}
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border-2 border-gray-200">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-gray-800">
          <span className="text-4xl">🗣️</span>
          Tình huống thường gặp & Cách giải quyết
        </h2>
        <div className="space-y-4">
          {[
            {
              icon: '😤',
              title: 'Bố mẹ cấm dùng điện thoại/game',
              solutions: [
                'Hiểu lý do: Bố mẹ lo bạn nghiện, ảnh hưởng học tập',
                'Thỏa thuận: Đề xuất khung giờ cụ thể (VD: 1 tiếng sau khi làm bài)',
                'Chứng minh: Học tốt, làm việc nhà đầy đủ',
                'Thỏa hiệp: Cuối tuần được chơi lâu hơn nếu hoàn thành mục tiêu'
              ],
              color: 'from-red-500 to-orange-500'
            },
            {
              icon: '😔',
              title: 'Bố mẹ so sánh với người khác',
              solutions: [
                'Bình tĩnh nói chuyện: "Con biết bố mẹ muốn con tốt, nhưng con cảm thấy buồn khi bị so sánh"',
                'Giải thích cảm xúc: "Con đang cố gắng hết sức rồi"',
                'Đề xuất: "Bố mẹ có thể khen con khi con tiến bộ được không?"',
                'Hiểu bố mẹ: Họ cũng bị người khác so sánh, nên vô tình lặp lại'
              ],
              color: 'from-blue-500 to-indigo-500'
            },
            {
              icon: '🤐',
              title: 'Không dám nói chuyện với bố mẹ',
              solutions: [
                'Bắt đầu nhỏ: Chia sẻ những chuyện vui trước (hài, sở thích)',
                'Chọn thời điểm: Khi bố mẹ thư giãn, không bận việc',
                'Viết thư: Nếu khó nói trực tiếp, viết ra cảm xúc',
                'Nhờ người thứ 3: Ông bà, cô chú, thầy cô làm cầu nối'
              ],
              color: 'from-purple-500 to-pink-500'
            },
            {
              icon: '😭',
              title: 'Bố mẹ ly hôn/cãi nhau thường xuyên',
              solutions: [
                'Không phải lỗi của con: Vấn đề của người lớn, con không có lỗi',
                'Tìm người hỗ trợ: Ông bà, thầy cô, bạn thân',
                'Chăm sóc bản thân: Tập trung học tập, sở thích',
                'Nói rõ cảm xúc: "Con buồn khi thấy bố mẹ cãi nhau"',
                'Tìm chuyên gia: Nếu quá nặng nề, cần tư vấn tâm lý'
              ],
              color: 'from-red-500 to-red-600'
            },
            {
              icon: '👶',
              title: 'Bị ưu ái anh chị em khác',
              solutions: [
                'Nói thẳng: "Con cảm thấy bố mẹ thiên vị em/anh"',
                'Đưa ví dụ cụ thể: Không nói chung chung, nêu tình huống',
                'Yêu cầu công bằng: "Con cũng muốn được bố mẹ khen khi làm tốt"',
                'Hiểu hoàn cảnh: Em nhỏ cần chăm sóc nhiều, anh/chị có áp lực riêng'
              ],
              color: 'from-green-500 to-emerald-500'
            },
          ].map((situation, index) => (
            <details key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border-2 border-gray-200 hover:border-green-300 transition-all cursor-pointer group">
              <summary className="p-6 font-bold text-lg text-gray-800 flex items-center gap-3">
                <span className="text-3xl">{situation.icon}</span>
                <span>{situation.title}</span>
                <svg className="w-5 h-5 ml-auto transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-6 space-y-3">
                <div className={`h-1 w-20 rounded-full bg-gradient-to-r ${situation.color} mb-4`}></div>
                <p className="font-semibold text-gray-800 mb-3">💡 Cách giải quyết:</p>
                {situation.solutions.map((solution, solIndex) => (
                  <div key={solIndex} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
                    <span className="text-green-600 font-bold mt-0.5">✓</span>
                    <p className="text-sm text-gray-700 leading-relaxed">{solution}</p>
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* Communication Tips */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 md:p-10 border-2 border-green-200 shadow-xl">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-green-800">
          <span className="text-4xl">💬</span>
          Kỹ năng giao tiếp với bố mẹ
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-200">
            <div className="text-4xl mb-3">✅</div>
            <h3 className="font-bold text-green-700 mb-4 text-xl">NÊN</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">•</span>
                <span>Chọn thời điểm phù hợp để nói chuyện</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">•</span>
                <span>Dùng "con cảm thấy..." thay vì "bố mẹ luôn..."</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">•</span>
                <span>Lắng nghe quan điểm của bố mẹ</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">•</span>
                <span>Giữ bình tĩnh, không la hét</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">•</span>
                <span>Đề xuất giải pháp cụ thể</span>
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-red-200">
            <div className="text-4xl mb-3">❌</div>
            <h3 className="font-bold text-red-700 mb-4 text-xl">KHÔNG NÊN</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Cãi lại khi bố mẹ đang giận</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Nói "bố mẹ không hiểu gì cả"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Đóng sầm cửa, im lặng dài ngày</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>So sánh "bố mẹ bạn A cho..."</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Đổ lỗi hoàn toàn cho bố mẹ</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Building Better Relationship */}
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border-2 border-gray-200">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-gray-800">
          <span className="text-4xl">❤️</span>
          Cải thiện quan hệ gia đình
        </h2>
        <div className="space-y-4">
          {[
            { icon: '🍽️', title: 'Ăn cơm cùng nhau', desc: 'Dành 15-30 phút mỗi ngày để trò chuyện tự nhiên' },
            { icon: '🤝', title: 'Giúp việc nhà', desc: 'Chủ động rửa bát, quét nhà - Bố mẹ sẽ thấy con trưởng thành' },
            { icon: '🎁', title: 'Những điều nhỏ', desc: 'Gửi tin nhắn "Bố mẹ ơi về nhớ ăn cơm nhé", nói lời cảm ơn' },
            { icon: '📱', title: 'Chia sẻ cuộc sống', desc: 'Kể chuyện ở trường, show ảnh bạn bè - Bố mẹ muốn hiểu con hơn' },
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border-2 border-green-200 hover:shadow-md transition-all">
              <span className="text-4xl flex-shrink-0">{item.icon}</span>
              <div>
                <h3 className="font-bold text-gray-800 mb-1 text-lg">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* When to Seek Help */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 border-l-4 border-red-500 rounded-r-2xl p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <span className="text-4xl flex-shrink-0">🚨</span>
          <div>
            <p className="font-bold text-gray-800 mb-3 text-lg">
              Khi nào cần tìm người lớn giúp đỡ:
            </p>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">❌</span>
                <span>Bị bạo lực gia đình (đánh đập, chửi bới thường xuyên)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">❌</span>
                <span>Bị bỏ bê, không được chăm sóc</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">❌</span>
                <span>Bố mẹ nghiện rượu/ma túy</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">❌</span>
                <span>Bị xâm hại tình dục</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">❌</span>
                <span>Bị ép làm điều trái pháp luật</span>
              </li>
            </ul>
            <p className="mt-4 font-bold text-red-600 text-base">
              → Gọi ngay <a href="tel:111" className="underline hover:text-red-700">111</a> (Tổng đài Bảo vệ trẻ em) hoặc nói với thầy cô!
            </p>
          </div>
        </div>
      </div>

      {/* Positive Note */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 text-white text-center shadow-2xl">
        <div className="text-5xl mb-4">💚</div>
        <h3 className="text-2xl font-bold mb-3">Bố mẹ cũng đang học cách làm cha mẹ</h3>
        <p className="text-green-100 text-lg max-w-2xl mx-auto leading-relaxed">
          Họ không hoàn hảo, nhưng họ yêu thương con. Mâu thuẫn là bình thường, 
          quan trọng là cách giải quyết. Hãy kiên nhẫn và cho nhau cơ hội để hiểu hơn. 
          Cùng nhau cải thiện, gia đình sẽ hạnh phúc hơn! 🏠❤️
        </p>
      </div>

      {/* Chat AI Section */}
      <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <span className="text-3xl">💬</span>
            Chat với Banana về gia đình
          </h2>
          <p className="text-green-100 mt-2">Chia sẻ về quan hệ gia đình, Banana sẽ lắng nghe và tư vấn</p>
        </div>
        <ChatInterface />
      </div>
    </div>
  );
};

export default FamilyPage;