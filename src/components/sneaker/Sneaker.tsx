import { Product } from "@/types/product";
import { Filters } from "./Filters";
import { useState } from "react";
import { SelectComponent } from "../ui/select";
import * as Select  from "@radix-ui/react-select";
import ProductGrid from "./ProductGrid";
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

interface SneakerProps {
    products: Product[];
}

export default function Sneaker({ products }: SneakerProps) {
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
                        <SelectComponent
                            value={sortOption}
                            onValueChange={setSortOption}
                            ariaLabel="Lựa chọn tiêu chí sắp xếp sản phẩm"
                            placeholder="Lựa chọn tiêu chí sắp xếp sản phẩm"
                        >
                            <Select.Item value="newest">Mới nhất</Select.Item>
                            <Select.Item value="priceAsc">Giá: Thấp đến cao</Select.Item>
                            <Select.Item value="priceDesc">Giá: Cao đến thấp</Select.Item>
                        </SelectComponent>
                    </div>
                    <ProductGrid products={applyFiltersAndSorting(products, filters, sortOption)} />
                </div>
            </div>
        </div>
    );
}
