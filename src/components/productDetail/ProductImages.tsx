import { Product } from '@/types/product';

interface ProductImagesProps {
  product: Product;
}

export function ProductImages({ product }: ProductImagesProps) {
  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="aspect-square overflow-hidden rounded bg-gray-100">
            <img
              src={product.image}
              alt={`${product.name} ${i}`}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
