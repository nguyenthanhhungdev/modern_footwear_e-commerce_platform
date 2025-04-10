import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@radix-ui/react-navigation-menu"
import { cn } from "@/lib/utils"
import { ShoppingBag, Search, Menu } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import React, { useState, useRef, useEffect, useLayoutEffect } from "react"

export function Navbar() {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const timeoutRef = useRef<number | null>(null)
  const triggerRef = useRef<HTMLLIElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<MutationObserver | null>(null)

  // Handle hover with delay
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsHovered(true)
    setIsMenuOpen(true)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      if (!contentRef.current?.matches(':hover') && !triggerRef.current?.matches(':hover')) {
        setIsHovered(false)
        setIsMenuOpen(false)
      }
    }, 200)
  }

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  // Keyboard navigation support
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setIsMenuOpen(!isMenuOpen)
    } else if (e.key === 'Escape') {
      setIsMenuOpen(false)
    }
  }

  // Monitor and fix body style changes
  useLayoutEffect(() => {
    // Observer for body style changes
    const bodyObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'style') {
          const body = document.body;
          const style = body.getAttribute('style');
          if (style && style.includes('pointer-events: none')) {
            body.style.pointerEvents = 'auto';
          }
        }
        if (mutation.attributeName === 'data-scroll-locked') {
          const body = document.body;
          if (body.getAttribute('data-scroll-locked') === '1') {
            body.style.overflow = 'auto';
            body.style.paddingRight = '0';
          }
        }
      });
    });

    // Observer for dropdown content style changes
    const contentObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          const target = mutation.target as HTMLElement;
          if (target.hasAttribute('data-radix-popper-content-wrapper')) {
            target.style.pointerEvents = 'auto';
            target.style.zIndex = '9999';
          }
        }
      });
    });

    // Start observing body
    bodyObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ['style', 'data-scroll-locked']
    });

    // Store observer reference for cleanup
    observerRef.current = contentObserver;

    // Observe document for any popper content that might be added
    const documentObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement && node.hasAttribute('data-radix-popper-content-wrapper')) {
              contentObserver.observe(node, {
                attributes: true,
                attributeFilter: ['style']
              });
              node.style.pointerEvents = 'auto';
              node.style.zIndex = '9999';
            }
          });
        }
      });
    });

    documentObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      bodyObserver.disconnect();
      contentObserver.disconnect();
      documentObserver.disconnect();
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content 
                className="min-w-[200px] bg-white rounded-md p-1 shadow-lg will-change-[opacity,transform]"
                sideOffset={5}
                onPointerDownOutside={(e) => e.preventDefault()}
                onInteractOutside={(e) => e.preventDefault()}
              >
                <DropdownMenu.Item className="p-2 hover:bg-gray-100 rounded text-sm outline-none cursor-pointer">
                  <a href="#" className="w-full">New Releases</a>
                </DropdownMenu.Item>
                <DropdownMenu.Item className="p-2 hover:bg-gray-100 rounded text-sm outline-none cursor-pointer">
                  <a href="#" className="w-full">Men</a>
                </DropdownMenu.Item>
                <DropdownMenu.Item className="p-2 hover:bg-gray-100 rounded text-sm outline-none cursor-pointer">
                  <a href="#" className="w-full">Women</a>
                </DropdownMenu.Item>
                <DropdownMenu.Item className="p-2 hover:bg-gray-100 rounded text-sm outline-none cursor-pointer">
                  <a href="#" className="w-full">Kids</a>
                </DropdownMenu.Item>
                <DropdownMenu.Item className="p-2 hover:bg-gray-100 rounded text-sm outline-none cursor-pointer">
                  <a href="#" className="w-full">Sale</a>
                </DropdownMenu.Item>
                <DropdownMenu.Arrow className="fill-white" />
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>

          <a href="/" className="text-xl font-bold">
            SNKR<span className="text-primary">HOUSE</span>
          </a>
          <NavigationMenu className="hidden items-center space-x-6 text-sm font-medium md:flex">
            <NavigationMenuList className="flex space-x-6">
              <NavigationMenuItem>
                <NavigationMenuLink href="#" className={cn("transition-colors hover:text-primary")}>
                  New Releases
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              {/* Men Dropdown */}
              <DropdownMenu.Root open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <DropdownMenu.Trigger asChild>
                  <NavigationMenuItem
                    ref={triggerRef}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onFocus={() => setIsMenuOpen(true)}
                    onBlur={() => setIsMenuOpen(false)}
                    onKeyDown={handleKeyDown}
                    aria-haspopup="true"
                    aria-expanded={isMenuOpen}
                  >
                    <NavigationMenuLink 
                      className={cn(
                        "transition-colors hover:text-primary",
                        "data-[state=open]:text-primary"
                      )}
                    >
                      Men
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    ref={contentRef}
                    className="min-w-[200px] bg-white rounded-md p-2 shadow-lg"
                    sideOffset={10}
                    align="start"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onPointerDownOutside={(e) => e.preventDefault()}
                    onInteractOutside={(e) => e.preventDefault()}
                    style={{ pointerEvents: 'auto' }}
                  >
                    <DropdownMenu.Item className="p-2 hover:bg-gray-100 rounded text-sm outline-none cursor-pointer">
                      <a href="#" className="w-full">Sneakers</a>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="p-2 hover:bg-gray-100 rounded text-sm outline-none cursor-pointer">
                      <a href="#" className="w-full">Running Shoes</a>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="p-2 hover:bg-gray-100 rounded text-sm outline-none cursor-pointer">
                      <a href="#" className="w-full">Basketball Shoes</a>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="p-2 hover:bg-gray-100 rounded text-sm outline-none cursor-pointer">
                      <a href="#" className="w-full">Casual Shoes</a>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="p-2 hover:bg-gray-100 rounded text-sm outline-none cursor-pointer">
                      <a href="#" className="w-full">Sandals & Slides</a>
                    </DropdownMenu.Item>
                    <DropdownMenu.Arrow className="fill-white" />
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>

              <NavigationMenuItem>
                <NavigationMenuLink href="#" className={cn("transition-colors hover:text-primary")}>
                  Women
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#" className={cn("transition-colors hover:text-primary")}>
                  Kids
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#" className={cn("transition-colors hover:text-primary")}>
                  Sale
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => navigate('/cart')}>
            <ShoppingBag className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
