import React from 'react';
import Header from './Header';
import Footer from './Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-4 max-w-4xl">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default MainLayout;