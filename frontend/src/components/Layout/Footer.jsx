// ******************************************************************
// File: frontend/src/components/Layout/Footer.jsx
// ******************************************************************

import React from 'react';
import { EMERGENCY_CONTACTS } from '../../utils/constants';

const Footer = () => {
  const handleCall = (number) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <footer className="bg-white border-t-2 border-gray-200 shadow-inner mt-auto">
      <div className="container mx-auto px-4 py-6">
        
        {/* ============================================ */}
        {/* EMERGENCY CONTACTS SECTION */}
        {/* ============================================ */}
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
                aria-label={`Gọi ${contact.name} - ${contact.number}`}
              >
                <div className="text-lg md:text-xl font-bold">{contact.number}</div>
                <div className="text-xs md:text-sm opacity-90 mt-1">
                  {contact.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ============================================ */}
        {/* PRIVACY & INFO SECTION */}
        {/* ============================================ */}
        <div className="text-center space-y-3 pt-6 border-t border-gray-200">
          
          {/* Privacy Badge */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
            <span className="text-green-600 text-lg">🔒</span>
            <span className="font-semibold">100% ẩn danh</span>
            <span className="text-gray-400">•</span>
            <span>Không lưu dữ liệu cá nhân</span>
          </div>

          {/* Copyright */}
          <p className="text-xs text-gray-500">
            © 2025 Cùng Bạn Lắng Nghe •
            <span className="font-medium text-primary-600"> Miễn phí </span>
            cho học sinh, sinh viên
          </p>

          {/* ============================================ */}
          {/* NAVIGATION LINKS - ĐÃ THÊM PRIVACY LINK */}
          {/* ============================================ */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500">
            <a 
              href="/gioi-thieu" 
              className="hover:text-primary-600 transition-colors font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-primary-300 rounded px-2 py-1"
            >
              Giới thiệu
            </a>
            <span className="text-gray-300">|</span>
            
            <a 
              href="/lien-he" 
              className="hover:text-primary-600 transition-colors font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-primary-300 rounded px-2 py-1"
            >
              Liên hệ
            </a>
            <span className="text-gray-300">|</span>
            
            <a 
              href="/hoi-dap" 
              className="hover:text-primary-600 transition-colors font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-primary-300 rounded px-2 py-1"
            >
              Hỏi đáp
            </a>
            <span className="text-gray-300">|</span>
            
            {/* Privacy Dashboard Link */}
            <a 
              href="/quyen-rieng-tu" 
              className="flex items-center gap-1 hover:text-purple-600 transition-colors font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-purple-300 rounded px-2 py-1"
              aria-label="Truy cập Privacy Dashboard"
            >
              <span className="text-sm">🔐</span>
              <span>Quyền riêng tư</span>
            </a>
          </div>

          {/* ============================================ */}
          {/* LEGAL COMPLIANCE BADGES */}
          {/* ============================================ */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <div className="bg-green-50 border border-green-200 rounded-full px-3 py-1 text-xs text-green-700 font-medium flex items-center gap-1 hover:bg-green-100 transition-colors">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Tuân thủ NĐ 13/2023</span>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-full px-3 py-1 text-xs text-blue-700 font-medium flex items-center gap-1 hover:bg-blue-100 transition-colors">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Mã hóa AES-256</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;