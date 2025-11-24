import { createSlice } from "@reduxjs/toolkit";
import { setAuthHeader } from "../../api/axiosInst";
import {
  register,
  logIn,
  logOut,
  refreshUser,
  updateTheme,
  updateUserProfile,
  resendVerify,
} from "./operations";

const initialState = {
  user: {
    name: "noname user",
    email: "noname@gmail.com",
    theme: "default",
    avatarURL: "",
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTheme(state, action) {
      state.user.theme = action.payload;
    },
    resetRefreshState(state, action) {
      state.isRefreshing = action.payload;
    },
    saveToken(state, action) {
      state.token = action.payload;
      setAuthHeader(state.token);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.error = null;
        state.isLoggedIn = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        const { user, token, verifyRequired } = action.payload;
        state.user = user;
        state.error = null;
        if (verifyRequired) {
          state.isLoggedIn = false;
          state.token = null;
        } else if (token) {
          state.isLoggedIn = true;
          state.token = token;
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(logIn.pending, (state) => {
        state.error = null;
        state.isLoggedIn = false;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(logOut.pending, (state) => {
        state.error = null;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = {
          name: "noname",
          email: "noname@gmail.com",
          theme: "default",
        };
        state.token = null;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.error = null;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload;
      })

      .addCase(updateTheme.pending, (state) => {
        state.error = null;
      })
      .addCase(updateTheme.fulfilled, (state, action) => {
        state.user.theme = action.payload.theme;
        state.error = null;
      })
      .addCase(updateTheme.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(updateUserProfile.pending, (state) => {
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(resendVerify.pending, (state) => {
        state.error = null;
      })
      .addCase(resendVerify.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(resendVerify.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setTheme } = authSlice.actions;
export const { resetRefreshState } = authSlice.actions;
export default authSlice.reducer;
export const { saveToken } = authSlice.actions;
