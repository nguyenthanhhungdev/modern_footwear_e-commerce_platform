import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';

export const Filters = () => (
  <Accordion.Root type="multiple" className="w-full space-y-2">
    <Accordion.Item value="category">
      <Accordion.Header>
        <Accordion.Trigger className="flex w-full items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium">Danh mục</span>
          <ChevronDownIcon className="transition-transform duration-200" />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="pt-2 px-3">
        {/* Filter options */}
      </Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
);