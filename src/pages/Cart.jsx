/**
 * @file Cart.jsx
 */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useSeat } from '../hooks/useSeat';
import { createOrder } from '../services/orders';
import { ArrowLeft, Trash2, ShieldCheck, Loader2 } from 'lucide-react';

const Cart = () => {
  const { cartItems, removeItem, clearCart, cartTotal } = useCart();
  const { seat } = useSeat();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      setError('Your cart is empty.');
      return;
    }
    if (!seat) {
      setError('You must be checked into a seat to place an order.');
      return;
    }
    try {
      setIsSubmitting(true);
      setError(null);
      const orderId = await createOrder(seat, cartItems, cartTotal);
      clearCart();
      navigate(`/order/${orderId}`);
    } catch (err) {
      setError('There was a problem placing your order. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-white">
      <main className="flex-1 pb-36 animate-in slide-in-from-right-4 fade-in duration-300">
        <header className="px-6 py-4 flex items-center gap-4 bg-white/80 backdrop-blur-xl border-b border-gray-100">
          <button 
            onClick={() => navigate('/menu')}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Checkout</h1>
        </header>

        <section className="px-6 py-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-6 text-sm font-bold flex items-start gap-3">
              <span className="shrink-0 mt-0.5">⚠️</span>
              {error}
            </div>
          )}
          
          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-50 rounded-full mx-auto flex items-center justify-center mb-6 shadow-inner">
                 <ShieldCheck className="w-10 h-10 text-gray-300" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-500 mb-10 max-w-[250px] mx-auto font-medium">Looks like you haven't added anything to your order yet.</p>
              <Link 
                to="/menu" 
                className="bg-gray-900 text-white rounded-[2rem] px-10 py-4 font-bold text-lg hover:bg-gray-800 transition shadow-xl shadow-gray-200 inline-flex min-h-[56px] items-center justify-center"
              >
                Browse Menu
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              <ul className="flex flex-col gap-6">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 bg-gray-50 rounded-[1.25rem] flex items-center justify-center text-gray-400 font-bold text-2xl uppercase overflow-hidden relative shadow-sm border border-gray-100">
                       <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-transparent opacity-50"></div>
                       <span className="relative z-10">{item.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div className="flex justify-between items-start mb-1 gap-2">
                        <h3 className="font-bold text-gray-900 text-lg leading-tight">{item.name}</h3>
                        <p className="font-bold text-lg text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <div className="flex justify-between items-center mt-auto">
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Qty: {item.quantity}</p>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="bg-red-50 text-red-500 p-2.5 rounded-full hover:bg-red-100 transition min-h-[44px] min-w-[44px] flex items-center justify-center shadow-sm"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4 stroke-[2.5]" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="bg-gray-50 rounded-[2rem] p-6 border border-gray-100">
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="font-medium text-gray-600">Subtotal</span>
                  <span className="font-bold text-gray-900">₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mb-5 text-gray-500">
                  <span className="font-medium text-sm text-gray-500">Delivery to Seat {seat}</span>
                  <span className="font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md">Free</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t-2 border-gray-100 border-dashed">
                  <span className="font-bold text-gray-600 uppercase tracking-widest text-xs">Total</span>
                  <span className="font-black text-gray-900 text-3xl tracking-tight">₹{cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Fixed bottom checkout button */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 w-full p-5 bg-white/90 backdrop-blur-lg border-t border-gray-100 z-50 flex justify-center shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
          <div className="w-full max-w-md pointer-events-auto">
            <button 
              onClick={handlePlaceOrder} 
              disabled={isSubmitting || cartItems.length === 0}
              className="w-full bg-indigo-600 text-white rounded-[2rem] py-4 flex items-center justify-center shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none focus:outline-none focus:ring-4 focus:ring-indigo-100 min-h-[64px] font-black text-xl gap-3"
            >
              {isSubmitting ? (
                <>
                   <Loader2 className="w-6 h-6 animate-spin" />
                   Processing...
                </>
              ) : (
                `Place Order • ₹${cartTotal.toFixed(2)}`
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
