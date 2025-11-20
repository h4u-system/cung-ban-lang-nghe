// *****************************************************************
// File: frontend/src/pages/About/AboutPage.jsx
// Unified Professional Design - Professional consistent layout
// *****************************************************************

import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* ✅ Hero Header - Fixed Typography */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-8 md:p-12 lg:p-14 text-white text-center shadow-2xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10">
          <div className="text-5xl md:text-6xl lg:text-7xl mb-4 md:mb-5 animate-bounce">💙</div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 leading-tight">
            <span className="inline-block">Cùng Bạn Lắng Nghe</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed px-4">
            Trợ lý tâm lý học đường đầu tiên tại Việt Nam
          </p>
        </div>
      </div>

      {/* Inspiration Story */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-3xl p-6 md:p-8 lg:p-10 shadow-xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-5 md:mb-6 text-blue-800 flex items-center gap-3 leading-tight">
          <span className="text-3xl md:text-4xl">✨</span>
          <span>Nguồn cảm hứng & Khởi nguồn</span>
        </h2>
        
        <div className="space-y-4 md:space-y-5 text-gray-800 text-sm md:text-base leading-relaxed">
          <p>
            Khởi đầu của <strong className="text-blue-700 whitespace-nowrap">Cùng Bạn Lắng Nghe</strong> bắt nguồn từ một khoảnh khắc thấu hiểu sâu sắc.
          </p>
          
          <p>
            Vào tháng <strong>8 năm 2025</strong>, một học sinh lớp 11 của <strong className="text-blue-700">Trường THPT Lương Thế Vinh - Quận I (TP. HCM)</strong> đã nhận thấy 
            những áp lực vô hình đang đè nặng lên bạn bè đồng trang lứa.
          </p>

          <blockquote className="my-5 md:my-6 p-5 md:p-6 bg-white border-l-4 border-blue-400 rounded-r-2xl shadow-md">
            <p className="text-gray-700 italic text-base md:text-lg leading-relaxed">
              "Mình muốn tạo ra một không gian <strong>an toàn, ẩn danh</strong>, nơi học sinh, sinh viên trên toàn quốc 
              có thể giải tỏa áp lực học tập, thi cử, tình cảm, gia đình và đặc biệt là nỗi sợ hãi từ <strong className="text-red-600">bạo lực học đường</strong>."
            </p>
          </blockquote>

          <p>
            Ý tưởng này nhanh chóng nhận được sự <strong className="text-green-600">ủng hộ tuyệt đối</strong> từ gia đình và bạn bè. 
            Người Cha đã trở thành cố vấn và đồng hành đầu tiên, kế tiếp là Mẹ và em Gái thân yêu, và sau đó là các Anh Chị trong dòng họ tham gia dự án.
            Và từ đó, cộng đồng <strong className="text-blue-700 whitespace-nowrap">Cùng Bạn Lắng Nghe</strong> ra đời với sứ mệnh cao cả.
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 lg:p-10 border-2 border-gray-200">
        <h2 className="text-2xl md:text-3xl font-bold mb-5 md:mb-6 text-gray-800 flex items-center gap-3 leading-tight">
          <span className="text-3xl md:text-4xl">🎯</span>
          <span>Sứ mệnh của chúng mình</span>
        </h2>
        <p className="text-base md:text-lg text-gray-700 leading-relaxed">
          Mang đến không gian tư vấn tâm lý{' '}
          <span className="font-bold text-blue-600">miễn phí, ẩn danh, và dễ tiếp cận</span>{' '}
          cho học sinh, sinh viên Việt Nam thông qua ứng dụng đột phá của công nghệ{' '}
          <span className="font-bold text-blue-600">Trí tuệ nhân tạo (AI)</span>.
        </p>
      </div>

      {/* Problem Stats */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-6 md:p-8 lg:p-10 border-2 border-red-200 shadow-xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-5 md:mb-6 text-red-700 flex items-center gap-3 leading-tight">
          <span className="text-3xl md:text-4xl">😟</span>
          <span>Vấn đề hiện tại</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            <div key={idx} className="bg-white rounded-2xl p-5 md:p-6 shadow-md hover:shadow-xl transition-all">
              <div className={`text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
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

      {/* Solution */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-6 md:p-8 lg:p-10 border-2 border-green-200 shadow-xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-5 md:mb-6 text-green-700 flex items-center gap-3 leading-tight">
          <span className="text-3xl md:text-4xl">✅</span>
          <span>Giải pháp của chúng mình</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: '🆓', title: '100% miễn phí', desc: 'Không tốn một đồng nào' },
            { icon: '🎭', title: 'Hoàn toàn ẩn danh', desc: 'Không cần đăng ký, không lưu thông tin' },
            { icon: '🤖', title: 'AI chuyên biệt', desc: 'Được huấn luyện cho tâm lý học sinh Việt Nam' },
            { icon: '🛡️', title: 'An toàn 3 lớp', desc: 'Phát hiện khủng hoảng tự động' },
            { icon: '⏰', title: '24/7', desc: 'Sẵn sàng hỗ trợ bất cứ lúc nào' },
            { icon: '📱', title: 'Dễ tiếp cận', desc: 'Chỉ cần smartphone và internet' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-4 md:p-5 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border-2 border-green-100">
              <div className="text-3xl md:text-4xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-gray-800 mb-2 text-base md:text-lg">{item.title}</h3>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 lg:p-10 border-2 border-gray-200">
        <h2 className="text-2xl md:text-3xl font-bold mb-5 md:mb-6 text-gray-800 flex items-center gap-3 leading-tight">
          <span className="text-3xl md:text-4xl">👥</span>
          <span>Đội ngũ tình nguyện</span>
        </h2>
        
        <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-5 md:mb-6">
          Chúng mình là một đội ngũ đa chuyên ngành và nhiệt huyết, tất cả đều cam kết hoạt động vì sứ mệnh xã hội:
        </p>
        
        <div className="grid sm:grid-cols-2 gap-4 mb-5 md:mb-6">
          {[
            { icon: '💻', title: 'Kỹ sư Công nghệ & AI', desc: 'Đảm bảo hệ thống AI thấu cảm và chính xác' },
            { icon: '🧠', title: 'Chuyên gia Nội dung Tâm lý', desc: 'Xây dựng kiến thức nền tảng và kịch bản hỗ trợ' },
            { icon: '🎨', title: 'Nhà thiết kế UX/UI', desc: 'Tạo giao diện thân thiện, dễ sử dụng cho học sinh' },
            { icon: '🎓', title: 'Học sinh & Sinh viên', desc: 'Cung cấp góc nhìn thực tế và hỗ trợ cộng đồng' }
          ].map((member, idx) => (
            <div key={idx} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-4 md:p-5 border-2 border-gray-200 hover:border-blue-300 transition-all">
              <div className="text-2xl md:text-3xl mb-2">{member.icon}</div>
              <h3 className="font-bold text-gray-800 mb-1 text-sm md:text-base">{member.title}</h3>
              <p className="text-xs md:text-sm text-gray-600">{member.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-2xl p-5 md:p-6">
          <p className="text-gray-800 leading-relaxed text-base md:text-lg">
            <strong className="text-amber-700">💛 Tất cả thành viên đều làm việc</strong>{' '}
            <span className="font-bold text-red-600">không lương</span>{' '}
            với một mục tiêu chung: không để một học sinh, sinh viên nào phải đối mặt với khó khăn tâm lý một mình.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-6 md:p-8 lg:p-10 text-white text-center shadow-2xl">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 leading-tight">
          Muốn biết thêm về dự án?
        </h3>
        <p className="text-blue-100 mb-5 md:mb-6 text-base md:text-lg">
          Liên hệ với chúng mình hoặc chat với Banana ngay
        </p>
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
          <Link
            to="/lien-he"
            className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-gray-100 px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl text-sm md:text-base"
          >
            <span>📧</span>
            <span>Liên hệ</span>
          </Link>
          
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl text-sm md:text-base"
          >
            <span>💬</span>
            <span>Chat với Banana ngay</span>
          </Link>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-5 md:p-6 text-center">
        <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
          <strong>⚠️ Lưu ý:</strong> <span className="inline-block">Cùng Bạn Lắng Nghe</span> là công cụ hỗ trợ, không thay thế tư vấn tâm lý chuyên nghiệp. 
          Trong trường hợp khẩn cấp, hãy liên hệ với các đường dây nóng hoặc cơ sở y tế.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;