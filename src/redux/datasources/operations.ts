import { createAsyncThunk } from "@reduxjs/toolkit";
import { getErrorMessage } from "../../auxiliary/getErrorMessage";
import { api } from "../../api/api";
// import { setUploadProgress } from "./slice";
import {
  DataSourceResponse,
  DataSourceCreate,
  DataSourceOperationResponse,
  DataSourceUpdate,
} from "./types";

export const getUserSources = createAsyncThunk<
  DataSourceResponse[],
  void,
  { rejectValue: string }
>("sources/getUserSources", async (_, thunkAPI) => {
  try {
    const data = await api.get<DataSourceResponse[]>("/sources/");

    return data;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const getNonameSources = createAsyncThunk<
  DataSourceResponse[],
  void,
  { rejectValue: string }
>("sources/getNonameSources", async (_, thunkAPI) => {
  try {
    const data = await api.get<DataSourceResponse[]>("/sources/noname/sources");

    return data;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const uploadData = createAsyncThunk<
  DataSourceOperationResponse,
  DataSourceCreate,
  { rejectValue: string }
>("data/upload", async (payload, thunkAPI) => {
  try {
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value as string | Blob);
      }
    });
    const data = await api.post<DataSourceOperationResponse>(
      "/sources/",
      formData,
    );

    return data;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const deleteSourceByNumber = createAsyncThunk<
  DataSourceOperationResponse,
  number,
  { rejectValue: string }
>("sources/deleteSourceByNumber", async (sourceNumber, thunkAPI) => {
  try {
    const data = await api.delete<DataSourceOperationResponse>(
      `/sources/${sourceNumber}`,
    );

    return data;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const updateSourceByNumber = createAsyncThunk<
  DataSourceOperationResponse,
  { sourceNumber: number; values: DataSourceUpdate },
  { rejectValue: string }
>(
  "sources/updateSourceByNumber",
  async ({ sourceNumber, values }, thunkAPI) => {
    try {
      const data = await api.patch<DataSourceOperationResponse>(
        `/sources/${sourceNumber}`,
        values,
      );

      return data;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);

export const deleteAllSources = createAsyncThunk<
  DataSourceOperationResponse,
  void,
  { rejectValue: string }
>("sources/deleteAllSources", async (_, thunkAPI) => {
  try {
    const data = await api.delete<DataSourceOperationResponse>(`/sources/`);

    return data;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

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
