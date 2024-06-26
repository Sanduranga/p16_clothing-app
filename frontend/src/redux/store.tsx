import { configureStore } from "@reduxjs/toolkit";
import appActions from "../slices/appActions";
import dataController from "../slices/dataController";
import { appApi } from "../api";

export const store = configureStore({
  reducer: {
    [appApi.reducerPath]: appApi.reducer,
    appController: appActions,
    dataController: dataController,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
