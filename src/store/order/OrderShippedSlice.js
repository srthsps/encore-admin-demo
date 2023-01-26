import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const fetchorderShipped = createAsyncThunk(
    "admin/order-Shipped",
    async ({ orderID }, { rejectWithValue }) => {
        console.log("id:::", orderID);
        try {
            const response = await api.actionHandler({
                url: api.orderShipped.replace("{id}", orderID),
                method: "PATCH",
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
const orderShippedSlice = createSlice({
    name: "order-Shipped",
    initialState: {
        orderShipped: {},
        orderShippedFetching: false,
        orderShippedSuccess: false,
        orderShippedError: false,
        orderShippedErrorMessage: "",
    },
    reducers: {
        clearorderShippedState: (state) => {
            state.orderShippedError = false;
            state.orderShippedSuccess = false;
            state.orderShippedFetching = false;

            return state;
        },
    },
    extraReducers: {
        [fetchorderShipped.fulfilled]: (state, { payload }) => {
            state.orderShipped = payload.data;
            // payload.data.products.forEach(data => state.orderShippedpro.push(data))
            state.orderShippedFetching = false;
            state.orderShippedSuccess = true;
            return state;
        },
        [fetchorderShipped.rejected]: (state, action) => {
            state.orderShippedFetching = false;
            state.orderShippedError = true;
            state.orderShippedErrorMessage = action?.payload;
        },
        [fetchorderShipped.pending]: (state) => {
            state.orderShippedFetching = true;
        },
    },
});

export const { clearorderShippedState } = orderShippedSlice.actions;

export default orderShippedSlice.reducer;
