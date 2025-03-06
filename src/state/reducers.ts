import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { persistConfig } from "./config";
import { profileSlice } from "./slices/profileSlices";
import { selectionSlice } from "./slices/selectionSlices";

// This combines all reducers
export const rootReducer = combineReducers({
  [profileSlice.name]: profileSlice.reducer,
  [selectionSlice.name]: selectionSlice.reducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
