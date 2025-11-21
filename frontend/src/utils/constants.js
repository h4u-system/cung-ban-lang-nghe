/**
 * File: frontend/src/utils/constants.js
 */

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

// Session Configuration
export const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
export const MESSAGE_MAX_LENGTH = 2000;
export const TYPING_INDICATOR_DELAY = 1000;

// Crisis Detection Keywords (client-side warning + sync với backend)
export const CRISIS_KEYWORDS = [
  // Nhóm Tự tử
  'tự tử', 'tự sát', 'kết thúc cuộc đời', 'muốn chết', 'biến mất', 'chết', 'chấm dứt',
  
  // Nhóm Tự làm hại
  'cắt tay', 'tự làm đau', 'làm hại bản thân', 'tự hành xác', 'tự hành hạ', 'đâm bản thân',
  
  // Nhóm Tuyệt vọng
  'vô vọng', 'cuộc sống vô nghĩa', 'không còn hy vọng', 'tuyệt vọng', 'khủng hoảng',
  
  // Xâm hại tình dục
  'quấy rối tình dục', 'hiếp dâm', 'cưỡng bức', 'lạm dụng tình dục', 
  'xâm hại tình dục', 'bị cưỡng hiếp', 'bị sờ mó', 'bị xâm hại',
  
  // Bạo lực
  'bị đánh đập', 'bạo lực gia đình', 'xâm hại', 'bạo lực học đường',
  'đánh chết', 'chém', 'giết', 'hành hạ', 'tra tấn'
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
  welcome: 'Xin chào! Mình là Banana của bạn. Bạn có thể chia sẻ bất cứ điều gì với Banana nhé 💙',
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