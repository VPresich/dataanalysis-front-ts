export const selectUser = (state) => state.auth.user;
export const selectUserName = (state) => state.auth.user.name;
export const selectAvatarURL = (state) => state.auth.user.avatarURL;
export const selectTheme = (state) => state.auth.user.theme;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;
