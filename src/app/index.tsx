import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { LoginUser, RegisterUser } from "../firebase/firebase";

import { useFonts } from "expo-font";
let customFonts = {
  League: require("../assets/fonts/League.otf"),
};

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);

  useFonts(customFonts);

  useEffect(() => {
    if (password.length >= 3) {
      setIsPasswordCorrect(true);
    } else {
      setIsPasswordCorrect(false);
    }
  }, [password]);

  const isConfirmPasswordCorrect = useMemo(() => {
    return password === confirmPassword;
  }, [confirmPassword, password]);

  const register = async () => {
    setLoading(true);
    if (!isPasswordCorrect) {
      Alert.alert("Le mot de de passe doit faire au moins 3 caractères");
      setLoading(false);
    } else if (!isConfirmPasswordCorrect) {
      Alert.alert("Les 2 mots de passes ne sont pas identiques");
      setLoading(false);
    } else {
      try {
        await RegisterUser(email, password);
        alert("Account created !");
      } catch (e) {
        alert("Registration failed: " + e);
      } finally {
        setLoading(false);
      }
    }
  };

  const login = async () => {
    setLoading(true);
    try {
      await LoginUser(email, password);
      alert("You are logged in");
    } catch (e) {
      alert("Login failed: " + e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require("../assets/images/lol.jpg")}
      blurRadius={5}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Arena Tracker</Text>
        </View>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType={"email-address"}
            placeholder={"Email"}
            placeholderTextColor="#FFF"
          />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder={"Password"}
            placeholderTextColor="#FFF"
          />
          {isRegistering ? (
            <>
              <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                placeholder={"Confirm Password"}
                placeholderTextColor="#FFF"
              />
              <Text></Text>
            </>
          ) : (
            <Text></Text>
          )}

          {loading ? (
            <ActivityIndicator size={"small"} style={{ margin: 28 }} />
          ) : (
            <>
              {isRegistering ? (
                <>
                  <Button onPress={register} title="Create Account"></Button>
                  <Text style={{ textAlign: "center", color: "white" }}>
                    or
                  </Text>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => setIsRegistering(false)}
                  >
                    <Text style={{ textAlign: "center", color: "white" }}>
                      Login
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Button onPress={login} title="Login"></Button>
                  <Text style={{ textAlign: "center", color: "white" }}>
                    or
                  </Text>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => setIsRegistering(true)}
                  >
                    <Text style={{ textAlign: "center", color: "white" }}>
                      Create account
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },

  titleContainer: {
    position: "absolute",
    top: 40,
    left: 0,
    right: 0,
    alignItems: "center",
  },

  title: {
    fontSize: 32,
    fontFamily: "League",
    color: "white",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 20,
  },

  input: {
    marginVertical: 4,
    height: 50,
    borderBottomWidth: 1,
    borderColor: "#FFF",
    color: "white",
  },

  formContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 8,
    padding: 16,
    width: "90%",
    gap: 8,
  },

  buttonSecondary: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },

  btn: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 15,
    textAlign: "center",
  },
});
