import { createAsyncThunk } from "@reduxjs/toolkit";
import { logsApi } from "./LogsApi";
import {
  setPage,
  setError,
  setLoading,
} from "src/modules/main/store/MainSlice";
import { setLogs } from "./LogsSlice";

export const fetchLogs = createAsyncThunk("fetchLogs", async (_, thunkAPI) => {
  try {
    const response = await logsApi.logs();
    thunkAPI.dispatch(setLogs(response.data));
    thunkAPI.dispatch(setPage("logs"));
    thunkAPI.dispatch(setLoading(false));
  } catch (e) {
    await thunkAPI.dispatch(setError(e.response.data.message));
    if (e.response.status === 403) {
      thunkAPI.dispatch(setLoading(false));
      thunkAPI.dispatch(setPage("login"));
    }
  }
});

export const fetchLog = createAsyncThunk("fetchLog", async (data, thunkAPI) => {
  try {
    const response = await logsApi.log(data);
    thunkAPI.dispatch(fetchLogs());
  } catch (e) {
    thunkAPI.dispatch(setLoading(false));
    await thunkAPI.dispatch(setError(e.response.data.message));
  }
});
