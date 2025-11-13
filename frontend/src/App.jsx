// frontend/src/App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import HomePage from './pages/Home/HomePage';
import EmotionPage from './pages/Emotion/EmotionPage';
import StoryPage from './pages/Story/StoryPage';
import QAPage from './pages/QA/QAPage';
import AboutPage from './pages/About/AboutPage';
import NotFoundPage from './pages/NotFound/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="cam-xuc" element={<EmotionPage />} />
          <Route path="tam-su" element={<StoryPage />} />
          <Route path="hoi-dap" element={<QAPage />} />
          <Route path="gioi-thieu" element={<AboutPage />} />
          <Route path="404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;