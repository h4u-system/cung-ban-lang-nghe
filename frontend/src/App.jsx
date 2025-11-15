// frontend/src/App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import HomePage from './pages/Home/HomePage';
import EmotionsPage from './pages/Emotions/EmotionsPage';      // ← Emotions (số nhiều)
import EmotionsPage from './pages/Emotions/ExamPage';          // ← Emotions (số nhiều)
import EmotionsPage from './pages/Emotions/FamilyPage';        // ← Emotions (số nhiều)
import EmotionsPage from './pages/Emotions/LonelyPage';        // ← Emotions (số nhiều)
import EmotionsPage from './pages/Emotions/LovePage';          // ← Emotions (số nhiều)
import EmotionsPage from './pages/Emotions/StressPage';        // ← Emotions (số nhiều)

import StoriesPage from './pages/Stories/StoriesPage';         // ← Stories (số nhiều)
import QAPage from './pages/QA/QAPage';
import AboutPage from './pages/About/AboutPage';
import NotFoundPage from './pages/NotFound/NotFoundPage';

// Admin Components
import AdminLayout from './components/Admin/AdminLayout';
import ProtectedRoute from './components/Admin/ProtectedRoute';
import LoginPage from './pages/Admin/LoginPage';
import DashboardPage from './pages/Admin/DashboardPage';
import MessagesPage from './pages/Admin/MessagesPage';
import AnalyticsPage from './pages/Admin/AnalyticsPage';
import SettingsPage from './pages/Admin/SettingsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="cam-xuc" element={<EmotionsPage />} />
          <Route path="tam-su" element={<StoriesPage />} />
          <Route path="hoi-dap" element={<QAPage />} />
          <Route path="gioi-thieu" element={<AboutPage />} />
          <Route path="404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>

        {/* Admin Login (No Layout) */}
        <Route path="/admin/login" element={<LoginPage />} />

        {/* Admin Protected Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;