/**
 * File: frontend/src/utils/constants.js
 * Synchronized với backend crisis detection
 */

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

// Session Configuration
export const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
export const MESSAGE_MAX_LENGTH = 2000;
export const TYPING_INDICATOR_DELAY = 1000;

// ============================================
// CRISIS DETECTION KEYWORDS (CLIENT-SIDE)
// Synchronized với backend/app/utils/ai_engine.py
// ============================================

export const CRISIS_KEYWORDS = {
  // Nhóm TỰ TỬ (Critical Priority)
  suicide: [
    'tự tử',
    'tự sát',
    'kết thúc cuộc đời',
    'muốn chết',
    'không muốn sống',
    'không muốn sống nữa',
    'biến mất',
    'chấm dứt',
  ],
  
  // Nhóm TỰ LÀM HẠI (High Priority)
  selfHarm: [
    'cắt tay',
    'tự làm đau',
    'làm hại bản thân',
    'tự hành xác',
    'tự hành hạ',
    'đâm bản thân',
  ],
  
  // Nhóm TUYỆT VỌNG (Medium-High Priority)
  despair: [
    'tuyệt vọng',
    'vô vọng',
    'cuộc sống vô nghĩa',
    'không còn hy vọng',
    'khủng hoảng',
  ],
  
  // Nhóm XÂM HẠI TÌNH DỤC (Critical Priority)
  sexualAbuse: [
    'quấy rối tình dục',
    'hiếp dâm',
    'cưỡng bức',
    'lạm dụng tình dục',
    'xâm hại tình dục',
    'bị cưỡng hiếp',
    'bị sờ mó',
    'bị xâm hại',
    'bị lạm dụng',
  ],
  
  // Nhóm BẠO LỰC (High Priority)
  violence: [
    'bị đánh đập',
    'bạo lực gia đình',
    'xâm hại',
    'bạo lực học đường',
    'đánh chết',
    'chém',
    'giết',
    'hành hạ',
    'tra tấn',
  ],
};

// Flatten all keywords for quick checking
export const ALL_CRISIS_KEYWORDS = [
  ...CRISIS_KEYWORDS.suicide,
  ...CRISIS_KEYWORDS.selfHarm,
  ...CRISIS_KEYWORDS.despair,
  ...CRISIS_KEYWORDS.sexualAbuse,
  ...CRISIS_KEYWORDS.violence,
];

/**
 * Check if message contains crisis keywords (client-side pre-validation)
 * @param {string} message - User message
 * @returns {boolean} - True if crisis detected
 */
export const containsCrisisKeyword = (message) => {
  if (!message) return false;
  
  const messageLower = message.toLowerCase()
    .replace(/[^\w\sáàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  return ALL_CRISIS_KEYWORDS.some(keyword => {
    const keywordNormalized = keyword.replace(/\s+/g, '\\s+');
    const regex = new RegExp(keywordNormalized, 'i');
    return regex.test(messageLower);
  });
};

// ============================================
// EMERGENCY CONTACTS
// ============================================

export const EMERGENCY_CONTACTS = {
  childProtection: {
    name: 'Tổng đài Bảo vệ trẻ em',
    number: '111',
    description: 'Miễn phí 24/7',
    priority: 1,
    icon: '🆘',
  },
  medical: {
    name: 'Cấp cứu Y tế',
    number: '115',
    description: 'Khẩn cấp',
    priority: 1,
    icon: '🚑',
  },
  mentalHealth: {
    name: 'Đường dây nóng Ngày Mai',
    number: '1900 636 976',
    description: 'Tư vấn tâm lý',
    priority: 2,
    icon: '💬',
  },
};

// ============================================
// UI MESSAGES
// ============================================

export const UI_MESSAGES = {
  welcome: 'Xin chào! Mình là Banana của bạn. Bạn có thể chia sẻ bất cứ điều gì với Banana nhé 💙',
  placeholder: 'Nhập tin nhắn của bạn...',
  sending: 'Đang gửi...',
  typing: 'Banana đang trả lời...',
  error: 'Đã có lỗi xảy ra. Vui lòng thử lại.',
  sessionExpired: 'Phiên làm việc đã hết hạn. Bắt đầu cuộc trò chuyện mới?',
  
  // Crisis-specific messages
  crisisDetected: '🚨 Phát hiện tình huống khẩn cấp',
  crisisWarning: (
    'Mình nhận thấy bạn đang trải qua giai đoạn rất khó khăn. ' +
    'An toàn của bạn là ưu tiên số 1. ' +
    'Hãy liên hệ ngay với các đường dây nóng bên dưới.'
  ),
  
  // Content violation
  contentViolation: (
    '⚠️ Tin nhắn chứa nội dung không phù hợp. ' +
    'Để đảm bảo môi trường an toàn, vui lòng sử dụng ngôn từ phù hợp khi chia sẻ.'
  ),
};

// ============================================
// CRISIS SEVERITY LEVELS
// ============================================

export const CRISIS_SEVERITY = {
  CRITICAL: 'critical',
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
  NONE: 'none',
};

// ============================================
// RESPONSE TIME EXPECTATIONS
// ============================================

export const RESPONSE_TIME = {
  normal: 3000,      // 3 seconds for normal messages
  crisis: 1000,      // 1 second for crisis messages
  timeout: 30000,    // 30 seconds timeout
};

// ============================================
// EXPORT DEFAULT
// ============================================

export default {
  API_BASE_URL,
  SESSION_TIMEOUT,
  MESSAGE_MAX_LENGTH,
  TYPING_INDICATOR_DELAY,
  CRISIS_KEYWORDS,
  ALL_CRISIS_KEYWORDS,
  containsCrisisKeyword,
  EMERGENCY_CONTACTS,
  UI_MESSAGES,
  CRISIS_SEVERITY,
  RESPONSE_TIME,
};