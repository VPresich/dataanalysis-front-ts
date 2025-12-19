import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { logOut } from "../auth/operations";
import {
  getUserSources,
  getNonameSources,
  uploadData,
  deleteSourceByNumber,
  updateSourceByNumber,
  deleteAllSources,
} from "./operations";
import {
  DataSourcesState,
  DataSourceResponse,
  DataSourceOperationResponse,
} from "./types";

const initialState: DataSourcesState = {
  items: [],
  isLoading: false,
  error: null,
  uploadProgress: 0,
};

const sourcesSlice = createSlice({
  name: "sources",
  initialState,
  reducers: {
    resetDataState(state) {
      state.items = [];
      state.isLoading = false;
      state.error = null;
      state.uploadProgress = 0;
    },

    setUploadProgress(state, action: PayloadAction<number>) {
      state.uploadProgress = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      // -------- getUserSources --------
      .addCase(getUserSources.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getUserSources.fulfilled,
        (state, action: PayloadAction<DataSourceResponse[]>) => {
          state.isLoading = false;
          state.items = action.payload;
        }
      )
      .addCase(getUserSources.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string | null;
      })

      // -------- getNonameSources --------
      .addCase(getNonameSources.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getNonameSources.fulfilled,
        (state, action: PayloadAction<DataSourceResponse[]>) => {
          state.isLoading = false;
          state.items = action.payload;
        }
      )
      .addCase(getNonameSources.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string | null;
      })

      // -------- uploadData --------
      .addCase(uploadData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        uploadData.fulfilled,
        (state, action: PayloadAction<DataSourceOperationResponse>) => {
          const newSource = action.payload.source;

          if (!state.items.some((s) => s._id === newSource._id)) {
            state.items.push(newSource);
          }

          state.isLoading = false;
        }
      )
      .addCase(uploadData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string | null;
      })

      // -------- deleteSourceByNumber --------
      .addCase(deleteSourceByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        deleteSourceByNumber.fulfilled,
        (state, action: PayloadAction<DataSourceOperationResponse>) => {
          state.isLoading = false;

          const id = action.payload.source._id;
          state.items = state.items.filter((s) => s._id !== id);

          state.error = null;
        }
      )
      .addCase(deleteSourceByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string | null;
      })

      // -------- updateSourceByNumber --------
      .addCase(updateSourceByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        updateSourceByNumber.fulfilled,
        (state, action: PayloadAction<DataSourceOperationResponse>) => {
          state.isLoading = false;

          const updated = action.payload.source;
          const index = state.items.findIndex((s) => s._id === updated._id);

          if (index !== -1) {
            state.items[index] = updated;
          }

          state.error = null;
        }
      )
      .addCase(updateSourceByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string | null;
      })
      .addCase(deleteAllSources.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteAllSources.fulfilled, (state) => {
        state.isLoading = false;
        state.items = [];
        state.error = null;
      })
      .addCase(deleteAllSources.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string | null;
      })

      // -------- logout --------
      .addCase(logOut.fulfilled, (state) => {
        state.items = [];
        state.error = null;
        state.isLoading = false;
      });
  },
});

export const { resetDataState, setUploadProgress } = sourcesSlice.actions;
export default sourcesSlice.reducer;
