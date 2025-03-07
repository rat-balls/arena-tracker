import AccountCard from "@/src/components/accountcard";
import SearchAccountComponent from "@/src/components/accountSearchComponent";
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
      <SearchAccountComponent />
      <View
        style={{
          backgroundColor: "#1E282D",
          width: "100%",
          height: 2,
          marginTop: 10,
        }}
      />
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
    </View>
  );
}

const styles = StyleSheet.create({
  bgColor: {
    backgroundColor: "#0A1428",
    height: "100%",
  },
  listContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  container: {
    flex: 1,
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
