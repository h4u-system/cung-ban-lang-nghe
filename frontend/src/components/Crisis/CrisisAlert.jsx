import React from 'react';
import { EMERGENCY_CONTACTS } from '../../utils/constants';

const CrisisAlert = ({ onClose }) => {
  const handleCall = (number) => {
    window.location.href = `tel:${number}`;
  };

  const handleFindHospital = () => {
    window.open('https://www.google.com/maps/search/bệnh+viện+tâm+thần', '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-lg max-w-md w-full shadow-emergency overflow-hidden">
        {/* Header */}
        <div className="bg-danger-500 text-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">🆘</span>
              <h2 className="text-xl font-bold">THÔNG BÁO QUAN TRỌNG</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-danger-600 rounded-full p-1 transition"
              aria-label="Đóng"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-4">
          <p className="text-gray-800 text-base leading-relaxed">
            Chúng mình nhận thấy bạn đang trải qua giai đoạn rất khó khăn. 
            <span className="font-bold text-danger-500"> An toàn của bạn là ưu tiên số 1.</span>
          </p>

          {/* Emergency Contacts */}
          <div className="bg-danger-50 border-2 border-danger-200 rounded-lg p-4">
            <p className="font-bold text-danger-700 mb-3 text-center">
              LIÊN HỆ KHẨN CẤP NGAY:
            </p>
            <div className="space-y-2">
              {Object.entries(EMERGENCY_CONTACTS).map(([key, contact]) => (
                <button
                  key={key}
                  onClick={() => handleCall(contact.number)}
                  className="w-full bg-danger-500 hover:bg-danger-600 text-white px-4 py-3 rounded-lg font-bold transition shadow-md flex items-center justify-between"
                >
                  <div className="text-left">
                    <div className="text-lg">{contact.number}</div>
                    <div className="text-xs opacity-90">{contact.name}</div>
                  </div>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Find Hospital */}
          <button
            onClick={handleFindHospital}
            className="w-full bg-primary-500 hover:bg-primary-600 text-white px-4 py-3 rounded-lg font-semibold transition shadow-md flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>TÌM BỆNH VIỆN GẦN NHẤT</span>
          </button>

          {/* Support Message */}
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
            <p className="text-sm text-gray-700 text-center leading-relaxed">
              💙 <span className="font-semibold">Bạn không cô đơn.</span><br />
              Có rất nhiều người quan tâm và sẵn sàng giúp đỡ bạn. 
              Hãy liên hệ với một trong các số hotline trên để được hỗ trợ ngay.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-center">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-sm font-medium transition"
          >
            Quay lại trò chuyện
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrisisAlert;