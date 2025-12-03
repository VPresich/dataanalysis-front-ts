import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataRecord, AnalysisState } from "./types";
import { logOut } from "../auth/operations";
import {
  getDataBySource,
  getFilteredData,
  getNonameData,
  getNonameDataBySource,
} from "./operations";

const initialState: AnalysisState = {
  items: [],
  isLoading: false,
  error: null,
};

const analysisSlice = createSlice({
  name: "analysis",
  initialState,
  reducers: {
    resetDataState(state) {
      state.items = [];
      state.isLoading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // -------- getNonameData ----------
      .addCase(getNonameData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getNonameData.fulfilled,
        (state, action: PayloadAction<DataRecord[]>) => {
          state.isLoading = false;
          state.items = action.payload;
        }
      )
      .addCase(getNonameData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Unknown error";
      })

      // -------- getNonameDataBySource ----------
      .addCase(getNonameDataBySource.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getNonameDataBySource.fulfilled,
        (state, action: PayloadAction<DataRecord[]>) => {
          state.isLoading = false;
          state.items = action.payload;
        }
      )
      .addCase(getNonameDataBySource.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Unknown error";
      })

      // -------- getDataBySource ----------
      .addCase(getDataBySource.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getDataBySource.fulfilled,
        (state, action: PayloadAction<DataRecord[]>) => {
          state.isLoading = false;
          state.items = action.payload;
        }
      )
      .addCase(getDataBySource.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Unknown error";
      })

      // -------- getFilteredData ----------
      .addCase(getFilteredData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getFilteredData.fulfilled,
        (state, action: PayloadAction<DataRecord[]>) => {
          state.isLoading = false;
          state.items = action.payload;
        }
      )
      .addCase(getFilteredData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Unknown error";
      })

      // -------- logout --------
      .addCase(logOut.fulfilled, (state) => {
        state.items = [];
        state.error = null;
        state.isLoading = false;
      });
  },
});

export const { resetDataState } = analysisSlice.actions;
export default analysisSlice.reducer;
