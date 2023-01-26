import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";
export const deleteBrand = createAsyncThunk(
    "admin/Brand-delete",
    async ({ BrandID }, { rejectWithValue }) => {
        try {
            const response = await api.actionHandler({
                url: api.brandDelteURL.replace("{id}", BrandID),
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

const BrandDeleteSlice = createSlice({
    name: "Brand-delete",
    initialState: {
        BrandDeleteFetching: false,
        BrandDeleteSuccess: false,
        BrandDeleteError: false,
        BrandDeleteErrorMessage: "",
    },
    reducers: {
        clearBrandDeleteState: (state) => {
            state.BrandDeleteError = false;
            state.BrandDeleteSuccess = false;
            state.BrandDeleteFetching = false;
            state.BrandDeleteErrorMessage = "";

            return state;
        },
    },
    extraReducers: {
        [deleteBrand.fulfilled]: (state, { payload }) => {
            state.BrandDeleteFetching = false;
            state.BrandDeleteSuccess = true;
            return state;
        },
        [deleteBrand.rejected]: (state, action) => {
            state.BrandDeleteFetching = false;
            state.BrandDeleteError = true;
            state.BrandDeleteErrorMessage = action?.payload;
        },
        [deleteBrand.pending]: (state) => {
            state.BrandDeleteFetching = true;
        },
    },
});
export const { clearBrandDeleteState } = BrandDeleteSlice.actions;

export default BrandDeleteSlice.reducer;
