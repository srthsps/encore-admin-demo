import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const fetchSidebarPermissionDetails = createAsyncThunk(
  "admin/sidebarPermission-details",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.actionHandler({
        url: api.sidebarPermissionDetailsURL,
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
const sidebarPermissionDetailsSlice = createSlice({
  name: "sidebarPermission-details",
  initialState: {
    sidebarPermissionDetails: {},
    fspdFetching: false,
    fspdSuccess: false,
    fspdError: false,
    fspdErrorMessage: "",
  },
  reducers: {
    clearFspdState: (state) => {
      state.fspdError = false;
      state.fspdSuccess = false;
      state.fspdFetching = false;

      return state;
    },
  },
  extraReducers: {
    [fetchSidebarPermissionDetails.fulfilled]: (state, { payload }) => {
      state.sidebarPermissionDetails = payload.data;

      state.fspdFetching = false;
      state.fspdSuccess = true;
      return state;
    },
    [fetchSidebarPermissionDetails.rejected]: (state, action) => {
      state.fspdFetching = false;
      state.fspdError = true;
      state.fspdErrorMessage = action?.payload;
    },
    [fetchSidebarPermissionDetails.pending]: (state) => {
      state.fspdFetching = true;
    },
  },
});
export const { clearFspdState } = sidebarPermissionDetailsSlice.actions;

export default sidebarPermissionDetailsSlice.reducer;
