import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { persistConfig } from "./config";
import { profileSlice } from "./slices/profileSlices";

// This combines all reducers
export const rootReducer = combineReducers({
  [profileSlice.name]: profileSlice.reducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
