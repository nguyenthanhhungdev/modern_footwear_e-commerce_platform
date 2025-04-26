// filepath: /home/nguyenthanhhung/Documents/code/modern_footwear_e-commerce_platform/src/components/checkout/PaymentSelection.tsx
import React from 'react';
import { PaymentMethod } from '@/types/checkout';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { paymentSchema, PaymentFormValues } from '@/lib/form-validation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { motion } from 'framer-motion';

interface PaymentSelectionProps {
  selectedMethod: PaymentMethod | null;
  setPaymentMethod: (method: PaymentMethod) => void;
  onNext: () => void;
  onBack: () => void;
}

export const PaymentSelection = ({ 
  selectedMethod, 
  setPaymentMethod, 
  onNext, 
  onBack 
}: PaymentSelectionProps) => {
  // Sử dụng react-hook-form và zod để xác thực form
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: selectedMethod || undefined,
    },
  });

  const onSubmit = (data: PaymentFormValues) => {
    setPaymentMethod(data.paymentMethod);
    onNext();
  };

  // Lấy giá trị phương thức thanh toán hiện tại từ form
  const watchPaymentMethod = form.watch('paymentMethod');

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <h2 className="text-xl font-bold mb-4">Phương thức thanh toán</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Chọn phương thức thanh toán</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="space-y-3"
                  >
                    <div className="flex items-center p-4 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="stripe" />
                        </FormControl>
                        <div className="w-full">
                          <FormLabel className="font-medium cursor-pointer">
                            Thanh toán qua Stripe
                          </FormLabel>
                          <p className="text-sm text-gray-500">Thanh toán an toàn với Visa, Mastercard, JCB</p>
                        </div>
                      </FormItem>
                    </div>
                    
                    <div className="flex items-center p-4 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="cash_on_delivery" />
                        </FormControl>
                        <div className="w-full">
                          <FormLabel className="font-medium cursor-pointer">
                            Thanh toán khi nhận hàng (COD)
                          </FormLabel>
                          <p className="text-sm text-gray-500">Thanh toán bằng tiền mặt khi nhận hàng</p>
                        </div>
                      </FormItem>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {watchPaymentMethod === 'stripe' && (
            <div className="mt-6 p-4 border rounded-md">
              <p className="font-medium mb-2">Thanh toán qua Stripe:</p>
              <p className="text-sm mb-4">
                Bạn sẽ được chuyển đến trang thanh toán an toàn của Stripe sau khi xác nhận đơn hàng.
              </p>
              <div className="flex items-center space-x-2 mb-4">
                <img src="/assets/images/visa.svg" alt="Visa" className="h-8" />
                <img src="/assets/images/mastercard.svg" alt="Mastercard" className="h-8" />
                <img src="/assets/images/amex.svg" alt="American Express" className="h-8" />
                <img src="/assets/images/jcb.svg" alt="JCB" className="h-8" />
              </div>
              <p className="text-xs text-gray-500">
                Tất cả thông tin thẻ của bạn được mã hóa và bảo mật bởi Stripe. Chúng tôi không lưu trữ thông tin thẻ của bạn.
              </p>
            </div>
          )}

          <div className="flex justify-between mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
            >
              Quay lại
            </Button>
            <Button
              type="submit"
              disabled={!watchPaymentMethod}
            >
              Tiếp tục đến xác nhận đơn hàng
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};
