// ============================================
// 
// File: frontend/src/App.jsx
// ============================================

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import HomePage from './pages/Home/HomePage';

// Emotions Pages
import EmotionsPage from './pages/Emotions/EmotionsPage';
import StressPage from './pages/Emotions/StressPage';
import LonelyPage from './pages/Emotions/LonelyPage';
import LovePage from './pages/Emotions/LovePage';
import ExamPage from './pages/Emotions/ExamPage';
import FamilyPage from './pages/Emotions/FamilyPage';

// Other Pages
import StoriesPage from './pages/Stories/StoriesPage';
import StoryDetailPage from './pages/Stories/StoryDetailPage';  // ✅ NEW
import QAPage from './pages/QA/QAPage';
import AboutPage from './pages/About/AboutPage';
import ContactPage from './pages/Contact/ContactPage';  // ✅ ADDED
import NotFoundPage from './pages/NotFound/NotFoundPage';

// Admin Components
import AdminLayout from './components/Admin/AdminLayout';
import ProtectedRoute from './components/Admin/ProtectedRoute';
import LoginPage from './pages/Admin/LoginPage';
import DashboardPage from './pages/Admin/DashboardPage';
import MessagesPage from './pages/Admin/MessagesPage';
import AnalyticsPage from './pages/Admin/AnalyticsPage';
import SettingsPage from './pages/Admin/SettingsPage';
import ContentPage from './pages/Admin/ContentPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          
          {/* Emotions Routes */}
          <Route path="cam-xuc" element={<EmotionsPage />} />
          <Route path="cam-xuc/stress" element={<StressPage />} />
          <Route path="cam-xuc/co-don" element={<LonelyPage />} />
          <Route path="cam-xuc/tinh-yeu-hoc-tro" element={<LovePage />} />
          <Route path="cam-xuc/thi-cu-ap-luc" element={<ExamPage />} />
          <Route path="cam-xuc/gia-dinh" element={<FamilyPage />} />
          
          {/* Stories Routes - ✅ FIXED */}
          <Route path="tam-su" element={<StoriesPage />} />
          <Route path="tam-su/:storyId" element={<StoryDetailPage />} />
          
          {/* Other Routes */}
          <Route path="hoi-dap" element={<QAPage />} />
          <Route path="gioi-thieu" element={<AboutPage />} />
          <Route path="lien-he" element={<ContactPage />} />  {/* ✅ FIXED */}
          
          {/* 404 */}
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
          <Route path="content" element={<ContentPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;