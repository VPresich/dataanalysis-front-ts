import { RootState } from "../store";
import { Theme } from "./types";

export const selectUser = (state: RootState) => state.auth.user;
export const selectUserName = (state: RootState) => state.auth.user.name;
export const selectAvatarURL = (state: RootState) => state.auth.user.avatarURL;
export const selectTheme = (state: RootState): Theme => state.auth.user.theme;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state: RootState) => state.auth.isRefreshing;
export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectAuthError = (state: RootState) => state.auth.error;
