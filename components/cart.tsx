"use client"

import { useState } from "react"
import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function CartButton() {
  const [isOpen, setIsOpen] = useState(false)
  const { state, dispatch } = useCart()
  const router = useRouter()

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch({ type: "REMOVE_ITEM", payload: id })
      toast.success("Item removed from cart")
    } else {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
    }
  }

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
    toast.success("Item removed from cart")
  }

  const handleCheckout = () => {
    if (state.items.length === 0) {
      toast.error("Your cart is empty!")
      return
    }
    setIsOpen(false)
    sessionStorage.setItem('checkoutItems', JSON.stringify(state.items))
    router.push('/checkout')
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-neutral-600 hover:text-brand-600 transition-colors"
      >
        <ShoppingCart className="w-6 h-6" />
        {state.itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-brand-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
            {state.itemCount}
          </span>
        )}
      </button>

      {/* Cart Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] overflow-hidden" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm" 
            onClick={() => setIsOpen(false)} 
            style={{ zIndex: 9998, position: 'fixed' }}
          />
          <div 
            className="fixed right-0 top-0 h-screen w-full max-w-md bg-white shadow-2xl border-l border-neutral-200 flex flex-col overflow-y-auto"
            style={{ zIndex: 9999, maxHeight: '100vh' }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-neutral-200">
                <h2 className="text-xl font-bold text-neutral-900">Shopping Cart</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6" style={{ overflowY: 'auto' }}>
                {state.items.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                    <p className="text-neutral-500">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {state.items.map((item) => (
                      <div key={item.id} className="flex gap-4 p-4 bg-neutral-50 rounded-xl">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-16 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-neutral-900 mb-1">{item.name}</h3>
                          <div className="space-y-1">
                            <p className="text-sm text-neutral-600">
                              {item.phoneModel?.modelName || 'Custom Design'}
                              {item.style && ` • ${item.style}`}
                            </p>
                            {item.caseType && (
                              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-100 text-brand-800">
                                {item.caseType}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-neutral-900">₹{item.price * item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {state.items.length > 0 && (
                <div className="border-t border-neutral-200 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-neutral-900">Total:</span>
                    <span className="text-2xl font-bold text-brand-600">₹{state.total}</span>
                  </div>
                  <button onClick={handleCheckout} className="w-full premium-button">
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
