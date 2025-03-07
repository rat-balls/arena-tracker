import { ChampionInfo } from "@/src/api/Riot";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { profileSlice } from "./profileSlices";

// State interface
interface DataStates {
  champions: ChampionInfo[];
}

// Initial value
const initialState: DataStates = {
  champions: [],
};

// Slice
export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setChampions: (state, action: PayloadAction<ChampionInfo[]>) => {
      state.champions = action.payload;
    },
  },
});

// Export store slice actions
export const { setChampions } = dataSlice.actions;

// Helper function for select
export const selectChampions = (state: RootState) => state.data.champions;
export default profileSlice.reducer;
