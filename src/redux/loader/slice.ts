import { createSlice, PayloadAction, UnknownAction } from "@reduxjs/toolkit";
import { LoaderState } from "./types";

const initialState: LoaderState = {
  loading: false,
  error: null,
};

const isPending = (action: UnknownAction): boolean =>
  typeof action.type === "string" && action.type.endsWith("/pending");

const isFinished = (action: UnknownAction): boolean =>
  typeof action.type === "string" &&
  (action.type.endsWith("/fulfilled") || action.type.endsWith("/rejected"));

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
        state.loading = true;
      })
      .addMatcher(isFinished, (state) => {
        state.loading = false;
      });
  },
});

export const { setLoading } = loaderSlice.actions;
export default loaderSlice.reducer;
