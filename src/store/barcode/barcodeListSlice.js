import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const fetchBarcodeList = createAsyncThunk(
  "admin/barcode-list",
  async ({limit ,offset}, { rejectWithValue }) => {
    try {
      const response = await api.actionHandler({
        url: api.barcodeListURL.replace("{limit}", limit).replace("{offset}", offset),
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
const barcodeListSlice = createSlice({
  name: "barcode-list",
  initialState: {
    barcodeList: [],
    bclFetching: false,
    bclSuccess: false,
    bclError: false,
    bclErrorMessage: "",
    barcodeCount: null,
  },
  reducers: {
    bclClearState: (state) => {
      state.bclError = false;
      state.bclSuccess = false;
      state.bclFetching = false;

      return state;
    },
  },
  extraReducers: {
    [fetchBarcodeList.fulfilled]: (state, { payload }) => {
      state.barcodeList = [];
      payload.data.results.forEach((item) => state.barcodeList.push(item));
      state.barcodeCount = payload.data.count;
      state.bclFetching = false;
      state.bclSuccess = true;
      return state;
    },
    [fetchBarcodeList.rejected]: (state, action) => {
      state.bclFetching = false;
      state.bclError = true;
      state.bclErrorMessage = action?.payload;
    },
    [fetchBarcodeList.pending]: (state) => {
      state.bclFetching = true;
    },
  },
});

export const { bclClearState } = barcodeListSlice.actions;

export default barcodeListSlice.reducer;
