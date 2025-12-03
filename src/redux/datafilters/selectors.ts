import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectTrackNum = (state: RootState) => state.datafilters.trackNum;
export const selectTrackNumbers = (state: RootState) =>
  state.datafilters.trackNumbers || [];

export const selectTrackNumbersForMultySelect = createSelector(
  [selectTrackNumbers],
  (trackNumbers) => trackNumbers.filter((track) => track !== "All")
);

export const selectImmConsistent = (state: RootState) =>
  state.datafilters.immConsistent;
export const selectImmConsistentValues = (state: RootState) =>
  state.datafilters.immConsistentValues;
export const selectImmConsistentMaxValue = (state: RootState) =>
  state.datafilters.immConsistentMaxValue;

export const selectStartTime = (state: RootState) =>
  state.datafilters.startTime;
export const selectEndTime = (state: RootState) => state.datafilters.endTime;
export const selectSelectedTrackNums = (state: RootState) =>
  state.datafilters.selectedTrackNums;

export const selectIs3D = (state: RootState) => state.datafilters.is3D;
