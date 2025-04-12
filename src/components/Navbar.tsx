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
import * as Avatar from "@radix-ui/react-avatar"
import { useState, useRef, useEffect, useLayoutEffect } from "react"
import { DropdownContent } from "./ui/dropdown-content"
import { NavDropdown } from "./ui/nav-dropdown"
import { SkeletonNavbar } from './SkeletonLoader'

export function Navbar({ isLoading = false }: { isLoading?: boolean }) {
  const navigate = useNavigate()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isHovered, setIsHovered] = useState(false)
  const [isMenMenuOpen, setIsMenMenuOpen] = useState(false) // Fix unused variable warning
  const [isWomenMenuOpen, setIsWomenMenuOpen] = useState(false) // Fix unused variable warning
  const [isKidsMenuOpen, setIsKidsMenuOpen] = useState(false) // Fix unused variable warning
  const [isSaleMenuOpen, setIsSaleMenuOpen] = useState(false) // Fix unused variable warning
  const timeoutRef = useRef<number | null>(null)
  const triggerRef = useRef<HTMLLIElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<MutationObserver | null>(null)
  
  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])
  
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
  
  if (isLoading) {
    return <SkeletonNavbar />
  }

  const dropdownmencontent = [
    "Sneakers",
    "Running Shoes",
    "Basketball Shoes",
    "Casual Shoes",
    "Sandals & Slides",
    "Football"
  ]
  const dropdownsalecontent = [
    "Sneakers",
    "Running Shoes",
    "Basketball Shoes",
    "Casual Shoes",
    "Sandals & Slides",
    "Football"
  ] 
  const dropdownwomencontent = [
    "Sneakers",
    "Running Shoes",
    "Basketball Shoes",
    "Casual Shoes",
    "Sandals & Slides",
  ]
  const dropdownkidcontent = [
    "Sneakers",
    "Casual Shoes",
    "Sandals",
  ]


  // Handle hover with delay
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleMouseEnter = (menuType: string) => (_event: React.MouseEvent<HTMLLIElement>) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsHovered(true)
    
    // Close other menus
    switch(menuType) {
      case 'men':
        setIsWomenMenuOpen(false);
        setIsKidsMenuOpen(false);
        setIsSaleMenuOpen(false);
        setIsMenMenuOpen(true);
        break;
      case 'women':
        setIsMenMenuOpen(false);
        setIsKidsMenuOpen(false);
        setIsSaleMenuOpen(false);
        setIsWomenMenuOpen(true);
        break;
      case 'kids':
        setIsMenMenuOpen(false);
        setIsWomenMenuOpen(false);
        setIsSaleMenuOpen(false);
        setIsKidsMenuOpen(true);
        break;
      case 'sale':
        setIsMenMenuOpen(false);
        setIsWomenMenuOpen(false);
        setIsKidsMenuOpen(false);
        setIsSaleMenuOpen(true);
        break;
    }
  }
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleMouseLeave = (menuType: string) => (_event: React.MouseEvent<HTMLLIElement>) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      if (!contentRef.current?.matches(':hover') && !triggerRef.current?.matches(':hover')) {
        setIsHovered(false)
        switch(menuType) {
          case 'men': setIsMenMenuOpen(false); break
          case 'women': setIsWomenMenuOpen(false); break
          case 'kids': setIsKidsMenuOpen(false); break
          case 'sale': setIsSaleMenuOpen(false); break
        }
      }
    }, 200)
  }
  // Keyboard navigation support
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setIsMenMenuOpen(!isMenMenuOpen)
    } else if (e.key === 'Escape') {
      setIsMenMenuOpen(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">

          {/* Mobile */}
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
          {/* ============= */}

          <a href="/" className="text-xl font-bold">
            THESHOE<span className="text-primary">HOUSE</span>
          </a>
          <NavigationMenu className="hidden items-center space-x-6 text-sm font-medium md:flex">
            <NavigationMenuList className="flex space-x-6">
              <NavigationMenuItem>
                <NavigationMenuLink href="#" className={cn("transition-colors hover:text-primary")}>
                  New Releases
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Men Dropdown */}
              <NavDropdown
                label="Men"
                items={dropdownmencontent}
                isOpen={isMenMenuOpen}
                setIsOpen={setIsMenMenuOpen}
                menuType="men"
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                handleKeyDown={handleKeyDown}
                triggerRef={triggerRef}
                contentRef={contentRef}
              />

              {/* Women Dropdown */}
              <NavDropdown
                label="Women"
                items={dropdownwomencontent}
                isOpen={isWomenMenuOpen}
                setIsOpen={setIsWomenMenuOpen}
                menuType="women"
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                handleKeyDown={handleKeyDown}
              />

              {/* Kids Dropdown */}
              <NavDropdown
                label="Kids"
                items={dropdownkidcontent}
                isOpen={isKidsMenuOpen}
                setIsOpen={setIsKidsMenuOpen}
                menuType="kids"
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                handleKeyDown={handleKeyDown}
              />

              {/* Sale Dropdown */}
              <NavDropdown
                label="Sale"
                items={dropdownsalecontent}
                isOpen={isSaleMenuOpen}
                setIsOpen={setIsSaleMenuOpen}
                menuType="sale"
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                handleKeyDown={handleKeyDown}
              />
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
          
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button type="button" className="rounded-full outline-none">
                <Avatar.Root className="inline-flex h-9 w-9 select-none items-center justify-center overflow-hidden rounded-full bg-blackA3 align-middle">
                  <Avatar.Image
                    className="h-full w-full rounded-[inherit] object-cover"
                    src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
                    alt="User Avatar"
                  />
                  <Avatar.Fallback 
                    className="flex h-full w-full items-center justify-center bg-white text-sm font-medium text-violet11"
                    delayMs={600}
                  >
                    US
                  </Avatar.Fallback>
                </Avatar.Root>
              </button>
            </DropdownMenu.Trigger>
            
            <DropdownMenu.Portal>
              <DropdownContent
                items={["Profile", "Settings", "Logout"]}
                sideOffset={5}
              />
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>
    </header>
  )
}
