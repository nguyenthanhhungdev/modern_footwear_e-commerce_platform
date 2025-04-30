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
    mode: "onChange", // Thêm mode để xác thực khi input thay đổi
  });

  console.log("Form state:", form.formState);

  const onSubmit = (data: PaymentFormValues) => {
    console.log('onSubmit called with data:', data);
    setPaymentMethod(data.paymentMethod);

    // Kiểm tra phương thức thanh toán
    if (data.paymentMethod === 'cash_on_delivery') {
      // Nếu là COD, chuyển đến bước xác nhận đơn hàng
      console.log('Processing COD payment, navigating to confirmation');
      onNext();
    } else if (data.paymentMethod === 'stripe') {
      // Nếu là Stripe, hiển thị thông báo tạm thời
      console.log('PronBackocessing Stripe payment');
      alert('Thanh toán qua Stripe đang được triển khai. Bạn sẽ sớm có thể thanh toán trực tuyến!');
      // Trong môi trường thực tế, tại đây ta có thể:
      // - Khởi tạo checkout session với Stripe API
      // - Chuyển hướng người dùng đến trang thanh toán của Stripe
      // - Hoặc hiển thị form nhập thông tin thẻ tại chỗ
    }
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const paymentMethod = form.watch('paymentMethod');

            // Chỉ trigger validation cho các trường cần thiết dựa theo phương thức thanh toán
            if (paymentMethod === 'cash_on_delivery') {
              // COD chỉ cần validate paymentMethod
              form.trigger('paymentMethod').then(isValid => {
                if (isValid) {
                  const data = { paymentMethod: 'cash_on_delivery' } as PaymentFormValues;
                  onSubmit(data);
                }
              });
            } else if (paymentMethod === 'stripe') {
              // Stripe cần validate tất cả các trường
              form.trigger().then(isValid => {
                if (isValid) {
                  const data = form.getValues() as PaymentFormValues;
                  onSubmit(data);
                } else {
                  console.error('Form validation failed:', form.formState.errors);
                }
              });
            } else {
              // Chưa chọn phương thức thanh toán
              form.trigger('paymentMethod');
            }
          }}
          className="space-y-6"
        >
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
                <img src="https://www.svgrepo.com/show/452128/visa.svg" alt="Visa" className="h-8" />
                <img src="https://www.svgrepo.com/show/328121/mastercard.svg" alt="Mastercard" className="h-8" />
                <img src="https://www.svgrepo.com/show/266101/american-express.svg" alt="American Express" className="h-8" />
                <img src="https://www.svgrepo.com/show/508695/jcb.svg" alt="JCB" className="h-8" />
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
              disabled={!watchPaymentMethod || form.formState.isSubmitting}
              onClick={() => {
                console.log('Submit button clicked');
                if (watchPaymentMethod) {
                  console.log('Payment method selected:', watchPaymentMethod);
                }
              }}
            >
              {watchPaymentMethod === 'stripe' ? 'Tiếp tục đến thanh toán bằng Stripe' : 'Xác nhận đơn hàng'}
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};
