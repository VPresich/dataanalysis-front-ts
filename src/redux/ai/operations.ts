import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/api";
import { getErrorMessage } from "../../auxiliary/getErrorMessage";
import { AIRequest, AIResponse } from "./types";

export const getAINonameEvaluate = createAsyncThunk<
  AIResponse,
  AIRequest,
  { rejectValue: string }
>("ai/nonameEvaluate", async (payload, thunkAPI) => {
  try {
    const data = await api.post<AIResponse>("/ai/noname-evaluate", payload);
    return data;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const getAIUserEvaluate = createAsyncThunk<
  AIResponse,
  AIRequest,
  { rejectValue: string }
>("ai/userEvaluate", async (payload, thunkAPI) => {
  try {
    const data = await api.post<AIResponse>("/ai/user-evaluate", payload);
    return data;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});
