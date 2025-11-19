// ***************************************************************
// File: frontend/src/components/Chat/ChatInterface.jsx
// ***************************************************************

import React, { useState, useEffect, useRef } from 'react';
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
  const [isInitializing, setIsInitializing] = useState(true);
  
  // Ref để cuộn đến cuối danh sách tin nhắn nội bộ (Vấn đề 3)
  const messagesEndRef = useRef(null); 
  // Ref để tham chiếu đến khu vực Input (Dùng cho cuộn trang web Vấn đề 2)
  const inputContainerRef = useRef(null); 
  
  const initialLoadRef = useRef(true); 

  useEffect(() => {
    const initSession = async () => {
      try {
        setIsInitializing(true);
        const session = await sessionService.getOrCreateSession();
        setSessionId(session.sessionId);

        setMessages([{
          id: 'welcome',
          role: 'assistant',
          content: UI_MESSAGES.welcome,
          timestamp: new Date().toISOString()
        }]);
      } catch (err) {
        setError('Không thể khởi tạo phiên làm việc. Vui lòng tải lại trang.');
        console.error('Session init error:', err);
      } finally {
        setIsInitializing(false);
      }
    };

    initSession();
  }, []);

  // ✅ LOGIC CUỘN NỘI BỘ (Vấn đề 3): Cuộn đến tin nhắn mới nhất
  useEffect(() => {
    if (initialLoadRef.current && messages.length === 1) {
        initialLoadRef.current = false;
        return;
    }

    // Cuộn đến cuối VÙNG TIN NHẮN (messagesEndRef)
    if (messagesEndRef.current) {
        // block: 'end' đảm bảo tin nhắn cuối cùng luôn được hiển thị, 
        // sát với khu vực Input.
        messagesEndRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'end' 
        });
    }
  }, [messages, isTyping]);


  const handleSendMessage = async (content) => {
    if (!sessionId || isSending) return;

    if (encryptionService.containsCrisisKeywords && encryptionService.containsCrisisKeywords(content)) {
      setShowCrisisAlert(true);
      setCrisisInfo({ trigger: 'client_side_detection' });
      return;
    }

    setIsSending(true);
    setError(null);

    const tempUserMessageId = `temp-${Date.now()}`;
    const userMessage = {
      id: tempUserMessageId,
      role: 'user',
      content: content,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]); 

    try {
      setIsTyping(true); 
      const response = await messageService.sendMessage(sessionId, content);

      setMessages(prev => prev.map(msg =>
        msg.id === tempUserMessageId
          ? { ...msg, id: response.user_message?.id || msg.id }
          : msg
      ));

      const aiMessage = {
        id: response.ai_message?.id || `ai-${Date.now()}`,
        role: 'assistant',
        content: response.ai_message?.content || response.content || 'Xin lỗi, tôi không thể trả lời lúc này.',
        timestamp: response.ai_message?.created_at || new Date().toISOString(),
        model_used: response.ai_message?.model_used,
        processing_time_ms: response.ai_message?.processing_time_ms
      };

      setMessages(prev => [...prev, aiMessage]); 

      if (response.crisis_detected || response.crisis_info) {
        setShowCrisisAlert(true);
        setCrisisInfo(response.crisis_info || { trigger: 'server_side_detection' });
      }

    } catch (err) {
      setError('Không thể gửi tin nhắn. Vui lòng thử lại.');
      console.error('Send message error:', err);
      setMessages(prev => prev.filter(m => m.id !== tempUserMessageId));
    } finally {
      setIsTyping(false);
      setIsSending(false);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center h-[500px] bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl">
        <div className="text-center space-y-3">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent mx-auto"></div>
          <p className="text-gray-600 font-medium">Đang khởi tạo...</p>
        </div>
      </div>
    );
  }

  return (
    // ✅ THÊM ID CHO VIỆC CUỘN TỪ NÚT "BẮT ĐẦU TRÒ CHUYỆN"
    // Nếu nút "Bắt đầu trò chuyện" của bạn là một link có href="#chat-box", 
    // thì việc đặt id="chat-box" cho div này sẽ đảm bảo trình duyệt cuộn đúng.
    <div id="chat-box" className="flex flex-col h-[600px] bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-200">
      
      {error && (
        <div className="bg-red-500 text-white px-4 py-3 text-sm text-center flex items-center justify-center gap-2 flex-shrink-0">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Vùng tin nhắn có thanh cuộn */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <MessageList messages={messages} isTyping={isTyping} />
        {/* Đặt ref tại cuối nội dung cuộn để cuộn đến đây */}
        <div ref={messagesEndRef} /> 
      </div>

      {/* Vùng Input: Giữ ref inputContainerRef cho mục đích tham chiếu vị trí */}
      <div className="flex-shrink-0" ref={inputContainerRef}>
        <MessageInput
          onSend={handleSendMessage}
          disabled={isSending || !sessionId || isInitializing}
          isSending={isSending}
        />
      </div>

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