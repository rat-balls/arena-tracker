import AsyncStorage from "@react-native-async-storage/async-storage";
import { FirebaseError, FirebaseOptions, initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getReactNativePersistence,
  initializeAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  FIREBASE_API_KEY,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
} from "../config/env";

// Initialize Firebase
const firebaseConfig: FirebaseOptions = {
  apiKey: FIREBASE_API_KEY,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
};

const app = initializeApp(firebaseConfig);

/**
 * Exported firebase auth object to centralise login, register and logout
 */
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage), // Required for keeping authentication state after the user closes the app
});

/**
 * Registrate a user with email and password
 * @param email
 * @param password
 * @returns A boolean promise
 */
export function RegisterUser(
  email: string,
  password: string,
): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        resolve(true);
      })
      .catch(({ message }: FirebaseError) => {
        reject("Error creating account: " + message);
      });
  });
}

/**
 * Login a user with email and password
 * @param email
 * @param password
 * @returns A boolean promise
 */
export function LoginUser(email: string, password: string): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        resolve(true);
      })
      .catch(({ message }: FirebaseError) => {
        reject("Error logging in account: " + message);
      });
  });
}
