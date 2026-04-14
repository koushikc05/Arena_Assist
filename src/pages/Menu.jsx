/**
 * @file Menu.jsx
 */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import menuData from '../data/menu.json';
import { Plus, ArrowLeft, Coffee, Pizza, Croissant } from 'lucide-react';

const UtensilsIcon = ({ category }) => {
  if (category === 'Drinks') return <Coffee className="w-8 h-8 text-indigo-400 opacity-60 relative z-10" />;
  if (category === 'Desserts') return <Croissant className="w-8 h-8 text-indigo-400 opacity-60 relative z-10" />;
  return <Pizza className="w-8 h-8 text-indigo-400 opacity-60 relative z-10" />;
};

const Menu = () => {
  const { addItem, cartItems, cartTotal } = useCart();
  const navigate = useNavigate();

  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="flex flex-col flex-1 bg-white relative">
      <main className="flex-1 pb-28 animate-in fade-in duration-300">
        <header className="px-6 py-4 flex items-center gap-4 bg-white/80 backdrop-blur-xl sticky top-[73px] z-40 border-b border-gray-100 shadow-sm">
          <button 
            onClick={() => navigate('/home')}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Food & Drinks</h1>
        </header>
        
        <section className="px-6 py-6">
          <ul className="flex flex-col gap-6">
            {menuData.map((item) => (
              <li key={item.id} className="flex items-center gap-5 group cursor-pointer">
                <div className="w-24 h-24 bg-gray-50 border border-gray-100 rounded-3xl flex-shrink-0 relative overflow-hidden flex items-center justify-center shadow-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-transparent opacity-50"></div>
                  <UtensilsIcon category={item.category} />
                </div>
                
                <div className="flex-1 flex flex-col justify-between py-1 border-b border-gray-50 pb-5">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 leading-tight mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-400 font-bold tracking-wider uppercase">{item.category}</p>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <p className="font-bold text-gray-900 text-lg">${item.price.toFixed(2)}</p>
                    <button 
                      onClick={() => addItem(item)}
                      className="bg-gray-900 text-white rounded-full p-2.5 hover:bg-gray-700 hover:scale-105 active:scale-95 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center shadow-lg shadow-gray-200"
                      aria-label={`Add ${item.name} to cart`}
                    >
                      <Plus className="w-5 h-5 stroke-[3]" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* Sticky Bottom Bar */}
      {totalItemCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 w-full p-5 pointer-events-none z-50 flex justify-center">
          <div className="w-full max-w-md pointer-events-auto animate-in slide-in-from-bottom-4 fade-in duration-300">
            <Link 
              to="/cart" 
              className="bg-indigo-600 text-white rounded-[2rem] p-4 px-6 flex items-center justify-between shadow-2xl shadow-indigo-600/30 hover:bg-indigo-700 hover:-translate-y-1 transition-all min-h-[64px]"
            >
              <div className="flex items-center gap-3">
                <div className="bg-indigo-500 rounded-full w-9 h-9 flex items-center justify-center shadow-inner">
                  <span className="font-black text-sm">{totalItemCount}</span>
                </div>
                <span className="font-bold text-xl drop-shadow-sm">View Cart</span>
              </div>
              <span className="font-bold text-xl tracking-wide drop-shadow-sm">${cartTotal.toFixed(2)}</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
