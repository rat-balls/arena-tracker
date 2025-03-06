import { ChampionMastery, RiotAccount, RiotService } from "@/src/api/Riot";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";

export default function Page() {
  const [gameName, setGameName] = useState("");
  const [tagLine, setTagLine] = useState("");

  const [account, setAccount] = useState<RiotAccount | undefined>();

  const [championsMasteries, setChampionsMasteries] = useState<
    ChampionMastery[]
  >([]);

  // const registeredPlayerInfos = useAppSelector(selectRegisteredPlayerInfos);
  // const dispatch = useAppDispatch();

  useEffect(() => {
    if (account === undefined) return;
    RiotService.FetchChampionsMastery(account.puuid)
      .then(console.log)
      .catch(console.error);
  }, [account]);

  useEffect(() => {
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
          console.log("fetched new, adding to cache");
        })
        .catch(() => setAccount(undefined));
      // }
    }
  }, [gameName, tagLine, account]);

  return (
    <View>
      <Text>Search for acccount</Text>
      <View>
        <Text>Game name</Text>
        <TextInput
          placeholder="e.g: supernoob69"
          onChangeText={setGameName}
        ></TextInput>
      </View>
      <View>
        <Text>Tag line</Text>
        <TextInput placeholder="6969" onChangeText={setTagLine}></TextInput>
      </View>
      <View>
        {account === undefined ? null : (
          <>
            <Text>Found user:</Text>
            <View
              style={{
                backgroundColor: "#005A82",
                margin: 10,
                borderRadius: 10,
              }}
            >
              <View style={styles.profileHeader}>
                <Image
                  source={require("../../assets/images/default_account_icon.png")}
                  style={styles.icon}
                />
                <Text style={styles.username}>
                  {account.gameName}#{account.tagLine}
                </Text>
              </View>
              <Text>PUUID: {account.puuid}</Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
