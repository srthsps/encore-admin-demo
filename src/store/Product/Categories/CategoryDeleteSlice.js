import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";
export const deletecategory = createAsyncThunk(
    "admin/category-delete",
    async ({ categoryID }, { rejectWithValue }) => {
        try {
            const response = await api.actionHandler({
                url: api.categoriesDeleteURL.replace("{id}", categoryID),
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

const categoryDeleteSlice = createSlice({
    name: "category-delete",
    initialState: {
        categoryDeleteFetching: false,
        categoryDeleteSuccess: false,
        categoryDeleteError: false,
        categoryDeleteErrorMessage: "",
    },
    reducers: {
        clearcategoryDeleteState: (state) => {
            state.categoryDeleteError = false;
            state.categoryDeleteSuccess = false;
            state.categoryDeleteFetching = false;
            state.categoryDeleteErrorMessage = "";

            return state;
        },
    },
    extraReducers: {
        [deletecategory.fulfilled]: (state, { payload }) => {
            state.categoryDeleteFetching = false;
            state.categoryDeleteSuccess = true;
            return state;
        },
        [deletecategory.rejected]: (state, action) => {
            state.categoryDeleteFetching = false;
            state.categoryDeleteError = true;
            state.categoryDeleteErrorMessage = action?.payload;
        },
        [deletecategory.pending]: (state) => {
            state.categoryDeleteFetching = true;
        },
    },
});
export const { clearcategoryDeleteState } = categoryDeleteSlice.actions;

export default categoryDeleteSlice.reducer;
