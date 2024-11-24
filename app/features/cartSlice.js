import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    total: 0,
  },
  reducers: {
    updateCart: (state, action) => {
      state.cart = action.payload;
      console.info("Nuevo cart: ", state.cart);
    },
    updateTotal: (state, action) => {
      state.total = action.payload;
    },
  }
});

export const { updateCart, updateTotal } = cartSlice.actions;
export default cartSlice.reducer;