// frontend/src/pages/NotFound/NotFoundPage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-6 max-w-md px-4">
        <div className="text-9xl animate-bounce">😕</div>
        
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        
        <h2 className="text-2xl font-bold text-gray-700">
          Không tìm thấy trang
        </h2>
        
        <p className="text-gray-600 leading-relaxed">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
          Hãy quay về trang chủ để tiếp tục trò chuyện nhé!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
          >
            🏠 Về trang chủ
          </button>
          
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-xl font-semibold transition-all"
          >
            ← Quay lại
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;