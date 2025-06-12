'use client';

import { Cart } from '@/components/cart/Cart';
import { CartProvider } from '@/contexts/CartContext';

export default function CartPage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Cart />
        </div>
      </div>
    </CartProvider>
  );
}
