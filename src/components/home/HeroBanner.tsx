import { Button } from "@/components/ui/button"

export function HeroBanner() {
  return (
    <section className="relative h-[500px] w-full overflow-hidden bg-gray-900">
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 text-center text-white">
        <h1 className="text-4xl font-bold md:text-6xl">
          SUMMER SNEAKER SALE
        </h1>
        <p className="max-w-md text-lg md:text-xl">
          Up to 50% off on selected styles. Limited time only.
        </p>
        <Button size="lg" className="mt-4">
          Shop Now
        </Button>
      </div>
      <img
        src="https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2560&q=80"
        alt="Sneaker collection"
        className="h-full w-full object-cover opacity-70"
      />
    </section>
  )
}
