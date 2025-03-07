import AccountCard from "@/src/components/accountcard";
import { useAppDispatch, useAppSelector } from "@/src/state/hooks";
import { selectFollowedProfiles } from "@/src/state/slices/profileSlices";
import { setProfile } from "@/src/state/slices/selectionSlices";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Page() {
  const followProfiles = useAppSelector(selectFollowedProfiles);

  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <View style={styles.bgColor}>
      {followProfiles.length === 0 ? (
        <View style={styles.container}>
          <Text style={styles.text}>
            You don't have any account in your favorites
          </Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => router.replace("/(auth)/searchaccount")}
          >
            <Text style={styles.buttonText}>Search account</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={followProfiles}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                dispatch(setProfile(item));
                router.replace("/(auth)/accountDetails");
              }}
            >
              <AccountCard account={item} confirmUnfollow />
            </TouchableOpacity>
          )}
        ></FlatList>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bgColor: {
    backgroundColor: "#0A1428",
    height: "100%",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0A1428",
    height: "100%",
  },
  buttonText: {
    color: "#CDFAFA",
    textAlign: "center",
  },
  btn: {
    backgroundColor: "#0A323C",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#0397AB",
  },
  text: {
    color: "white",
    marginVertical: 40,
  },
});
