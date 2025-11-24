import { createSelector } from "@reduxjs/toolkit";

export const selectSources = (state) => state.sources.items;
export const selectIsLoading = (state) => state.sources.selectIsLoading;
export const selectUploadProgress = (state) => state.sources.uploadProgress;

export const selectSourceNumbers = createSelector([selectSources], (sources) =>
  sources.map((source) => source.source_number)
);

export const selectSourceByNumber = (sourceNumber) =>
  createSelector([selectSources], (sources) =>
    sources.find((source) => source.source_number === sourceNumber)
  );

export const selectNextSourceNumber = (currentNumber) =>
  createSelector([selectSources], (sources) => {
    if (!sources || sources.length === 0) {
      return null;
    }

    const idx = sources.findIndex((s) => s.source_number === currentNumber);

    if (idx === -1) {
      return sources[0].source_number;
    }

    if (sources.length === 1) {
      return null;
    }

    const nextIdx = (idx + 1) % sources.length;
    return sources[nextIdx].source_number;
  });
