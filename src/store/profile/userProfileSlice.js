import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const fetchUserProfile = createAsyncThunk(
  "admin/user-details",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.actionHandler({
        url: api.profileURL,
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
const userProfileSlice = createSlice({
  name: "user-details",
  initialState: {
    userProfile: {},
    fupFetching: false,
    fupSuccess: false,
    fupError: false,
    fupErrorMessage: "",
  },
  reducers: {
    clearFupState: (state) => {
      state.fupError = false;
      state.fupSuccess = false;
      state.fupFetching = false;

      return state;
    },
  },
  extraReducers: {
    [fetchUserProfile.fulfilled]: (state, { payload }) => {
      state.userProfile = payload.data;

      state.fupFetching = false;
      state.fupSuccess = true;
      return state;
    },
    [fetchUserProfile.rejected]: (state, action) => {
      state.fupFetching = false;
      state.fupError = true;
      state.fupErrorMessage = action?.payload;
    },
    [fetchUserProfile.pending]: (state) => {
      state.fupFetching = true;
    },
  },
});
export const { clearFupState } = userProfileSlice.actions;

export default userProfileSlice.reducer;
