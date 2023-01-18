import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";
export const deleteStaff = createAsyncThunk(
  "admin/staff-delete",
  async ({ userID }, { rejectWithValue }) => {
    try {
      const response = await api.actionHandler({
        url: api.userDetailsURL.replace("{id}", userID),
        method: "DELETE",
      });
      let data = await response;
      if (response.status === 204) {
        let result = response.data;
        return result;
      } else  {
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

const staffDeleteSlice = createSlice({
  name: "staff-delete",
  initialState: {
    dsdFetching: false,
    dsdSuccess: false,
    dsdError: false,
    dsdErrorMessage: "",
  },
  reducers: {
    clearDsdState: (state) => {
      state.dsdError = false;
      state.dsdSuccess = false;
      state.dsdFetching = false;
      state.dsdErrorMessage = "";

      return state;
    },
  },
  extraReducers: {
    [deleteStaff.fulfilled]: (state, { payload }) => {
      state.dsdFetching = false;
      state.dsdSuccess = true;
      return state;
    },
    [deleteStaff.rejected]: (state, action) => {
      state.dsdFetching = false;
      state.dsdError = true;
      state.dsdErrorMessage = action?.payload;
    },
    [deleteStaff.pending]: (state) => {
      state.dsdFetching = true;
    },
  },
});
export const { clearDsdState } = staffDeleteSlice.actions;

export default staffDeleteSlice.reducer;
