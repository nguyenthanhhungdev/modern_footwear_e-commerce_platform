import React from 'react';
import { ShippingForm } from '@/components/checkout/ShippingForm';
import { PaymentSelection } from '@/components/checkout/PaymentSelection';
import { OrderConfirmation } from '@/components/checkout/OrderConfirmation';
import CheckoutSummary from '@/components/checkout/CheckoutSummary';
import { ShippingInfo, PaymentMethod, CheckoutState, OrderSummary } from '@/types/checkout';
import { CartItem } from '@/types/cart';
import { StepIndicator, CheckoutStep } from '@/components/checkout/StepIndicator';
import { OrderProcessingSkeleton } from '@/components/ui/skeleton';
import { motion, AnimatePresence } from 'framer-motion';

interface CheckoutComponentProps {
  cartItems: CartItem[];
  subtotal: number;
  checkoutState: CheckoutState;
  orderSummary: OrderSummary;
  isProcessing: boolean;
  onUpdateShippingInfo: (info: ShippingInfo) => void;
  onUpdatePaymentMethod: (method: PaymentMethod) => void;
  onApplyDiscount: (code: string) => void;
  onNextStep: (step: 'shipping' | 'payment' | 'confirmation') => void;
  onPreviousStep: (step: 'shipping' | 'payment' | 'confirmation') => void;
  onPlaceOrder: () => void;
}

export const CheckoutComponent: React.FC<CheckoutComponentProps> = ({
  cartItems,
  subtotal,
  checkoutState,
  orderSummary,
  isProcessing,
  onUpdateShippingInfo,
  onUpdatePaymentMethod,
  onApplyDiscount,
  onNextStep,
  onPreviousStep,
  onPlaceOrder
}) => {
  // Component hiển thị theo bước hiện tại
  const renderCurrentStep = () => {
    switch (checkoutState.currentStep) {
      case 'shipping':
        return (
          <ShippingForm
            shippingInfo={checkoutState.shippingInfo}
            setShippingInfo={onUpdateShippingInfo}
            onNext={() => onNextStep('payment')}
          />
        );
      case 'payment':
        return (
          <PaymentSelection
            selectedMethod={checkoutState.paymentMethod}
            setPaymentMethod={onUpdatePaymentMethod}
            onNext={() => onNextStep('confirmation')}
            onBack={() => onPreviousStep('shipping')}
          />
        );
      case 'confirmation':
        return (
          <OrderConfirmation
            shippingInfo={checkoutState.shippingInfo}
            paymentMethod={checkoutState.paymentMethod!}
            orderSummary={orderSummary}
            onBack={() => onPreviousStep('payment')}
            onPlaceOrder={onPlaceOrder}
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
        if (clickedStepIndex === 0) {
          onPreviousStep('shipping');
        } else if (clickedStepIndex === 1) {
          onPreviousStep('payment');
        } else if (clickedStepIndex === 2) {
          onNextStep('confirmation');
        }
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
            onApplyDiscount={onApplyDiscount} 
          />
        </div>
      </div>
    </div>
  );
};
