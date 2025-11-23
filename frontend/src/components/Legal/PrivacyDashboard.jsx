// *************************************************************
// File: frontend/src/components/Legal/PrivacyDashboard.jsx
// *************************************************************

import React, { useState, useEffect } from 'react';
import {
  generateComplianceReport,
  deleteAllUserData,
  getDisclaimerInfo,
  resetDisclaimerAcceptance
} from '../../utils/legalHelper';

const PrivacyDashboard = () => {
  const [report, setReport] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteResult, setDeleteResult] = useState(null);

  useEffect(() => {
    loadComplianceReport();
  }, []);

  const loadComplianceReport = () => {
    const newReport = generateComplianceReport();
    setReport(newReport);
  };

  const handleDeleteAllData = () => {
    const result = deleteAllUserData();
    setDeleteResult(result);
    setShowDeleteConfirm(false);
    
    // Reload report sau khi xóa
    setTimeout(() => {
      loadComplianceReport();
      setDeleteResult(null);
    }, 3000);
  };

  const handleResetDisclaimer = () => {
    resetDisclaimerAcceptance();
    alert('Đã reset Disclaimer. Vui lòng tải lại trang để xem lại thỏa thuận.');
    window.location.reload();
  };

  if (!report) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl p-6 shadow-lg">
        <h1 className="text-3xl font-bold mb-2">🔒 Quản lý Quyền riêng tư</h1>
        <p className="text-purple-100">
          Kiểm soát dữ liệu và quyền riêng tư của bạn trên Banana
        </p>
      </div>

      {/* Delete Success Message */}
      {deleteResult && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg animate-slide-up">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-bold text-green-800">{deleteResult.message}</p>
              <p className="text-sm text-green-700">Đã xóa {deleteResult.dataDeleted} mục dữ liệu.</p>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Status */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <span className="mr-2">📊</span>
          Trạng thái Bảo mật
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-700">Mã hóa</span>
              <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">ACTIVE</span>
            </div>
            <p className="text-sm text-gray-600">{report.privacy.settings.encryption}</p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-700">Ẩn danh</span>
              <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">100%</span>
            </div>
            <p className="text-sm text-gray-600">{report.privacy.settings.anonymity} Anonymity</p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-700">Lưu trữ dữ liệu</span>
              <span className="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">30 DAYS</span>
            </div>
            <p className="text-sm text-gray-600">Tự động xóa sau {report.privacy.settings.dataRetention}</p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-700">Thu thập PII</span>
              <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">NONE</span>
            </div>
            <p className="text-sm text-gray-600">Không lưu thông tin cá nhân</p>
          </div>
        </div>
      </div>

      {/* Legal Compliance */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <span className="mr-2">⚖️</span>
          Tuân thủ Pháp luật
        </h2>
        <div className="space-y-3">
          {Object.entries(report.legal).map(([key, status]) => (
            <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-semibold text-gray-700">
                {key === 'decree13_2023' && 'Nghị định 13/2023 (Bảo vệ dữ liệu)'}
                {key === 'cyberSecurity' && 'Luật An toàn Thông tin Mạng'}
                {key === 'childProtection' && 'Luật Bảo vệ Trẻ em'}
              </span>
              <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                {status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* User Rights */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <span className="mr-2">✋</span>
          Quyền của Bạn
        </h2>
        <div className="space-y-4">
          {/* Right to Access */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">Quyền Truy cập Dữ liệu</h3>
                <p className="text-sm text-gray-600">
                  Bạn có thể xem toàn bộ dữ liệu mà Banana lưu trữ về bạn (nếu có).
                </p>
              </div>
              <button
                onClick={() => alert(JSON.stringify(report, null, 2))}
                className="ml-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Xem Dữ liệu
              </button>
            </div>
          </div>

          {/* Right to Delete */}
          <div className="border border-red-200 rounded-lg p-4 bg-red-50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-red-800 mb-1">Quyền Xóa Dữ liệu</h3>
                <p className="text-sm text-red-700">
                  Xóa vĩnh viễn toàn bộ dữ liệu đã lưu trữ. <strong>Hành động này không thể hoàn tác.</strong>
                </p>
              </div>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="ml-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Xóa Dữ liệu
              </button>
            </div>
          </div>

          {/* Right to Portability */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">Quyền Chuyển Dữ liệu</h3>
                <p className="text-sm text-gray-600">
                  Không áp dụng do Banana hoạt động hoàn toàn ẩn danh, không lưu trữ dữ liệu cá nhân.
                </p>
              </div>
              <span className="ml-4 px-4 py-2 bg-gray-300 text-gray-600 text-sm font-semibold rounded-lg cursor-not-allowed">
                N/A
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer Info */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <span className="mr-2">📋</span>
          Thông tin Thỏa thuận
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-semibold text-gray-700">Trạng thái</p>
              <p className="text-sm text-gray-600">
                {report.disclaimer.accepted ? 'Đã đồng ý' : 'Chưa đồng ý'}
              </p>
            </div>
            {report.disclaimer.accepted && (
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>

          {report.disclaimer.acceptedDate && (
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold text-gray-700">Ngày đồng ý</p>
                <p className="text-sm text-gray-600">
                  {new Date(report.disclaimer.acceptedDate).toLocaleString('vi-VN')}
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-semibold text-gray-700">Phiên bản</p>
              <p className="text-sm text-gray-600">{report.disclaimer.version}</p>
            </div>
            <button
              onClick={handleResetDisclaimer}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Xem lại Thỏa thuận
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Xác nhận Xóa Dữ liệu</h3>
              <p className="text-gray-600 mb-4">
                Bạn có chắc chắn muốn xóa toàn bộ dữ liệu? Hành động này không thể hoàn tác.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleDeleteAllData}
                className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-colors"
              >
                Xóa Vĩnh viễn
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="w-full py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-lg transition-colors"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 pt-4 border-t border-gray-200">
        <p>Báo cáo được tạo lúc: {new Date(report.timestamp).toLocaleString('vi-VN')}</p>
        <p className="mt-1">
          Mọi thắc mắc về quyền riêng tư, vui lòng liên hệ: <strong>privacy@h4u.vn</strong>
        </p>
      </div>
    </div>
  );
};

export default PrivacyDashboard;