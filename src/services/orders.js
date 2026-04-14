/**
 * @file orders.js
 * @description Firestore service for creating and tracking orders.
 */

import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from './firebase';

/**
 * Creates a new order in Firestore.
 * @param {string} seatNumber - The user's seat number.
 * @param {Array} cartItems - The items in the cart.
 * @param {number} total - The total price of the order.
 * @returns {Promise<string>} The new document ID.
 */
export const createOrder = async (seatNumber, cartItems, total) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("Must be authenticated to place an order");

    const ordersCollection = collection(db, 'orders');
    const docRef = await addDoc(ordersCollection, {
      seatNumber,
      userId: user.uid,
      items: cartItems,
      total,
      status: 'placed',
      createdAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error('Failed to create order');
  }
};
