import { RiotAccount } from "@/src/api/Riot";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Profile state interface
interface ProfileStates {
  followed: RiotAccount[];
  profilePicture: Record<string, string>;
}

// Initial value
const initialState: ProfileStates = {
  followed: [],
  profilePicture: {},
};

interface SetProfilePicture {
  puuid: string;
  imageUrl: string;
}

// Profile slice
export const profileSlice = createSlice({
  name: "profiles",
  initialState,
  reducers: {
    followProfile: (state, action: PayloadAction<RiotAccount>) => {
      if (
        state.followed.find((v) => v.puuid === action.payload.puuid) !==
        undefined
      )
        return;
      state.followed.push(action.payload);
    },
    unfollowProfile: (state, action: PayloadAction<RiotAccount>) => {
      const index = state.followed.findIndex(
        (v) => v.puuid === action.payload.puuid,
      );
      console.log(index);
      if (index === -1) return;

      state.followed = [
        ...state.followed.slice(0, index),
        ...state.followed.slice(index + 1),
      ];
    },
    setProfilePicture: (state, action: PayloadAction<SetProfilePicture>) => {
      state.profilePicture[action.payload.puuid] = action.payload.imageUrl;
    },
  },
});

// Export store slice actions
export const { followProfile, unfollowProfile, setProfilePicture } =
  profileSlice.actions;

// Helper function for selecting followed profiles
export const selectFollowedProfiles = (state: RootState) =>
  state.profiles.followed;
export default profileSlice.reducer;
