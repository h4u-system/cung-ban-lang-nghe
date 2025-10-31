import React, { useState } from 'react';
import { MESSAGE_MAX_LENGTH } from '../../utils/constants';

const MessageInput = ({ onSend, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedMessage = message.trim();
    
    if (trimmedMessage && !disabled) {
      onSend(trimmedMessage);
      setMessage('');
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

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <form onSubmit={handleSubmit} className="flex items-end space-x-2">
        {/* Input Area */}
        <div className="flex-1">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value.slice(0, MESSAGE_MAX_LENGTH))}
            onKeyPress={handleKeyPress}
            placeholder="Nhập tin nhắn của bạn..."
            disabled={disabled}
            rows="2"
            className="w-full px-4 py-3 border border-gray-300 rounded-bubble resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          {isNearLimit && (
            <p className="text-xs text-warning-500 mt-1">
              Còn {remainingChars} ký tự
            </p>
          )}
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={disabled || !message.trim()}
          className="bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-4 rounded-full shadow-lg transition flex items-center justify-center"
          aria-label="Gửi tin nhắn"
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
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default MessageInput;