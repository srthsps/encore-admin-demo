import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";
export const deleteorder = createAsyncThunk(
    "admin/order-delete",
    async ({ orderID }, { rejectWithValue }) => {
        try {
            const response = await api.actionHandler({
                url: api.orderDeleteURL.replace("{id}", orderID),
                method: "DELETE",
            });
            let data = await response;
            if (response.status === 204) {
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

const orderDeleteSlice = createSlice({
    name: "order-delete",
    initialState: {
        orderDeleteFetching: false,
        orderDeleteSuccess: false,
        orderDeleteError: false,
        orderDeleteErrorMessage: "",
    },
    reducers: {
        clearorderDeleteState: (state) => {
            state.orderDeleteError = false;
            state.orderDeleteSuccess = false;
            state.orderDeleteFetching = false;
            state.orderDeleteErrorMessage = "";

            return state;
        },
    },
    extraReducers: {
        [deleteorder.fulfilled]: (state, { payload }) => {
            state.orderDeleteFetching = false;
            state.orderDeleteSuccess = true;
            return state;
        },
        [deleteorder.rejected]: (state, action) => {
            state.orderDeleteFetching = false;
            state.orderDeleteError = true;
            state.orderDeleteErrorMessage = action?.payload;
        },
        [deleteorder.pending]: (state) => {
            state.orderDeleteFetching = true;
        },
    },
});
export const { clearorderDeleteState } = orderDeleteSlice.actions;

export default orderDeleteSlice.reducer;
