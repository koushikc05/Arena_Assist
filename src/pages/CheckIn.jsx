/**
 * @file CheckIn.jsx
 */
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useSeat } from '../hooks/useSeat';
import { QrCode, ArrowRight } from 'lucide-react';

const CheckIn = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { seat, setSeat } = useSeat();
  const [manualSeat, setManualSeat] = useState('');

  useEffect(() => {
    if (seat) {
      navigate('/home', { replace: true });
      return;
    }

    const urlSeat = searchParams.get('seat');
    if (urlSeat) {
      setSeat(urlSeat);
      navigate('/home', { replace: true });
    }
  }, [seat, searchParams, navigate, setSeat]);

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualSeat.trim().length > 0) {
      setSeat(manualSeat.trim().toUpperCase());
      navigate('/home', { replace: true });
    }
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-white z-10 w-full animate-in fade-in zoom-in-95 duration-500 pb-20">
      <div className="w-28 h-28 bg-indigo-50 rounded-full flex items-center justify-center mb-8 mx-auto relative shadow-inner">
        <div className="absolute inset-0 bg-indigo-400 rounded-full animate-ping opacity-20"></div>
        <QrCode className="w-14 h-14 text-indigo-600 relative z-10" />
      </div>

      <h1 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
        Welcome to the Arena
      </h1>
      <p className="text-gray-500 mb-10 text-lg max-w-[280px]">
        Scan the QR code on your armrest to begin your premium experience.
      </p>

      <div className="w-full max-w-sm mt-8 border-t border-gray-100 pt-8">
        <p className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">Or enter seat manually</p>
        <form onSubmit={handleManualSubmit} className="flex gap-3">
          <input
            type="text"
            placeholder="e.g. A14"
            className="flex-1 appearance-none border border-gray-200 bg-gray-50 rounded-2xl px-5 py-4 text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 font-bold text-lg placeholder-gray-400 transition-all"
            value={manualSeat}
            onChange={(e) => setManualSeat(e.target.value)}
          />
          <button
            type="submit"
            disabled={!manualSeat.trim()}
            className="bg-gray-900 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-2xl px-6 py-4 font-semibold text-lg hover:bg-gray-800 transition-all flex items-center justify-center min-w-[56px] min-h-[56px] shadow-md disabled:shadow-none"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </form>
      </div>
    </main>
  );
};

export default CheckIn;
