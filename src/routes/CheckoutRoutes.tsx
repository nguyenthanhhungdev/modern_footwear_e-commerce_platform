import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CheckoutPage from '@/app/checkout/page';

/**
 * Router cho quy trình thanh toán
 * Quản lý tất cả các đường dẫn liên quan đến thanh toán
 */
export const CheckoutRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Trang thanh toán chính */}
      <Route index element={<CheckoutPage />} />
      
      {/* Có thể mở rộng thêm các trang con như:
      <Route path="shipping" element={<CheckoutShippingPage />} />
      <Route path="payment" element={<CheckoutPaymentPage />} />
      <Route path="confirmation" element={<CheckoutConfirmationPage />} />
      <Route path="success" element={<OrderSuccessPage />} /> 
      */}
      
      {/* Chuyển hướng cho đường dẫn không hợp lệ */}
      <Route path="*" element={<Navigate to="/checkout" replace />} />
    </Routes>
  );
};

export default CheckoutRoutes;
