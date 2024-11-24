import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  loadingCategories: true,
};

const categoriesSlice = createSlice({
    name:"categories",
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
            state.loadingCategories = false;
        },
        setLoadingCategories:(state, action) => {
            state.loadingCategories = action.payload;
        }
    },
});

export const { setCategories, setLoadingCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;