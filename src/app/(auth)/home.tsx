import { Button, View } from "react-native";
import { auth } from "../../firebase/firebase";
export default function Page() {
  return (
    <View>
      <Button title={"Sign out"} onPress={() => auth.signOut()} />
    </View>
  );
}
