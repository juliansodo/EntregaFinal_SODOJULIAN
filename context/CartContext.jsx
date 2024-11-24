import { createContext, useState } from "react";
import {useCart} from "../hooks";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const {cart, removeProduct, addProduct, totalUniqueProducts, getQtyOfProduct, finalAmount, clearCart} = useCart() 
  return (
    <CartContext.Provider value={{ cart, removeProduct, addProduct, totalUniqueProducts, getQtyOfProduct, finalAmount, clearCart}}>{children}</CartContext.Provider>
  );
}
