// frontend/src/components/Layout/Footer.jsx

import React from 'react';
import { EMERGENCY_CONTACTS } from '../../utils/constants';

const Footer = () => {
  const handleCall = (number) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <footer className="bg-white border-t border-gray-200 shadow-inner">
      <div className="container mx-auto px-4 py-5">
        {/* Emergency Contacts */}
        <div className="mb-4">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-xl">🆘</span>
            <p className="text-sm font-bold text-red-600 uppercase tracking-wide">
              Liên hệ khẩn cấp
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-2 max-w-lg mx-auto">
            {Object.entries(EMERGENCY_CONTACTS).map(([key, contact]) => (
              <button
                key={key}
                onClick={() => handleCall(contact.number)}
                className="bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 py-3 rounded-xl font-bold transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
              >
                <div className="text-base md:text-lg">{contact.number}</div>
                <div className="text-[10px] md:text-xs opacity-90 mt-0.5">
                  {contact.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Security & Info */}
        <div className="text-center space-y-2 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
            <span className="text-green-600">🔒</span>
            <span className="font-semibold">100% ẩn danh</span>
            <span className="text-gray-400">•</span>
            <span>Không lưu dữ liệu cá nhân</span>
          </div>
          
          <p className="text-xs text-gray-500">
            © 2025 Cùng Bạn Lắng Nghe • 
            <span className="font-medium text-primary-600"> Miễn phí </span>
            cho học sinh, sinh viên
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;