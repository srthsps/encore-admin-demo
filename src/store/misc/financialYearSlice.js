import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const fetchFinancialYearListURL = createAsyncThunk(
  "admin/financial-year-list",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.actionHandler({
        url: api.financialYearListURL,
        method: "GET",
      });

      let data = await response;
      if (response.status === 200) {
        let sam = response.data;
        return sam;
      } else {
        return rejectWithValue(data);
      }
    } catch (e) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();

      return rejectWithValue(message);
    }
  }
);
const financialYearListSlice = createSlice({
  name: "financial-year-list",
  initialState: {
    financialYearList: [],
    fylFetching: false,
    fylSuccess: false,
    fylError: false,
    fylErrorMessage: "",
  },
  reducers: {
    fylClearState: (state) => {
      state.fylError = false;
      state.fylSuccess = false;
      state.fylFetching = false;

      return state;
    },
  },
  extraReducers: {
    [fetchFinancialYearListURL.fulfilled]: (state, { payload }) => {
      state.financialYearList = [];
      payload.data.results.forEach((item) =>
        state.financialYearList.push(item)
      );
      state.fylFetching = false;
      state.fylSuccess = true;
      return state;
    },
    [fetchFinancialYearListURL.rejected]: (state, action) => {
      state.fylFetching = false;
      state.fylError = true;
      state.fylErrorMessage = action?.payload;
    },
    [fetchFinancialYearListURL.pending]: (state) => {
      state.fylFetching = true;
    },
  },
});

export const { fylClearState } = financialYearListSlice.actions;

export default financialYearListSlice.reducer;
