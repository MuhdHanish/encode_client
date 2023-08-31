import {  configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./userSlice/userSlice";
import socketReducer from "./socketSlice/socketSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persisteUserReducer = persistReducer(persistConfig, userReducer);
const persisteSocketReducer = persistReducer(persistConfig, socketReducer);

export const store = configureStore({
  reducer: {
    userReducer: persisteUserReducer,
    socketReducer: persisteSocketReducer,
  },
  middleware: [],
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>; 
