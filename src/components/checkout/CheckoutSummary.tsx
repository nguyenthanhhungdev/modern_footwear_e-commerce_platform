import React, { useState } from 'react';
import { CartItem } from '@/types/cart';
import { DiscountCode } from '@/types/checkout';
import { DiscountForm } from './DiscountForm';

interface CheckoutSummaryProps {
  items: CartItem[];
  subtotal: number;
  discountCodes?: DiscountCode[];
  onApplyDiscount?: (code: string) => void;
}

export const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({ 
  items, 
  subtotal, 
  discountCodes = [],
  onApplyDiscount = () => {}
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Tính toán giá trị đơn hàng
  const shipping = 30000; // Phí vận chuyển cố định, có thể thay đổi theo logic của bạn
  const tax = Math.round(subtotal * 0.1); // VAT 10%
  
  // Tính tổng số tiền được giảm giá từ tất cả mã giảm giá
  const totalDiscount = discountCodes
    .filter(code => code.isValid)
    .reduce((total, code) => {
      if (code.discountType === 'percentage') {
        return total + Math.round((subtotal * code.discountAmount) / 100);
      } else {
        return total + code.discountAmount;
      }
    }, 0);
  
  // Tính tổng tiền sau khi trừ giảm giá
  const total = subtotal + shipping + tax - totalDiscount;
  
  // Hàm xử lý áp dụng mã giảm giá
  const handleApplyDiscount = (code: string) => {
    setIsProcessing(true);
    // Gọi hàm từ props
    onApplyDiscount(code);
    
    // Giả lập thời gian xử lý
    setTimeout(() => {
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-fit sticky top-6">
      <h2 className="text-xl font-bold mb-4">Tóm tắt đơn hàng</h2>
      <div className="space-y-4">
        <div className="max-h-64 overflow-y-auto">
          {items.map((item) => (
            <div key={item.id} className="flex items-center py-2 border-b">
              <div className="w-16 h-16 flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="ml-4 flex-grow">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  {item.size && `Size: ${item.size}`} | Số lượng: {item.quantity}
                </p>
              </div>
              <div className="font-medium">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>

        {/* Form nhập mã giảm giá */}
        <DiscountForm 
          onApplyDiscount={handleApplyDiscount} 
          appliedDiscounts={discountCodes} 
          isLoading={isProcessing} 
        />

        <div className="space-y-2 pt-2">
          <div className="flex justify-between">
            <span>Tạm tính</span>
            <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Phí vận chuyển</span>
            <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(shipping)}</span>
          </div>
          <div className="flex justify-between">
            <span>Thuế (VAT)</span>
            <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tax)}</span>
          </div>
          
          {/* Hiển thị giảm giá nếu có */}
          {totalDiscount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Giảm giá</span>
              <span>-{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalDiscount)}</span>
            </div>
          )}
          
          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>Tổng cộng</span>
            <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;
