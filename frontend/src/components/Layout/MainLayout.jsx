// frontend/src/components/Layout/MainLayout.jsx

import React from 'react';
import Header from './Header';
import Footer from './Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6 max-w-5xl">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default MainLayout;