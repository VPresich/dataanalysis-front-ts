import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { logOut } from "../auth/operations";
import { getAINonameEvaluate, getAIUserEvaluate } from "./operations";
import { AIState, AIResponse } from "./types";

const initialState: AIState = {
  id_source: null,
  TrackNum: null,
  evaluations: {},
  isLoading: false,
  error: null,
};

const aiSlice = createSlice({
  name: "ai",
  initialState,
  reducers: {
    resetAIState(state) {
      state.id_source = null;
      state.TrackNum = null;
      state.evaluations = {};
      state.isLoading = false;
      state.error = null;
    },

    changeActiveTrack(state, action: PayloadAction<number | null>) {
      state.TrackNum = action.payload;
    },

    changeSourceAndReset(state, action: PayloadAction<string | null>) {
      state.id_source = action.payload;
      state.TrackNum = null;
      state.evaluations = {};
    },
  },

  extraReducers: (builder) => {
    builder
      // -------- getAINonameEvaluate --------
      .addCase(getAINonameEvaluate.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.TrackNum = action.meta.arg.TrackNum;
        if (state.id_source !== action.meta.arg.id_source) {
          state.evaluations = {};
          state.id_source = action.meta.arg.id_source;
        }
      })
      .addCase(
        getAINonameEvaluate.fulfilled,
        (state, action: PayloadAction<AIResponse>) => {
          state.isLoading = false;
          if (state.TrackNum !== null) {
            state.evaluations[state.TrackNum] = action.payload;
          }
        },
      )
      .addCase(getAINonameEvaluate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string | null;
      })

      // -------- getAIUserEvaluate --------
      .addCase(getAIUserEvaluate.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.TrackNum = action.meta.arg.TrackNum;
        if (state.id_source !== action.meta.arg.id_source) {
          state.evaluations = {};
          state.id_source = action.meta.arg.id_source;
        }
      })
      .addCase(
        getAIUserEvaluate.fulfilled,
        (state, action: PayloadAction<AIResponse>) => {
          state.isLoading = false;
          if (state.TrackNum !== null) {
            state.evaluations[state.TrackNum] = action.payload;
          }
        },
      )
      .addCase(getAIUserEvaluate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string | null;
      })

      // -------- logout --------
      .addCase(logOut.fulfilled, (state) => {
        state.id_source = null;
        state.TrackNum = null;
        state.evaluations = {};
        state.error = null;
        state.isLoading = false;
      });
  },
});

export const { resetAIState, changeActiveTrack, changeSourceAndReset } =
  aiSlice.actions;
export default aiSlice.reducer;
