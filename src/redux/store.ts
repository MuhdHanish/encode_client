import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./userSlice/userSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persisteUserReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
 reducer: {
  userReducer: persisteUserReducer,
 },
 middleware: []
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;