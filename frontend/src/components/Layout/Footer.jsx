// frontend/src/components/Layout/Footer.jsx
// ✅ IMPROVED: Consistent spacing and sizing
import React from 'react';
import { EMERGENCY_CONTACTS } from '../../utils/constants';

const Footer = () => {
  const handleCall = (number) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <footer className="bg-white border-t-2 border-gray-200 shadow-inner mt-auto">
      <div className="container mx-auto px-4 py-6">
        {/* Emergency Contacts */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl">🆘</span>
            <p className="text-base font-bold text-red-600 uppercase tracking-wide">
              Liên hệ khẩn cấp
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
            {Object.entries(EMERGENCY_CONTACTS).map(([key, contact]) => (
              <button
                key={key}
                onClick={() => handleCall(contact.number)}
                className="bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-4 rounded-xl font-bold transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-300"
              >
                <div className="text-lg md:text-xl font-bold">{contact.number}</div>
                <div className="text-xs md:text-sm opacity-90 mt-1">
                  {contact.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Security & Info */}
        <div className="text-center space-y-3 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
            <span className="text-green-600 text-lg">🔒</span>
            <span className="font-semibold">100% ẩn danh</span>
            <span className="text-gray-400">•</span>
            <span>Không lưu dữ liệu cá nhân</span>
          </div>

          <p className="text-xs text-gray-500">
            © 2025 Cùng Bạn Lắng Nghe •
            <span className="font-medium text-primary-600"> Miễn phí </span>
            cho học sinh, sinh viên
          </p>

          <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
            <a href="/gioi-thieu" className="hover:text-primary-600 transition-colors font-medium">
              Giới thiệu
            </a>
            <span className="text-gray-300">|</span>
            <a href="/lien-he" className="hover:text-primary-600 transition-colors font-medium">
              Liên hệ
            </a>
            <span className="text-gray-300">|</span>
            <a href="/hoi-dap" className="hover:text-primary-600 transition-colors font-medium">
              Hỏi đáp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;