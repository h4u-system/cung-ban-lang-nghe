// ******************************************************************
// File: frontend/src/components/Legal/DisclaimerModal.jsx
// ******************************************************************

import React, { useState, useEffect } from 'react';

const DisclaimerModal = ({ onAccept }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    // Kiểm tra xem user đã đồng ý disclaimer chưa
    const hasAccepted = localStorage.getItem('banana_disclaimer_accepted');
    if (!hasAccepted) {
      setIsOpen(true);
    }
  }, []);

  const handleScroll = (e) => {
    const element = e.target;
    const isAtBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 50;
    if (isAtBottom && !hasScrolled) {
      setHasScrolled(true);
    }
  };

  const handleAccept = () => {
    localStorage.setItem('banana_disclaimer_accepted', 'true');
    localStorage.setItem('banana_disclaimer_date', new Date().toISOString());
    setIsOpen(false);
    if (onAccept) onAccept();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-5">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-3xl">⚠️</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Tuyên bố Miễn trừ Trách nhiệm</h2>
              <p className="text-amber-100 text-sm">Vui lòng đọc kỹ trước khi sử dụng Banana</p>
            </div>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div 
          className="px-6 py-6 max-h-[60vh] overflow-y-auto space-y-5"
          onScroll={handleScroll}
        >
          {/* Giới thiệu */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
            <p className="text-gray-800 leading-relaxed">
              <strong className="text-blue-700">Banana</strong> là trợ lý Trí tuệ Nhân tạo (AI) được thiết kế để hỗ trợ tâm lý học đường. 
              <strong> Banana KHÔNG phải là chuyên gia tâm lý lâm sàng, bác sĩ tâm thần, hay nhà tư vấn được cấp phép.</strong>
            </p>
          </div>

          {/* Banana KHÔNG thể */}
          <div>
            <h3 className="text-xl font-bold text-red-600 mb-3 flex items-center">
              <span className="mr-2">🚫</span>
              Banana KHÔNG THỂ:
            </h3>
            <ul className="space-y-3 ml-4">
              <li className="flex items-start space-x-2">
                <span className="text-red-500 mt-1">❌</span>
                <span className="text-gray-700">
                  <strong>Chẩn đoán bệnh tâm thần:</strong> Banana không thể xác định các rối loạn tâm lý như trầm cảm, lo âu, rối loạn lưỡng cực, v.v.
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-500 mt-1">❌</span>
                <span className="text-gray-700">
                  <strong>Kê đơn thuốc hoặc điều trị y khoa:</strong> Mọi quyết định về thuốc men phải được bác sĩ chuyên khoa chỉ định.
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-500 mt-1">❌</span>
                <span className="text-gray-700">
                  <strong>Thay thế tư vấn tâm lý chuyên nghiệp:</strong> Banana chỉ là công cụ hỗ trợ ban đầu, không thay thế mối quan hệ trị liệu với chuyên gia.
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-500 mt-1">❌</span>
                <span className="text-gray-700">
                  <strong>Đảm bảo giải quyết mọi vấn đề:</strong> Hiệu quả hỗ trợ phụ thuộc vào nhiều yếu tố cá nhân và hoàn cảnh.
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-500 mt-1">❌</span>
                <span className="text-gray-700">
                  <strong>Can thiệp vào tình huống khẩn cấp:</strong> Trong trường hợp nguy hiểm, Banana chỉ có thể kết nối bạn với dịch vụ cấp cứu.
                </span>
              </li>
            </ul>
          </div>

          {/* Banana CÓ THỂ */}
          <div>
            <h3 className="text-xl font-bold text-green-600 mb-3 flex items-center">
              <span className="mr-2">✅</span>
              Banana CÓ THỂ:
            </h3>
            <ul className="space-y-3 ml-4">
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-gray-700">
                  <strong>Lắng nghe và thấu hiểu:</strong> Tạo không gian an toàn để bạn chia sẻ cảm xúc, suy nghĩ mà không bị phán xét.
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-gray-700">
                  <strong>Cung cấp thông tin giáo dục:</strong> Chia sẻ kiến thức về kỹ năng sống, quản lý cảm xúc, giải quyết vấn đề dựa trên tài liệu chuyên môn.
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-gray-700">
                  <strong>Đề xuất chiến lược ứng phó:</strong> Gợi ý các kỹ thuật thư giãn, tư duy tích cực phù hợp với học sinh, sinh viên.
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-gray-700">
                  <strong>Kết nối nguồn hỗ trợ chuyên nghiệp:</strong> Cung cấp thông tin các tổ chức, hotline tư vấn tâm lý chính thống.
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-gray-700">
                  <strong>Phát hiện tình huống khủng hoảng:</strong> Nhận diện dấu hiệu nguy hiểm (tự tử, bạo lực, xâm hại) và kích hoạt cảnh báo khẩn cấp.
                </span>
              </li>
            </ul>
          </div>

          {/* Cảnh báo Khẩn cấp */}
          <div className="bg-red-50 border-2 border-red-500 rounded-xl p-5">
            <h3 className="text-xl font-bold text-red-700 mb-3 flex items-center">
              <span className="mr-2">🚨</span>
              TÌNH HUỐNG KHẨN CẤP
            </h3>
            <p className="text-gray-800 leading-relaxed mb-3">
              Nếu bạn hoặc người thân đang có <strong>nguy cơ tự tử, tự hại, hoặc gặp nguy hiểm tức thời</strong>, 
              hãy NGỪNG sử dụng Banana và gọi ngay:
            </p>
            <div className="space-y-2 bg-white p-4 rounded-lg">
              <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <div>
                  <div className="font-bold text-red-600 text-lg">111</div>
                  <div className="text-sm text-gray-600">Tổng đài Bảo vệ Trẻ em (Miễn phí 24/7)</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-red-600 text-lg">115</div>
                  <div className="text-sm text-gray-600">Cấp cứu Y tế (Khẩn cấp)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Trách nhiệm người dùng */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">📌 Trách nhiệm của Người dùng:</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
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

          {/* Giới hạn trách nhiệm */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
            <h3 className="text-lg font-bold text-gray-800 mb-2">⚖️ Giới hạn Trách nhiệm Pháp lý:</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Công ty H4U và các thành viên phát triển Banana <strong>KHÔNG chịu trách nhiệm</strong> về:
            </p>
            <ul className="text-sm text-gray-700 space-y-1 mt-2 ml-4">
              <li>• Bất kỳ quyết định cá nhân nào được đưa ra dựa trên lời khuyên của Banana</li>
              <li>• Thiệt hại trực tiếp hoặc gián tiếp phát sinh từ việc sử dụng dịch vụ</li>
              <li>• Sự cố kỹ thuật, gián đoạn dịch vụ, hoặc lỗi AI</li>
              <li>• Nội dung do người dùng tạo ra trong quá trình sử dụng</li>
            </ul>
            <p className="text-xs text-gray-600 mt-3 italic">
              Bằng việc nhấn "Tôi đã hiểu và đồng ý", bạn xác nhận đã đọc, hiểu và chấp nhận toàn bộ nội dung tuyên bố này.
            </p>
          </div>

          {/* Scroll indicator */}
          {!hasScrolled && (
            <div className="flex justify-center animate-bounce">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          )}
        </div>

        {/* Footer - Action Buttons */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <button
            onClick={handleAccept}
            disabled={!hasScrolled}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 ${
              hasScrolled
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {hasScrolled ? '✓ Tôi đã hiểu và đồng ý' : '↓ Vui lòng đọc hết nội dung'}
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