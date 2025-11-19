// *************************************************************
// File: frontend/src/components/Chat/MessageInput.jsx
// *************************************************************

import React, { useState, useRef, useEffect } from 'react';

const MESSAGE_MAX_LENGTH = 2000;

const MessageInput = ({ onSend, disabled, isSending }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  // 1. Tự động điều chỉnh chiều cao của textarea (GIỮ NGUYÊN)
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      // Giới hạn chiều cao tối đa là 120px
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [message]);
  
  // ✅ ĐÃ XÓA logic TỰ ĐỘNG FOCUS LÚC KHỞI TẠO để ngăn lỗi cuộn trang web
  /*
  useEffect(() => {
    if (textareaRef.current && !disabled) { 
      textareaRef.current.focus();
    }
  }, [disabled]);
  */

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedMessage = message.trim();

    if (trimmedMessage && !disabled && !isSending) {
      onSend(trimmedMessage);
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        // ✅ Dòng này vẫn được giữ lại để TỰ ĐỘNG FOCUS sau khi gửi tin nhắn 
        // và giúp cuộn khung chat lên đúng vị trí (kết hợp với logic cuộn mới trong ChatInterface)
        textareaRef.current.focus(); 
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const remainingChars = MESSAGE_MAX_LENGTH - message.length;
  const isNearLimit = remainingChars < 100;
  const isOverLimit = remainingChars < 0;

  return (
    <div className="border-t-2 border-gray-200 bg-gray-50 p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, MESSAGE_MAX_LENGTH))}
              onKeyPress={handleKeyPress}
              placeholder={isSending ? "Đang gửi..." : "Nhập tin nhắn của bạn... (Shift + Enter để xuống dòng)"}
              disabled={disabled}
              rows="1"
              className="w-full px-4 py-3 text-sm bg-white border-2 border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
              style={{ minHeight: '48px', maxHeight: '120px' }}
              aria-label="Nhập tin nhắn"
            />
            {isNearLimit && (
              <p className={`text-xs mt-1 px-1 font-medium ${isOverLimit ? 'text-red-600' : 'text-warning-600'}`}>
                {isOverLimit ? '❌' : '⚠️'} Còn {remainingChars} ký tự
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={disabled || !message.trim() || isSending || isOverLimit}
            className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white p-3 rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            aria-label="Gửi tin nhắn"
          >
            {isSending ? (
              <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
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
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;