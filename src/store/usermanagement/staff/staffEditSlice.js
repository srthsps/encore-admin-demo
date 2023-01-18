import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";

export const editStaff = createAsyncThunk(
  "admin/staff-edit",
  async ({ payload, userID }, { rejectWithValue }) => {
    try {
      const response = await api.actionHandler({
        url: api.userDetailsURL.replace("{id}", userID),
        method: "PATCH",
        data: payload,
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
const staffEditSlice = createSlice({
  name: "staff-edit",
  initialState: {
    esdsFetching: false,
    esdsSuccess: false,
    esdsError: false,
    esdsErrorMessage: "",
  },
  reducers: {
    clearEsdsState: (state) => {
      state.esdsError = false;
      state.esdsSuccess = false;
      state.esdsFetching = false;

      return state;
    },
  },
  extraReducers: {
    [editStaff.fulfilled]: (state, { payload }) => {
      state.esdsFetching = false;
      state.esdsSuccess = true;
      return state;
    },
    [editStaff.rejected]: (state, action) => {
      state.esdsFetching = false;
      state.esdsError = true;
      state.esdsErrorMessage = action?.payload;
    },
    [editStaff.pending]: (state) => {
      state.esdsFetching = true;
    },
  },
});

export const { clearEsdsState } = staffEditSlice.actions;

export default staffEditSlice.reducer;
