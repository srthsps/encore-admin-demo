import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const fetchorderProcess = createAsyncThunk(
    "admin/order-Process",
    async ({ orderID }, { rejectWithValue }) => {
        console.log("id:::", orderID);
        try {
            const response = await api.actionHandler({
                url: api.orderProcessing.replace("{id}", orderID),
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
const orderProcessSlice = createSlice({
    name: "order-Process",
    initialState: {
        orderProcess: {},
        orderProcessStatus: {},
        orderProcesspro: [],
        orderProcessFetching: false,
        orderProcessSuccess: false,
        orderProcessError: false,
        orderProcessErrorMessage: "",
    },
    reducers: {
        clearorderProcessState: (state) => {
            state.orderProcessError = false;
            state.orderProcessSuccess = false;
            state.orderProcessFetching = false;

            return state;
        },
    },
    extraReducers: {
        [fetchorderProcess.fulfilled]: (state, { payload }) => {
            state.orderProcess = payload.data;
            state.orderProcesspro = payload.data.products;
            state.orderProcessStatus = payload.data.products.status;
            // payload.data.products.forEach(data => state.orderProcesspro.push(data))
            state.orderProcessFetching = false;
            state.orderProcessSuccess = true;
            return state;
        },
        [fetchorderProcess.rejected]: (state, action) => {
            state.orderProcessFetching = false;
            state.orderProcessError = true;
            state.orderProcessErrorMessage = action?.payload;
        },
        [fetchorderProcess.pending]: (state) => {
            state.orderProcessFetching = true;
        },
    },
});

export const { clearorderProcessState } = orderProcessSlice.actions;

export default orderProcessSlice.reducer;
