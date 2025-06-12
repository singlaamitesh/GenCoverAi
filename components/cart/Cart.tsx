'use client';

import { useRouter } from 'next/navigation';
import { X, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart, type CartItem } from '@/lib/cart-context';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';

export function Cart() {
  const { state, dispatch } = useCart();
  const router = useRouter();

  const handleRemoveItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      handleRemoveItem(id);
      return;
    }
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const handleCheckout = async () => {
    try {
      // In a real app, you would create a checkout session with Stripe or similar
      // For now, we'll just redirect to a checkout page
      router.push('/checkout');
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  const items = state.items;
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <ShoppingCart className="w-12 h-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium">Your cart is empty</h3>
        <p className="text-gray-500 mt-2">Start adding some amazing designs to your cart!</p>
        <Button 
          className="mt-6"
          onClick={() => router.push('/generate')}
        >
          Start Creating
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Cart ({totalItems})</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={clearCart}
          className="text-red-500 hover:text-red-700"
        >
          Clear All
        </Button>
      </div>

      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg">
            <div className="relative w-full sm:w-32 h-32 bg-gray-100 rounded-md overflow-hidden">
              <Image
                src={item.image}
                alt={item.name || 'Generated image'}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{item.name || 'Generated Design'}</h3>
                  <p className="text-sm text-gray-500">{item.phoneModel?.name || 'Custom Design'}</p>
                </div>
                <Button
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="mt-auto flex items-center justify-between pt-4">
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    className="h-8 w-8 p-0"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="font-medium">{formatCurrency(item.price * item.quantity)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t pt-6">
        <div className="flex justify-between items-center mb-6">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-lg font-semibold">{formatCurrency(subtotal)}</span>
        </div>
        <Button 
          className="w-full" 
          size="lg"
          onClick={handleCheckout}
        >
          Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
