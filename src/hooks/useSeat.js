/**
 * @file useSeat.js
 * @description Custom hook to access the current session's seat.
 */

import { useContext } from 'react';
import { SessionContext } from '../context/SessionContext';

/**
 * Returns the session context containing seat, setSeat, and clearSeat.
 * @throws {Error} If called outside of a SessionProvider.
 * @returns {{seat: string | null, setSeat: function, clearSeat: function}}
 */
export const useSeat = () => {
  const context = useContext(SessionContext);
  
  if (context === undefined) {
    throw new Error('useSeat must be used within a SessionProvider');
  }
  
  return context;
};
