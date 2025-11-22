// ******************************************************************
// File: frontend/src/components/Legal/DisclaimerModal.jsx
// Mobile-first, Visibility, Scroll UX
// ******************************************************************

import React, { useState, useEffect } from 'react';

const DisclaimerModal = ({ onAccept }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const hasAccepted = localStorage.getItem('banana_disclaimer_accepted');
    if (!hasAccepted) {
      setIsOpen(true);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleScroll = (e) => {
    const element = e.target;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight - element.clientHeight;
    const progress = Math.min((scrollTop / scrollHeight) * 100, 100);
    
    setScrollProgress(progress);
    
    // Consider "scrolled" when reached 90% (more forgiving)
    if (progress >= 90 && !hasScrolled) {
      setHasScrolled(true);
    }
  };

  const handleAccept = () => {
    localStorage.setItem('banana_disclaimer_accepted', 'true');
    localStorage.setItem('banana_disclaimer_date', new Date().toISOString());
    document.body.style.overflow = 'unset';
    setIsOpen(false);
    if (onAccept) onAccept();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl animate-scale-in flex flex-col">
        
        {/* ===== HEADER - IMPROVED VISIBILITY ===== */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 sm:px-6 py-4 sm:py-5 flex-shrink-0">
          <div className="flex items-start sm:items-center space-x-2 sm:space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-2xl sm:text-3xl">⚠️</span>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold leading-tight">
                Tuyên bố Miễn trừ Trách nhiệm
              </h2>
              {/* ✨ IMPROVED: More visible subtitle */}
              <p className="text-sm sm:text-base text-amber-50 mt-1 font-medium">
                ⚠️ Vui lòng đọc kỹ trước khi sử dụng Banana
              </p>
            </div>
          </div>
        </div>

        {/* ===== SCROLL PROGRESS BAR ===== */}
        <div className="w-full h-1 bg-gray-200 flex-shrink-0">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* ===== CONTENT - SCROLLABLE ===== */}
        <div 
          className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-5"
          onScroll={handleScroll}
        >
          {/* Giới thiệu */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-3 sm:p-4 rounded-r-lg">
            <p className="text-sm sm:text-base text-gray-800 leading-relaxed">
              <strong className="text-blue-700">Banana</strong> là trợ lý Trí tuệ Nhân tạo (AI) được thiết kế để hỗ trợ tâm lý học đường. 
              <strong> Banana KHÔNG phải là chuyên gia tâm lý lâm sàng, bác sĩ tâm thần, hay nhà tư vấn được cấp phép.</strong>
            </p>
          </div>

          {/* Banana KHÔNG thể */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-red-600 mb-2 sm:mb-3 flex items-center">
              <span className="mr-2">🚫</span>
              Banana KHÔNG THỂ:
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {[
                {
                  title: 'Chẩn đoán bệnh tâm thần:',
                  desc: 'Banana không thể xác định các rối loạn tâm lý như trầm cảm, lo âu, rối loạn lưỡng cực, v.v.'
                },
                {
                  title: 'Kê đơn thuốc hoặc điều trị y khoa:',
                  desc: 'Mọi quyết định về thuốc men phải được bác sĩ chuyên khoa chỉ định.'
                },
                {
                  title: 'Thay thế tư vấn tâm lý chuyên nghiệp:',
                  desc: 'Banana chỉ là công cụ hỗ trợ ban đầu, không thay thế mối quan hệ trị liệu với chuyên gia.'
                },
                {
                  title: 'Đảm bảo giải quyết mọi vấn đề:',
                  desc: 'Hiệu quả hỗ trợ phụ thuộc vào nhiều yếu tố cá nhân và hoàn cảnh.'
                },
                {
                  title: 'Can thiệp vào tình huống khẩn cấp:',
                  desc: 'Trong trường hợp nguy hiểm, Banana chỉ có thể kết nối bạn với dịch vụ cấp cứu.'
                }
              ].map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-red-500 mt-1 flex-shrink-0 text-sm sm:text-base">❌</span>
                  <span className="text-xs sm:text-sm text-gray-700">
                    <strong>{item.title}</strong> {item.desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Banana CÓ THỂ */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-green-600 mb-2 sm:mb-3 flex items-center">
              <span className="mr-2">✅</span>
              Banana CÓ THỂ:
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {[
                {
                  title: 'Lắng nghe và thấu hiểu:',
                  desc: 'Tạo không gian an toàn để bạn chia sẻ cảm xúc, suy nghĩ mà không bị phán xét.'
                },
                {
                  title: 'Cung cấp thông tin giáo dục:',
                  desc: 'Chia sẻ kiến thức về kỹ năng sống, quản lý cảm xúc, giải quyết vấn đề dựa trên tài liệu chuyên môn.'
                },
                {
                  title: 'Đề xuất chiến lược ứng phó:',
                  desc: 'Gợi ý các kỹ thuật thư giãn, tư duy tích cực phù hợp với học sinh, sinh viên.'
                },
                {
                  title: 'Kết nối nguồn hỗ trợ chuyên nghiệp:',
                  desc: 'Cung cấp thông tin các tổ chức, hotline tư vấn tâm lý chính thống.'
                },
                {
                  title: 'Phát hiện tình huống khủng hoảng:',
                  desc: 'Nhận diện dấu hiệu nguy hiểm (tự tử, bạo lực, xâm hại) và kích hoạt cảnh báo khẩn cấp.'
                }
              ].map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1 flex-shrink-0 text-sm sm:text-base">✓</span>
                  <span className="text-xs sm:text-sm text-gray-700">
                    <strong>{item.title}</strong> {item.desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cảnh báo Khẩn cấp */}
          <div className="bg-red-50 border-2 border-red-500 rounded-xl p-4 sm:p-5">
            <h3 className="text-lg sm:text-xl font-bold text-red-700 mb-2 sm:mb-3 flex items-center">
              <span className="mr-2">🚨</span>
              TÌNH HUỐNG KHẨN CẤP
            </h3>
            <p className="text-xs sm:text-sm text-gray-800 leading-relaxed mb-3">
              Nếu bạn hoặc người thân đang có <strong>nguy cơ tự tử, tự hại, hoặc gặp nguy hiểm tức thời</strong>, 
              hãy NGỪNG sử dụng Banana và gọi ngay:
            </p>
            <div className="space-y-2 bg-white p-3 sm:p-4 rounded-lg">
              <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <div>
                  <div className="font-bold text-red-600 text-base sm:text-lg">111</div>
                  <div className="text-xs sm:text-sm text-gray-600">Tổng đài Bảo vệ Trẻ em (Miễn phí 24/7)</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-red-600 text-base sm:text-lg">115</div>
                  <div className="text-xs sm:text-sm text-gray-600">Cấp cứu Y tế (Khẩn cấp)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Trách nhiệm người dùng & Legal */}
          <div className="space-y-3 sm:space-y-4">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2">📌 Trách nhiệm của Người dùng:</h3>
              <ul className="space-y-1.5 sm:space-y-2 text-gray-700 text-xs sm:text-sm">
                <li className="flex items-start space-x-2">
                  <span className="mt-1">•</span>
                  <span>Sử dụng thông tin từ Banana một cách có trách nhiệm và phù hợp với hoàn cảnh cá nhân.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="mt-1">•</span>
                  <span>Tìm kiếm sự giúp đỡ chuyên nghiệp khi cần thiết (bác sĩ tâm thần, nhà tâm lý lâm sàng).</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="mt-1">•</span>
                  <span>KHÔNG dựa vào Banana để đưa ra quyết định y khoa hoặc pháp lý quan trọng.</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-300">
              <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2">⚖️ Giới hạn Trách nhiệm Pháp lý:</h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                Công ty H4U và các thành viên phát triển Banana <strong>KHÔNG chịu trách nhiệm</strong> về:
              </p>
              <ul className="text-xs sm:text-sm text-gray-700 space-y-1 mt-2 ml-4">
                <li>• Bất kỳ quyết định cá nhân nào được đưa ra dựa trên lời khuyên của Banana</li>
                <li>• Thiệt hại trực tiếp hoặc gián tiếp phát sinh từ việc sử dụng dịch vụ</li>
                <li>• Sự cố kỹ thuật, gián đoạn dịch vụ, hoặc lỗi AI</li>
                <li>• Nội dung do người dùng tạo ra trong quá trình sử dụng</li>
              </ul>
              <p className="text-xs text-gray-600 mt-3 italic">
                Bằng việc nhấn "Tôi đã hiểu và đồng ý", bạn xác nhận đã đọc, hiểu và chấp nhận toàn bộ nội dung tuyên bố này.
              </p>
            </div>
          </div>

          {/* ===== SCROLL INDICATOR ===== */}
          {!hasScrolled && scrollProgress < 90 && (
            <div className="flex flex-col items-center gap-2 py-4">
              <p className="text-xs sm:text-sm text-gray-600 font-medium animate-pulse">
                ↓ Vui lòng cuộn xuống để đọc hết nội dung ↓
              </p>
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          )}
        </div>

        {/* ===== FOOTER - ACTION BUTTONS ===== */}
        <div className="bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 flex-shrink-0">
          <button
            onClick={handleAccept}
            disabled={!hasScrolled}
            className={`w-full py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-200 ${
              hasScrolled
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl active:scale-95'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {hasScrolled ? (
              <span className="flex items-center justify-center gap-2">
                <span>✓</span>
                <span>Tôi đã hiểu và đồng ý</span>
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span>↓</span>
                <span>Vui lòng đọc hết nội dung ({Math.round(scrollProgress)}%)</span>
              </span>
            )}
          </button>
          <p className="text-xs text-gray-500 text-center mt-2">
            Phiên bản: 1.0 | Cập nhật: Tháng 11/2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerModal;