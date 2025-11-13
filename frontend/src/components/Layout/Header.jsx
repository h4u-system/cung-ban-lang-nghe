// frontend/src/components/Layout/Header.jsx

mport React from 'react';

const Header = () => {
  return (
    <header className="bg-primary-700 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-2xl">💙</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Cùng Bạn Lắng Nghe</h1>
              <p className="text-xs text-primary-100">Trợ lý tâm lý học đường</p>
            </div>
          </div>

          {/* Info Button */}
          <button 
            className="p-2 hover:bg-primary-600 rounded-full transition"
            aria-label="Thông tin"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;