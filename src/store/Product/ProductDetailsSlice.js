import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const fetchproductDetails = createAsyncThunk(
  "admin/Product-details",
  async ({productID}, { rejectWithValue }) => {
    try {
      const response = await api.actionHandler({
        url: api.productDetailsURL.replace("{id}",productID),
        
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
const productDetailsSlice = createSlice({
  name: "Product-details",
  initialState: {
    ProductsDetails: {},
    bclFetching: false,
    bclSuccess: false,
    bclError: false,
    bclErrorMessage: "",
    ProductCount: null,
  },
  reducers: {
    bclClearState: (state) => {
      state.bclError = false;
      state.bclSuccess = false;
      state.bclFetching = false;

      return state;
    },
  },
  extraReducers: {
    [fetchproductDetails.fulfilled]: (state, { payload }) => {
      state.ProductsDetails = payload.data;
    //   payload.data.results.forEach((item) => state.ProductsList.push(item));
      state.ProductCount = payload.data.count;
      state.bclFetching = false;
      state.bclSuccess = true;
      return state;
    },
    [fetchproductDetails.rejected]: (state, action) => {
      state.bclFetching = false;
      state.bclError = true;
      state.bclErrorMessage = action?.payload;
    },
    [fetchproductDetails.pending]: (state) => {
      state.bclFetching = true;
    },
  },
});

export const { bclClearState } = productDetailsSlice.actions;

export default productDetailsSlice.reducer;
