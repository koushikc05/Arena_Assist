/**
 * @file Queue.jsx
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Timer, Store } from 'lucide-react';
import stallsData from '../data/stalls.json';

const Queue = () => {
  const navigate = useNavigate();

  return (
    <main className="flex-1 bg-white animate-in slide-in-from-right-4 fade-in duration-300 pb-10">
      <header className="px-6 py-4 flex items-center gap-4 bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-[73px] z-40">
        <button 
          onClick={() => navigate('/home')}
          className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Queue Times</h1>
      </header>

      <section className="p-6">
        <p className="text-gray-500 mb-8 font-medium text-lg leading-relaxed">Live estimates for pickup or walk-up orders at venue stalls.</p>
        
        <ul className="flex flex-col gap-4">
          {stallsData.map(stall => (
            <li key={stall.id} className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow rounded-[2rem] p-6 flex items-center justify-between group">
              <div className="flex gap-4 items-center">
                <div className="bg-amber-50 p-3.5 rounded-2xl group-hover:bg-amber-100 transition-colors">
                  <Store className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-0.5">{stall.name}</h3>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">{stall.location}</p>
                </div>
              </div>
              
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1.5 text-amber-600 bg-amber-50 px-3 py-1.5 rounded-xl mb-1 border border-amber-100">
                   <Timer className="w-4 h-4" />
                   <span className="font-black text-base tracking-tight">~{Math.floor(Math.random() * 15) + 5}m</span>
                </div>
                <span className="text-[10px] uppercase font-black tracking-widest text-gray-400">Wait</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};
export default Queue;
