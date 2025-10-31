import React from 'react';
import { EMERGENCY_CONTACTS } from '../../utils/constants';

const Footer = () => {
  const handleCall = (number) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-4">
      <div className="container mx-auto px-4">
        {/* Emergency Contacts */}
        <div className="mb-3">
          <p className="text-xs text-gray-600 mb-2 text-center font-semibold">
            🆘 LIÊN HỆ KHẨN CẤP
          </p>
          <div className="flex justify-center space-x-2">
            {Object.entries(EMERGENCY_CONTACTS).map(([key, contact]) => (
              <button
                key={key}
                onClick={() => handleCall(contact.number)}
                className="flex-1 max-w-[120px] bg-danger-500 hover:bg-danger-600 text-white px-3 py-2 rounded-lg text-xs font-bold transition shadow-sm"
              >
                <div>{contact.number}</div>
                <div className="text-[10px] opacity-90">{contact.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="text-center text-xs text-gray-500 space-y-1">
          <p>🔒 <span className="font-semibold">100% ẩn danh</span> • Không lưu thông tin cá nhân</p>
          <p className="text-[10px]">
            © 2025 Cùng Bạn Lắng Nghe • Miễn phí cho học sinh, sinh viên
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;