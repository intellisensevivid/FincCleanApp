import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { apiSlice } from "./apiSlice";
import storeSlice from "../features/Store/storeSlice";
import authSlice from "../features/Auth/authSlice";
import modalSlice from "./modalSlice";
import orderSlice from "../features/Store/Order/orderSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [apiSlice.reducerPath, modalSlice],
};

const rootReducers = combineReducers({
  auth: authSlice,
  store: storeSlice,
  modal: modalSlice,
  order: orderSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
