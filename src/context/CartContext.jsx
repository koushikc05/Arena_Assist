/**
 * @file CartContext.jsx
 * @description Provides cart state management including adding, removing, and clearing items.
 */

import React, { createContext, useState, useMemo } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  /**
   * Adds an item to the cart. Increments quantity if it already exists.
   * @param {Object} item - The menu item to add.
   */
  const addItem = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  /**
   * Removes an item from the cart entirely.
   * @param {string} itemId - The ID of the item to remove.
   */
  const removeItem = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((i) => i.id !== itemId));
  };

  /**
   * Clears the cart.
   */
  const clearCart = () => {
    setCartItems([]);
  };

  /**
   * Derived total cost of all items in the cart.
   */
  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, addItem, removeItem, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};
