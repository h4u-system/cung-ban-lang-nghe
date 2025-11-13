// frontend/src/components/Chat/MessageBubble.jsx

import React from 'react';

const MessageBubble = ({ message, isUser }) => {
  const timestamp = new Date(message.timestamp || Date.now());
  const timeString = timestamp.toLocaleTimeString('vi-VN', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fade-in`}>
      <div className={`flex items-end space-x-2 max-w-[85%] md:max-w-[75%] ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        {!isUser && (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center flex-shrink-0 shadow-md">
            <span className="text-white text-sm">💙</span>
          </div>
        )}

        {/* Message Bubble */}
        <div className="flex flex-col">
          <div
            className={`px-4 py-3 rounded-2xl shadow-sm transition-all duration-200 ${
              isUser
                ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-br-md'
                : 'bg-gray-100 text-gray-800 rounded-bl-md border border-gray-200'
            }`}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
              {message.content}
            </p>
            
            {/* Model info (optional, for debugging) */}
            {!isUser && message.model_used && (
              <div className="text-[10px] text-gray-500 mt-1 opacity-60">
                {message.model_used}
              </div>
            )}
          </div>
          
          {/* Timestamp */}
          <span className={`text-[10px] text-gray-400 mt-1 px-1 ${isUser ? 'text-right' : 'text-left'}`}>
            {timeString}
          </span>
        </div>

        {/* User Avatar */}
        {isUser && (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center flex-shrink-0 shadow-md">
            <span className="text-white text-sm">👤</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;