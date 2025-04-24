import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { Product } from '@/types/product';

interface ProductInfoProps {
  product: Product;
  onAddToCart: () => void;
  onBuyNow: () => void;
  onAddToWishlist: () => void;
  isNewRelease: boolean;
}

export function ProductInfo({ 
  product, 
  onAddToCart, 
  onBuyNow, 
  onAddToWishlist, 
  isNewRelease 
}: ProductInfoProps) {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <div className="mt-2 flex items-center">
          <div className="flex items-center">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm">{product.rating}</span>
          </div>
          <span className="mx-2 text-gray-400">|</span>
          <button className="text-sm text-gray-600 hover:underline">
            12 đánh giá
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
        <p className="text-gray-600">{product.description}</p>
      </div>

      {/* Size Selector */}
      <div className="space-y-2">
        <h3 className="font-medium">Kích cỡ</h3>
        <div className="grid grid-cols-3 gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              className={`rounded border p-2 text-center ${selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-300 hover:border-gray-400'}`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="space-y-2">
        <h3 className="font-medium">Số lượng</h3>
        <div className="flex items-center">
          <button
            className="h-10 w-10 rounded-l border border-gray-300"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            -
          </button>
          <div className="flex h-10 w-10 items-center justify-center border-t border-b border-gray-300">
            {quantity}
          </div>
          <button
            className="h-10 w-10 rounded-r border border-gray-300"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col space-y-2">
        <Button 
          size="lg" 
          className="w-full" 
          onClick={() => {
            if (!selectedSize) {
              alert("Vui lòng chọn kích cỡ");
              return;
            }
            onAddToCart();
          }}
        >
          Thêm vào giỏ
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          className="w-full" 
          onClick={() => {
            if (!selectedSize) {
              alert("Vui lòng chọn kích cỡ");
              return;
            }
            onBuyNow();
          }}
        >
          Mua ngay
        </Button>
        {isNewRelease && (
          <Button 
            variant="ghost" 
            size="lg" 
            className="w-full" 
            onClick={onAddToWishlist}
          >
            Thêm vào yêu thích
          </Button>
        )}
      </div>
    </div>
  );
}
