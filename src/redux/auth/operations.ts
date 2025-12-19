import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/api";
import { RootState } from "../store";
import { setAuthHeader, clearAuthHeader } from "../../api/axiosInst";
import {
  User,
  AuthLoginData,
  AuthRegisterData,
  AuthResponse,
  UserUpdateProfile,
  UserUpdateTheme,
  ResendPayload,
  ResetPasswordPayload,
  ServerMessage,
} from "./types";

export const register = createAsyncThunk<
  AuthResponse,
  AuthRegisterData,
  { rejectValue: string }
>("auth/register", async (credentials, thunkAPI) => {
  try {
    const data = await api.post<AuthResponse>("/auth/register", credentials);
    if (data.token) {
      setAuthHeader(data.token);
    }
    return data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Unknown error";
    return thunkAPI.rejectWithValue(message);
  }
});

export const logIn = createAsyncThunk<
  AuthResponse,
  AuthLoginData,
  { rejectValue: string }
>("auth/login", async (credentials, thunkAPI) => {
  try {
    const data = await api.post<AuthResponse>("/auth/login", credentials);
    if (data.token) {
      setAuthHeader(data.token);
    }
    return data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Unknown error";
    return thunkAPI.rejectWithValue(message);
  }
});

export const logOut = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await api.post<void>("/auth/logout");
      clearAuthHeader();
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || "Unknown error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const refreshUser = createAsyncThunk<
  User,
  void,
  { rejectValue: string; state: RootState }
>(
  "users/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const savedToken = state.auth.token;

    if (!savedToken) {
      return thunkAPI.rejectWithValue("No token available");
    }

    setAuthHeader(savedToken);

    try {
      const user = await api.get<User>("/users/current");
      return user;
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || "Unknown error";
      return thunkAPI.rejectWithValue(message);
    }
  },
  {
    condition: (_, { getState }) => {
      const token = getState().auth.token;
      return token !== null;
    },
  }
);

export const updateTheme = createAsyncThunk<
  UserUpdateTheme,
  UserUpdateTheme,
  { rejectValue: string }
>("users/updateTheme", async (themeData, thunkAPI) => {
  try {
    const data = await api.patch<UserUpdateTheme>("/users/themes", themeData);
    return data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Unknown error";
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateUserProfile = createAsyncThunk<
  User,
  UserUpdateProfile,
  { rejectValue: string }
>("users/updateProfile", async (data, thunkAPI) => {
  try {
    let response: User;

    if (data.avatar) {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value as any);
        }
      });

      response = await api.patch<User>("/users/profile", formData);
    } else {
      response = await api.patch<User>("/users/", data, {
        headers: { "Content-Type": "application/json" },
      });
    }
    return response;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Unknown error";
    return thunkAPI.rejectWithValue(message);
  }
});

export const resendVerify = createAsyncThunk<
  ServerMessage,
  ResendPayload,
  { rejectValue: string }
>("auth/resendVerify", async (payload, thunkAPI) => {
  try {
    const data = await api.post<ServerMessage>("/auth/resend-verify", payload);
    return data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Unknown error";
    return thunkAPI.rejectWithValue(message);
  }
});

export const requestResetPwd = createAsyncThunk<
  ServerMessage,
  ResendPayload,
  { rejectValue: string }
>("auth/requestResetPwd", async (payload, thunkAPI) => {
  try {
    const data = await api.post<ServerMessage>(
      "/auth/request-reset-pwd",
      payload
    );
    return data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Unknown error";
    return thunkAPI.rejectWithValue(message);
  }
});

export const resetPassword = createAsyncThunk<
  ServerMessage,
  ResetPasswordPayload,
  { rejectValue: string }
>("auth/resetPassword", async (payload, thunkAPI) => {
  try {
    const data = await api.post<ServerMessage>("/auth/reset-pwd", payload);
    return data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Unknown error";
    return thunkAPI.rejectWithValue(message);
  }
});
