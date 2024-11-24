import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  data: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProductsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setProductsData: (state, action) => {
      state.data = action.payload;
    },
    setProductsError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setProductsLoading, setProductsData, setProductsError } =
  productsSlice.actions;
  export default productsSlice.reducer;