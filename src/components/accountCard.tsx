import { useFonts } from "expo-font";
import React, { useMemo } from "react";
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
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission denied to access the gallery.");
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

  return (
    <View style={styles.cardBorder}>
      <View style={styles.cardContainer}>
        <View style={styles.profileHeader}>
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={
                followPicture[account.puuid] !== undefined
                  ? { uri: followPicture[account.puuid] }
                  : require("../assets/images/default_account_icon.png")
              }
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={styles.username}>
            {account.gameName}#{account.tagLine}
          </Text>
          <View style={styles.iconContainer}>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardBorder: {
    flex: 1,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#010A13",
    backgroundColor: "#1E282D",
    marginLeft: 10,
    width: "95%",
  },
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 1.5,
    backgroundColor: "#010A13",
  },
  icon: {
    width: 50,
    height: 50,
    flex: 1,
    marginLeft: 10,
    marginVertical: 10,
  },
  username: {
    fontSize: 16,
    color: "#C89B3C",
    textShadowColor: "#F0E6D2",
    textShadowOffset: { width: -1, height: 1 },
    flex: 5,
    textAlign: "center",
    fontFamily: "League",
  },
  profileHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  favoriteIcon: {
    width: 30,
    height: 30,
  },
  iconContainer: {
    flex: 1,
    backgroundColor: "#1E282D",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
});
