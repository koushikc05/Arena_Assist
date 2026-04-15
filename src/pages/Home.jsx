/**
 * @file Home.jsx
 */
import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSeat } from '../hooks/useSeat';
import { Utensils, Timer, LifeBuoy, ChevronRight, Map, LogOut } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const { seat, clearSeat } = useSeat();

  useEffect(() => {
    if (!seat) {
      navigate('/', { replace: true });
    }
  }, [seat, navigate]);

  if (!seat) return null;

  return (
    <main className="p-6 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 flex-1 bg-gray-50">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h2 className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-1 drop-shadow-sm">Current Location</h2>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Seat {seat}</h1>
        </div>
        <button 
          onClick={() => { clearSeat(); navigate('/'); }}
          className="p-3 bg-white border border-gray-200 text-red-500 rounded-2xl hover:bg-red-50 hover:border-red-100 transition shadow-sm active:scale-95"
          aria-label="Log Out"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
      
      <nav className="flex flex-col gap-4 mt-2">
        <Link 
          to="/menu" 
          className="group relative overflow-hidden bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all min-h-[44px] flex items-center justify-between hover:-translate-y-1"
        >
          <div className="relative z-10 flex items-center gap-5">
            <div className="bg-white/20 p-3.5 rounded-2xl backdrop-blur-md shadow-inner">
              <Utensils className="w-8 h-8 text-white drop-shadow-md" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">Order Food</h3>
              <p className="text-indigo-100 text-sm font-medium">Delivered to your seat</p>
            </div>
          </div>
          <ChevronRight className="text-white/50 w-7 h-7 group-hover:translate-x-1.5 transition-transform relative z-10" />
          <div className="absolute -bottom-12 -right-12 bg-white/10 w-48 h-48 rounded-full blur-2xl pointer-events-none"></div>
        </Link>

        <Link 
          to="/queue" 
          className="group relative overflow-hidden bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all min-h-[44px] flex items-center justify-between hover:-translate-y-1"
        >
          <div className="relative z-10 flex items-center gap-5">
            <div className="bg-white/20 p-3.5 rounded-2xl backdrop-blur-md shadow-inner">
              <Timer className="w-8 h-8 text-white drop-shadow-md" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">Queue Times</h3>
              <p className="text-amber-50 text-sm font-medium">Check stall wait times</p>
            </div>
          </div>
          <ChevronRight className="text-white/50 w-7 h-7 group-hover:translate-x-1.5 transition-transform relative z-10" />
          <div className="absolute -top-12 -right-12 bg-white/10 w-48 h-48 rounded-full blur-2xl pointer-events-none"></div>
        </Link>

        <Link 
          to="/help" 
          className="group relative overflow-hidden bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all min-h-[44px] flex items-center justify-between hover:-translate-y-1"
        >
          <div className="relative z-10 flex items-center gap-5">
            <div className="bg-gray-100 p-3.5 rounded-2xl">
              <LifeBuoy className="w-8 h-8 text-gray-700" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1 tracking-tight">Get Help</h3>
              <p className="text-gray-500 text-sm font-medium">Contact venue staff</p>
            </div>
          </div>
          <ChevronRight className="text-gray-300 w-7 h-7 group-hover:translate-x-1.5 transition-transform relative z-10" />
        </Link>
        
        <Link 
          to="/map" 
          className="group relative overflow-hidden bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all min-h-[44px] flex items-center justify-between hover:-translate-y-1"
        >
          <div className="relative z-10 flex items-center gap-5">
            <div className="bg-emerald-500/10 p-3.5 rounded-2xl">
              <Map className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1 tracking-tight">Venue Map</h3>
              <p className="text-gray-500 text-sm font-medium">Find your way around</p>
            </div>
          </div>
          <ChevronRight className="text-gray-300 w-7 h-7 group-hover:translate-x-1.5 transition-transform relative z-10" />
        </Link>
      </nav>
    </main>
  );
};

export default Home;
