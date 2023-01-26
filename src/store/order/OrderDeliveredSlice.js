import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const fetchorderDelivered = createAsyncThunk(
    "admin/order-Delivered",
    async ({ orderID }, { rejectWithValue }) => {
        console.log("id:::", orderID);
        try {
            const response = await api.actionHandler({
                url: api.orderDelivered.replace("{id}", orderID),
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
const orderDeliveredSlice = createSlice({
    name: "order-Delivered",
    initialState: {
        orderDelivered: {},
        orderDeliveredFetching: false,
        orderDeliveredSuccess: false,
        orderDeliveredError: false,
        orderDeliveredErrorMessage: "",
    },
    reducers: {
        clearorderDeliveredState: (state) => {
            state.orderDeliveredError = false;
            state.orderDeliveredSuccess = false;
            state.orderDeliveredFetching = false;

            return state;
        },
    },
    extraReducers: {
        [fetchorderDelivered.fulfilled]: (state, { payload }) => {
            state.orderDelivered = payload.data;
            // payload.data.products.forEach(data => state.orderDeliveredpro.push(data))
            state.orderDeliveredFetching = false;
            state.orderDeliveredSuccess = true;
            return state;
        },
        [fetchorderDelivered.rejected]: (state, action) => {
            state.orderDeliveredFetching = false;
            state.orderDeliveredError = true;
            state.orderDeliveredErrorMessage = action?.payload;
        },
        [fetchorderDelivered.pending]: (state) => {
            state.orderDeliveredFetching = true;
        },
    },
});

export const { clearorderDeliveredState } = orderDeliveredSlice.actions;

export default orderDeliveredSlice.reducer;
