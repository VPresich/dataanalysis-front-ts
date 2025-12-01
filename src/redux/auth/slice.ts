import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setAuthHeader } from "../../api/axiosInst";
import {
  register,
  logIn,
  logOut,
  refreshUser,
  updateTheme,
  updateUserProfile,
  resendVerify,
  requestResetPwd,
  resetPassword,
} from "./operations";
import { User, AuthResponse, UserUpdateTheme, AuthState } from "./types";

const initialState: AuthState = {
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
    setTheme(state, action: PayloadAction<string>) {
      state.user.theme = action.payload;
    },
    resetRefreshState(state, action: PayloadAction<boolean>) {
      state.isRefreshing = action.payload;
    },
    saveToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      setAuthHeader(state.token);
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.error = null;
        state.isLoggedIn = false;
      })
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
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
        }
      )
      .addCase(
        register.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || "Unknown error";
        }
      )

      // Login
      .addCase(logIn.pending, (state) => {
        state.error = null;
        state.isLoggedIn = false;
      })
      .addCase(
        logIn.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.user = action.payload.user;
          state.token = action.payload.token || null;
          state.isLoggedIn = !!action.payload.token;
          state.error = null;
        }
      )
      .addCase(
        logIn.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || "Unknown error";
        }
      )

      // Logout
      .addCase(logOut.pending, (state) => {
        state.error = null;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = {
          name: "noname user",
          email: "noname@gmail.com",
          theme: "default",
          avatarURL: "",
        };
        state.token = null;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(
        logOut.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || "Unknown error";
        }
      )

      // Refresh user
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.error = null;
      })
      .addCase(
        refreshUser.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isRefreshing = false;
          state.error = action.payload || "Unknown error";
        }
      )

      // Update theme
      .addCase(updateTheme.pending, (state) => {
        state.error = null;
      })
      .addCase(
        updateTheme.fulfilled,
        (state, action: PayloadAction<UserUpdateTheme>) => {
          state.user.theme = action.payload.theme;
          state.error = null;
        }
      )
      .addCase(
        updateTheme.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || "Unknown error";
        }
      )

      // Update profile
      .addCase(updateUserProfile.pending, (state) => {
        state.error = null;
      })
      .addCase(
        updateUserProfile.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.user = action.payload;
          state.error = null;
        }
      )
      .addCase(
        updateUserProfile.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || "Unknown error";
        }
      )

      // Resend verify
      .addCase(resendVerify.pending, (state) => {
        state.error = null;
      })
      .addCase(resendVerify.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(
        resendVerify.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || "Unknown error";
        }
      )

      // Request reset password
      .addCase(requestResetPwd.pending, (state) => {
        state.error = null;
      })
      .addCase(requestResetPwd.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(
        requestResetPwd.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || "Unknown error";
        }
      )

      // Reset password
      .addCase(resetPassword.pending, (state) => {
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(
        resetPassword.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload || "Unknown error";
        }
      );
  },
});

export const { setTheme, resetRefreshState, saveToken } = authSlice.actions;
export default authSlice.reducer;
