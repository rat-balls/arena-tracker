import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const [loaded, error] = useFonts({
    // eslint-disable-next-line prettier/prettier
    "Spiegel Regular": require("../assets/fonts/SpiegelSans Regular.otf"),
    "Spiegel SemiBold": require("../assets/fonts/SpiegelSans SemiBold.otf"),
    "Spiegel Bold": require("../assets/fonts/SpiegelSans Bold.otf"),
    "Beaufort Bold": require("../assets/fonts/Beaufort Bold.ttf"),
    "Beaufort BoldItalic": require("../assets/fonts/Beaufort BoldItalic.ttf"),
    "Beaufort MediumItalic": require("../assets/fonts/Beaufort MediumItalic.ttf"),
    "Beaufort Regular": require("../assets/fonts/Beaufort Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue", headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "List",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="list" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
