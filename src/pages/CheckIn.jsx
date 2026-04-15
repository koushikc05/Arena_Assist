/**
 * @file CheckIn.jsx
 */
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useSeat } from '../hooks/useSeat';
import { QrCode, AlertCircle, Camera } from 'lucide-react';
import { Scanner } from '@yudiel/react-qr-scanner';

const CheckIn = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { seat, setSeat } = useSeat();
  const [error, setError] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    // If the user already has a session, or navigated directly via ?seat=A14 in the URL
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

  const handleScan = (detectedCodes) => {
    if (detectedCodes && detectedCodes.length > 0) {
      const text = detectedCodes[0].rawValue;
      if (text && text.trim().length > 0) {
        setSeat(text.trim().toUpperCase());
        navigate('/home', { replace: true });
      }
    }
  };

  const handleError = (error) => {
    console.error("QR Scanner Error: ", error);
    if (error?.name === 'NotAllowedError') {
      setError("Camera permission denied. Please allow camera access in your browser settings to scan your seat QR code.");
    } else {
      setError("Could not access the camera. Please make sure you are on a secure connection (HTTPS) and have granted permissions.");
    }
    setIsScanning(false);
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-white z-10 w-full animate-in fade-in zoom-in-95 duration-500 pb-20">
      
      {!isScanning && !error && (
        <>
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

          <button 
            onClick={() => setIsScanning(true)}
            className="bg-gray-900 text-white rounded-2xl px-8 py-4 font-semibold text-lg hover:bg-gray-800 transition-all flex items-center gap-3 shadow-xl active:scale-95"
          >
            <Camera className="w-6 h-6" />
            <span>Open Camera</span>
          </button>
        </>
      )}

      {error && (
        <div className="w-full max-w-sm mt-8 border border-red-200 bg-red-50 text-red-700 rounded-2xl p-6 text-left">
           <div className="flex items-center gap-3 mb-2">
             <AlertCircle className="w-6 h-6 text-red-600 shrink-0" />
             <h3 className="font-bold">Camera Access Error</h3>
           </div>
           <p className="text-sm opacity-90 leading-relaxed mb-4">{error}</p>
           <button 
             onClick={() => { setError(null); setIsScanning(true); }}
             className="text-red-700 bg-red-100 font-bold px-4 py-2 rounded-xl text-sm hover:bg-red-200 transition"
           >
             Try Again
           </button>
        </div>
      )}

      {isScanning && !error && (
        <div className="w-full max-w-sm flex flex-col items-center">
           <div className="w-full aspect-square rounded-3xl overflow-hidden bg-black shadow-2xl relative mb-6 border-4 border-indigo-600 border-opacity-30">
             <Scanner 
               onScan={handleScan} 
               onError={(error) => handleError(error)} 
               formats={['qr_code']}
               styles={{ container: { width: '100%', height: '100%' } }}
             />
             <div className="absolute inset-0 border-2 border-dashed border-white/50 m-8 rounded-xl pointer-events-none"></div>
             <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                <span className="bg-black/60 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">Align QR code within frame</span>
             </div>
           </div>
           <button 
              onClick={() => setIsScanning(false)}
              className="text-gray-500 font-bold hover:text-gray-900 transition underline underline-offset-4"
           >
             Cancel Scanning
           </button>
        </div>
      )}
    </main>
  );
};

export default CheckIn;
