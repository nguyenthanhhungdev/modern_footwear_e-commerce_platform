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
  appliedDiscounts: DiscountCode[];
  isLoading?: boolean;
}

export const DiscountForm = ({ onApplyDiscount, appliedDiscounts, isLoading = false }: DiscountFormProps) => {
  const form = useForm<DiscountFormValues>({
    resolver: zodResolver(discountSchema),
    defaultValues: {
      discountCode: ''
    }
  });

  const onSubmit = (data: DiscountFormValues) => {
    onApplyDiscount(data.discountCode);
    form.reset(); // Reset form after submitting
  };

  const handleRemoveDiscount = (code: string) => {
    onApplyDiscount(`REMOVE:${code}`);
  };

  const validDiscounts = appliedDiscounts.filter(discount => discount.isValid);

  return (
    <div className="border rounded-md p-4 mb-4">
      <h3 className="text-sm font-medium mb-3">Mã giảm giá</h3>
      
      {/* Display all applied discounts */}
      {validDiscounts.length > 0 && (
        <div className="space-y-2 mb-3">
          {validDiscounts.map((discount) => (
            <div 
              key={discount.code}
              className="flex items-center justify-between bg-green-50 border border-green-200 rounded p-2"
            >
              <div>
                <p className="text-sm font-medium">{discount.code}</p>
                <p className="text-xs text-green-600">
                  {discount.discountType === 'percentage' 
                    ? `Giảm ${discount.discountAmount}%`
                    : `Giảm ${discount.discountAmount.toLocaleString('vi-VN')}đ`}
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleRemoveDiscount(discount.code)}
                disabled={isLoading}
                className="h-8 text-sm"
              >
                Xóa
              </Button>
            </div>
          ))}
        </div>
      )}
      
      {/* Form to add more discount codes */}
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
    </div>
  );
};
