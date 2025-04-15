import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import * as Tabs from '@radix-ui/react-tabs';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Product } from '@/types/product';
import { SkeletonProductDetail } from '@/components/SkeletonLoader';

const products: Product[] = [
  {
    id: "1",
    name: "Air Jordan 1 Retro High OG",
    price: 180,
    image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    rating: 4.8,
    description: "The Air Jordan 1 Retro High OG is a classic basketball shoe that has been a favorite among sneakerheads for years. It features a high-top design with a padded collar and a durable leather upper. The shoe is known for its iconic Jumpman logo on the tongue and the Air Jordan logo on the heel. The Air Jordan 1 Retro High OG is available in a variety of colorways and is a must-have for any sneaker enthusiast.",
    sizes: [7, 8, 9, 10, 11, 12],
    color: "Black",
    category: "Sneaker",
    tags: ["Men", "Women"],
  },
  {
    id: "2",
    name: "Yeezy Boost 350 V2",
    price: 220,
    image: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=715&q=80",
    rating: 4.7,
    description: "The Adidas Yeezy Boost 350 V2 is a popular lifestyle shoe designed by Kanye West. It features a Primeknit upper for breathability and flexibility, with the signature SPLY-350 branding on the side. The Boost technology in the midsole provides responsive cushioning for all-day comfort.",
    sizes: [6, 7, 8, 9, 10, 11, 12],
    color: "Grey",
    category: "Sneaker",
    tags: ["Men", "Women"],
  },
  {
    id: "3",
    name: "Classic Leather",
    price: 90,
    image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=715&q=80",
    rating: 4.5,
    description: "The Reebok Classic Leather is a timeless sneaker that has been a staple in the footwear industry since its debut in 1983. It features a soft leather upper for durability and comfort, with a die-cut EVA midsole for lightweight cushioning. The Classic Leather is perfect for everyday wear and can be paired with a variety of outfits.",
    sizes: [6, 7, 8, 9, 10, 11],
    color: "White",
    category: "Sneaker",
    tags: ["Men", "Women", "New Release"],
  },
  {
    id: "4",
    name: "Chuck Taylor All Star",
    price: 65,
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    rating: 4.3,
    description: "The Converse Chuck Taylor All Star is an iconic basketball shoe that has become a cultural phenomenon. It features a canvas upper with the signature rubber toe cap and All Star ankle patch. The Chuck Taylor All Star is known for its versatility and has been worn by athletes, musicians, and fashion enthusiasts for decades.",
    sizes: [5, 6, 7, 8, 9, 10, 11, 12],
    color: "Black",
    category: "Sneaker",
    tags: ["Men", "Women", "Classic", "New Release"],
  },
];

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading] = useState(false);

  const product = products.find((p) => p.id === id);
  if (!product) {
    return <div className="container py-8 text-center">Sản phẩm không tồn tại</div>;
  }

  const isNewRelease = product.tags.includes("New Release");

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Vui lòng chọn kích cỡ");
      return;
    }
    alert(`Đã thêm ${product.name} (Size: ${selectedSize}) vào giỏ hàng`);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert("Vui lòng chọn kích cỡ");
      return;
    }
    window.location.href = '/checkout';
  };

  const handleAddToWishlist = () => {
    alert(`Đã thêm ${product.name} vào yêu thích`);
  };

  if (isLoading) {
    return <SkeletonProductDetail />;
  }

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Product Images */}
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

        {/* Product Info */}
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
              onClick={handleAddToCart}
            >
              Thêm vào giỏ
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full" 
              onClick={handleBuyNow}
            >
              Mua ngay
            </Button>
            {isNewRelease && (
              <Button 
                variant="ghost" 
                size="lg" 
                className="w-full" 
                onClick={handleAddToWishlist}
              >
                Thêm vào yêu thích
              </Button>
            )}
          </div>

          {/* Product Details Tabs */}
          <Tabs.Root defaultValue="details" className="mt-8">
            <Tabs.List className="flex border-b">
              <Tabs.Trigger
                value="details"
                className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-black"
              >
                Chi tiết
              </Tabs.Trigger>
              <Tabs.Trigger
                value="reviews"
                className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-black"
              >
                Đánh giá
              </Tabs.Trigger>
              <Tabs.Trigger
                value="shipping"
                className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-black"
              >
                Vận chuyển & Đổi trả
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="details" className="py-4">
              <Accordion.Root type="single" collapsible>
                <Accordion.Item value="description">
                  <Accordion.Header>
                    <Accordion.Trigger className="flex w-full items-center justify-between py-2">
                      <span>Mô tả sản phẩm</span>
                      <ChevronDownIcon className="transition-transform duration-200" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="py-2 text-gray-600">
                    {product.description}
                  </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="specs">
                  <Accordion.Header>
                    <Accordion.Trigger className="flex w-full items-center justify-between py-2">
                      <span>Thông số kỹ thuật</span>
                      <ChevronDownIcon className="transition-transform duration-200" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="py-2 text-gray-600">
                    <ul className="space-y-1">
                      <li>• Màu sắc: {product.color}</li>
                      <li>• Danh mục: {product.category}</li>
                      <li>• Tags: {product.tags.join(', ')}</li>
                    </ul>
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion.Root>
            </Tabs.Content>

            <Tabs.Content value="reviews" className="py-4">
              <p>Đang cập nhật đánh giá...</p>
            </Tabs.Content>

            <Tabs.Content value="shipping" className="py-4">
              <p>Chính sách vận chuyển và đổi trả sẽ được hiển thị tại đây.</p>
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>
    </div>
  );
}
