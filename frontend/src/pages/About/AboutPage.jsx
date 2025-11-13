import React from 'react';

const AboutPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-8 text-white text-center">
        <h1 className="text-4xl font-bold mb-3">💙 Cùng Bạn Lắng Nghe</h1>
        <p className="text-xl opacity-90">
          Trợ lý tâm lý học đường đầu tiên tại Việt Nam.
        </p>
      </div>

      {/* Mission */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-4">🎯 Sứ mệnh</h2>
        <p className="text-gray-700 leading-relaxed text-lg">
          Mang đến dịch vụ tư vấn tâm lý <span className="font-semibold">miễn phí, ẩn danh, và dễ tiếp cận</span> cho 
          học sinh, sinh viên Việt Nam thông qua công nghệ Trí tuệ nhân tạo (AI).
        </p>
      </div>

      {/* Problem */}
      <div className="bg-red-50 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-red-700">😟 Vấn đề hiện tại</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <div className="text-3xl mb-2">60%+</div>
            <p className="text-sm text-gray-700">
              Học sinh cho rằng học tập dẫn đến trầm cảm (Báo Thanh Niên, 2022)
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-3xl mb-2">14 triệu</div>
            <p className="text-sm text-gray-700">
              Người rối loạn tâm thần nhưng chỉ có 143 nhà tâm lý lâm sàng (Bộ Y Tế)
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-3xl mb-2">500k-2M</div>
            <p className="text-sm text-gray-700">
              VND/buổi tư vấn - Quá đắt đỏ cho nhiều gia đình
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-3xl mb-2">😔</div>
            <p className="text-sm text-gray-700">
              Tâm lý ngại ngùng, sợ bị gắn mác khi đi tư vấn
            </p>
          </div>
        </div>
      </div>

      {/* Solution */}
      <div className="bg-green-50 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-green-700">✅ Giải pháp của chúng mình</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: '🆓', title: '100% miễn phí', desc: 'Không tốn một đồng nào' },
            { icon: '🎭', title: 'Hoàn toàn ẩn danh', desc: 'Không cần đăng ký, không lưu thông tin' },
            { icon: '🤖', title: 'AI chuyên biệt', desc: 'Được huấn luyện cho tâm lý học sinh Việt Nam' },
            { icon: '🛡️', title: 'An toàn 3 lớp', desc: 'Phát hiện khủng hoảng tự động' },
            { icon: '⏰', title: '24/7', desc: 'Sẵn sàng hỗ trợ bất cứ lúc nào' },
            { icon: '📱', title: 'Dễ tiếp cận', desc: 'Chỉ cần smartphone và internet' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-lg p-4 flex items-start space-x-3">
              <div className="text-3xl">{item.icon}</div>
              <div>
                <h3 className="font-semibold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-4">👥 Đội ngũ</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Chúng mình là một đội ngũ 7 người, bao gồm:
        </p>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center space-x-2">
            <span className="text-primary-500">•</span>
            <span>Kỹ sư công nghệ với kinh nghiệm về AI</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="text-primary-500">•</span>
            <span>Chuyên gia nội dung tâm lý học</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="text-primary-500">•</span>
            <span>Nhà thiết kế UX/UI</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="text-primary-500">•</span>
            <span>Học sinh và sinh viên tình nguyện</span>
          </li>
        </ul>
        <p className="text-gray-700 leading-relaxed mt-4 italic">
          Tất cả đều cam kết làm việc <span className="font-semibold">không lương</span> vì sứ mệnh xã hội.
        </p>
      </div>

      {/* Contact CTA */}
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 text-center">
        <h3 className="font-bold text-gray-800 mb-2">
          Muốn biết thêm về dự án?
        </h3>
        <p className="text-gray-600 mb-4">
          Liên hệ với chúng mình hoặc chat với AI
        </p>
        <div className="flex justify-center space-x-3">
          <a
            href="/lien-he"
            className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            📧 Liên hệ
          </a>
          
          <a
            href="/"
            className="bg-white hover:bg-gray-50 text-primary-600 border border-primary-300 px-6 py-3 rounded-lg font-semibold transition"
          >
            💬 Chat ngay
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;