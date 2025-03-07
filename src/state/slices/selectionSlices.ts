import { ChampionMastery, RiotAccount } from "@/src/api/Riot";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// State interface
interface SelectionStates {
  currentProfile: RiotAccount | undefined;
  championMasteries: ChampionMastery[];
}

// Initial value
const initialState: SelectionStates = {
  currentProfile: undefined,
  championMasteries: [],
};

// Slice
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
    setChampionMasteries: (state, action: PayloadAction<ChampionMastery[]>) => {
      state.championMasteries = action.payload;
    },
  },
});

// Export store slice actions
export const { setProfile, unsetProfile, setChampionMasteries } =
  selectionSlice.actions;

// Helper function for select
export const selectCurrentProfile = (state: RootState) =>
  state.selection.currentProfile;
export const selectChampionMasteries = (state: RootState) =>
  state.selection.championMasteries;
export default selectionSlice.reducer;
