import { ShippingInfo } from '@/types/checkout';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { SelectComponent, SelectItem } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { shippingSchema, ShippingFormValues } from '@/lib/form-validation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { motion } from 'framer-motion';

interface ShippingFormProps {
  shippingInfo: ShippingInfo;
  setShippingInfo: (info: ShippingInfo) => void;
  onNext: () => void;
}

export const ShippingForm = ({ shippingInfo, setShippingInfo, onNext }: ShippingFormProps) => {
  // Sử dụng react-hook-form và zod để xác thực form
  const form = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      fullName: shippingInfo.fullName || '',
      email: shippingInfo.email || '',
      phone: shippingInfo.phone || '',
      address: shippingInfo.address || '',
      city: shippingInfo.city || '',
      province: shippingInfo.province || '',
      postalCode: shippingInfo.postalCode || '',
      notes: shippingInfo.notes || '',
    },
  });

  const onSubmit = (data: ShippingFormValues) => {
    setShippingInfo(data);
    onNext();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <h2 className="text-xl font-bold mb-4">Thông tin giao hàng</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="fullName">Họ và tên</FormLabel>
                  <FormControl>
                    <Input 
                      id="fullName" 
                      placeholder="Nhập họ và tên của bạn" 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input 
                      id="email"
                      type="email"
                      placeholder="Nhập địa chỉ email" 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="phone">Số điện thoại</FormLabel>
                  <FormControl>
                    <Input 
                      id="phone"
                      type="tel"
                      placeholder="Nhập số điện thoại" 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel htmlFor="address">Địa chỉ</FormLabel>
                  <FormControl>
                    <Input 
                      id="address"
                      placeholder="Nhập địa chỉ giao hàng" 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="city">Thành phố</FormLabel>
                  <FormControl>
                    <Input 
                      id="city"
                      placeholder="Nhập tên thành phố" 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="province">Tỉnh/Thành phố</FormLabel>
                  <FormControl>
                    <SelectComponent
                      value={field.value}
                      onValueChange={field.onChange}
                      ariaLabel="Tỉnh/Thành phố"
                      placeholder="Chọn tỉnh/thành phố"
                    >
                      <SelectItem value="hanoi">Hà Nội</SelectItem>
                      <SelectItem value="hochiminh">TP. Hồ Chí Minh</SelectItem>
                      <SelectItem value="danang">Đà Nẵng</SelectItem>
                      <SelectItem value="other">Khác</SelectItem>
                    </SelectComponent>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="postalCode">Mã bưu điện</FormLabel>
                  <FormControl>
                    <Input 
                      id="postalCode"
                      placeholder="Nhập mã bưu điện" 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel htmlFor="notes">Ghi chú</FormLabel>
                  <FormControl>
                    <Textarea
                      id="notes"
                      placeholder="Ghi chú về đơn hàng hoặc yêu cầu giao hàng..."
                      className="h-24"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-6">
            <Button type="submit">
              Tiếp tục đến phương thức thanh toán
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};
