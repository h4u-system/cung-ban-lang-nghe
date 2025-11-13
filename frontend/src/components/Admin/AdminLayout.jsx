// frontend/src/components/Admin/AdminLayout.jsx

import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import adminService from '../../services/admin';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const currentAdmin = adminService.getCurrentAdmin();

  const handleLogout = () => {
    if (confirm('Bạn có chắc muốn đăng xuất?')) {
      adminService.logout();
      navigate('/admin/login');
    }
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: '📊', label: 'Dashboard', color: 'blue' },
    { path: '/admin/messages', icon: '💬', label: 'Tin nhắn', color: 'purple' },
    { path: '/admin/analytics', icon: '📈', label: 'Thống kê', color: 'green' },
    { path: '/admin/settings', icon: '⚙️', label: 'Cài đặt', color: 'gray' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-700">
          {isSidebarOpen ? (
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <span>🔐</span>
                Admin Panel
              </h1>
              <p className="text-xs text-gray-400 mt-1">Cùng Bạn Lắng Nghe</p>
            </div>
          ) : (
            <div className="text-3xl text-center">🔐</div>
          )}
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-white text-gray-900 shadow-lg'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                {isSidebarOpen && (
                  <span className="font-medium">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-gray-700">
          {isSidebarOpen ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-700 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                  {currentAdmin?.full_name?.charAt(0) || 'A'}
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="font-medium text-sm truncate">{currentAdmin?.full_name}</p>
                  <p className="text-xs text-gray-400 truncate">{currentAdmin?.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
              >
                <span>🚪</span>
                Đăng xuất
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full text-2xl hover:bg-gray-700 p-3 rounded-xl transition-all"
              title="Đăng xuất"
            >
              🚪
            </button>
          )}
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-4 top-20 bg-white text-gray-900 w-8 h-8 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all"
        >
          {isSidebarOpen ? '←' : '→'}
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;