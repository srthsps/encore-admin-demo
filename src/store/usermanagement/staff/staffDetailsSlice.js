import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";
export const fetchStaffDetails = createAsyncThunk(
  "admin/staff-details",
  async ({ userID }, { rejectWithValue }) => {
    try {
      const response = await api.actionHandler({
        url: api.userDetailsURL.replace("{id}", userID),
        method: "GET",
      });
      let data = await response;
      if (response.status === 200) {
        let result = response.data;
        return result;
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

const staffDetailsSlice = createSlice({
  name: "staff-details",
  initialState: {
    staffDetails: {},
    fsfdFetching: false,
    fsfdSuccess: false,
    fsfdError: false,
    fsfdErrorMessage: "",
  },
  reducers: {
    clearFsfdState: (state) => {
      state.fsfdError = false;
      state.fsfdSuccess = false;
      state.fsfdFetching = false;

      return state;
    },
  },
  extraReducers: {
    [fetchStaffDetails.fulfilled]: (state, { payload }) => {
      state.staffDetails = payload.data;

      state.fsfdFetching = false;
      state.fsfdSuccess = true;
      return state;
    },
    [fetchStaffDetails.rejected]: (state, action) => {
      state.fsfdFetching = false;
      state.fsfdError = true;
      state.fsfdErrorMessage = action?.payload;
    },
    [fetchStaffDetails.pending]: (state) => {
      state.fsfdFetching = true;
    },
  },
});
export const { clearFsfdState } = staffDetailsSlice.actions;

export default staffDetailsSlice.reducer;
