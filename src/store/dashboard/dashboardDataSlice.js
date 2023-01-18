import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const fetchDashboardDetails = createAsyncThunk(
  "admin/dashboard-details",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.actionHandler({
        url: api.dashboardDataURL,
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
const dashboardDataSlice = createSlice({
  name: "dashboard-details",
  initialState: {
    dashboardDetails: {},
    fddFetching: false,
    fddSuccess: false,
    fddError: false,
    fddErrorMessage: "",
  },
  reducers: {
    clearFddState: (state) => {
      state.fddError = false;
      state.fddSuccess = false;
      state.fddFetching = false;

      return state;
    },
  },
  extraReducers: {
    [fetchDashboardDetails.fulfilled]: (state, { payload }) => {
      state.dashboardDetails = payload.result;

      state.fddFetching = false;
      state.fddSuccess = true;
      return state;
    },
    [fetchDashboardDetails.rejected]: (state, action) => {
      state.fddFetching = false;
      state.fddError = true;
      state.fddErrorMessage = action?.payload;
    },
    [fetchDashboardDetails.pending]: (state) => {
      state.fddFetching = true;
    },
  },
});
export const { clearFddState } = dashboardDataSlice.actions;

export default dashboardDataSlice.reducer;
