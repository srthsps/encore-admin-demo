import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";

export const fetchbrandEdit = createAsyncThunk(
  "admin/brand-add",
  async ({ payload, brandId }, { rejectWithValue }) => {
    try {
      const response = await api.actionHandler({
        url: api.brandEditURL.replace("{id}", brandId),
        method: "PATCH",
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
const brandEditSlice = createSlice({
  name: "brand-add",
  initialState: {
    brandEditFetching: false,
    brandEditSuccess: false,
    brandEditError: false,
    brandEditErrorMessage: "",
  },
  reducers: {
    clearbrandEditState: (state) => {
      state.brandEditError = false;
      state.brandEditSuccess = false;
      state.brandEditFetching = false;

      return state;
    },
  },
  extraReducers: {
    [fetchbrandEdit.fulfilled]: (state, { payload }) => {
      state.brandEditFetching = false;
      state.brandEditSuccess = true;
      return state;
    },
    [fetchbrandEdit.rejected]: (state, action) => {
      state.brandEditFetching = false;
      state.brandEditError = true;
      state.brandEditErrorMessage = action?.payload;
    },
    [fetchbrandEdit.pending]: (state) => {
      state.brandEditFetching = true;
    },
  },
});

export const { clearbrandEditState } = brandEditSlice.actions;

export default brandEditSlice.reducer;
