import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import React from "react";

interface DropdownContentProps {
  items: string[];
  sideOffset?: number;
  align?: "start" | "center" | "end";
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  ref?: React.Ref<HTMLDivElement>;
}

export const DropdownContent = React.forwardRef<HTMLDivElement, DropdownContentProps>(
  ({ items, sideOffset, align, onMouseEnter, onMouseLeave }, ref) => (
    <DropdownMenu.Content
      ref={ref}
      className="min-w-[200px] bg-white rounded-md p-2 shadow-lg"
      sideOffset={sideOffset}
      align={align}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onPointerDownOutside={(e) => e.preventDefault()}
      onInteractOutside={(e) => e.preventDefault()}
      style={{ pointerEvents: 'auto' }}
    >
      {items.map((item, index) => (
        <DropdownMenu.Item 
          key={index}
          className="p-2 hover:bg-gray-100 rounded text-sm outline-none cursor-pointer"
        >
          <a href="#" className="w-full">{item}</a>
        </DropdownMenu.Item>
      ))}
      <DropdownMenu.Arrow className="fill-white" />
    </DropdownMenu.Content>
  )
);