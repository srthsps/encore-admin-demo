import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";

export const fetchStaffList = createAsyncThunk(
  "admin/staff-list",
  async ({ limit ,offset ,search},{rejectWithValue}) => {
    try {
      const response = await api.actionHandler({
        url: api.userListURL.replace("{limit}", limit).replace("{offset}", offset).replace("{search}", search),
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
const staffListSlice = createSlice({
  name: "staff-list",
  initialState: {
    staffList: [],
    staffFetching: false,
    staffSuccess: false,
    staffError: false,
    staffErrorMessage: "",
    staffCount:null,
  },
  reducers: {
    staffClearState: (state) => {
      state.staffError = false;
      state.staffSuccess = false;
      state.staffFetching = false;

      return state;
    },
  },
  extraReducers: {
    [fetchStaffList.fulfilled]: (state, { payload }) => {
      state.staffList = [];
      payload.data.results.forEach((item) => state.staffList.push(item));
      state.staffCount = payload.data.count;
      state.staffFetching = false;
      state.staffSuccess = true;
      return state;
    },
    [fetchStaffList.rejected]: (state, action) => {
      state.staffFetching = false;
      state.staffError = true;
      state.staffErrorMessage = action?.payload;
    },
    [fetchStaffList.pending]: (state) => {
      state.staffFetching = true;
    },
  },
});

export const { staffClearState } = staffListSlice.actions;

export default staffListSlice.reducer;
