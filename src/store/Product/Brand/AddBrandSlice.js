import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";

export const fetchbrandAdd = createAsyncThunk(
  "admin/brand-add",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const response = await api.actionHandler({
        url: api.brandAddURL,
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
const brandAddSlice = createSlice({
  name: "brand-add",
  initialState: {
    brandAddFetching: false,
    brandAddSuccess: false,
    brandAddError: false,
    brandAddErrorMessage: "",
  },
  reducers: {
    clearbrandAddState: (state) => {
      state.brandAddError = false;
      state.brandAddSuccess = false;
      state.brandAddFetching = false;

      return state;
    },
  },
  extraReducers: {
    [fetchbrandAdd.fulfilled]: (state, { payload }) => {
      state.brandAddFetching = false;
      state.brandAddSuccess = true;
      return state;
    },
    [fetchbrandAdd.rejected]: (state, action) => {
      state.brandAddFetching = false;
      state.brandAddError = true;
      state.brandAddErrorMessage = action?.payload;
    },
    [fetchbrandAdd.pending]: (state) => {
      state.brandAddFetching = true;
    },
  },
});

export const { clearbrandAddState } = brandAddSlice.actions;

export default brandAddSlice.reducer;
