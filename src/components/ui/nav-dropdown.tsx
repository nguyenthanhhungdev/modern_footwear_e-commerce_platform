import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { NavigationMenuItem, NavigationMenuLink } from "@radix-ui/react-navigation-menu"
import { cn } from "@/lib/utils"
import { DropdownContent } from "./dropdown-content"
import React from "react"

// Import MenuItemType interface from dropdown-content or define it here
interface MenuItemType {
  label: string;
  path: string;
}

interface NavDropdownProps {
  label: string;
  items: MenuItemType[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  menuType: string;
  handleMouseEnter: (menuType: string) => (event: React.MouseEvent<HTMLLIElement>) => void;
  handleMouseLeave: (menuType: string) => (event: React.MouseEvent<HTMLLIElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  triggerRef?: React.RefObject<HTMLLIElement>;
  contentRef?: React.RefObject<HTMLDivElement>;
}

export function NavDropdown({
  label,
  items,
  isOpen,
  setIsOpen,
  menuType,
  handleMouseEnter,
  handleMouseLeave,
  handleKeyDown,
  triggerRef,
  contentRef
}: NavDropdownProps) {
  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu.Trigger asChild>
        <NavigationMenuItem
          ref={triggerRef}
          onMouseEnter={handleMouseEnter(menuType)}
          onMouseLeave={handleMouseLeave(menuType)}
          onClick={() => setIsOpen(true)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
          onKeyDown={handleKeyDown}
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <NavigationMenuLink
            className={cn(
              "transition-colors hover:text-primary",
              "data-[state=open]:text-primary"
            )}
          >
            {label}
          </NavigationMenuLink>
        </NavigationMenuItem>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownContent
          items={items}
          ref={contentRef}
          sideOffset={10}
          align="start"
        />
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
