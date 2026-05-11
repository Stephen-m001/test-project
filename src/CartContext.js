import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // initialize cart from localStorage so state survives refresh/navigation
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem('cart')
      return raw ? JSON.parse(raw) : []
    } catch (err) {
      return []
    }
  });

  // ADD TO CART - uses product_id field from backend product objects
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find(
        item => item.product_id === product.product_id
      );

      if (exists) {
        return prev.map(item =>
          item.product_id === product.product_id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  // REMOVE ITEM
  const removeFromCart = (product_id) => {
    setCart(prev => prev.filter(item => item.product_id !== product_id));
  };

  // CLEAR CART
  const clearCart = () => setCart([]);

  // persist cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart))
    } catch (err) {
      // ignore storage errors
    }
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};