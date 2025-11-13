// frontend/src/components/Crisis/CrisisAlert.jsx

import React from 'react';
import { EMERGENCY_CONTACTS } from '../../utils/constants';

const CrisisAlert = ({ crisisInfo, onClose }) => {
  const handleCall = (number) => {
    window.location.href = `tel:${number}`;
  };

  const handleFindHospital = () => {
    window.open('https://www.google.com/maps/search/bệnh+viện+tâm+thần', '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-3xl">🆘</span>
              </div>
              <div>
                <h2 className="text-xl font-bold">THÔNG BÁO QUAN TRỌNG</h2>
                <p className="text-red-100 text-sm">Chúng tôi quan tâm đến an toàn của bạn</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all"
              aria-label="Đóng"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-5">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
            <p className="text-gray-800 text-base leading-relaxed">
              Chúng mình nhận thấy bạn đang trải qua giai đoạn rất khó khăn. 
              <span className="font-bold text-red-600"> An toàn của bạn là ưu tiên số 1.</span>
            </p>
          </div>

          {/* Emergency Contacts */}
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <p className="font-bold text-red-700 uppercase tracking-wide">
                Liên hệ khẩn cấp ngay
              </p>
            </div>
            
            <div className="space-y-2">
              {Object.entries(EMERGENCY_CONTACTS).map(([key, contact]) => (
                <button
                  key={key}
                  onClick={() => handleCall(contact.number)}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-4 rounded-xl font-bold transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-between group"
                >
                  <div className="text-left">
                    <div className="text-xl font-bold">{contact.number}</div>
                    <div className="text-sm opacity-90">{contact.name}</div>
                  </div>
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Find Hospital */}
          <button
            onClick={handleFindHospital}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-5 py-4 rounded-xl font-bold transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center space-x-3 group"
          >
            <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>TÌM BỆNH VIỆN GẦN NHẤT</span>
          </button>

          {/* Support Message */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
            <p className="text-sm text-gray-700 text-center leading-relaxed">
              <span className="text-2xl block mb-2">💙</span>
              <span className="font-bold text-blue-700">Bạn không cô đơn.</span><br />
              Có rất nhiều người quan tâm và sẵn sàng giúp đỡ bạn. 
              Hãy liên hệ với một trong các số hotline trên để được hỗ trợ ngay.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-center">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-sm font-semibold transition-all hover:underline"
          >
            ← Quay lại trò chuyện
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrisisAlert;