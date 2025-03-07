import { useEffect, useMemo, useState } from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";

export default function Form() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [passwordErr, setPasswordErr] = useState("");

  const onBtnPress = () => {
    Alert.alert("Hello " + username + ", your password is : " + password + ".");
  };

  useEffect(() => {
    if (password.length < 3 && password.length > 0) {
      setPasswordErr("Password needs to be at least 3 characters !");
    } else {
      setPasswordErr("");
    }
  }, [password, confirm]);

  const confirmErr = useMemo(() => {
    if (confirm !== password && confirm.length > 0) {
      return "The passwords do not match !";
    } else {
      return "";
    }
  }, [confirm, password]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView style={styles.scroll}>
          <View style={styles.topContainer}>
            <Text style={styles.text}>Inscription</Text>
            <Image
              source={{
                uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
              }}
              style={styles.img}
            />
          </View>
          <TextInput
            onEndEditing={(event) => setUsername(event.nativeEvent.text)}
            placeholder={"Username"}
            style={[styles.input, styles.normalBorder]}
          />
          <Text
            style={passwordErr !== "" ? styles.errText : { display: "none" }}
          >
            {passwordErr}
          </Text>
          <TextInput
            onEndEditing={(event) => setPassword(event.nativeEvent.text)}
            placeholder={"Password"}
            style={[
              styles.input,
              passwordErr !== "" ? styles.errBorder : styles.normalBorder,
            ]}
            secureTextEntry
          />
          <Text
            style={confirmErr !== "" ? styles.errText : { display: "none" }}
          >
            {confirmErr}
          </Text>
          <TextInput
            onEndEditing={(event) => setConfirm(event.nativeEvent.text)}
            placeholder={"Password confirmation"}
            style={[
              styles.input,
              confirmErr !== "" ? styles.errBorder : styles.normalBorder,
            ]}
            secureTextEntry
          />
          <View style={styles.bottomContainer}>
            <TouchableOpacity style={styles.btn} onPress={onBtnPress}>
              <Text style={styles.btnText}>Register</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  topContainer: {
    alignItems: "center",
    marginVertical: 30,
  },
  bottomContainer: {
    alignItems: "center",
    marginVertical: 30,
  },
  img: { width: 100, height: 100, borderRadius: 50 },
  input: {
    backgroundColor: "#c3c3c3",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  normalBorder: {
    borderColor: "black",
  },
  errBorder: {
    borderColor: "red",
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },
  errText: {
    fontSize: 10,
    color: "red",
    marginHorizontal: 10,
    marginBottom: -5,
  },
  btn: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 15,
  },
  btnText: {
    color: "grey",
  },
});
