import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const fetchOrderList = createAsyncThunk(
  "admin/order-list",
  async ({ limit, offset }, { rejectWithValue }) => {
    try {
      const response = await api.actionHandler({
        // url: api.orderList,
        url: api.orderList.replace("{limit}", limit).replace("{offset}", offset),
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
const orderListSlice = createSlice({
  name: "order-list",
  initialState: {
    orderList: [],
    orderFetching: false,
    orderSuccess: false,
    orderError: false,
    orderErrorMessage: "",
    orderCount: null,

  },
  reducers: {
    orderClearState: (state) => {
      state.orderError = false;
      state.orderSuccess = false;
      state.orderFetching = false;

      return state;
    },
  },
  extraReducers: {
    [fetchOrderList.fulfilled]: (state, { payload }) => {
      state.orderList = [];
      payload.data.results.forEach((item) => state.orderList.push(item));
      state.orderCount = payload.data.count;
      state.orderFetching = false;
      state.orderSuccess = true;
      return state;
    },
    [fetchOrderList.rejected]: (state, action) => {
      state.orderFetching = false;
      state.orderError = true;
      state.orderErrorMessage = action?.payload;
    },
    [fetchOrderList.pending]: (state) => {
      state.orderFetching = true;
    },
  },
});

export const { orderClearState } = orderListSlice.actions;

export default orderListSlice.reducer;
