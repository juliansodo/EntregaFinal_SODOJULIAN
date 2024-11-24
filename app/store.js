import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./features/categoriesSlice";
import productsSlice from "./features/productsSlice";
import cartSlice from "./features/cartSlice";
import {userLocationApi} from "../services/userLocationService"
import {authApi} from "../services/authService"
import userSlice from "./features/userSlice";
import { purchaseApi } from "../services/purchaseService";
import { profileApi } from "../services/profileService";
export const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    products: productsSlice,
    cart: cartSlice,
    user: userSlice,
    [authApi.reducerPath]: authApi.reducer,
    [userLocationApi.reducerPath]: userLocationApi.reducer,
    [purchaseApi.reducerPath]: purchaseApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(authApi.middleware, userLocationApi.middleware, purchaseApi.middleware, profileApi.middleware);
  }
});