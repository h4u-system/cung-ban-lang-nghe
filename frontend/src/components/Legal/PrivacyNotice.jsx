// ****************************************************************
// File: frontend/src/components/Legal/PrivacyNotice.jsx
// ***************************************************************

import React, { useState } from 'react';

const PrivacyNotice = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header - Always Visible */}
      <div 
        className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-5 py-4 cursor-pointer hover:from-purple-600 hover:to-indigo-700 transition-all"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">🔒</span>
            </div>
            <div>
              <h3 className="text-lg font-bold">Chính sách Bảo mật & Quyền riêng tư</h3>
              <p className="text-purple-100 text-sm">100% Ẩn danh • Mã hóa tuyệt đối • Tuân thủ pháp luật</p>
            </div>
          </div>
          <svg 
            className={`w-6 h-6 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Expandable Content */}
      <div 
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? 'max-h-[2000px]' : 'max-h-0'
        }`}
      >
        <div className="px-6 py-5 space-y-5">
          {/* Cam kết bảo mật */}
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
            <h4 className="font-bold text-green-800 mb-2 flex items-center">
              <span className="mr-2">✅</span>
              Cam kết Bảo mật của Banana
            </h4>
            <p className="text-gray-700 text-sm leading-relaxed">
              Chúng tôi hiểu rằng <strong>quyền riêng tư là quyền con người cơ bản</strong>, đặc biệt quan trọng đối với học sinh, sinh viên. 
              Banana được thiết kế với nguyên tắc <strong>"Zero-Knowledge"</strong> - chúng tôi KHÔNG THỂ và KHÔNG BAO GIỜ đọc nội dung trò chuyện của bạn.
            </p>
          </div>

          {/* 1. Không yêu cầu đăng ký */}
          <div>
            <h4 className="font-bold text-gray-800 mb-3 flex items-center text-lg">
              <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2 text-blue-600 font-bold">1</span>
              Hoàn toàn Ẩn danh - KHÔNG yêu cầu đăng ký
            </h4>
            <div className="ml-10 space-y-2 text-sm text-gray-700">
              <div className="flex items-start space-x-2">
                <span className="text-blue-500 mt-0.5">▪</span>
                <span><strong>Không cần tên, email, số điện thoại:</strong> Bạn truy cập và sử dụng ngay lập tức.</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500 mt-0.5">▪</span>
                <span><strong>Session ID ngẫu nhiên:</strong> Mỗi phiên chat được tạo ID tạm thời, không liên kết với danh tính.</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500 mt-0.5">▪</span>
                <span><strong>Không theo dõi IP hoặc thiết bị:</strong> Chúng tôi không lưu địa chỉ IP hay thông tin thiết bị cá nhân.</span>
              </div>
            </div>
          </div>

          {/* 2. Mã hóa End-to-End */}
          <div>
            <h4 className="font-bold text-gray-800 mb-3 flex items-center text-lg">
              <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-2 text-purple-600 font-bold">2</span>
              Mã hóa End-to-End (AES-256-GCM)
            </h4>
            <div className="ml-10 space-y-2 text-sm text-gray-700">
              <div className="flex items-start space-x-2">
                <span className="text-purple-500 mt-0.5">▪</span>
                <span><strong>Mã hóa tại trình duyệt:</strong> Tin nhắn được mã hóa ngay trên thiết bị của bạn trước khi gửi đi.</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-purple-500 mt-0.5">▪</span>
                <span><strong>Chuẩn quân sự AES-256:</strong> Sử dụng thuật toán mã hóa mạnh nhất hiện nay (256-bit).</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-purple-500 mt-0.5">▪</span>
                <span><strong>Chỉ bạn có khóa giải mã:</strong> Ngay cả đội ngũ Banana cũng không thể đọc nội dung.</span>
              </div>
            </div>
          </div>

          {/* 3. Zero PII Policy */}
          <div>
            <h4 className="font-bold text-gray-800 mb-3 flex items-center text-lg">
              <span className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-2 text-indigo-600 font-bold">3</span>
              Chính sách Zero-PII (Không lưu thông tin cá nhân)
            </h4>
            <div className="ml-10 space-y-2 text-sm text-gray-700">
              <p className="mb-2"><strong>PII (Personally Identifiable Information)</strong> là thông tin có thể nhận dạng bạn. Banana CAM KẾT:</p>
              <div className="flex items-start space-x-2">
                <span className="text-red-500 mt-0.5">✗</span>
                <span>KHÔNG lưu họ tên, ngày sinh, địa chỉ</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-red-500 mt-0.5">✗</span>
                <span>KHÔNG lưu email, số điện thoại, tài khoản mạng xã hội</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-red-500 mt-0.5">✗</span>
                <span>KHÔNG lưu địa chỉ IP, vị trí GPS, thông tin thiết bị</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-red-500 mt-0.5">✗</span>
                <span>KHÔNG chia sẻ dữ liệu với bên thứ ba (quảng cáo, marketing)</span>
              </div>
            </div>
          </div>

          {/* 4. Tự động xóa */}
          <div>
            <h4 className="font-bold text-gray-800 mb-3 flex items-center text-lg">
              <span className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-2 text-orange-600 font-bold">4</span>
              Tự động Xóa sau 30 ngày
            </h4>
            <div className="ml-10 space-y-2 text-sm text-gray-700">
              <div className="flex items-start space-x-2">
                <span className="text-orange-500 mt-0.5">▪</span>
                <span><strong>Lưu tạm thời 30 ngày:</strong> Dữ liệu chỉ được giữ để cải thiện mô hình AI.</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-orange-500 mt-0.5">▪</span>
                <span><strong>Xóa vĩnh viễn tự động:</strong> Sau 30 ngày, mọi dữ liệu bị xóa KHÔNG THỂ KHÔI PHỤC.</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-orange-500 mt-0.5">▪</span>
                <span><strong>Xóa ngay lập tức:</strong> Bạn có thể xóa phiên chat bất cứ lúc nào bằng cách đóng trình duyệt.</span>
              </div>
            </div>
          </div>

          {/* 5. Tuân thủ pháp luật */}
          <div>
            <h4 className="font-bold text-gray-800 mb-3 flex items-center text-lg">
              <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2 text-green-600 font-bold">5</span>
              Tuân thủ Pháp luật Việt Nam
            </h4>
            <div className="ml-10 space-y-3">
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-semibold text-gray-800">Nghị định 13/2023/NĐ-CP</span>
                </div>
                <p className="text-xs text-gray-600 ml-7">Về bảo vệ dữ liệu cá nhân</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-semibold text-gray-800">Luật An toàn Thông tin Mạng</span>
                </div>
                <p className="text-xs text-gray-600 ml-7">Đảm bảo an ninh hệ thống và dữ liệu</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-semibold text-gray-800">Luật Bảo vệ, chăm sóc và Giáo dục trẻ em</span>
                </div>
                <p className="text-xs text-gray-600 ml-7">Ưu tiên an toàn và quyền lợi trẻ em</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border-2 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-800 mb-1">Xem chi tiết quyền riêng tư của bạn</p>
                <p className="text-xs text-gray-600">Truy cập Privacy Dashboard để quản lý dữ liệu</p>
              </div>
              <a
                href="/quyen-rieng-tu"
                className="ml-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-semibold rounded-lg transition-all shadow-md hover:shadow-lg whitespace-nowrap"
              >
                Xem Dashboard →
              </a>
            </div>
          </div>

          {/* Footer note */}
          <div className="text-center pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Phiên bản: 1.0 | Cập nhật lần cuối: Tháng 11/2025
            </p>
            <p className="text-xs text-gray-400 mt-1">
              © 2025 Công ty H4U - Banana AI. Bảo lưu mọi quyền.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyNotice;