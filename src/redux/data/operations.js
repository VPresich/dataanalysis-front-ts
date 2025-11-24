import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInst } from "../../api/axiosInst";

export const getNonameData = createAsyncThunk(
  "data/getNonameData",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInst.get(`data/noname/data`);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Unknown error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getNonameDataBySource = createAsyncThunk(
  "data/getNonameDataBySource",
  async (sourceNumber, thunkAPI) => {
    console.log("SOURCENUMBER", sourceNumber);
    try {
      const response = await axiosInst.get(
        `data/noname/data/${Number(sourceNumber)}`
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Unknown error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getDataBySource = createAsyncThunk(
  "data/getDataBySource",
  async (sourceNumber, thunkAPI) => {
    try {
      const response = await axiosInst.get(`/data/${Number(sourceNumber)}`);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Unknown error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getFilteredData = createAsyncThunk(
  "data/getFilteredData",
  async ({ sourceNumber, startTime, endTime }, thunkAPI) => {
    try {
      const params = {};
      if (startTime) params.startTime = startTime;
      if (endTime) params.endTime = endTime;
      const response = await axiosInst.get(`data/${sourceNumber}/filter`, {
        params,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
