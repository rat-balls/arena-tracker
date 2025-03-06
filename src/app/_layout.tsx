import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  RelativePathString,
  Stack,
  useRootNavigationState,
  useRouter,
  useSegments,
} from "expo-router";import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { auth } from "../firebase/firebase";
import { persistor, store } from "../state/store";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Spiegel Regular": require("../assets/fonts/SpiegelSans Regular.otf"),
    "Spiegel SemiBold": require("../assets/fonts/SpiegelSans SemiBold.otf"),
    "Spiegel Bold": require("../assets/fonts/SpiegelSans Bold.otf"),
    "Beaufort Bold": require("../assets/fonts/Beaufort Bold.ttf"),
    "Beaufort BoldItalic": require("../assets/fonts/Beaufort BoldItalic.ttf"),
    "Beaufort MediumItalic": require("../assets/fonts/Beaufort MediumItalic.ttf"),
    "Beaufort Regular": require("../assets/fonts/Beaufort Regular.ttf"),
  });
  const [initializing, setInitializing] = useState(true);
  const [isLogged, setLogged] = useState<boolean>();
  const router = useRouter();
  const segments = useSegments();

  const rootNavigationState = useRootNavigationState();
  // Used to wait for the router to initialize
  const navigatorReady = rootNavigationState?.key != null;

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setLogged(user != null);
      setInitializing(false);
    });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  useEffect(() => {
    if (initializing || !navigatorReady) return;
    const inAuthGroup = (segments[0] as string) === "(auth)";

    if (isLogged && !inAuthGroup) {
      const authHome = "/(auth)/home" as RelativePathString;
      router.replace(authHome);
    } else if (!isLogged && inAuthGroup) {
      router.replace("/");
    }
  }, [navigatorReady, isLogged, initializing, segments, router]);

  if (!loaded && !error) {
    return null;
  }

  if (initializing)
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </PersistGate>
    </Provider>
  );
}
