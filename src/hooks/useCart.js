/**
 * @file useCart.js
 * @description Custom hook to access the cart state.
 */

import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

/**
 * Returns the cart context containing items and cart functions.
 * @throws {Error} If called outside of a CartProvider.
 */
export const useCart = () => {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
};
