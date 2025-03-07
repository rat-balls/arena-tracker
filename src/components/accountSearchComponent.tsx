import { useFonts } from "expo-font";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { RiotAccount, RiotService } from "../api/Riot";
import AccountCard from "./accountCard";
import { useAppDispatch } from "../state/hooks";
import { useRouter } from "expo-router";
import { setProfile } from "../state/slices/selectionSlices";
let customFonts = {
  League: require("../assets/fonts/League.otf"),
};

export default function SearchAccountComponent() {
  const [gameName, setGameName] = useState("");
  const [tagLine, setTagLine] = useState("");

  const [account, setAccount] = useState<RiotAccount | undefined>();
  useFonts(customFonts);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const fetchAccount = () => {
    RiotService.FetchAccountInfo(gameName, tagLine)
      .then(setAccount)
      .catch(() => {
        Alert.alert("Account not found!");
        setAccount(undefined);
      });
  };
  return (
    <View style={{ height: account === undefined ? 120 : 200 }}>
      <Text style={styles.title}>Search for account</Text>
      <View style={styles.inputRow}>
        <View style={styles.inputContainer}>
          <Text style={styles.libelle}>Game name</Text>
          <TextInput
            style={styles.input}
            placeholder="supernoob69"
            placeholderTextColor="#A09B8C"
            onChangeText={setGameName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.libelle}>Tag</Text>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                color: "#A09B8C",
                position: "absolute",
                marginLeft: -11,
              }}
            >
              #
            </Text>
            <TextInput
              style={styles.input}
              placeholder="EUW"
              placeholderTextColor="#A09B8C"
              onChangeText={setTagLine}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.btn} onPress={fetchAccount}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
      {account === undefined ? null : (
        <TouchableHighlight
          style={styles.accountContainer}
          onPress={() => {
            dispatch(setProfile(account));
            router.replace("/(auth)/accountDetails");
          }}
        >
          <AccountCard account={account}></AccountCard>
        </TouchableHighlight>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  accountContainer: {
    height: 80,
    width: "100%",
  },
  cardContainer: {
    width: "100%",
  },
  icon: {
    maxWidth: 50,
    height: 50,
    borderRadius: 10,
    flex: 1,
  },
  username: {
    fontSize: 20,
    color: "#C89B3C",
    textShadowColor: "#F0E6D2",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 20,
    flex: 1,
    textAlign: "center",
  },
  profileHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
  },
  favoriteIcon: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 20,
    fontFamily: "League",
    color: "white",
    marginVertical: 15,
    marginTop: 20,
    marginHorizontal: "auto",
    width: "100%",
    textAlign: "center",
  },
  libelle: {
    fontFamily: "League",
    color: "#C89B3C",
    width: "100%",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  inputContainer: {
    marginHorizontal: 10,
    alignItems: "center",
  },
  input: {
    color: "#C89B3C",
    borderBottomWidth: 1,
    borderBottomColor: "#C89B3C",
    textAlign: "center",
  },
  buttonText: {
    color: "#CDFAFA",
  },
  btn: {
    backgroundColor: "#0A323C",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#0397AB",
  },
});
