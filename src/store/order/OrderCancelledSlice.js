import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const fetchorderCancelled = createAsyncThunk(
    "admin/order-Cancelled",
    async ({ orderID }, { rejectWithValue }) => {
        console.log("id:::", orderID);
        try {
            const response = await api.actionHandler({
                url: api.orderCancelled.replace("{id}", orderID),
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
const orderCancelledSlice = createSlice({
    name: "order-Cancelled",
    initialState: {
        orderCancelled: {},
        orderCancelledFetching: false,
        orderCancelledSuccess: false,
        orderCancelledError: false,
        orderCancelledErrorMessage: "",
    },
    reducers: {
        clearorderCancelledState: (state) => {
            state.orderCancelledError = false;
            state.orderCancelledSuccess = false;
            state.orderCancelledFetching = false;

            return state;
        },
    },
    extraReducers: {
        [fetchorderCancelled.fulfilled]: (state, { payload }) => {
            state.orderCancelled = payload.data;
            // payload.data.products.forEach(data => state.orderCancelledpro.push(data))
            state.orderCancelledFetching = false;
            state.orderCancelledSuccess = true;
            return state;
        },
        [fetchorderCancelled.rejected]: (state, action) => {
            state.orderCancelledFetching = false;
            state.orderCancelledError = true;
            state.orderCancelledErrorMessage = action?.payload;
        },
        [fetchorderCancelled.pending]: (state) => {
            state.orderCancelledFetching = true;
        },
    },
});

export const { clearorderCancelledState } = orderCancelledSlice.actions;

export default orderCancelledSlice.reducer;
