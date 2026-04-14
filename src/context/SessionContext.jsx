/**
 * @file SessionContext.jsx
 * @description Provides session state (currently just the user's seat) to the rest of the application.
 * Persists the seat selection to localStorage.
 */

import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../services/firebase';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [seat, setSeatState] = useState(() => {
    // Check localStorage on initial load
    return localStorage.getItem('arena_seat') || null;
  });
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  /**
   * Updates the seat in both React state and localStorage.
   * @param {string} newSeat - The new seat identifier.
   */
  const setSeat = async (newSeat) => {
    setSeatState(newSeat);
    if (newSeat) {
      localStorage.setItem('arena_seat', newSeat);
      if (!user) {
        try {
          await signInAnonymously(auth);
        } catch (error) {
          console.error("Failed to sign in securely:", error);
        }
      }
    } else {
      localStorage.removeItem('arena_seat');
    }
  };

  /**
   * Clears the current session seat.
   */
  const clearSeat = () => {
    setSeatState(null);
    localStorage.removeItem('arena_seat');
  };

  return (
    <SessionContext.Provider value={{ seat, user, setSeat, clearSeat, authLoading }}>
      {children}
    </SessionContext.Provider>
  );
};
