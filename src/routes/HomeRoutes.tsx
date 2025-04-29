import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '@/app/home/page';

/**
 * Router cho trang chủ
 * Quản lý tất cả các đường dẫn liên quan đến trang chủ và các trang đặc biệt
 */
export const HomeRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Trang chủ chính */}
      <Route index element={<HomePage />} />
      
      {/* Có thể mở rộng thêm các trang con như:
      <Route path="about" element={<AboutPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="support" element={<SupportPage />} />
      <Route path="faq" element={<FAQPage />} />
      <Route path="blog" element={<BlogPage />} />
      <Route path="blog/:id" element={<BlogPostDetail />} />
      */}
    </Routes>
  );
};

export default HomeRoutes;
