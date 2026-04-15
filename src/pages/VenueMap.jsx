import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useSeat } from '../hooks/useSeat';
import ArenaMapSVG from '../components/ArenaMapSVG';
import stallsData from '../data/stalls.json';

const VenueMap = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeStallId = searchParams.get('highlight');
  
  const { seat } = useSeat();

  const activeStallData = stallsData.find(s => s.id === activeStallId);

  return (
    <main className="flex-1 bg-white animate-in fade-in duration-300 flex flex-col h-full overflow-hidden">
      <header className="px-6 py-4 flex items-center justify-between gap-4 bg-white border-b border-gray-100 shadow-sm relative z-20 shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition min-h-[44px] min-w-[44px] flex items-center justify-center transform active:scale-95"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div>
            <h1 className="text-xl font-black text-gray-900 tracking-tight">Venue Map</h1>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{activeStallData ? `Navigating to ${activeStallData.name}` : 'Explore Arena'}</p>
          </div>
        </div>
      </header>
      
      <div className="flex-1 relative bg-slate-50 overflow-hidden isolate" style={{ touchAction: 'none' }}>
        <TransformWrapper
          initialScale={1}
          minScale={0.5}
          maxScale={4}
          centerOnInit={true}
          wheel={{ step: 0.1 }}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              {/* Controls Overlay */}
              <div className="absolute right-4 bottom-8 z-30 flex flex-col gap-2 bg-white/80 backdrop-blur-md p-1.5 rounded-2xl shadow-xl border border-gray-200/50">
                 <button onClick={() => zoomIn()} className="p-3 text-gray-700 hover:bg-gray-100/80 rounded-xl transition-colors active:scale-95">
                    <ZoomIn className="w-6 h-6" />
                 </button>
                 <div className="h-px bg-gray-200 mx-2" />
                 <button onClick={() => zoomOut()} className="p-3 text-gray-700 hover:bg-gray-100/80 rounded-xl transition-colors active:scale-95">
                    <ZoomOut className="w-6 h-6" />
                 </button>
                 <div className="h-px bg-gray-200 mx-2" />
                 <button onClick={() => resetTransform()} className="p-3 text-gray-700 hover:bg-gray-100/80 rounded-xl transition-colors active:scale-95">
                    <Maximize className="w-6 h-6" />
                 </button>
              </div>

              {/* Informational overlay if stall selected */}
              {activeStallData && (
                <div className="absolute top-4 left-4 right-4 z-30 bg-white/95 backdrop-blur-md p-4 rounded-3xl shadow-xl border border-amber-100 flex items-center gap-4 animate-in slide-in-from-top-4">
                  <div className="bg-amber-100 p-3 rounded-2xl shrink-0">
                    <svg className="w-6 h-6 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                       <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                       <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 leading-tight">{activeStallData.name}</h3>
                    <p className="text-sm font-medium text-amber-700">{activeStallData.location}</p>
                  </div>
                </div>
              )}

              {/* Pan/Zoom Canvas */}
              <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full flex items-center justify-center">
                 <div className="w-[800px] h-[600px] max-w-none origin-center">
                    <ArenaMapSVG activeStallId={activeStallId} userSeat={seat} />
                 </div>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </div>
    </main>
  );
};

export default VenueMap;
