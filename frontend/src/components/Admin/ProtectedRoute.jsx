// frontend/src/components/Admin/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import adminService from '../../services/admin';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = adminService.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;