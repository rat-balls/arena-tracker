import { ChampionMastery, RiotAccount, RiotService } from "@/src/api/Riot";
import { useAppDispatch, useAppSelector } from "@/src/state/hooks";
import {
  followProfile,
  selectFollowedProfiles,
  unfollowProfile,
} from "@/src/state/slices/profileSlices";
import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Page() {
  const followProfiles = useAppSelector(selectFollowedProfiles);
  const dispatch = useAppDispatch();
  const [gameName, setGameName] = useState("");
  const [tagLine, setTagLine] = useState("");

  const [account, setAccount] = useState<RiotAccount | undefined>();
  const [region, setRegion] = useState("euw1");

  const [championsMasteries, setChampionsMasteries] = useState<
    ChampionMastery[]
  >([]);

  const isFavorite = useMemo<boolean>(() => {
    if (account === undefined) return false;
    return (
      followProfiles.find(({ puuid }) => puuid === account.puuid) != undefined
    );
  }, [account]);

  const toogleFavorite = () => {
    if (account === undefined) return;
    if (isFavorite) {
      dispatch(unfollowProfile(account));
    } else {
      dispatch(followProfile(account));
    }
  };

  useEffect(() => {
    if (account === undefined) return;
    RiotService.FetchChampionsMastery(account.puuid, region).then((a) => {
      console.log(a[0]);
      setChampionsMasteries(a);
    });
  }, [account]);

  const fetchAccount = () => {
    RiotService.FetchAccountInfo(gameName, tagLine)
      .then((user) => {
        setAccount(user);
      })
      .catch((e) => {
        Alert.alert("Account not found!");
        setAccount(undefined);
      });
  };

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
        <Text>Region</Text>
        <TextInput
          placeholder="euw1"
          onChangeText={setRegion}
          defaultValue="euw1"
        />
      </View>
      <Button title={"Search player"} onPress={fetchAccount} />
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
                <TouchableOpacity onPress={toogleFavorite}>
                  <Image
                    source={
                      isFavorite
                        ? require("../../assets/images/favorite.png")
                        : require("../../assets/images/not_favorite.png")
                    }
                    style={styles.favoriteIcon}
                  />
                </TouchableOpacity>
              </View>
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
  favoriteIcon: {
    width: 30,
    height: 30,
  },
});
