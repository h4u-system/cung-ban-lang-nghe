/**
 * File: frontend/src/utils/legalHelper.js
 * Legal Compliance Helper Functions
 */

// ============================================
// 1. DISCLAIMER MANAGEMENT
// ============================================

/**
 * Kiểm tra user đã đồng ý disclaimer chưa
 */
export const hasAcceptedDisclaimer = () => {
  const accepted = localStorage.getItem('banana_disclaimer_accepted');
  const acceptedDate = localStorage.getItem('banana_disclaimer_date');
  
  // Kiểm tra xem có quá 90 ngày không (yêu cầu đồng ý lại)
  if (accepted && acceptedDate) {
    const daysSinceAccepted = Math.floor(
      (new Date() - new Date(acceptedDate)) / (1000 * 60 * 60 * 24)
    );
    
    // Nếu quá 90 ngày, yêu cầu đồng ý lại
    if (daysSinceAccepted > 90) {
      resetDisclaimerAcceptance();
      return false;
    }
    
    return accepted === 'true';
  }
  
  return false;
};

/**
 * Lưu trạng thái đồng ý disclaimer
 */
export const acceptDisclaimer = () => {
  localStorage.setItem('banana_disclaimer_accepted', 'true');
  localStorage.setItem('banana_disclaimer_date', new Date().toISOString());
  
  // Log event (không gửi lên server, chỉ local tracking)
  logLocalEvent('disclaimer_accepted', {
    version: '1.0',
    timestamp: new Date().toISOString()
  });
};

/**
 * Reset trạng thái disclaimer (dùng cho testing hoặc cập nhật policy)
 */
export const resetDisclaimerAcceptance = () => {
  localStorage.removeItem('banana_disclaimer_accepted');
  localStorage.removeItem('banana_disclaimer_date');
};

/**
 * Lấy thông tin disclaimer
 */
export const getDisclaimerInfo = () => {
  return {
    version: '1.0',
    lastUpdated: 'November 2025',
    accepted: hasAcceptedDisclaimer(),
    acceptedDate: localStorage.getItem('banana_disclaimer_date')
  };
};


// ============================================
// 2. PRIVACY SETTINGS
// ============================================

/**
 * Kiểm tra user đã đọc privacy notice chưa
 */
export const hasReadPrivacyNotice = () => {
  return localStorage.getItem('banana_privacy_read') === 'true';
};

/**
 * Đánh dấu đã đọc privacy notice
 */
export const markPrivacyNoticeAsRead = () => {
  localStorage.setItem('banana_privacy_read', 'true');
  localStorage.setItem('banana_privacy_read_date', new Date().toISOString());
};

/**
 * Lấy thông tin về privacy settings
 */
export const getPrivacySettings = () => {
  return {
    encryption: 'AES-256-GCM',
    anonymity: 'Full',
    dataRetention: '30 days',
    autoDelete: true,
    piiCollection: false,
    thirdPartySharing: false
  };
};


// ============================================
// 3. COMPLIANCE LOGGING (Local only - NO SERVER)
// ============================================

/**
 * Log sự kiện local (KHÔNG gửi lên server)
 * Chỉ để tracking UX và debugging
 */
export const logLocalEvent = (eventName, eventData = {}) => {
  try {
    const events = JSON.parse(localStorage.getItem('banana_local_events') || '[]');
    
    // Giới hạn chỉ lưu 50 events gần nhất
    if (events.length >= 50) {
      events.shift(); // Xóa event cũ nhất
    }
    
    events.push({
      event: eventName,
      timestamp: new Date().toISOString(),
      data: eventData
    });
    
    localStorage.setItem('banana_local_events', JSON.stringify(events));
  } catch (error) {
    console.error('Failed to log local event:', error);
  }
};

/**
 * Lấy local events (cho debugging)
 */
export const getLocalEvents = () => {
  try {
    return JSON.parse(localStorage.getItem('banana_local_events') || '[]');
  } catch {
    return [];
  }
};

/**
 * Xóa tất cả local events
 */
export const clearLocalEvents = () => {
  localStorage.removeItem('banana_local_events');
};


// ============================================
// 4. EMERGENCY CONTACT VALIDATION
// ============================================

/**
 * Validate emergency phone numbers
 */
export const validateEmergencyContact = (number) => {
  const validNumbers = ['111', '115', '1900636976'];
  return validNumbers.includes(number.replace(/\s/g, ''));
};

/**
 * Format emergency contact cho display
 */
