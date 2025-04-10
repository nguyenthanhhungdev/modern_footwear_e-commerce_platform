export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  size?: string
}

export interface CartState {
  items: CartItem[]
  subtotal: number
  isLoading: boolean
}
