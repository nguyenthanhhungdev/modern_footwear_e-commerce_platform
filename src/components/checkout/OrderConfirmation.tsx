import React from 'react';
import { ShippingInfo, PaymentMethod, OrderSummary } from '@/types/checkout';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface OrderConfirmationProps {
  shippingInfo: ShippingInfo;
  paymentMethod: PaymentMethod;
  orderSummary: OrderSummary;
  onBack: () => void;
  onPlaceOrder: () => void;
}

export const OrderConfirmation = ({
  shippingInfo,
  paymentMethod,
  orderSummary,
  onBack,
  onPlaceOrder,
}: OrderConfirmationProps) => {
  const getPaymentMethodName = (method: PaymentMethod) => {
    const methods = {
      stripe: 'Thanh toán qua Stripe',
      cash_on_delivery: 'Thanh toán khi nhận hàng (COD)',
    };
    return methods[method];
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <h2 className="text-xl font-bold mb-4">Xác nhận đơn hàng</h2>
      
      <div className="border-b pb-4 mb-4">
        <h3 className="font-medium mb-2">Thông tin giao hàng</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          <p><span className="font-medium">Họ tên:</span> {shippingInfo.fullName}</p>
          <p><span className="font-medium">Email:</span> {shippingInfo.email}</p>
          <p><span className="font-medium">Số điện thoại:</span> {shippingInfo.phone}</p>
          <p className="col-span-full"><span className="font-medium">Địa chỉ:</span> {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.province}, {shippingInfo.postalCode}</p>
          {shippingInfo.notes && (
            <p className="col-span-full"><span className="font-medium">Ghi chú:</span> {shippingInfo.notes}</p>
          )}
        </div>
      </div>
      
      <div className="border-b pb-4 mb-4">
        <h3 className="font-medium mb-2">Phương thức thanh toán</h3>
        <p>{getPaymentMethodName(paymentMethod)}</p>
      </div>
      
      <div className="border-b pb-4 mb-4">
        <h3 className="font-medium mb-2">Chi tiết đơn hàng</h3>
        <div className="space-y-2">
          {orderSummary.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>{item.name} {item.size && `(${item.size})`} x{item.quantity}</span>
              <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="space-y-2 mb-6">
        <div className="flex justify-between">
          <span>Tạm tính</span>
          <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(orderSummary.subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Phí vận chuyển</span>
          <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(orderSummary.shipping)}</span>
        </div>
        <div className="flex justify-between">
          <span>Thuế (VAT)</span>
          <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(orderSummary.tax)}</span>
        </div>
        {orderSummary.discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Giảm giá</span>
            <span>-{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(orderSummary.discount)}</span>
          </div>
        )}
        <div className="flex justify-between font-bold text-lg border-t pt-2">
          <span>Tổng cộng</span>
          <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(orderSummary.total)}</span>
        </div>
      </div>
      
      <div className="flex justify-between mt-6">
        <Button 
          variant="outline" 
          onClick={onBack}
        >
          Quay lại
        </Button>
        <Button 
          onClick={onPlaceOrder}
        >
          Đặt hàng
        </Button>
      </div>
    </motion.div>
  );
};
