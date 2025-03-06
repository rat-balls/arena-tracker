/**
 * Helper function for loading env, throws error if there is no env found
 * @param name name of the env
 * @param s the actual string returned by process.env.NAME
 * @returns a string, or throws an error
 */
const checkEnvKey = (name: string, s: string | undefined): string => {
  if (s !== undefined && s.length > 0) {
    return s;
  } else {
    throw new Error(`MISSING "${name}" IN .env`);
  }
};

export const RIOT_API_KEY = checkEnvKey(
  "riot api key",
  process.env.EXPO_PUBLIC_RIOT_API_KEY,
);
export const RIOT_CDN_VERSION = checkEnvKey(
  "riot cdn version",
  process.env.EXPO_PUBLIC_RIOT_CDN_VERSION,
);
export const FIREBASE_API_KEY = checkEnvKey(
  "firebase api key",
  process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
);
export const FIREBASE_PROJECT_ID = checkEnvKey(
  "firebase project id",
  process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
);
export const FIREBASE_STORAGE_BUCKET = checkEnvKey(
  "firebase storage bucket",
  process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
);
