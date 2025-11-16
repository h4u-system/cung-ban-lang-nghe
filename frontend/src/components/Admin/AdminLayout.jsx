// frontend/src/components/Admin/AdminLayout.jsx

import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import adminService from '../../services/admin';

const AdminLayout = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const currentAdmin = adminService.getCurrentAdmin();

  const handleLogout = () => {
    if (window.confirm('Bạn có chắc muốn đăng xuất?')) {
      adminService.logout();
      navigate('/admin/login');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onLogout={handleLogout}
        currentAdmin={currentAdmin}
      />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;