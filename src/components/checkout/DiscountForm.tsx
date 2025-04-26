import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DiscountCode } from '@/types/checkout';
import { discountSchema, DiscountFormValues } from '@/lib/form-validation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

interface DiscountFormProps {
  onApplyDiscount: (discountCode: string) => void;
  appliedDiscount: DiscountCode | null;
  isLoading?: boolean;
}

export const DiscountForm = ({ onApplyDiscount, appliedDiscount, isLoading = false }: DiscountFormProps) => {
  const form = useForm<DiscountFormValues>({
    resolver: zodResolver(discountSchema),
    defaultValues: {
      discountCode: ''
    }
  });

  const onSubmit = (data: DiscountFormValues) => {
    onApplyDiscount(data.discountCode);
  };

  const handleRemoveDiscount = () => {
    onApplyDiscount('');
    form.reset();
  };

  return (
    <div className="border rounded-md p-4 mb-4">
      <h3 className="text-sm font-medium mb-3">Mã giảm giá</h3>
      
      {appliedDiscount && appliedDiscount.isValid ? (
        <div>
          <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded p-2 mb-3">
            <div>
              <p className="text-sm font-medium">{appliedDiscount.code}</p>
              <p className="text-xs text-green-600">
                {appliedDiscount.discountType === 'percentage' 
                  ? `Giảm ${appliedDiscount.discountAmount}%`
                  : `Giảm ${appliedDiscount.discountAmount.toLocaleString('vi-VN')}đ`}
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleRemoveDiscount}
              disabled={isLoading}
              className="h-8 text-sm"
            >
              Xóa
            </Button>
          </div>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="discountCode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Nhập mã giảm giá"
                        disabled={isLoading}
                        className="h-9"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs mt-1" />
                  </FormItem>
                )}
              />
            </div>
            <Button 
              type="submit" 
              disabled={isLoading} 
              className="whitespace-nowrap h-9"
            >
              {isLoading ? 'Đang xử lý...' : 'Áp dụng'}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};