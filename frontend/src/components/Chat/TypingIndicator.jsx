// ****************************************************************
// File: frontend/src/components/Chat/TypingIndicator.jsx
// ****************************************************************

import React from 'react';

const TypingIndicator = () => {
  return (
    <div className="flex justify-start mb-4 animate-fade-in">
      <div className="flex items-end space-x-2">
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center flex-shrink-0 shadow-md">
          <span className="text-white text-sm">💙</span>
        </div>

        {/* Typing Animation */}
        <div className="bg-gray-100 border border-gray-200 px-5 py-3 rounded-2xl rounded-bl-md shadow-sm">
          <div className="flex space-x-1.5">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;