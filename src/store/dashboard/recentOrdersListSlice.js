import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const fetchRecentOrderList = createAsyncThunk(
  "admin/recent-order-list",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.actionHandler({
        url: api.recentOrdersListURL,
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
const recentOrdersListSlice = createSlice({
  name: "recent-order-list",
  initialState: {
    recentOrderList: [],
    recentOrderListFetching: false,
    recentOrderListSuccess: false,
    recentOrderListError: false,
    recentOrderListErrorMessage: "",
    orderCount: null,
  },
  reducers: {
    recentOrderListClearState: (state) => {
      state.recentOrderListError = false;
      state.recentOrderListSuccess = false;
      state.recentOrderListFetching = false;

      return state;
    },
  },
  extraReducers: {
    [fetchRecentOrderList.fulfilled]: (state, { payload }) => {
      state.recentOrderList = [];
      payload.data.results.forEach((item) => state.recentOrderList.push(item));
      state.orderCount = payload.data.count;
      state.recentOrderListFetching = false;
      state.recentOrderListSuccess = true;
      return state;
    },
    [fetchRecentOrderList.rejected]: (state, action) => {
      state.recentOrderListFetching = false;
      state.recentOrderListError = true;
      state.recentOrderListErrorMessage = action?.payload;
    },
    [fetchRecentOrderList.pending]: (state) => {
      state.recentOrderListFetching = true;
    },
  },
});

export const { recentOrderListClearState } = recentOrdersListSlice.actions;

export default recentOrdersListSlice.reducer;
