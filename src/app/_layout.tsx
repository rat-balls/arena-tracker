import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { RelativePathString, Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../state/store";

export default function RootLayout() {
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
    if (initializing) return;
    const inAuthGroup = (segments[0] as string) === "(auth)";

    if (user && !inAuthGroup) {
      const authHome = "/(auth)/home" as RelativePathString;
      router.replace(authHome);
    } else if (!user && inAuthGroup) {
      router.replace("/");
    }
  }, [user, initializing]);

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
