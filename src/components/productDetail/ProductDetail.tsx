import { Product } from '@/types/product';
import { ProductImages } from './ProductImages';
import { ProductInfo } from './ProductInfo';
import { ProductDetailTabs } from './ProductDetailTabs';

interface ProductDetailProps {
  product: Product;
  isNewRelease: boolean;
  onAddToCart: () => void;
  onBuyNow: () => void;
  onAddToWishlist: () => void;
}

export function ProductDetail({
  product,
  isNewRelease,
  onAddToCart,
  onBuyNow,
  onAddToWishlist
}: ProductDetailProps) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {/* Product Images */}
      <ProductImages product={product} />

      {/* Product Info and Tabs */}
      <div className="space-y-6">
        <ProductInfo 
          product={product}
          isNewRelease={isNewRelease}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
          onAddToWishlist={onAddToWishlist}
        />
        
        {/* Product Details Tabs */}
        <ProductDetailTabs product={product} />
      </div>
    </div>
  );
}
