import AccountCard from "@/src/components/accountcard";
import { useAppDispatch, useAppSelector } from "@/src/state/hooks";
import { selectFollowedProfiles } from "@/src/state/slices/profileSlices";
import { setProfile } from "@/src/state/slices/selectionSlices";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";

export default function Page() {
  const followProfiles = useAppSelector(selectFollowedProfiles);

  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <View>
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
