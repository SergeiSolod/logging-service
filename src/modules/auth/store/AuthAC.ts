import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "./AuthApi";
import { fetchLogs } from "src/modules/logs/store/LogsAC";
import {
  setInfo,
  setError,
  setLoading,
} from "src/modules/main/store/MainSlice";

export const fetchRegistration = createAsyncThunk(
  "fetchRegistration",
  async (data, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await authApi.registration(data);
      await thunkAPI.dispatch(setInfo(response.data.message));
      await thunkAPI.dispatch(fetchLogin(data));
    } catch (e: any) {
      await thunkAPI.dispatch(setError(e.response.data.message));
    }
  },
);

export const fetchLogin = createAsyncThunk(
  "fetchLogin",
  async (data, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await authApi.login(data);
      await localStorage.setItem("token", response.data.token);
      await thunkAPI.dispatch(fetchLogs());
    } catch (e: any) {
      await thunkAPI.dispatch(setError(e.response.data.message));
    }
  },
);
