import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { ChampionMastery, RiotAccount, RiotService } from "@/src/api/Riot";
import AccountCard from "@/src/components/accountcard";
let customFonts = {
  League: require("../../assets/fonts/League.otf"),
};

export default function Searchaccount() {
  const [gameName, setGameName] = useState("");
  const [tagLine, setTagLine] = useState("");

  const [account, setAccount] = useState<RiotAccount | undefined>();
  const [region, setRegion] = useState("euw1");
  useFonts(customFonts);

  const [championsMasteries, setChampionsMasteries] = useState<
    ChampionMastery[]
  >([]);

  useEffect(() => {
    if (account === undefined) return;
    RiotService.FetchChampionsMastery(account.puuid, region).then((a) => {
      console.log(a[0]);
      setChampionsMasteries(a);
    });
  }, [account]);

  const fetchAccount = () => {
    if (account === undefined) {
      // const key = gameName + tagLine;
      // const cachedAccount = registeredPlayerInfos[key];
      // console.log(cachedAccount);
      // if (cachedAccount !== undefined) {
      //   setAccount(cachedAccount);
      //   console.log("found in cache");
      // } else {
      RiotService.FetchAccountInfo(gameName, tagLine)
        .then((user) => {
          setAccount(user);
          // dispatch(registerPlayerInfo(user));
          // console.log("fetched new, adding to cache");
        })
        .catch((e) => {
          Alert.alert("Account not found!");
          setAccount(undefined);
        });
      // }
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search for acccount</Text>
      <View style={styles.inputRow}>
        <View style={styles.inputContainer}>
          <Text style={styles.libelle}>Game name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g: supernoob69"
            placeholderTextColor="#FFF"
            onChangeText={setGameName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.libelle}>Tag</Text>
          <TextInput
            style={styles.input}
            placeholder="#"
            placeholderTextColor="#FFFF"
            onChangeText={setTagLine}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.libelle}>Region</Text>
          <TextInput
            placeholder="euw1"
            placeholderTextColor="#C89B3C"
            onChangeText={setRegion}
            defaultValue="euw1"
            style={styles.input}
          />
        </View>
        <TouchableOpacity style={styles.btn} onPress={fetchAccount}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
      {account === undefined ? null : (
        <AccountCard account={account}></AccountCard>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#0A1428",
    flex: 1,
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
  },
  libelle: {
    fontFamily: "League",
    color: "#C89B3C",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  inputContainer: {
    marginHorizontal: 5,
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
