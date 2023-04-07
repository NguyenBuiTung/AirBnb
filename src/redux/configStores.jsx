import { combineReducers, configureStore } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import userReducer from "./user/userReducer";
import productRoom from "./product/productRoom";

const persistConfig = {
  key: "data",
  storage,
};
export const rootReducers = combineReducers({
  userReducer,
  productRoom
});
const persistedReducer = persistReducer(persistConfig, rootReducers);
export const store = configureStore({
  reducer: { persistedReducer },
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});
export const persistor = persistStore(store);
