import React from "react";

export default function useStorage() {
  const storage = {
    entryTypes: {
      CART: "cart",
    },
    getItem(key) {
      return localStorage.getItem(key);
    },
    setItem(key, value) {
      localStorage.setItem(key, value);
    },
    removeItem(key) {
      localStorage.removeItem(key);
    },
    clear() {
      localStorage.clear();
    },
  };

  return { storage };
}
