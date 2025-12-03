import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataFiltersState } from "./types";
import generateTrackNumbers from "../../auxiliary/generateTrackNumbers";
import { logOut } from "../auth/operations";
import generateImmConsistentValues from "../../auxiliary/generateImmConsistentValues";

const initialState: DataFiltersState = {
  trackNum: "All",
  selectedTrackNums: generateTrackNumbers(29),
  trackNumbers: generateTrackNumbers(29),
  immConsistent: "All",
  immConsistentValues: generateImmConsistentValues(),
  immConsistentMaxValue: "0.0",
  startTime: "",
  endTime: "",
  is3D: false,
};

const dataFiltersSlice = createSlice({
  name: "datafilters",
  initialState,
  reducers: {
    saveTrackNum: (state, action: PayloadAction<string>) => {
      state.trackNum = action.payload;
    },

    saveSelectedTrackNums: (
      state,
      action: PayloadAction<(string | number)[]>
    ) => {
      state.selectedTrackNums = action.payload;
    },

    saveImmConsistent: (state, action: PayloadAction<string>) => {
      state.immConsistent = action.payload;
    },

    saveImmConsistentMaxValue: (state, action: PayloadAction<string>) => {
      state.immConsistentMaxValue = action.payload;
    },

    updateTrackNumbers: (state, action: PayloadAction<(string | number)[]>) => {
      state.selectedTrackNums = [...action.payload];
      state.trackNumbers = action.payload;
      state.trackNumbers.push("All");
    },

    saveTime: (
      state,
      action: PayloadAction<{ startTime: string; endTime: string }>
    ) => {
      state.startTime = action.payload.startTime;
      state.endTime = action.payload.endTime;
    },

    setIs3D: (state, action: PayloadAction<boolean>) => {
      state.is3D = action.payload;
    },

    resetDataFilters: (state) => {
      state.trackNum = "All";
      state.immConsistent = "All";
      state.immConsistentMaxValue = "0.0";
      state.startTime = "";
      state.endTime = "";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(logOut.fulfilled, () => initialState);
  },
});

export const {
  saveTrackNum,
  saveSelectedTrackNums,
  saveImmConsistent,
  saveImmConsistentMaxValue,
  updateTrackNumbers,
  saveTime,
  setIs3D,
  resetDataFilters,
} = dataFiltersSlice.actions;
export default dataFiltersSlice.reducer;
