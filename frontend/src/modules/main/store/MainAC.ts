import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading, setPage } from "./MainSlice";
import { fetchLogs } from "src/modules/logs/store/LogsAC";

export const fetchCheckToken = createAsyncThunk(
  "fetchCheckToken",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      thunkAPI.dispatch(fetchLogs());
    } catch (e: any) {
      thunkAPI.dispatch(setLoading(false));
      thunkAPI.dispatch(setPage("auth"));
    }
  },
);
