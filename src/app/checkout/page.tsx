import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShippingInfo, PaymentMethod, CheckoutState, OrderSummary, DiscountCode } from '@/types/checkout';
import { CartItem } from '@/types/cart';
import { CheckoutComponent } from '@/components/checkout/checkout';

// Dữ liệu giả lập giỏ hàng (trong thực tế, bạn sẽ lấy từ Redux store hoặc context)
const mockCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Air Jordan 1 Retro High OG',
    price: 180 * 23000, // Chuyển đổi từ USD sang VND (giả định tỷ giá)
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    size: '10',
  },
  {
    id: '2',
    name: 'Yeezy Boost 350 V2',
    price: 220 * 23000, // Chuyển đổi từ USD sang VND (giả định tỷ giá)
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=715&q=80',
    size: '9',
  },
];

const calculateSubtotal = (items: CartItem[]) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [cartItems] = useState<CartItem[]>(mockCartItems);
  const subtotal = calculateSubtotal(cartItems);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Khởi tạo state cho quy trình thanh toán
  const [checkoutState, setCheckoutState] = useState<CheckoutState>({
    shippingInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      province: '',
      postalCode: '',
      notes: '',
    },
    paymentMethod: null,
    currentStep: 'shipping',
    discountCode: null,
  });
  
  // Tính các giá trị cơ bản cho đơn hàng
  const shipping = 30000; // Phí vận chuyển cố định
  const tax = Math.round(subtotal * 0.1); // VAT 10%
  
  // Tính giảm giá và tổng tiền cuối cùng - sử dụng useMemo để tránh tính toán lại khi không cần thiết
  const { orderSummary } = useMemo(() => {
    // Tính số tiền được giảm giá
    const discountAmount = checkoutState.discountCode && checkoutState.discountCode.isValid 
      ? (checkoutState.discountCode.discountType === 'percentage' 
          ? Math.round((subtotal * checkoutState.discountCode.discountAmount) / 100)
          : checkoutState.discountCode.discountAmount)
      : 0;
    
    // Tính tổng tiền sau khi áp dụng giảm giá
    const finalTotal = subtotal + shipping + tax - discountAmount;
    
    // Tạo orderSummary object
    const summary: OrderSummary = {
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        size: item.size,
      })),
      subtotal,
      shipping,
      tax,
      discount: discountAmount,
      total: finalTotal,
    };
    
    return { orderSummary: summary };
  }, [cartItems, subtotal, shipping, tax, checkoutState.discountCode]);

  // Kiểm tra nếu giỏ hàng trống, chuyển về trang giỏ hàng
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  // Hàm xử lý cập nhật thông tin giao hàng
  const handleUpdateShippingInfo = (info: ShippingInfo) => {
    setCheckoutState((prev) => ({
      ...prev,
      shippingInfo: info,
    }));
  };

  // Hàm xử lý cập nhật phương thức thanh toán
  const handleUpdatePaymentMethod = (method: PaymentMethod) => {
    setCheckoutState((prev) => ({
      ...prev,
      paymentMethod: method,
    }));
  };

  // Hàm xử lý áp dụng mã giảm giá
  const handleApplyDiscount = (code: string) => {
    // Nếu code là chuỗi trống, xóa mã giảm giá
    if (!code.trim()) {
      setCheckoutState((prev) => ({
        ...prev,
        discountCode: null
      }));
      return;
    }

    // Thông thường sẽ gửi request lên server để kiểm tra mã giảm giá
    // Trong ví dụ này, chúng ta giả lập một vài mã giảm giá có sẵn
    const validDiscounts: Record<string, DiscountCode> = {
      'WELCOME10': { code: 'WELCOME10', discountAmount: 10, discountType: 'percentage', isValid: true },
      'FREESHIP': { code: 'FREESHIP', discountAmount: 30000, discountType: 'fixed', isValid: true },
      'SUMMER25': { code: 'SUMMER25', discountAmount: 25, discountType: 'percentage', isValid: true },
    };

    // Kiểm tra xem mã giảm giá có hợp lệ không
    const upperCaseCode = code.toUpperCase();
    if (upperCaseCode in validDiscounts) {
      setCheckoutState((prev) => ({
        ...prev,
        discountCode: validDiscounts[upperCaseCode]
      }));
    } else {
      // Nếu mã không hợp lệ
      setCheckoutState((prev) => ({
        ...prev,
        discountCode: { 
          code: code, 
          discountAmount: 0, 
          discountType: 'fixed' as const, 
          isValid: false 
        }
      }));
    }
  };

  // Hàm chuyển đến bước tiếp theo
  const handleNextStep = (step: 'shipping' | 'payment' | 'confirmation') => {
    setCheckoutState((prev) => ({
      ...prev,
      currentStep: step,
    }));
  };

  // Hàm chuyển về bước trước đó
  const handlePreviousStep = (step: 'shipping' | 'payment' | 'confirmation') => {
    setCheckoutState((prev) => ({
      ...prev,
      currentStep: step,
    }));
  };

  // Hàm xử lý đặt hàng
  const handlePlaceOrder = () => {
    // Hiển thị trạng thái xử lý đơn hàng
    setIsProcessing(true);
    
    // Mô phỏng thời gian xử lý đơn hàng
    setTimeout(() => {
      // Ở đây bạn sẽ gửi dữ liệu đơn hàng lên server
      // Kết thúc trạng thái xử lý
      setIsProcessing(false);
      
      // Trong ví dụ này, chỉ giả lập thành công
      alert('Đặt hàng thành công! Cảm ơn bạn đã mua sắm.');
      
      // Sau khi đặt hàng thành công, chuyển đến trang xác nhận
      navigate('/');
    }, 2000); // Giả lập 2 giây xử lý
  };

  // Sử dụng component checkout thay vì render trực tiếp UI
  return (
    <CheckoutComponent 
      cartItems={cartItems}
      subtotal={subtotal}
      checkoutState={checkoutState}
      orderSummary={orderSummary}
      isProcessing={isProcessing}
      onUpdateShippingInfo={handleUpdateShippingInfo}
      onUpdatePaymentMethod={handleUpdatePaymentMethod}
      onApplyDiscount={handleApplyDiscount}
      onNextStep={handleNextStep}
      onPreviousStep={handlePreviousStep}
      onPlaceOrder={handlePlaceOrder}
    />
  );
}
