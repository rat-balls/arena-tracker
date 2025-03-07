import { useFonts } from "expo-font";
import React, { useEffect, useMemo } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RiotAccount } from "../api/Riot";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import {
  followProfile,
  selectFollowedPicture,
  selectFollowedProfiles,
  setProfilePicture,
  unfollowProfile,
} from "../state/slices/profileSlices";

import * as ImagePicker from "expo-image-picker";
let customFonts = {
  League: require("../assets/fonts/League.otf"),
};

interface IAccountCardProps {
  profilePicture?: string;
  account: RiotAccount;
  confirmUnfollow?: boolean;
}

export default function AccountCard({
  account,
  profilePicture,
  confirmUnfollow,
}: IAccountCardProps | any) {
  const followProfiles = useAppSelector(selectFollowedProfiles);
  const followPicture = useAppSelector(selectFollowedPicture);
  const dispatch = useAppDispatch();
  useFonts(customFonts);

  const isFavorite = useMemo<boolean>(() => {
    if (account === undefined) return false;
    return (
      followProfiles.find(({ puuid }) => puuid === account.puuid) != undefined
    );
  }, [account, followProfiles]);

  const toogleFavorite = () => {
    if (isFavorite && confirmUnfollow === true) {
      return Alert.alert(
        "Do you really want to unfavorite this profile ?",
        "You will have to search for profile if you need to check the stats",
        [
          {
            text: "Yep",
            onPress: () => {
              dispatch(unfollowProfile(account));
            },
          },
          {
            text: "Nope",
          },
        ],
      );
    }
    if (isFavorite) {
      dispatch(unfollowProfile(account));
    } else {
      dispatch(followProfile(account));
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission refusée pour accéder à la galerie.");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log("result", result);

    if (!result.canceled) {
      console.log(account.puuid);
      dispatch(
        setProfilePicture({
          puuid: account.puuid,
          imageUrl: result.assets[0].uri,
        }),
      );
      console.log(followPicture);
    }
  };

  useEffect(() => {
    console.log("followPicture", followPicture[account.puuid]);
  });

  return (
    <View style={styles.cardContainer}>
      <View style={styles.profileHeader}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={
              followPicture[account.puuid]
                ? { uri: followPicture[account.puuid] }
                : require("../assets/images/default_account_icon.png")
            }
            style={styles.icon}
          />
        </TouchableOpacity>
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
    borderRadius: 10,
    marginBottom: 5,
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
