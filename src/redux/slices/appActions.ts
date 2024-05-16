import { createSlice } from "@reduxjs/toolkit";
import { appControllerSliceTypes } from "../../types/types";

const initialState: appControllerSliceTypes = {
  drawer: false,
  signInForm: false,
  loggedUser: {
    name: "",
    email: "",
    loggedIn: false,
  },
};

const appControllerSlice = createSlice({
  name: "appController",
  initialState,
  reducers: {
    openDrawer: (state) => {
      state.drawer = !state.drawer;
    },
    signInForm: (state, action) => {
      state.signInForm = action.payload;
    },
    setUserName: (state, action) => {
      state.loggedUser.name = action.payload;
    },
    loggedIn: (state, action) => {
      state.loggedUser.loggedIn = action.payload;
    },
  },
});

export const { openDrawer, signInForm, setUserName, loggedIn } =
  appControllerSlice.actions;
export default appControllerSlice.reducer;
