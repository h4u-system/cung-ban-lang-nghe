import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import CrisisAlert from '../Crisis/CrisisAlert';
import sessionService from '../../services/session';
import messageService from '../../services/message';
import encryptionService from '../../utils/encryption';
import { UI_MESSAGES } from '../../utils/constants';

const ChatInterface = () => {
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showCrisisAlert, setShowCrisisAlert] = useState(false);
  const [error, setError] = useState(null);

  // Initialize session
  useEffect(() => {
    const initSession = async () => {
      try {
        const session = await sessionService.getOrCreateSession();
        setSessionId(session.sessionId);
        
        // Add welcome message
        setMessages([{
          id: 'welcome',
          role: 'assistant',
          content: UI_MESSAGES.welcome,
          timestamp: new Date().toISOString()
        }]);
      } catch (err) {
        setError('Không thể khởi tạo phiên làm việc. Vui lòng tải lại trang.');
        console.error('Session init error:', err);
      }
    };

    initSession();
  }, []);

  // Handle send message
  const handleSendMessage = async (content) => {
    if (!sessionId || isSending) return;

    // Check for crisis keywords
    if (encryptionService.containsCrisisKeywords(content)) {
      setShowCrisisAlert(true);
      return;
    }

    setIsSending(true);
    setError(null);

    // Add user message to UI
    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: content,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      // Send to backend
      setIsTyping(true);
      const response = await messageService.sendMessage(sessionId, content, true);

      // Add AI response
      const aiMessage = {
        id: response.message_id || Date.now().toString() + '-ai',
        role: 'assistant',
        content: response.ai_response || 'Xin lỗi, mình chưa thể trả lời ngay bây giờ.',
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, aiMessage]);

      // Check if AI detected crisis
      if (response.crisis_detected) {
        setShowCrisisAlert(true);
      }
    } catch (err) {
      setError('Không thể gửi tin nhắn. Vui lòng thử lại.');
      console.error('Send message error:', err);
      
      // Remove user message if failed
      setMessages(prev => prev.filter(m => m.id !== userMessage.id));
    } finally {
      setIsTyping(false);
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] bg-white rounded-lg shadow-chat overflow-hidden">
      {/* Error Banner */}
      {error && (
        <div className="bg-danger-500 text-white px-4 py-2 text-sm text-center">
          {error}
        </div>
      )}

      {/* Messages */}
      <MessageList messages={messages} isTyping={isTyping} />

      {/* Input */}
      <MessageInput onSend={handleSendMessage} disabled={isSending || !sessionId} />

      {/* Crisis Alert Modal */}
      {showCrisisAlert && (
        <CrisisAlert onClose={() => setShowCrisisAlert(false)} />
      )}
    </div>
  );
};

export default ChatInterface;