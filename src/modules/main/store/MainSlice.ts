import { createSlice } from "@reduxjs/toolkit";
import localized from "src/helpers/localized";

const initialState: any = {
  loading: false,
  page: "",
  message: false,
  infoTitle: "",
  infoText: "",
  isError: false,
  language: "en",
};

export const MainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    closeMessage: (state) => {
      state.message = false;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setError: (state, action) => {
      state.message = true;
      state.infoTitle = localized.unsuccessful;
      state.infoText = action.payload;
      state.isError = true;
    },
    setInfo: (state, action) => {
      state.message = true;
      state.infoTitle = localized.successfully;
      state.infoText = action.payload;
      state.isError = false;
    },
  },
});

export const {
  setLoading,
  setPage,
  closeMessage,
  setLanguage,
  setError,
  setInfo,
} = MainSlice.actions;

export default MainSlice.reducer;
