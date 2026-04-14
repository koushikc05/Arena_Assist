/**
 * @file Layout.jsx
 * @description Mobile-constrained app shell wrapper.
 */
import React from 'react';
import { useSeat } from '../hooks/useSeat';
import { UtensilsCrossed } from 'lucide-react';

const Layout = ({ children }) => {
  const { seat } = useSeat();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <div className="w-full max-w-md mx-auto bg-white min-h-screen flex flex-col shadow-2xl relative">
        {/* Sticky Header */}
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-xl">
              <UtensilsCrossed className="text-white w-5 h-5" />
            </div>
            <h1 className="font-bold text-xl tracking-tight text-gray-900">ArenaAssist</h1>
          </div>
          {seat && (
            <div className="bg-indigo-50 px-3 py-1.5 rounded-full flex items-center shadow-inner">
              <span className="text-xs font-bold text-indigo-700 tracking-wider uppercase drop-shadow-sm">Seat {seat}</span>
            </div>
          )}
        </header>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col relative w-full overflow-x-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
