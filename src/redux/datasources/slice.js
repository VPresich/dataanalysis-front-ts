import { createSlice } from "@reduxjs/toolkit";
import { logOut } from "../auth/operations";
import {
  getUserSources,
  getNonameSources,
  uploadData,
  deleteSourceByNumber,
  updateSourceByNumber,
} from "./operations";

const sourcesSlice = createSlice({
  name: "sources",
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
      state.uploadProgress = 0;
    },

    setUploadProgress(state, action) {
      state.uploadProgress = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUserSources.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserSources.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(getUserSources.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(getNonameSources.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getNonameSources.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(getNonameSources.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(uploadData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadData.fulfilled, (state, action) => {
        const newSource = action.payload.dataSource;
        const exists = state.items.some((s) => s._id === newSource._id);
        if (!exists) state.items.push(newSource);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(uploadData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(deleteSourceByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteSourceByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.items.findIndex(
          (source) => source._id === action.payload.deletedSource._id
        );
        if (index !== -1) {
          state.items.splice(index, 1);
        }
        state.error = null;
      })
      .addCase(deleteSourceByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(updateSourceByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateSourceByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedSource = action.payload.updatedSource;
        const index = state.items.findIndex(
          (source) => source._id === updatedSource._id
        );
        if (index !== -1) {
          state.items[index] = updatedSource;
        }
        state.error = null;
      })
      .addCase(updateSourceByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(logOut.fulfilled, (state) => {
        state.items = [];
        state.error = null;
        state.isLoading = false;
      });
  },
});

export const { resetDataState, setUploadProgress } = sourcesSlice.actions;
export default sourcesSlice.reducer;
