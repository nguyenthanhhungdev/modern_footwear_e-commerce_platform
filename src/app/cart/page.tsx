import { Suspense } from 'react';
import { Cart } from '@/components/Cart';
import { SkeletonCart } from '@/components/SkeletonLoader';

export default function CartPage() {
  return (
    <Suspense fallback={<SkeletonCart />}>
      <Cart />
    </Suspense>
  );
}
