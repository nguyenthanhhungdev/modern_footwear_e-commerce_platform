import { ProductCard } from "./ProductCard"

const products = [
  {
    name: "Air Jordan 1 Retro High OG",
    brand: "Nike",
    price: 180,
    imageUrl: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    rating: 4.8,
  },
  {
    name: "Yeezy Boost 350 V2",
    brand: "Adidas",
    price: 220,
    imageUrl: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=715&q=80",
    rating: 4.7,
  },
  {
    name: "Classic Leather",
    brand: "Reebok",
    price: 90,
    imageUrl: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=715&q=80",
    rating: 4.5,
  },
  {
    name: "Chuck Taylor All Star",
    brand: "Converse",
    price: 65,
    imageUrl: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    rating: 4.3,
  },
]

export function FeaturedProducts() {
  return (
    <section className="py-12">
      <div className="container">
        <h2 className="mb-8 text-3xl font-bold">Featured Sneakers</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.name} {...product} />
          ))}
        </div>
      </div>
    </section>
  )
}
