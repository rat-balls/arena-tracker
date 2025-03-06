import { RelativePathString, useRouter } from "expo-router";
import { Button, View } from "react-native";
import { auth } from "../../firebase/firebase";
export default function Page() {
  const router = useRouter();

  const account = "account" as RelativePathString;

  const signOut = () => {
    auth.signOut();
  };

  const redirectAccount = () => {
    router.replace(account);
  };

  return (
    <View>
      <Button title={"Sign out"} onPress={signOut} />
      <Button title={"Search account"} onPress={redirectAccount} />
    </View>
  );
}
