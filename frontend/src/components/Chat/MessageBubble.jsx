import React from 'react';

const MessageBubble = ({ message, isUser }) => {
  const timestamp = new Date(message.timestamp || Date.now());
  const timeString = timestamp.toLocaleTimeString('vi-VN', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex items-end space-x-2 max-w-[80%] ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        {!isUser && (
          <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm">🤖</span>
          </div>
        )}

        {/* Message Bubble */}
        <div className="flex flex-col">
          <div
            className={`px-4 py-3 rounded-bubble shadow-chat ${
              isUser
                ? 'bg-primary-500 text-white rounded-br-sm'
                : 'bg-white text-gray-800 rounded-bl-sm'
            }`}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
              {message.content}
            </p>
          </div>
          
          {/* Timestamp */}
          <span className={`text-[10px] text-gray-400 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
            {timeString}
          </span>
        </div>

        {/* User Avatar */}
        {isUser && (
          <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm">👤</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;