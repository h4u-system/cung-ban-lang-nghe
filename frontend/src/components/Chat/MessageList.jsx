// frontend/src/components/Chat/MessageList.jsx

import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

const MessageList = ({ messages, isTyping }) => {
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);
  const prevMessageCountRef = useRef(0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Logic cuộn được chỉnh sửa:
    // CHỈ cuộn khi có tin nhắn MỚI được thêm VÀ tổng số tin nhắn lớn hơn 1
    // (Lần đầu tiên tải tin nhắn chào mừng (messages.length=1) sẽ bị bỏ qua)
    if (messages.length > prevMessageCountRef.current && messages.length > 1) {
      scrollToBottom();
    }
    prevMessageCountRef.current = messages.length;
  }, [messages]);

  useEffect(() => {
    if (isTyping) {
      scrollToBottom();
    }
  }, [isTyping]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto px-4 py-6 bg-gradient-to-b from-gray-50 to-white"
      style={{ scrollbarWidth: 'thin' }}
    >
      {messages.length === 0 ? (
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
            <p className="text-xs text-gray-500">
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
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
};

export default MessageList;