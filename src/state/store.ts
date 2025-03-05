import { persistStore } from "redux-persist";

import { legacy_createStore as createStore } from "@reduxjs/toolkit";
import { persistedReducer } from "./reducers";

// Forced to use deprecated create store
export const store = createStore(persistedReducer);

export const persistor = persistStore(store);

// Types for store states and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
