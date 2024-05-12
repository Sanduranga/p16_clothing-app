import { configureStore } from "@reduxjs/toolkit";
import { appApi } from "./rtkApi";
import appActions from "./slices/appActions";

export const store = configureStore({
  reducer: {
    [appApi.reducerPath]: appApi.reducer,
    appController: appActions,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
