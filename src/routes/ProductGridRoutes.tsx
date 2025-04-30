import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductGridPage from '@/app/productGrid/page';

/**
 * Router cho danh sách sản phẩm
 * Quản lý tất cả các đường dẫn liên quan đến danh sách sản phẩm theo danh mục
 */
export const ProductGridRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Trang danh sách sản phẩm chính */}
      <Route index element={<ProductGridPage />} />
      
      {/* Có thể mở rộng thêm các trang con như:
      <Route path="filter/:category" element={<ProductGridFilterPage />} />
      <Route path="collection/:collectionId" element={<ProductCollectionPage />} />
      <Route path="brand/:brandName" element={<BrandCollectionPage />} />
      <Route path="search" element={<SearchResultsPage />} />
      <Route path="new-arrivals" element={<NewArrivalsPage />} />
      <Route path="sale" element={<SalePage />} />
      <Route path="best-sellers" element={<BestSellersPage />} />
      */}
    </Routes>
  );
};

export default ProductGridRoutes;
