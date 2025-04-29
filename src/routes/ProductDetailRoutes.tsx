import React from 'react';
import { Routes } from 'react-router-dom';

/**
 * Router cho trang chi tiết sản phẩm
 * Quản lý tất cả các đường dẫn liên quan đến chi tiết sản phẩm
 * 
 * Lưu ý: ProductDetailPage đã được xử lý bởi router chính ở /product/:id
 */
export const ProductDetailRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Các trang con cho chi tiết sản phẩm */}
      {/* Trang chính được xử lý bởi route ở index.tsx */}
      
      {/* Có thể mở rộng thêm các trang con như:
      <Route path="reviews" element={<ProductReviewsPage />} />
      <Route path="specifications" element={<ProductSpecificationsPage />} />
      <Route path="comparison/:compareId" element={<ProductComparisonPage />} />
      <Route path="size-guide" element={<SizeGuidePage />} />
      <Route path="related" element={<RelatedProductsPage />} />
      <Route path="questions" element={<ProductQuestionsPage />} />
      <Route path="gallery" element={<ProductGalleryPage />} />
      <Route path="video" element={<ProductVideoPage />} />
      */}
    </Routes>
  );
};

export default ProductDetailRoutes;
