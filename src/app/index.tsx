import { useState } from "react";
import {
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { FirebaseError } from "@firebase/util";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    setLoading(true);
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      alert("Account created !");
    } catch (e: any) {
      const err = e as FirebaseError;
      alert("Registration failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async () => {
    setLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);
      alert("You are logged in");
    } catch (e: any) {
      const err = e as FirebaseError;
      alert("Login failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType={"email-address"}
          placeholder={"email"}
        />
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder={"Password"}
        />
        {loading ? (
          <ActivityIndicator size={"small"} style={{ margin: 28 }} />
        ) : (
          <>
            <Button onPress={signUp} title="Create Account"></Button>
            <Button onPress={signIn} title="Login"></Button>
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: "center",
  },
  input: {
    marginVertical: 4,
    height: 50,
  },
});
