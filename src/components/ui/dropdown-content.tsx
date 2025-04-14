import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface MenuItemType {
  label: string;
  path: string;
}

interface DropdownContentProps {
  items: MenuItemType[];
  sideOffset?: number;
  align?: "start" | "center" | "end";
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  ref?: React.Ref<HTMLDivElement>;
}

export const DropdownContent = React.forwardRef<HTMLDivElement, DropdownContentProps>(
  ({ items, sideOffset, align, onMouseEnter, onMouseLeave }, ref) => {
    const navigate = useNavigate();

    const handleNavigate = useCallback(
      (path: string) => (e: Event) => {
        e.preventDefault();
        navigate(path);
        // Đóng dropdown sau khi điều hướng (tuỳ chọn)
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      },
      [navigate]
    );
    
    return (
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
        {items.map((item) => (
          <DropdownMenu.Item 
            key={item.path}
            className="p-2 hover:bg-gray-100 rounded text-sm outline-none cursor-pointer"
            onSelect={handleNavigate(item.path)}
          >
            {item.label}
          </DropdownMenu.Item>
        ))}
        <DropdownMenu.Arrow className="fill-white" />
      </DropdownMenu.Content>
    );
  }
);
