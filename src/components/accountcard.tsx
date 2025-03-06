import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useMemo } from "react";
import {
  followProfile,
  selectFollowedProfiles,
  unfollowProfile,
} from "@/src/state/slices/profileSlices";
import { useAppDispatch, useAppSelector } from "@/src/state/hooks";
import { RiotAccount } from "@/src/api/Riot";
import { useFonts } from "expo-font";
let customFonts = {
  League: require("../assets/fonts/League.otf"),
};

export default function AccountCard({ account }: RiotAccount | any) {
  const followProfiles = useAppSelector(selectFollowedProfiles);
  const dispatch = useAppDispatch();
  useFonts(customFonts);

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

  return (
    <View style={styles.cardContainer}>
      <View style={styles.profileHeader}>
        <Image
          source={require("../assets/images/default_account_icon.png")}
          style={styles.icon}
        />
        <Text style={styles.username}>
          {account.gameName}#{account.tagLine}
        </Text>
        <TouchableOpacity onPress={toogleFavorite}>
          <Image
            source={
              isFavorite
                ? require("../assets/images/favorite.png")
                : require("../assets/images/not_favorite.png")
            }
            style={styles.favoriteIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#0A323C",
    margin: 10,
    borderRadius: 10,
    width: "100%",
  },
  icon: {
    maxWidth: 50,
    height: 50,
    borderRadius: 10,
    flex: 1,
  },
  username: {
    fontSize: 18,
    color: "#C89B3C",
    textShadowColor: "#F0E6D2",
    textShadowOffset: { width: -1, height: 1 },

    flex: 1,
    textAlign: "center",
    fontFamily: "League",
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
