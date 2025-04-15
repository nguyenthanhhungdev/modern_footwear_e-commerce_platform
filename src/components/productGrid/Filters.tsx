import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';

interface SelectedFilters {
  categories: string[]
  prices: string[]
  sizes: string[]
}

interface FiltersProps extends SelectedFilters {
  onFilterChange: (filters: SelectedFilters) => void
}

export const Filters = ({ 
  categories = [],
  prices = [],
  sizes = [],
  onFilterChange 
}: FiltersProps) => (
  <Accordion.Root type="multiple" className="w-full space-y-2">
    <Accordion.Item value="category">
      <Accordion.Header>
        <Accordion.Trigger className="flex w-full items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium">Danh mục</span>
          <ChevronDownIcon className="transition-transform duration-200" />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="pt-2 px-3">
        <div className="space-y-2">
          {['Sneakers', 'Running Shoes', 'Basketball Shoes', 'Casual Shoes', 'Sandals & Slides', 'Football'].map((category) => (
            <label key={category} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`category-${category}`}
                className="w-4 h-4 rounded border-gray-300"
                checked={categories.includes(category)}
                onChange={(e) => {
                  const newCategories = e.target.checked
                    ? [...categories, category]
                    : categories.filter(c => c !== category)
                  onFilterChange({
                    categories: newCategories,
                    prices,
                    sizes
                  })
                }}
              />
              <span className="text-sm">
                {category}
              </span>
            </label>
          ))}
        </div>
      </Accordion.Content>
    </Accordion.Item>

    <Accordion.Item value="price">
      <Accordion.Header>
        <Accordion.Trigger className="flex w-full items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium">Giá</span>
          <ChevronDownIcon className="transition-transform duration-200" />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="pt-2 px-3">
        <div className="space-y-2">
          {['Dưới 1 triệu', '1-2 triệu', '2-3 triệu', 'Trên 3 triệu'].map((price) => (
            <label key={price} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`price-${price}`}
                className="w-4 h-4 rounded border-gray-300"
                checked={prices.includes(price)}
                onChange={(e) => {
                  const newPrices = e.target.checked
                    ? [...prices, price]
                    : prices.filter(p => p !== price)
                  onFilterChange({
                    categories,
                    prices: newPrices,
                    sizes
                  })
                }}
              />
              <span className="text-sm">{price}</span>
            </label>
          ))}
        </div>
      </Accordion.Content>
    </Accordion.Item>

    <Accordion.Item value="size">
      <Accordion.Header>
        <Accordion.Trigger className="flex w-full items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium">Kích cỡ</span>
          <ChevronDownIcon className="transition-transform duration-200" />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="pt-2 px-3">
        <div className="grid grid-cols-3 gap-2">
          {[36, 37, 38, 39, 40, 41, 42, 43].map((size) => (
            <button 
              key={size} 
              className="p-2 text-sm border rounded hover:bg-gray-100"
              value={size}
            >
              {size}
            </button>
          ))}
        </div>
      </Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
);
