import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { ActivityIndicator, View } from "react-native";

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
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
  const router = useRouter();
  const segments = useSegments();

  const onAuthStateChange = (user: FirebaseAuthTypes.User | null) => {
    console.log("onAuthStateChange", user);
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const suscriber = auth().onAuthStateChanged(onAuthStateChange);
    return suscriber;
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  useEffect(() => {
    if (initializing) return;
    const inAuthGroup = segments[0] === "(auth)";

    if (user && !inAuthGroup) {
      router.replace("/(auth)/home");
    } else if (!user && inAuthGroup) {
      router.replace("/");
    }
  }, [user, initializing]);

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
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
    </Stack>
  );
}
