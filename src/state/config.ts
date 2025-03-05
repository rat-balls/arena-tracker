import AsyncStorage from "@react-native-async-storage/async-storage";

const ROOT_KEY = "root";

// Persist config
export const persistConfig = {
  key: ROOT_KEY,
  storage: AsyncStorage,
};
