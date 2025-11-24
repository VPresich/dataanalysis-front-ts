import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInst, setAuthHeader, clearAuthHeader } from "../../api/axiosInst";

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const resp = await axiosInst.post("auth/register", credentials);
      if (resp.data.token) {
        setAuthHeader(resp.data.token);
      }
      return resp.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Unknown error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const resp = await axiosInst.post("auth/login", credentials);
      setAuthHeader(resp.data.token);
      return resp.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Unknown error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axiosInst.post("/auth/logout");
    clearAuthHeader();
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Unknown error";
    return thunkAPI.rejectWithValue(message);
  }
});

export const refreshUser = createAsyncThunk(
  "users/refresh",
  async (_, thunkAPI) => {
    // Reading the token from the state via getState()
    const reduxState = thunkAPI.getState();
    const savedToken = reduxState.auth.token;

    // Add it to the HTTP header and perform the request
    setAuthHeader(savedToken);
    const response = await axiosInst.get("users/current");
    return response.data;
  },
  {
    condition: (_, { getState }) => {
      // Reading the token from the state via getState()
      const state = getState();
      const savedToken = state.auth.token;

      // If there is no token, exit without performing any request
      return savedToken !== null;
    },
  }
);

export const updateTheme = createAsyncThunk(
  "users/updateTheme",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInst.patch("/users/themes", data);
      return response.data;
    } catch (error) {
      console.error("Failed to update theme:", error);
      const message =
        error.response?.data?.message || error.message || "Unknown error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "users/updateProfile",
  async (data, thunkAPI) => {
    try {
      let response;

      if (data.avatar) {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          formData.append(key, value);
        });

        response = await axiosInst.patch("/users/profile", formData);
      } else {
        response = await axiosInst.patch("/users/", data, {
          headers: { "Content-Type": "application/json" },
        });
      }

      return response.data;
    } catch (error) {
      console.error("Failed to update user profile:", error);
      const message =
        error.response?.data?.message || error.message || "Unknown error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const resendVerify = createAsyncThunk(
  "auth/resendVerify",
  async (email, thunkAPI) => {
    try {
      const response = await axiosInst.post("auth/resend-verify", email);
      console.log(response.data);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Unknown error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const requestResetPwd = createAsyncThunk(
  "auth/reqResetPwd",
  async (email, thunkAPI) => {
    try {
      const response = await axiosInst.post("/auth/request-reset-pwd", email);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Unknown error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (resetData, thunkAPI) => {
    try {
      const response = await axiosInst.post("/auth/reset-pwd", resetData);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Unknown error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);
