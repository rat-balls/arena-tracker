import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Profile state interface
interface ProfileStates {
  followed: string[];
}

// Initial value
const initialState: ProfileStates = {
  followed: [],
};

// Profile slice
export const profileSlice = createSlice({
  name: "profiles",
  initialState,
  reducers: {
    followProfile: (state, action: PayloadAction<string>) => {
      if (state.followed.find((v) => v === action.payload) !== undefined)
        return;
      state.followed.push(action.payload);
    },
    unfollowProfile: (state, action: PayloadAction<string>) => {
      const index = state.followed.findIndex((v) => v === action.payload);
      if (index === -1) return;
      console.log("done");
      state.followed.splice(index, 1);
    },
  },
});

// Export store slice actions
export const { followProfile, unfollowProfile } = profileSlice.actions;

// Helper function for selecting followed profiles
export const selectFollowedProfiles = (state: RootState) =>
  state.profiles.followed;

export default profileSlice.reducer;
