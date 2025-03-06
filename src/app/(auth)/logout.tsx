import { View, ActivityIndicator, Alert } from "react-native";
import { auth } from "../../firebase/firebase";
import { useEffect } from "react";

export default function Logout() {
  useEffect(() => {
    auth.signOut().then(() => {
      Alert.alert("Logout successfull");
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator size="large" color="blue" />
    </View>
  );
}
