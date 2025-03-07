import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const Layout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveBackgroundColor: "#463714",
          tabBarInactiveBackgroundColor: "#0f171f",
          tabBarInactiveTintColor: "#ccbf91",
          tabBarActiveTintColor: "#ccbf91",
          headerShown: false,
          tabBarStyle: {
            borderTopWidth: 0,
            borderColor: "#463714",
            paddingBottom: 0,
            flex: 0,
            justifyContent: "center",
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="home" color={color} />
            ),
            tabBarLabelStyle: { marginTop: 1 },
            tabBarIconStyle: { marginTop: 2 },
          }}
        />
        <Tabs.Screen
          name="readme"
          options={{
            title: "About",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="file" color={color} />
            ),
            tabBarLabelStyle: { marginTop: 1 },
            tabBarIconStyle: { marginTop: 2 },
          }}
        />
        <Tabs.Screen
          name="logout"
          options={{
            title: "Logout",
            tabBarIcon: () => (
              <FontAwesome size={28} name="sign-out" color={"#0AC8B9"} />
            ),
            tabBarLabelStyle: { color: "#0AC8B9", marginTop: 1 },
            tabBarIconStyle: { marginTop: 2 },
          }}
        />
        <Tabs.Screen
          name="accountDetails"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </>
  );
};

export default Layout;
