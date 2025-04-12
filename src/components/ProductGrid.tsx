import { ScrollArea } from '@radix-ui/react-scroll-area'
import { Virtuoso } from 'react-virtuoso'
import { Product } from '../types/product'
import { ProductCard } from './ProductCard'
import { SkeletonProductGrid } from './SkeletonLoader'
import { useEffect, useState } from 'react'

interface ProductGridProps {
  products: Product[]
  isLoading?: boolean
}

export default function ProductGrid({ products, isLoading = false }: ProductGridProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (isLoading) {
    return <SkeletonProductGrid />
  }

  return (
    <div className="h-[calc(100vh-160px)]">
      {isMobile ? (
        <Virtuoso
          data={products}
          itemContent={(index, product) => (
            <div className="p-2">
              <ProductCard type="full" key={product.id} product={product} />
            </div>
          )}
        />
      ) : (
        <ScrollArea className="h-full w-full pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {products.map((product) => (
              <ProductCard type="full" key={product.id} product={product} />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  )
}
