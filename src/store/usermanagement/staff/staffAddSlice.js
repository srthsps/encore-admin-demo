import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";

export const addStaff = createAsyncThunk(
  "admin/staff-add",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const response = await api.actionHandler({
        url: api.userPostURL,
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
const staffAddSlice = createSlice({
  name: "staff-add",
  initialState: {
    asaFetching: false,
    asaSuccess: false,
    asaError: false,
    asaErrorMessage: "",
  },
  reducers: {
    clearAsaState: (state) => {
      state.asaError = false;
      state.asaSuccess = false;
      state.asaFetching = false;
      state.asaErrorMessage = "";

      return state;
    },
  },
  extraReducers: {
    [addStaff.fulfilled]: (state, { payload }) => {
      state.asaFetching = false;
      state.asaSuccess = true;
      return state;
    },
    [addStaff.rejected]: (state, action) => {
      state.asaFetching = false;
      state.asaError = true;
      state.asaErrorMessage = action?.payload;
    },
    [addStaff.pending]: (state) => {
      state.asaFetching = true;
    },
  },
});

export const { clearAsaState } = staffAddSlice.actions;

export default staffAddSlice.reducer;
