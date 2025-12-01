export interface User {
  name: string;
  email: string;
  theme: string;
  avatarURL: string;
}

export interface AuthLoginData {
  email: string;
  password: string;
}

export interface AuthRegisterData extends AuthLoginData {
  name: string;
}

export interface AuthResponse {
  user: User;
  token?: string;
  verifyRequired?: boolean;
}

export interface UserUpdateTheme {
  theme: string;
}

export interface UserUpdateInfo extends Partial<Pick<User, "name" | "theme">> {
  password?: string;
}

export interface UserUpdateAvatar {
  avatar?: File;
}

export interface UserUpdateProfile extends UserUpdateInfo, UserUpdateAvatar {}

export interface ServerMessage {
  message: string;
}

export interface ResendPayload {
  email: string;
}

export interface ResetPasswordPayload {
  password: string;
  token: string;
}
