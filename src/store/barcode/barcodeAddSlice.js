import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const addBarcode = createAsyncThunk(
  "admin/barcode-add",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const response = await api.actionHandler({
        url: api.barcodePostURL,
        method: "POST",
        data: payload,
      });

      let data = await response;
      if (response.status === 201) {
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
const barcodeAddSlice = createSlice({
  name: "barcode-add",
  initialState: {
    addBarcodeFetching: false,
    addBarcodeSuccess: false,
    addBarcodeError: false,
    addBarcodeErrorMessage: "",
  },
  reducers: {
    clearAddBarcodeState: (state) => {
      state.addBarcodeError = false;
      state.addBarcodeSuccess = false;
      state.addBarcodeFetching = false;

      return state;
    },
  },
  extraReducers: {
    [addBarcode.fulfilled]: (state, { payload }) => {
      state.addBarcodeFetching = false;
      state.addBarcodeSuccess = true;
      return state;
    },
    [addBarcode.rejected]: (state, action) => {
      state.addBarcodeFetching = false;
      state.addBarcodeError = true;
      state.addBarcodeErrorMessage = action?.payload;
    },
    [addBarcode.pending]: (state) => {
      state.addBarcodeFetching = true;
    },
  },
});

export const { clearAddBarcodeState } = barcodeAddSlice.actions;

export default barcodeAddSlice.reducer;
