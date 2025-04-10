import { Star } from "lucide-react"
import { Button } from "./ui/button"
import * as Tooltip from "@radix-ui/react-tooltip"

interface ProductCardProps {
  name: string
  brand: string
  price: number
  imageUrl: string
  rating: number
}

export function ProductCard({
  name,
  brand,
  price,
  imageUrl,
  rating,
}: ProductCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border">
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{brand}</h3>
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{rating}</span>
                </div>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content 
                  className="bg-gray-900 text-white px-2 py-1 rounded text-xs"
                  sideOffset={5}
                >
                  Customer Rating: {rating}/5
                  <Tooltip.Arrow className="fill-gray-900" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        </div>
        <h2 className="mt-1 text-lg font-semibold">{name}</h2>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-bold">${price}</span>
          <Button size="sm">Add to Cart</Button>
        </div>
      </div>
    </div>
  )
}
