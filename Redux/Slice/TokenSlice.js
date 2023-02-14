import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
};

export const tokenSlice = createSlice({
  name: "Authentication",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    resetToken: (state, action) => {
      state.token = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToken, resetToken } = tokenSlice.actions;

export default tokenSlice.reducer;
