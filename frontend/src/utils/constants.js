/**
 * File: frontend/src/utils/constants.js
 */

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

// Session Configuration
export const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
export const MESSAGE_MAX_LENGTH = 2000;
export const TYPING_INDICATOR_DELAY = 1000;

// Crisis Detection Keywords (client-side warning)
export const CRISIS_KEYWORDS = [
  'tự tử', 'tự sát', 'kết thúc cuộc đời', 'muốn chết',
  'cắt tay', 'tự làm đau', 'làm hại bản thân',
  'vô vọng', 'cuộc sống vô nghĩa', 'không còn hy vọng'
];

// Emergency Contacts
export const EMERGENCY_CONTACTS = {
  childProtection: {
    name: 'Tổng đài Bảo vệ trẻ em',
    number: '111',
    description: 'Miễn phí 24/7'
  },
  medical: {
    name: 'Cấp cứu Y tế',
    number: '115',
    description: 'Khẩn cấp'
  },
  mentalHealth: {
    name: 'Đường dây nóng Ngày Mai',
    number: '1900 636 976',
    description: 'Tư vấn tâm lý'
  }
};

// UI Messages
export const UI_MESSAGES = {
  welcome: 'Xin chào! Mình là trợ lý tâm lý của bạn. Bạn có thể chia sẻ bất cứ điều gì với mình nhé 💙',
  placeholder: 'Nhập tin nhắn của bạn...',
  sending: 'Đang gửi...',
  error: 'Đã có lỗi xảy ra. Vui lòng thử lại.',
  sessionExpired: 'Phiên làm việc đã hết hạn. Bắt đầu cuộc trò chuyện mới?'
};

export default {
  API_BASE_URL,
  SESSION_TIMEOUT,
  MESSAGE_MAX_LENGTH,
  TYPING_INDICATOR_DELAY,
  CRISIS_KEYWORDS,
  EMERGENCY_CONTACTS,
  UI_MESSAGES
};
