import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  logs: [],
  logsPage: "all",
};

export const logsSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {
    setLogs: (state, action) => {
      state.logs = action.payload;
    },
    setLogsPage: (state, action) => {
      state.logsPage = action.payload;
    },
  },
});

export const { setLogs, setLogsPage } = logsSlice.actions;

export default logsSlice.reducer;
