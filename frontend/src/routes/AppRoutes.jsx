import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import HomePage from '../pages/Home/HomePage';
import EmotionsPage from '../pages/Emotions/EmotionsPage';
import StressPage from '../pages/Emotions/StressPage';
import LonelyPage from '../pages/Emotions/LonelyPage';
import LovePage from '../pages/Emotions/LovePage';
import ExamPage from '../pages/Emotions/ExamPage';
import FamilyPage from '../pages/Emotions/FamilyPage';
import StoriesPage from '../pages/Stories/StoriesPage';
import QAPage from '../pages/QA/QAPage';
import AboutPage from '../pages/About/AboutPage';
import ContactPage from '../pages/Contact/ContactPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Home - Chat AI */}
      <Route path="/" element={<HomePage />} />
      
      {/* Emotions Hub */}
      <Route path="/camxuc" element={<EmotionsPage />} />
      <Route path="/camxuc/stress" element={<StressPage />} />
      <Route path="/camxuc/co-don" element={<LonelyPage />} />
      <Route path="/camxuc/tinh-yeu-hoc-tro" element={<LovePage />} />
      <Route path="/camxuc/thi-cu-ap-luc" element={<ExamPage />} />
      <Route path="/camxuc/gia-dinh" element={<FamilyPage />} />
      
      {/* User Stories */}
      <Route path="/chuyen-cua-ban" element={<StoriesPage />} />
      
      {/* Q&A */}
      <Route path="/hoi-dap" element={<QAPage />} />
      
      {/* About */}
      <Route path="/gioi-thieu" element={<AboutPage />} />
      
      {/* Contact */}
      <Route path="/lien-he" element={<ContactPage />} />
      
      {/* 404 */}
      <Route path="*" element={<div>404 - Không tìm thấy trang</div>} />
    </Routes>
  );
};

export default AppRoutes;
