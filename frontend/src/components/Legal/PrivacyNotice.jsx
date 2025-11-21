// ****************************************************************
// File: frontend/src/components/Legal/PrivacyNotice.jsx
// ***************************************************************

export const PrivacyNotice = () => {
  return (
    <div className="privacy-notice">
      <h3>📋 Chính sách Bảo mật</h3>
      <ul>
        <li>✅ 100% ẩn danh - Không yêu cầu đăng ký</li>
        <li>✅ Mã hóa end-to-end (AES-256)</li>
        <li>✅ Tự động xóa sau 30 ngày</li>
        <li>✅ Tuân thủ Nghị định 13/2023/NĐ-CP</li>
      </ul>
      <p className="text-sm text-gray-600">
        Banana không lưu trữ thông tin cá nhân. Dữ liệu chỉ phục vụ 
        cải thiện dịch vụ và được mã hóa tuyệt đối.
      </p>
    </div>
  );
};