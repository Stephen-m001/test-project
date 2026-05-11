import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

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

  const removeFromCart = (product_id) => {
  setCart(prev =>
    prev.filter(item => item.product_id !== product_id)
  );
};
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};