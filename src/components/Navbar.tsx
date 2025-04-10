import { ShoppingBag, Search, Menu, X } from "lucide-react"
import { Button } from "./ui/button"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content className="min-w-[200px] bg-white rounded-md p-2 shadow-lg">
                <DropdownMenu.Item className="p-2 hover:bg-gray-100 rounded">
                  <a href="#" className="w-full">New Releases</a>
                </DropdownMenu.Item>
                <DropdownMenu.Item className="p-2 hover:bg-gray-100 rounded">
                  <a href="#" className="w-full">Men</a>
                </DropdownMenu.Item>
                <DropdownMenu.Item className="p-2 hover:bg-gray-100 rounded">
                  <a href="#" className="w-full">Women</a>
                </DropdownMenu.Item>
                <DropdownMenu.Item className="p-2 hover:bg-gray-100 rounded">
                  <a href="#" className="w-full">Kids</a>
                </DropdownMenu.Item>
                <DropdownMenu.Item className="p-2 hover:bg-gray-100 rounded">
                  <a href="#" className="w-full">Sale</a>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>

          <a href="/" className="text-xl font-bold">
            SNKR<span className="text-primary">HOUSE</span>
          </a>
          <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
            <a href="#" className="transition-colors hover:text-primary">New Releases</a>
            <a href="#" className="transition-colors hover:text-primary">Men</a>
            <a href="#" className="transition-colors hover:text-primary">Women</a>
            <a href="#" className="transition-colors hover:text-primary">Kids</a>
            <a href="#" className="transition-colors hover:text-primary">Sale</a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <ShoppingBag className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
