import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInst } from "../../api/axiosInst";
// import { setUploadProgress } from "./slice";

export const getUserSources = createAsyncThunk(
  "sources/getUserSources",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInst.get("/sources/");
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Unknown error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getNonameSources = createAsyncThunk(
  "sources/getNonameSources",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInst.get("/sources/noname/sources");
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Unknown error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const uploadData = createAsyncThunk(
  "data/upload",
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await axiosInst.post("/sources/", formData);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Unknown error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteSourceByNumber = createAsyncThunk(
  "sources/deleteSourceByNumber",
  async (sourceNumber, thunkAPI) => {
    try {
      const response = await axiosInst.delete(`/sources/${sourceNumber}`);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Unknown error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateSourceByNumber = createAsyncThunk(
  "sources/updateSourceByNumber",
  async ({ sourceNumber, values }, thunkAPI) => {
    try {
      const response = await axiosInst.patch(
        `/sources/${sourceNumber}`,
        values
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Unknown error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//   {
//   onUploadProgress: (progressEvent) => {
//     if (progressEvent.total) {
//       const percent = Math.round(
//         (progressEvent.loaded * 100) / progressEvent.total
//       );
//       thunkAPI.dispatch(setUploadProgress(percent));
//     }
//   },
// }
