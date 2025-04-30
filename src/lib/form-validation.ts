import { z } from 'zod';

export const shippingSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Họ tên phải có ít nhất 2 ký tự' })
    .max(100, { message: 'Họ tên không được quá 100 ký tự' }),
  email: z
    .string()
    .email({ message: 'Địa chỉ email không hợp lệ' }),
  phone: z
    .string()
    .min(10, { message: 'Số điện thoại không hợp lệ' })
    .max(15, { message: 'Số điện thoại không hợp lệ' }),
  address: z
    .string()
    .min(5, { message: 'Địa chỉ phải có ít nhất 5 ký tự' }),
  city: z
    .string()
    .min(2, { message: 'Thành phố không được để trống' }),
  province: z
    .string()
    .min(1, { message: 'Vui lòng chọn tỉnh/thành phố' }),
  postalCode: z
    .string()
    .min(5, { message: 'Mã bưu điện không hợp lệ' })
    .max(10, { message: 'Mã bưu điện không hợp lệ' }),
  notes: z.string().optional(),
});

// Định nghĩa các schema riêng cho từng phương thức thanh toán
const basePaymentSchema = {
  paymentMethod: z.enum(['stripe', 'cash_on_delivery'], { 
    required_error: 'Vui lòng chọn phương thức thanh toán'
  }),
};

const stripePaymentSchema = z.object({
  ...basePaymentSchema,
  paymentMethod: z.literal('stripe'),
  cardNumber: z
    .string()
    .min(16, { message: 'Số thẻ không hợp lệ' })
    .max(19, { message: 'Số thẻ không hợp lệ' }),
  cardName: z.string().min(2, { message: 'Tên trên thẻ không hợp lệ' }),
  expDate: z.string().min(4, { message: 'Ngày hết hạn không hợp lệ' }),
  cvv: z.string().min(3, { message: 'CVV không hợp lệ' }),
});

const codPaymentSchema = z.object({
  ...basePaymentSchema,
  paymentMethod: z.literal('cash_on_delivery'),
});

// Kết hợp các schema dựa trên discriminator là paymentMethod
export const paymentSchema = z.discriminatedUnion('paymentMethod', [
  stripePaymentSchema,
  codPaymentSchema,
]);

export const discountSchema = z.object({
  discountCode: z
    .string()
    .min(1, { message: 'Vui lòng nhập mã giảm giá' })
    .max(50, { message: 'Mã giảm giá quá dài' }),
});

export type ShippingFormValues = z.infer<typeof shippingSchema>;
export type PaymentFormValues = z.infer<typeof paymentSchema>;
export type DiscountFormValues = z.infer<typeof discountSchema>;
