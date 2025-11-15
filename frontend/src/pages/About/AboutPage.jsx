// frontend/src/pages/About/AboutPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Hero Header - Improved */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-10 md:p-12 text-white text-center shadow-2xl">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10">
          <div className="text-6xl mb-4 animate-bounce">💙</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Cùng Bạn Lắng Nghe
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Trợ lý tâm lý học đường đầu tiên tại Việt Nam
          </p>
        </div>
      </div>

      {/* Inspiration Story - Improved Typography */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-blue-800 flex items-center gap-3">
          <span className="text-4xl">✨</span>
          Nguồn cảm hứng & Khởi nguồn
        </h2>
        
        <div className="space-y-5 text-gray-800 leading-relaxed">
          <p className="text-lg">
            Khởi đầu của <strong className="text-blue-700">"Cùng Bạn Lắng Nghe"</strong> bắt nguồn từ một khoảnh khắc thấu hiểu sâu sắc.
          </p>
          
          <p className="text-lg">
            Vào tháng <strong>8 năm 2025</strong>, một học sinh lớp 11 của <strong className="text-blue-700">Trường THPT Lương Thế Vinh - Quận I (TP. HCM)</strong> (nay là Phường Cầu Ông Lãnh) đã nhận thấy 
            những áp lực vô hình đang đè nặng lên bạn bè đồng trang lứa.
          </p>

          <blockquote className="my-6 p-6 bg-white border-l-4 border-blue-400 rounded-r-2xl shadow-md">
            <p className="text-gray-700 italic text-lg leading-relaxed">
              "Mình muốn tạo ra một không gian <strong>an toàn, ẩn danh</strong>, nơi học sinh, sinh viên trên toàn quốc 
              có thể giải tỏa áp lực học tập, thi cử, tình cảm, gia đình và đặc biệt là nỗi sợ hãi từ <strong className="text-red-600">bạo lực học đường</strong>."
            </p>
          </blockquote>

          <p className="text-lg">
            Ý tưởng này nhanh chóng nhận được sự <strong className="text-green-600">ủng hộ tuyệt đối</strong> từ gia đình và bạn bè. 
            Người Cha đã trở thành cố vấn và đồng hành đầu tiên, kế tiếp là Mẹ và em Gái thân yêu, và sau đó là các Anh Chị trong dòng họ tham gia dự án.
            Và từ đó, cộng đồng <strong className="text-blue-700">Cùng Bạn Lắng Nghe</strong> ra đời với sứ mệnh cao cả.
          </p>
        </div>
      </div>

      {/* Mission - Enhanced */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-100">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
          <span className="text-4xl">🎯</span>
          Sứ mệnh của chúng mình
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Mang đến không gian tư vấn tâm lý{' '}
          <span className="font-bold text-blue-600">miễn phí, ẩn danh, và dễ tiếp cận</span>{' '}
          cho học sinh, sinh viên Việt Nam thông qua ứng dụng đột phá của công nghệ{' '}
          <span className="font-bold text-blue-600">Trí tuệ nhân tạo (AI)</span>.
        </p>
      </div>

      {/* Problem Stats - Improved Visual */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 border-2 border-red-200 shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-red-700 flex items-center gap-3">
          <span className="text-4xl">😟</span>
          Vấn đề hiện tại
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { 
              stat: '60%+', 
              desc: 'Học sinh cho rằng học tập dẫn đến trầm cảm',
              source: '(Báo Thanh Niên, 2022)',
              color: 'from-red-500 to-red-600'
            },
            { 
              stat: '14 triệu', 
              desc: 'Người rối loạn tâm thần nhưng chỉ có 143 nhà tâm lý lâm sàng',
              source: '(Bộ Y Tế)',
              color: 'from-orange-500 to-orange-600'
            },
            { 
              stat: '500k-2M', 
              desc: 'VND/buổi tư vấn - Quá đắt đỏ cho nhiều gia đình',
              source: '',
              color: 'from-yellow-500 to-yellow-600'
            },
            { 
              stat: '😔', 
              desc: 'Tâm lý ngại ngùng, sợ bị gắn mác khi đi tư vấn',
              source: '',
              color: 'from-gray-500 to-gray-600'
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all">
              <div className={`text-4xl font-bold mb-3 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                {item.stat}
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {item.desc}
              </p>
              {item.source && (
                <p className="text-xs text-gray-500 mt-2 italic">{item.source}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Solution - Enhanced Grid */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200 shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-green-700 flex items-center gap-3">
          <span className="text-4xl">✅</span>
          Giải pháp của chúng mình
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: '🆓', title: '100% miễn phí', desc: 'Không tốn một đồng nào', color: 'green' },
            { icon: '🎭', title: 'Hoàn toàn ẩn danh', desc: 'Không cần đăng ký, không lưu thông tin', color: 'blue' },
            { icon: '🤖', title: 'AI chuyên biệt', desc: 'Được huấn luyện cho tâm lý học sinh Việt Nam', color: 'purple' },
            { icon: '🛡️', title: 'An toàn 3 lớp', desc: 'Phát hiện khủng hoảng tự động', color: 'red' },
            { icon: '⏰', title: '24/7', desc: 'Sẵn sàng hỗ trợ bất cứ lúc nào', color: 'orange' },
            { icon: '📱', title: 'Dễ tiếp cận', desc: 'Chỉ cần smartphone và internet', color: 'indigo' }
          ].map((item, idx) => (
            <div key={idx} className={`bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border-2 border-${item.color}-100`}>
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-gray-800 mb-2 text-lg">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team - Improved */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
          <span className="text-4xl">👥</span>
          Đội ngũ tình nguyện
        </h2>
        
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Chúng mình là một đội ngũ đa chuyên ngành và nhiệt huyết, tất cả đều cam kết hoạt động vì sứ mệnh xã hội:
        </p>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {[
            { icon: '💻', title: 'Kỹ sư Công nghệ & AI', desc: 'Đảm bảo hệ thống AI thấu cảm và chính xác' },
            { icon: '🧠', title: 'Chuyên gia Nội dung Tâm lý', desc: 'Xây dựng kiến thức nền tảng và kịch bản hỗ trợ' },
            { icon: '🎨', title: 'Nhà thiết kế UX/UI', desc: 'Tạo giao diện thân thiện, dễ sử dụng cho học sinh' },
            { icon: '🎓', title: 'Học sinh & Sinh viên', desc: 'Cung cấp góc nhìn thực tế và hỗ trợ cộng đồng' }
          ].map((member, idx) => (
            <div key={idx} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-5 border-2 border-gray-200 hover:border-blue-300 transition-all">
              <div className="text-3xl mb-2">{member.icon}</div>
              <h3 className="font-bold text-gray-800 mb-1">{member.title}</h3>
              <p className="text-sm text-gray-600">{member.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-2xl p-6">
          <p className="text-gray-800 leading-relaxed text-lg">
            <strong className="text-amber-700">💛 Tất cả thành viên đều làm việc</strong>{' '}
            <span className="font-bold text-red-600">không lương</span>{' '}
            với một mục tiêu chung: không để một học sinh, sinh viên nào phải đối mặt với khó khăn tâm lý một mình.
          </p>
        </div>
      </div>

      {/* CTA - Enhanced */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center shadow-2xl">
        <h3 className="text-2xl font-bold mb-3">
          Muốn biết thêm về dự án?
        </h3>
        <p className="text-blue-100 mb-6 text-lg">
          Liên hệ với chúng mình hoặc chat với Banana ngay
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/lien-he"
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
          >
            <span>📧</span>
            Liên hệ
          </Link>
          
          <Link
            to="/"
            className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
          >
            <span>💬</span>
            Chat với Banana ngay
          </Link>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-6 text-center">
        <p className="text-sm text-gray-600 leading-relaxed">
          <strong>⚠️ Lưu ý:</strong> Cùng Bạn Lắng Nghe là công cụ hỗ trợ, không thay thế tư vấn tâm lý chuyên nghiệp. 
          Trong trường hợp khẩn cấp, hãy liên hệ với các đường dây nóng hoặc cơ sở y tế.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;