import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface appControllerSliceTypes {
  drawer: boolean;
  signInForm: boolean;
  loggedUser: {
    name: string;
    email: string;
    loggedIn: boolean;
  };
}

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
    signInForm: (state, action: PayloadAction<boolean>) => {
      state.signInForm = action.payload;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.loggedUser.name = action.payload;
    },
    loggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedUser.loggedIn = action.payload;
    },
  },
});

export const { openDrawer, signInForm, setUserName, loggedIn } =
  appControllerSlice.actions;
export default appControllerSlice.reducer;
