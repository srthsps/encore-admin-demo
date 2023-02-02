import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const orderStatusUpdate = createAsyncThunk(
    "admin/order-status-update",
    async ({ payload,orderID }, { rejectWithValue }) => {
        try {
            const response = await api.actionHandler({
                url: api.orderStatusURL.replace("{id}",orderID),
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

const orderStatusUpdateSlice = createSlice({
    name: "order-status-update",
    initialState: {
        orderStatusUpdateFetching: false,
        orderStatusUpdateSuccess: false,
        orderStatusUpdateError: false,
        orderStatusUpdateErrorMessage: "",
    },
    reducers: {
        clearStatusUpdateState: (state) => {
            state.orderStatusUpdateError = false;
            state.orderStatusUpdateSuccess = false;
            state.orderStatusUpdateFetching = false;

            return state;
        },
    },
    extraReducers: {
        [orderStatusUpdate.fulfilled]: (state, { payload }) => {
            state.orderStatusUpdateFetching = false;
            state.orderStatusUpdateSuccess = true;
            return state;
        },
        [orderStatusUpdate.rejected]: (state, action) => {
            state.orderStatusUpdateFetching = false;
            state.orderStatusUpdateError = true;
            state.orderStatusUpdateErrorMessage = action?.payload;
        },
        [orderStatusUpdate.pending]: (state) => {
            state.orderStatusUpdateFetching = true;
        },
    },
});

export const { clearStatusUpdateState } = orderStatusUpdateSlice.actions;

export default orderStatusUpdateSlice.reducer;
