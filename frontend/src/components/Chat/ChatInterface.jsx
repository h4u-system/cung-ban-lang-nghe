// frontend/src/components/Chat/ChatInterface.jsx

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
  const [crisisInfo, setCrisisInfo] = useState(null);
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

    // Check for crisis keywords (client-side)
    if (encryptionService.containsCrisisKeywords(content)) {
      setShowCrisisAlert(true);
      return;
    }

    setIsSending(true);
    setError(null);

    // Add user message to UI immediately
    const tempUserMessageId = Date.now().toString();
    const userMessage = {
      id: tempUserMessageId,
      role: 'user',
      content: content,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      // Send to backend
      setIsTyping(true);
      const response = await messageService.sendMessage(sessionId, content);

      // ✅ FIX: Update user message with actual ID from backend
      setMessages(prev => prev.map(msg => 
        msg.id === tempUserMessageId 
          ? { ...msg, id: response.user_message.id }
          : msg
      ));

      // ✅ FIX: Add AI response with proper structure
      const aiMessage = {
        id: response.ai_message.id,
        role: 'assistant',
        content: response.ai_message.content,
        timestamp: response.ai_message.created_at,
        model_used: response.ai_message.model_used,
        processing_time_ms: response.ai_message.processing_time_ms
      };

      setMessages(prev => [...prev, aiMessage]);

      // ✅ FIX: Check if AI detected crisis (server-side detection)
      if (response.crisis_detected || response.crisis_info) {
        setShowCrisisAlert(true);
        setCrisisInfo(response.crisis_info);
      }
    } catch (err) {
      setError('Không thể gửi tin nhắn. Vui lòng thử lại.');
      console.error('Send message error:', err);
      
      // Remove user message if failed
      setMessages(prev => prev.filter(m => m.id !== tempUserMessageId));
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
        <CrisisAlert 
          crisisInfo={crisisInfo}
          onClose={() => {
            setShowCrisisAlert(false);
            setCrisisInfo(null);
          }} 
        />
      )}
    </div>
  );
};

export default ChatInterface;