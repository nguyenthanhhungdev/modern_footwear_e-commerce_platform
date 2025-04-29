import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeRoutes from './HomeRoutes';
import CartRoutes from './CartRoutes';
import ProductGridRoutes from './ProductGridRoutes';
import ProductDetailRoutes from './ProductDetailRoutes';
import CheckoutRoutes from './CheckoutRoutes';
import ProductDetailPage from '@/app/productDetail/page';
import NotFoundPage from '@/app/notFound/page';

/**
 * Router chính của ứng dụng
 * Quản lý tất cả các đường dẫn và phân luồng đến các router con
 */
export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Router trang chủ */}
      <Route path="/" element={<HomeRoutes />} />
      
      {/* Router giỏ hàng */}
      <Route path="/cart/*" element={<CartRoutes />} />
      
      {/* Router danh sách sản phẩm */}
      <Route path="/men/sneakers/*" element={<ProductGridRoutes />} />
      
      {/* Router chi tiết sản phẩm - đối xử đặc biệt vì cần tham số ID */}
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/product/:id/*" element={<ProductDetailRoutes />} />
      
      {/* Router thanh toán */}
      <Route path="/checkout/*" element={<CheckoutRoutes />} />
      
      {/* Trang 404 - Catch-all route cho các đường dẫn không hợp lệ */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
