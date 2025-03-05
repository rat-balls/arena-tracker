import { View, Button } from "react-native";
import auth from "@react-native-firebase/auth";
export default function Page() {
  return (
    <View>
      <Button title={"Sign out"} onPress={() => auth().signOut()} />
    </View>
  );
}
