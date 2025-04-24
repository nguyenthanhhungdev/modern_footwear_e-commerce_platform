import * as Tabs from '@radix-ui/react-tabs';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Product } from '@/types/product';

interface ProductDetailTabsProps {
  product: Product;
}

export function ProductDetailTabs({ product }: ProductDetailTabsProps) {
  return (
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
  );
}
