import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CartPage from '@/app/cart/page';

/**
 * Router cho giỏ hàng
 * Quản lý tất cả các đường dẫn liên quan đến giỏ hàng
 */
export const CartRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Trang giỏ hàng chính */}
      <Route index element={<CartPage />} />
      
      {/* Có thể mở rộng thêm các trang con như:
      <Route path="saved-items" element={<SavedItemsPage />} />
      <Route path="recently-viewed" element={<RecentlyViewedPage />} />
      <Route path="recommendations" element={<RecommendationsPage />} />
      <Route path="history" element={<PurchaseHistoryPage />} />
      */}
    </Routes>
  );
};

export default CartRoutes;
