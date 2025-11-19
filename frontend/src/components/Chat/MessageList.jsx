// ****************************************************************
// File: frontend/src/components/Chat/MessageList.jsx
// ****************************************************************

import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

const MessageList = ({ messages, isTyping }) => {
  // messagesEndRef không cần thiết ở đây nữa
  // containerRef vẫn có thể giữ nếu bạn muốn dùng cho mục đích khác

  // --- XÓA CÁC BIẾN REF VÀ LOGIC CUỘN KHỎI ĐÂY ---
  // const messagesEndRef = useRef(null); 
  // const containerRef = useRef(null);
  // const prevMessageCountRef = useRef(0);
  
  // const scrollToBottom = () => { ... } // XÓA
  
  // useEffect cuộn theo messages // XÓA
  // useEffect cuộn theo isTyping // XÓA
  // --- END OF DELETED LOGIC ---
  
  return (
    <div
      // Xóa ref={containerRef} (nếu không dùng)
      className="flex-1 overflow-y-auto px-4 py-6 bg-gradient-to-b from-gray-50 to-white"
      style={{ scrollbarWidth: 'thin' }}
    >
      {messages.length === 0 ? (
        // ... (phần Messages.length === 0 giữ nguyên)
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-gray-500 space-y-4 max-w-md px-4">
            <div className="text-6xl animate-bounce">💙</div>
            <h3 className="text-xl font-bold text-gray-700">Xin chào bạn!</h3>
            <p className="text-sm leading-relaxed text-gray-600">
              Mình là Banana của bạn. Bạn có thể chia sẻ bất cứ điều gì với mình nhé.
            </p>
            <div className="bg-primary-50 border border-primary-200 rounded-xl p-4 text-left space-y-2">
              <p className="text-xs text-gray-600 font-semibold">💡 Bạn có thể:</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Chia sẻ cảm xúc và tâm trạng</li>
                <li>• Hỏi về vấn đề học tập</li>
                <li>• Tâm sự về bạn bè, gia đình</li>
                <li>• Tâm sự về người ấy của bạn</li>
              </ul>
            </div>
            <p className="text-xs text-xs text-gray-500">
              🔒 <span className="font-semibold">Hoàn toàn ẩn danh</span> • Không lưu thông tin cá nhân
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-1">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isUser={message.role === 'user'}
            />
          ))}
          {isTyping && <TypingIndicator />}
          {/* XÓA: <div ref={messagesEndRef} /> */}
          {/* messagesEndRef sẽ được đặt ở ChatInterface.jsx */}
        </div>
      )}
    </div>
  );
};

export default MessageList;