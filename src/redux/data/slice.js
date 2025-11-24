import { createSlice } from "@reduxjs/toolkit";
import { getDataBySource, getFilteredData } from "./operations";
import { getNonameData, getNonameDataBySource } from "./operations";

const analysisSlice = createSlice({
  name: "analysis",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    resetDataState(state) {
      state.items = [];
      state.isLoading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getNonameData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getNonameData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(getNonameData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(getNonameDataBySource.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getNonameDataBySource.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(getNonameDataBySource.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(getDataBySource.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getDataBySource.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(getDataBySource.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(getFilteredData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFilteredData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(getFilteredData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage, resetDataState } = analysisSlice.actions;
export default analysisSlice.reducer;
