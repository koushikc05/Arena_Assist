/**
 * @file SeatCheckIn.jsx
 * @description Handles deep-link QR login via /home/:seatId.
 *
 * When a user scans a QR code encoded with a URL like:
 *   https://arenaassist.../home/S5-5
 * this page reads the :seatId param, persists it into session
 * (which also triggers anonymous Firebase sign-in), then
 * immediately redirects to /home.
 */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSeat } from '../hooks/useSeat';
import { QrCode, AlertCircle } from 'lucide-react';

const SeatCheckIn = () => {
  const { seatId } = useParams();
  const navigate = useNavigate();
  const { setSeat } = useSeat();
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkIn = async () => {
      // Validate: seat param must exist and look reasonable
      if (!seatId || seatId.trim().length === 0) {
        setError('No seat ID found in the URL. Please scan a valid seat QR code.');
        return;
      }

      const normalised = seatId.trim().toUpperCase();

      try {
        await setSeat(normalised);
        // Replace so the user cannot navigate "back" to this interim page
        navigate('/home', { replace: true });
      } catch (err) {
        console.error('SeatCheckIn error:', err);
        setError('Failed to start your session. Please try again.');
      }
    };

    checkIn();
  }, [seatId, setSeat, navigate]);

  // --- Loading / redirecting state ---
  if (!error) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-white z-10 w-full">
        <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6 mx-auto relative shadow-inner">
          <div className="absolute inset-0 bg-indigo-400 rounded-full animate-ping opacity-20" />
          <QrCode className="w-12 h-12 text-indigo-600 relative z-10 animate-pulse" />
        </div>
        <h1 className="text-2xl font-extrabold text-gray-900 mb-2 tracking-tight">
          Checking you in…
        </h1>
        <p className="text-gray-400 text-base">
          Seat <span className="font-bold text-gray-700">{seatId?.toUpperCase()}</span>
        </p>
      </main>
    );
  }

  // --- Error state ---
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-white z-10 w-full">
      <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6 mx-auto shadow-inner">
        <AlertCircle className="w-12 h-12 text-red-500" />
      </div>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-3 tracking-tight">
        Check-in Failed
      </h1>
      <p className="text-gray-500 mb-8 max-w-[280px] leading-relaxed">{error}</p>
      <button
        onClick={() => navigate('/', { replace: true })}
        className="bg-gray-900 text-white rounded-2xl px-8 py-4 font-semibold text-base hover:bg-gray-800 transition-all shadow-xl active:scale-95"
      >
        Go to Manual Check-in
      </button>
    </main>
  );
};

export default SeatCheckIn;
