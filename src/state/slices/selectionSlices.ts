import { ChampionInfo, ChampionMastery, RiotAccount } from "@/src/api/Riot";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Profile state interface
interface SelectionStates {
  currentProfile: RiotAccount | undefined;
  champions: ChampionInfo[];
  championMasteries: ChampionMastery[];
}

// Initial value
const initialState: SelectionStates = {
  currentProfile: undefined,
  champions: [],
  championMasteries: [],
};

// Profile slice
export const selectionSlice = createSlice({
  name: "selection",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<RiotAccount>) => {
      state.currentProfile = action.payload;
    },
    unsetProfile: (state) => {
      state.currentProfile = undefined;
    },
    setChampions: (state, action: PayloadAction<ChampionInfo[]>) => {
      state.champions = action.payload;
    },
    setChampionMasteries: (state, action: PayloadAction<ChampionMastery[]>) => {
      state.championMasteries = action.payload;
    },
  },
});

// Export store slice actions
export const { setProfile, unsetProfile, setChampions, setChampionMasteries } =
  selectionSlice.actions;

// Helper function for selecting followed profiles
export const selectFollowedProfiles = (state: RootState) =>
  state.profiles.followed;

export default selectionSlice.reducer;
