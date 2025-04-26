import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShippingForm } from '@/components/checkout/ShippingForm';
import { PaymentSelection } from '@/components/checkout/PaymentSelection';
import { OrderConfirmation } from '@/components/checkout/OrderConfirmation';
import CheckoutSummary from '@/components/checkout/CheckoutSummary';
import { ShippingInfo, PaymentMethod, CheckoutState, OrderSummary, DiscountCode } from '@/types/checkout';
import { CartItem } from '@/types/cart';
import { StepIndicator, CheckoutStep } from '@/components/checkout/StepIndicator';
import { OrderProcessingSkeleton } from '@/components/ui/skeleton';
import { motion, AnimatePresence } from 'framer-motion';

// Dữ liệu giả lập giỏ hàng (trong thực tế, bạn sẽ lấy từ Redux store hoặc context)
const mockCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Giày Thể Thao Nike Air Max',
    price: 2500000,
    quantity: 1,
    image: '/images/products/nike-air-max.jpg',
    size: '42',
  },
  {
    id: '2',
    name: 'Giày Chạy Bộ Adidas Ultraboost',
    price: 3200000,
    quantity: 1,
    image: '/images/products/adidas-ultraboost.jpg',
    size: '41',
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

  // Component hiển thị theo bước hiện tại
  const renderCurrentStep = () => {
    switch (checkoutState.currentStep) {
      case 'shipping':
        return (
          <ShippingForm
            shippingInfo={checkoutState.shippingInfo}
            setShippingInfo={handleUpdateShippingInfo}
            onNext={() => handleNextStep('payment')}
          />
        );
      case 'payment':
        return (
          <PaymentSelection
            selectedMethod={checkoutState.paymentMethod}
            setPaymentMethod={handleUpdatePaymentMethod}
            onNext={() => handleNextStep('confirmation')}
            onBack={() => handlePreviousStep('shipping')}
          />
        );
      case 'confirmation':
        return (
          <OrderConfirmation
            shippingInfo={checkoutState.shippingInfo}
            paymentMethod={checkoutState.paymentMethod!}
            orderSummary={orderSummary}
            onBack={() => handlePreviousStep('payment')}
            onPlaceOrder={handlePlaceOrder}
          />
        );
      default:
        return null;
    }
  };

  // Component hiển thị tiến trình thanh toán
  const renderCheckoutProgress = () => {
    const steps = [
      { key: 'shipping' as CheckoutStep, label: 'Thông tin giao hàng' },
      { key: 'payment' as CheckoutStep, label: 'Phương thức thanh toán' },
      { key: 'confirmation' as CheckoutStep, label: 'Xác nhận đơn hàng' },
    ];

    // Cho phép người dùng quay lại các bước đã hoàn thành
    const handleStepClick = (step: CheckoutStep) => {
      // Chỉ cho phép quay lại các bước đã hoàn thành, không cho nhảy cóc
      const currentStepIndex = steps.findIndex((s) => s.key === checkoutState.currentStep);
      const clickedStepIndex = steps.findIndex((s) => s.key === step);
      
      if (clickedStepIndex <= currentStepIndex) {
        setCheckoutState((prev) => ({
          ...prev,
          currentStep: step
        }));
      }
    };

    return (
      <StepIndicator 
        steps={steps} 
        currentStep={checkoutState.currentStep as CheckoutStep}
        onStepClick={handleStepClick}
        allowNavigation={true}
      />
    );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">Thanh toán</h1>
      
      {renderCheckoutProgress()}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {isProcessing ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <OrderProcessingSkeleton />
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={checkoutState.currentStep}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderCurrentStep()}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
        <div className="lg:col-span-1">
          <CheckoutSummary 
            items={cartItems} 
            subtotal={subtotal} 
            discountCode={checkoutState.discountCode} 
            onApplyDiscount={handleApplyDiscount} 
          />
        </div>
      </div>
    </div>
  );
}
