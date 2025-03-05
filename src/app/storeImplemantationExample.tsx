import React, { useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";

import { useAppDispatch, useAppSelector } from "../state/hooks";
import {
  followProfile,
  selectFollowedProfiles,
  unfollowProfile,
} from "../state/slices/profileSlices";

export default function StoreImplementationExample() {
  const followProfiles = useAppSelector(selectFollowedProfiles);
  const dispatch = useAppDispatch();
  const [profileId, setProfileId] = useState("");

  const onFollow = () => {
    dispatch(followProfile(profileId));
  };

  const renderItem = ({ item }: { item: string }) => (
    <TouchableHighlight onPress={() => dispatch(unfollowProfile(item))}>
      <Text>{item}</Text>
    </TouchableHighlight>
  );

  return (
    <View>
      <View>
        <Text>Followed profiles:</Text>
        <FlatList data={followProfiles} renderItem={renderItem} />
      </View>

      <View>
        <TextInput
          placeholder="Profile id to follow"
          onChangeText={setProfileId}
        />
        <TouchableHighlight onPress={onFollow}>
          <Text>Follow profile</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}
