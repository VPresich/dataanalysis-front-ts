import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInst } from "../../api/axiosInst";
import { api } from "../../api/api";
import { DataRecord, FilterParams, RequestFilterParams } from "./types";

export const getNonameData = createAsyncThunk<
  DataRecord[],
  void,
  { rejectValue: string }
>("data/getNonameData", async (_, thunkAPI) => {
  try {
    const data = await api.get<DataRecord[]>(`data/noname/data`);
    return data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Unknown error";
    return thunkAPI.rejectWithValue(message);
  }
});

export const getNonameDataBySource = createAsyncThunk<
  DataRecord[],
  void,
  { rejectValue: string }
>("data/getNonameDataBySource", async (sourceNumber, thunkAPI) => {
  try {
    const data = await api.get<DataRecord[]>(
      `data/noname/data/${Number(sourceNumber)}`
    );
    return data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Unknown error";
    return thunkAPI.rejectWithValue(message);
  }
});

export const getDataBySource = createAsyncThunk<
  DataRecord[],
  void,
  { rejectValue: string }
>("data/getDataBySource", async (sourceNumber, thunkAPI) => {
  try {
    const data = await api.get<DataRecord[]>(`/data/${Number(sourceNumber)}`);
    return data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Unknown error";
    return thunkAPI.rejectWithValue(message);
  }
});

export const getFilteredData = createAsyncThunk<
  DataRecord[],
  RequestFilterParams,
  { rejectValue: string }
>(
  "data/getFilteredData",
  async ({ sourceNumber, startTime, endTime }, thunkAPI) => {
    try {
      const params: FilterParams = {};
      if (startTime) params.startTime = startTime;
      if (endTime) params.endTime = endTime;
      const data = await api.get<DataRecord[]>(`data/${sourceNumber}/filter`, {
        params,
      });
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
