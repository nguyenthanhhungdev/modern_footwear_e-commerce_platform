import * as Select from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import classnames from "classnames";
import React from 'react';

import { Filters } from '@/components/Filters';
import ProductGrid from '@/components/ProductGrid';
import { useState } from 'react';
import { Product } from '@/types/product';

/* 

Giải thích tham số đầu vào:
Component nhận 2 tham số chính: • Props: Kết hợp từ Select.SelectItemProps của Radix UI và prop className tùy chọn • forwardedRef: Ref forwarded đến phần tử DOM gốc (div)
Chức năng chính:
Tạo item hiển thị trong dropdown menu của component Select
Quản lý styling kết hợp giữa lớp CSS mặc định và className tùy chỉnh
Hiển thị indicator (CheckIcon) khi item được chọn
Cơ chế hoạt động: • Sử dụng React.forwardRef để truyền ref xuống phần tử div bên trong • Kết hợp className mặc định với className truyền vào qua classnames • Spread các props của Radix UI để kế thừa chức năng tương tác • Render CheckIcon trong ItemIndicator khi item được chọn


*/


const SelectItem = React.forwardRef<HTMLDivElement, Select.SelectItemProps & {
  className?: string;
}>(({ children, className, ...props }, forwardedRef) => {
  return (
    <Select.Item
      className={classnames(
        "relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none text-violet11 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 data-[highlighted]:outline-none",
        className,
      )}
      {...props}
      ref={forwardedRef}
    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  );
},
);
const products = [
  {
    id: "1",
    name: "Air Jordan 1 Retro High OG",
    price: 180,
    image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    rating: 4.8,
    description: "The Air Jordan 1 Retro High OG is a classic basketball shoe that has been a favorite among sneakerheads for years. It features a high-top design with a padded collar and a durable leather upper. The shoe is known for its iconic Jumpman logo on the tongue and the Air Jordan logo on the heel. The Air Jordan 1 Retro High OG is available in a variety of colorways and is a must-have for any sneaker enthusiast.",
    sizes: [7, 8, 9, 10, 11, 12],
    color: "Black",
    category: "Basketball",
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
    category: "Lifestyle",
    tags: ["Men", "Women", "Streetwear"],
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
    category: "Casual",
    tags: ["Men", "Women", "Classic"],
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
    category: "Casual",
    tags: ["Men", "Women", "Classic"],
  },
]

// Hàm lọc và sắp xếp sản phẩm
interface FilterType {
  categories: string[]
  prices: string[]
  sizes: string[]
}

const applyFiltersAndSorting = (
  products: Product[],
  filters: FilterType,
  sortOption: string
) => {
  // Lọc theo danh mục
  let filteredProducts = products.filter(product => {
    if (filters.categories.length === 0) return true;
    // Lọc cascade
    return filters.categories.includes(product.category);
  });

  // Lọc theo khoảng giá
  filteredProducts = filteredProducts.filter(product => {
    if (filters.prices.length === 0) return true;
    // Nếu có 1 giá khớp thì trả về true
    return filters.prices.some((priceRange: string) => {
      switch (priceRange) {
        case 'Dưới 1 triệu': return product.price < 1000000;
        case '1-2 triệu': return product.price >= 1000000 && product.price <= 2000000;
        case '2-3 triệu': return product.price > 2000000 && product.price <= 3000000;
        case 'Trên 3 triệu': return product.price > 3000000;
        default: return true;
      }
    });
  });

  // Lọc theo kích cỡ
  filteredProducts = filteredProducts.filter(product => {
    if (filters.sizes.length === 0) return true;
    // Kiểm tar sản phẩm có ít nhất 1 size khớp
    return product.sizes.some(size =>
      filters.sizes.includes(size.toString())
    );
  });

  // Sắp xếp
  return filteredProducts.sort((a, b) => {
    switch (sortOption) {
      case 'priceAsc': return a.price - b.price;
      case 'priceDesc': return b.price - a.price;
      default: return 0; // Mới nhất - giữ nguyên thứ tự
    }
  });
};

export default function SneakerPage() {
  const [sortOption, setSortOption] = useState('newest');
  const [filters, setFilters] = useState<FilterType>({
    categories: [],
    prices: [],
    sizes: []
  });
  return (
    <div className="container mx-auto p-4">
      <div className="flex gap-8">
        {/* Filter sidebar */}
        <div className="w-64 shrink-0">
          <Filters
            categories={filters.categories}
            prices={filters.prices}
            sizes={filters.sizes}
            onFilterChange={(filters) => {
              setFilters(filters);
            }}
          />
        </div>

        {/* Main content */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Giày Thể Thao</h1>
            <Select.Root
              value={sortOption}
              onValueChange={setSortOption}
            >
              <Select.Trigger
                className="inline-flex h-[35px] items-center justify-center gap-[5px] rounded bg-white px-[15px] text-[13px] leading-none text-violet11 shadow-[0_2px_10px] shadow-black/10 outline-none hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9"
                aria-label="Lựa chọn tiêu chí sắp xếp sản phẩm"
              >
                <Select.Value placeholder="Lựa chọn tiêu chí sắp xếp sản phẩm" />
                <Select.Icon className="text-violet11">
                  <ChevronDownIcon />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content
                  className="overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
                  position="popper"
                  side="bottom"
                  align="end"
                  sideOffset={5}
                >
                  <Select.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-violet11">
                    <ChevronUpIcon />
                  </Select.ScrollUpButton>
                  <Select.Viewport className="p-[5px]">
                    <Select.Group>
                      <Select.Label className="px-[25px] text-xs leading-[25px] text-mauve11">
                        Sắp xếp
                      </Select.Label>
                      <SelectItem value="newest">Mới nhất</SelectItem>
                      <SelectItem value="priceAsc">Giá: Thấp đến cao</SelectItem>
                      <SelectItem value="priceDesc">Giá: Cao đến thấp</SelectItem>
                    </Select.Group>
                  </Select.Viewport>
                  <Select.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-violet11">
                    <ChevronDownIcon />
                  </Select.ScrollDownButton>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>
          <ProductGrid products={applyFiltersAndSorting(products, filters, sortOption)} />
        </div>
      </div>
    </div>
  );
}
