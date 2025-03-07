import { Button, View } from "react-native";
import { auth } from "../../firebase/firebase";
export default function Page() {
  const signOut = () => {
    auth.signOut();
  };

  return (
    <View>
      <Button title={"Sign out"} onPress={signOut} />
    </View>
  );
}
