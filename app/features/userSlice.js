import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    image: null
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      console.info("Usuario: ", state.user);
    },
    clearUser: (state, action) => {
      state.user = null;
    },
    setImageUser: (state, action) => {
      state.user.image = action.payload;
    }
  }
});

export const { setUser, clearUser, setImageUser } = userSlice.actions;
export default userSlice.reducer;