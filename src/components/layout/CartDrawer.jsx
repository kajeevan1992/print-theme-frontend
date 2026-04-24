import React from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, Minus, Plus, Trash2, ArrowRight, Gift } from 'lucide-react';
import { useCartStore } from '../../context/store';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty } = useCartStore();
  const total = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} />
            <h2 className="font-display text-lg font-semibold">Your Basket</h2>
            {count > 0 && (
              <span className="bg-brand-500 text-white text-xs font-mono px-2 py-0.5 rounded-full">{count}</span>
            )}
          </div>
          <button onClick={closeCart} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag size={48} className="mx-auto text-gray-200 mb-4" />
              <p className="font-display text-lg text-gray-400 mb-2">Your basket is empty</p>
              <p className="text-sm text-gray-400 mb-6">Add some products to get started</p>
              <button
                onClick={closeCart}
                className="bg-brand-500 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-brand-600 transition-colors"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <>
              {/* Free delivery progress */}
              {total < 50 && (
                <div className="bg-brand-50 rounded-xl p-3 border border-brand-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Gift size={14} className="text-brand-600" />
                    <p className="text-xs font-medium text-brand-700">
                      Spend <strong>£{(50 - total).toFixed(2)}</strong> more for free delivery!
                    </p>
                  </div>
                  <div className="h-1.5 bg-brand-100 rounded-full">
                    <div
                      className="h-full bg-brand-500 rounded-full transition-all"
                      style={{ width: `${Math.min((total / 50) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}
              {total >= 50 && (
                <div className="bg-green-50 rounded-xl p-3 border border-green-100 text-xs font-medium text-green-700 flex items-center gap-2">
                  🎉 You qualify for <strong>free delivery!</strong>
                </div>
              )}

              {items.map(item => (
                <div key={item.key} className="flex gap-3 p-3 bg-soft rounded-xl">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{item.product.name}</p>
                    {item.options && (
                      <div className="text-xs text-gray-500 mt-0.5 space-y-0.5">
                        {Object.entries(item.options).map(([k, v]) => (
                          <span key={k} className="block">{k}: {v}</span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQty(item.key, item.qty - 1)}
                          className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="text-sm font-mono w-4 text-center">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.key, item.qty + 1)}
                          className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">£{(item.product.price * item.qty).toFixed(2)}</span>
                        <button
                          onClick={() => removeItem(item.key)}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 p-5 space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal ({count} items)</span>
              <span>£{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Delivery</span>
              <span className={total >= 50 ? 'text-green-600 font-medium' : ''}>
                {total >= 50 ? 'FREE' : 'From £3.99'}
              </span>
            </div>
            <div className="flex justify-between font-semibold text-lg border-t border-gray-100 pt-3">
              <span>Total</span>
              <span>£{total.toFixed(2)}</span>
            </div>
            <Link
              to="/checkout"
              onClick={closeCart}
              className="w-full bg-brand-500 hover:bg-brand-600 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              Proceed to Checkout <ArrowRight size={16} />
            </Link>
            <Link
              to="/products"
              onClick={closeCart}
              className="w-full text-center text-sm text-mid hover:text-dark transition-colors block"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
