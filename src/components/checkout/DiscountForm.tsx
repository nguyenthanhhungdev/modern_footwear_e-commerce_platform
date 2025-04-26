import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DiscountCode } from '@/types/checkout';

interface DiscountFormProps {
  onApplyDiscount: (discountCode: string) => void;
  appliedDiscount: DiscountCode | null;
  isLoading?: boolean;
}

export const DiscountForm = ({ onApplyDiscount, appliedDiscount, isLoading = false }: DiscountFormProps) => {
  const [code, setCode] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code.trim()) {
      setError('Vui lòng nhập mã giảm giá');
      return;
    }
    
    setError(null);
    onApplyDiscount(code);
  };

  const handleRemoveDiscount = () => {
    // Gửi mã trống để xóa mã giảm giá
    onApplyDiscount('');
    setCode('');
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
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="flex-1">
            <Input
              placeholder="Nhập mã giảm giá"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={isLoading}
              className="h-9"
            />
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
          </div>
          <Button 
            type="submit" 
            disabled={isLoading} 
            className="whitespace-nowrap h-9"
          >
            {isLoading ? 'Đang xử lý...' : 'Áp dụng'}
          </Button>
        </form>
      )}
    </div>
  );
};
