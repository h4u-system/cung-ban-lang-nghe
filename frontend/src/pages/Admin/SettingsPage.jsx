// frontend/src/pages/Admin/SettingsPage.jsx

import React, { useState } from 'react';
import adminService from '../../services/admin';

const SettingsPage = () => {
  const currentAdmin = adminService.getCurrentAdmin();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', icon: '👤', label: 'Hồ sơ' },
    { id: 'security', icon: '🔐', label: 'Bảo mật' },
    { id: 'system', icon: '⚙️', label: 'Hệ thống' },
    { id: 'notifications', icon: '🔔', label: 'Thông báo' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <span>⚙️</span>
          Cài đặt
        </h1>
        <p className="text-gray-600 mt-1">Quản lý cấu hình hệ thống</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {/* Tabs */}
        <div className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-2xl">{tab.icon}</span>
              <span className="font-semibold">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="md:col-span-3 bg-white rounded-2xl p-8 shadow-lg">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Thông tin hồ sơ</h2>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                  {currentAdmin?.full_name?.charAt(0) || 'A'}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{currentAdmin?.full_name}</h3>
                  <p className="text-gray-600">{currentAdmin?.email}</p>
                  <span className="inline-block mt-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {currentAdmin?.role || 'Admin'}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Họ và tên</label>
                  <input
                    type="text"
                    defaultValue={currentAdmin?.full_name}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={currentAdmin?.email}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                    disabled
                  />
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all shadow-lg">
                  💾 Lưu thay đổi
                </button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Bảo mật</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Mật khẩu hiện tại</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Mật khẩu mới</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Xác nhận mật khẩu mới</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all shadow-lg">
                  🔒 Đổi mật khẩu
                </button>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-xl mt-6">
                <p className="text-sm text-yellow-800">
                  <strong>⚠️ Lưu ý:</strong> Sau khi đổi mật khẩu, bạn sẽ cần đăng nhập lại.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Cài đặt hệ thống</h2>
              
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-all">
                  <div>
                    <p className="font-semibold text-gray-800">Tự động phát hiện khủng hoảng</p>
                    <p className="text-sm text-gray-600">Bật AI phát hiện tự động các tình huống khẩn cấp</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-6 h-6" />
                </label>

                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-all">
                  <div>
                    <p className="font-semibold text-gray-800">Lưu logs hệ thống</p>
                    <p className="text-sm text-gray-600">Ghi lại hoạt động để theo dõi và debug</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-6 h-6" />
                </label>

                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-all">
                  <div>
                    <p className="font-semibold text-gray-800">Chế độ bảo trì</p>
                    <p className="text-sm text-gray-600">Tạm ngừng hệ thống để nâng cấp</p>
                  </div>
                  <input type="checkbox" className="w-6 h-6" />
                </label>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Thông báo</h2>
              
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-all">
                  <div>
                    <p className="font-semibold text-gray-800">Cảnh báo khủng hoảng</p>
                    <p className="text-sm text-gray-600">Nhận thông báo khi phát hiện tình huống khẩn cấp</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-6 h-6" />
                </label>

                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-all">
                  <div>
                    <p className="font-semibold text-gray-800">Tin nhắn mới</p>
                    <p className="text-sm text-gray-600">Thông báo khi có tin nhắn cần xem xét</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-6 h-6" />
                </label>

                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-all">
                  <div>
                    <p className="font-semibold text-gray-800">Báo cáo hàng ngày</p>
                    <p className="text-sm text-gray-600">Nhận tóm tắt hoạt động hệ thống mỗi ngày</p>
                  </div>
                  <input type="checkbox" className="w-6 h-6" />
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;