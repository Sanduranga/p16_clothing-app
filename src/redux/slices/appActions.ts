import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  drawer: false,
  signIn: false,
};

const appControllerSlice = createSlice({
  name: "appController",
  initialState,
  reducers: {
    openDrawer: (state) => {
      state.drawer = !state.drawer;
    },
    signInForm: (state, action) => {
      state.signIn = action.payload;
    },
  },
});

export const { openDrawer, signInForm } = appControllerSlice.actions;
export default appControllerSlice.reducer;