export const formatEmergencyContact = (contact) => {
  return {
    display: contact.number,
    callable: `tel:${contact.number.replace(/\s/g, '')}`,
    name: contact.name,
    description: contact.description
  };
};


// ============================================
// 5. DATA RETENTION & AUTO-DELETE
// ============================================

/**
 * Kiểm tra và tự động xóa dữ liệu cũ (30 ngày)
 */
export const checkAndCleanupOldData = () => {
  const keys = Object.keys(localStorage);
  const now = new Date();
  
  keys.forEach(key => {
    if (key.startsWith('banana_session_')) {
      try {
        const data = JSON.parse(localStorage.getItem(key));
        if (data && data.createdAt) {
          const daysSinceCreation = Math.floor(
            (now - new Date(data.createdAt)) / (1000 * 60 * 60 * 24)
          );
          
          // Xóa nếu quá 30 ngày
          if (daysSinceCreation > 30) {
            localStorage.removeItem(key);
            logLocalEvent('auto_cleanup', { key, age: daysSinceCreation });
          }
        }
      } catch (error) {
        // Invalid JSON, xóa luôn
        localStorage.removeItem(key);
      }
    }
  });
};

/**
 * Xóa toàn bộ dữ liệu người dùng (Right to be forgotten)
 */
export const deleteAllUserData = () => {
  // Lưu disclaimer status trước khi xóa
  const disclaimerAccepted = localStorage.getItem('banana_disclaimer_accepted');
  
  // Xóa tất cả keys của Banana
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith('banana_')) {
      localStorage.removeItem(key);
    }
  });
  
  // Khôi phục disclaimer status (để không phải đồng ý lại)
  if (disclaimerAccepted) {
    localStorage.setItem('banana_disclaimer_accepted', disclaimerAccepted);
    localStorage.setItem('banana_disclaimer_date', new Date().toISOString());
  }
  
  logLocalEvent('user_data_deleted', { reason: 'user_request' });
  
  return {
    success: true,
    message: 'Đã xóa toàn bộ dữ liệu cá nhân. Bạn có thể tiếp tục sử dụng Banana.',
    dataDeleted: keys.filter(k => k.startsWith('banana_')).length
  };
};


// ============================================
// 6. COMPLIANCE REPORT
// ============================================

/**
 * Tạo báo cáo tuân thủ (cho user xem)
 */
export const generateComplianceReport = () => {
  return {
    timestamp: new Date().toISOString(),
    disclaimer: getDisclaimerInfo(),
    privacy: {
      read: hasReadPrivacyNotice(),
      settings: getPrivacySettings()
    },
    dataRetention: {
      policy: '30 days auto-delete',
      nextCleanup: calculateNextCleanup()
    },
    legal: {
      decree13_2023: 'Compliant',
      cyberSecurity: 'Compliant',
      childProtection: 'Compliant'
    },
    rights: {
      rightToAccess: 'Available',
      rightToDelete: 'Available',
      rightToPortability: 'Not Applicable (Anonymous)'
    }
  };
};

/**
 * Tính toán thời gian cleanup tiếp theo
 */
const calculateNextCleanup = () => {
  const now = new Date();
  const keys = Object.keys(localStorage);
  let oldestSession = null;
  
  keys.forEach(key => {
    if (key.startsWith('banana_session_')) {
      try {
        const data = JSON.parse(localStorage.getItem(key));
        if (data && data.createdAt) {
          const createdDate = new Date(data.createdAt);
          if (!oldestSession || createdDate < oldestSession) {
            oldestSession = createdDate;
          }
        }
      } catch {}
    }
  });
  
  if (oldestSession) {
    const nextCleanup = new Date(oldestSession);
    nextCleanup.setDate(nextCleanup.getDate() + 30);
    return nextCleanup.toISOString();
  }
  
  return 'No data to clean';
};


// ============================================
// 7. EXPORT ALL
// ============================================

export default {
  // Disclaimer
  hasAcceptedDisclaimer,
  acceptDisclaimer,
  resetDisclaimerAcceptance,
  getDisclaimerInfo,
  
  // Privacy
  hasReadPrivacyNotice,
  markPrivacyNoticeAsRead,
  getPrivacySettings,
  
  // Logging
  logLocalEvent,
  getLocalEvents,
  clearLocalEvents,
  
  // Emergency
  validateEmergencyContact,
  formatEmergencyContact,
  
  // Data Management
  checkAndCleanupOldData,
  deleteAllUserData,
  
  // Compliance
  generateComplianceReport
};