import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const fetchRecentBarcodeList = createAsyncThunk(
  "admin/recentBarcode-list",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.actionHandler({
        url: api.latestBarcodeListURL,
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
const recentBarcodeListSlice = createSlice({
  name: "recentBarcode-list",
  initialState: {
    recentBarcodeList: [],
    rblFetching: false,
    rblSuccess: false,
    rblError: false,
    rblErrorMessage: "",
    recentBarcodeCount: null,
  },
  reducers: {
    rblClearState: (state) => {
      state.rblError = false;
      state.rblSuccess = false;
      state.rblFetching = false;

      return state;
    },
  },
  extraReducers: {
    [fetchRecentBarcodeList.fulfilled]: (state, { payload }) => {
      state.recentBarcodeList = [];
      payload.data.results.forEach((item) => state.recentBarcodeList.push(item));
      state.recentBarcodeCount = payload.data.count;
      state.rblFetching = false;
      state.rblSuccess = true;
      return state;
    },
    [fetchRecentBarcodeList.rejected]: (state, action) => {
      state.rblFetching = false;
      state.rblError = true;
      state.rblErrorMessage = action?.payload;
    },
    [fetchRecentBarcodeList.pending]: (state) => {
      state.rblFetching = true;
    },
  },
});

export const { rblClearState } = recentBarcodeListSlice.actions;

export default recentBarcodeListSlice.reducer;
