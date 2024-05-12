import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  drawer: false,
};

const appControllerSlice = createSlice({
  name: "appController",
  initialState,
  reducers: {
    openDrawer: (state) => {
      state.drawer = !state.drawer;
    },
  },
});

export const { openDrawer } = appControllerSlice.actions;
export default appControllerSlice.reducer;
