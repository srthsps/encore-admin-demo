import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";
export const deleteproduct = createAsyncThunk(
    "admin/product-delete",
    async ({ productID }, { rejectWithValue }) => {
        try {
            const response = await api.actionHandler({
                url: api.productDeleteURL.replace("{id}", productID),
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

const productDeleteSlice = createSlice({
    name: "product-delete",
    initialState: {
        productDeleteFetching: false,
        productDeleteSuccess: false,
        productDeleteError: false,
        productDeleteErrorMessage: "",
    },
    reducers: {
        clearproductDeleteState: (state) => {
            state.productDeleteError = false;
            state.productDeleteSuccess = false;
            state.productDeleteFetching = false;
            state.productDeleteErrorMessage = "";

            return state;
        },
    },
    extraReducers: {
        [deleteproduct.fulfilled]: (state, { payload }) => {
            state.productDeleteFetching = false;
            state.productDeleteSuccess = true;
            return state;
        },
        [deleteproduct.rejected]: (state, action) => {
            state.productDeleteFetching = false;
            state.productDeleteError = true;
            state.productDeleteErrorMessage = action?.payload;
        },
        [deleteproduct.pending]: (state) => {
            state.productDeleteFetching = true;
        },
    },
});
export const { clearproductDeleteState } = productDeleteSlice.actions;

export default productDeleteSlice.reducer;
