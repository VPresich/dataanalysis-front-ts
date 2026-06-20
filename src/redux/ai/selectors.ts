import { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";

export const selectAIIdSource = (state: RootState) => state.ai.id_source;
export const selectAITrackNum = (state: RootState) => state.ai.TrackNum;
export const selectAIEvaluations = (state: RootState) => state.ai.evaluations;
export const selectAIIsLoading = (state: RootState) => state.ai.isLoading;
export const selectAIError = (state: RootState) => state.ai.error;

export const selectCurrentAIResponse = createSelector(
  [selectAITrackNum, selectAIEvaluations],
  (trackNum, evaluations) => {
    if (trackNum === null) return null;
    return evaluations[trackNum] || null;
  },
);
