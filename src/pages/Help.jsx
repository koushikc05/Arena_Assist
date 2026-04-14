/**
 * @file Help.jsx
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, LifeBuoy, MessageSquare, PhoneCall } from 'lucide-react';
import { useSeat } from '../hooks/useSeat';

const Help = () => {
  const navigate = useNavigate();
  const { seat } = useSeat();

  return (
    <main className="flex-1 bg-white animate-in slide-in-from-right-4 fade-in duration-300 pb-10">
      <header className="px-6 py-4 flex items-center gap-4 bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-[73px] z-40">
        <button 
          onClick={() => navigate('/home')}
          className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Get Help</h1>
      </header>

      <section className="p-6">
        <div className="text-center py-8 mb-8">
           <div className="w-24 h-24 bg-indigo-50 rounded-full mx-auto flex items-center justify-center mb-6 shadow-inner">
              <LifeBuoy className="w-10 h-10 text-indigo-600" />
           </div>
           <h2 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">Need assistance?</h2>
           <p className="text-gray-500 font-medium text-lg">We're here to help you at seat <span className="font-black text-gray-900 border-b-2 border-gray-300 pb-0.5">{seat}</span>.</p>
        </div>

        <div className="flex flex-col gap-4">
          <button className="bg-gray-900 text-white rounded-[2rem] p-6 flex items-center justify-between font-bold text-lg hover:bg-gray-800 transition shadow-lg min-h-[64px] active:scale-[0.98]">
            <div className="flex items-center gap-4 border-r border-gray-700 pr-5 shrink-0">
               <MessageSquare className="w-7 h-7 text-indigo-400" />
            </div>
            <span className="flex-1 ml-5 text-left text-xl tracking-tight">Message an Usher</span>
          </button>
          
          <button className="bg-white border border-gray-200 text-gray-900 rounded-[2rem] p-6 flex items-center justify-between font-bold text-lg hover:bg-gray-50 transition shadow-sm min-h-[64px] active:scale-[0.98]">
            <div className="flex items-center gap-4 border-r border-gray-200 pr-5 shrink-0">
               <PhoneCall className="w-7 h-7 text-gray-400" />
            </div>
            <span className="flex-1 ml-5 text-left text-xl tracking-tight">Box Office</span>
          </button>
        </div>
      </section>
    </main>
  );
};
export default Help;
