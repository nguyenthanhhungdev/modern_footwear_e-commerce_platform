// Thông tin thanh toán
export interface ShippingInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  notes?: string;
}

// Phương thức thanh toán
export type PaymentMethod = 'stripe' | 'cash_on_delivery';

// Thông tin mã giảm giá
export interface DiscountCode {
  code: string;
  discountAmount: number;
  discountType: 'percentage' | 'fixed';
  isValid: boolean;
}

// Trạng thái thanh toán
export interface CheckoutState {
  shippingInfo: ShippingInfo;
  paymentMethod: PaymentMethod | null;
  currentStep: 'shipping' | 'payment' | 'confirmation';
  discountCodes: DiscountCode[];
}

// Thông tin đơn hàng đầy đủ
export interface OrderSummary {
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    size?: string;
  }[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
}
