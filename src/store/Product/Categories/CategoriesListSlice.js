import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";

export const fetchCategoryList = createAsyncThunk(
    "admin/Category-list",
    async ({ limit, offset }, { rejectWithValue }) => {
        //   async ({limit ,offset}, { rejectWithValue }) => {
        try {
            const response = await api.actionHandler({
                // url: api.categoriesListURL,
                url: api.categoriesListURL.replace("{limit}", limit).replace("{offset}", offset),
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
const CategoryListSlice = createSlice({
    name: "Category-list",
    initialState: {
        CategoryList: [],
        categoryFetching: false,
        categorySuccess: false,
        categoryError: false,
        categoryErrorMessage: "",
    },
    reducers: {
        categoryClearState: (state) => {
            state.categoryError = false;
            state.categorySuccess = false;
            state.categoryFetching = false;

            return state;
        },
    },
    extraReducers: {
        [fetchCategoryList.fulfilled]: (state, { payload }) => {
            state.CategoryList = [];
            payload.data.results.forEach((item) => state.CategoryList.push(item));
            state.categoryFetching = false;
            state.categorySuccess = true;
            return state;
        },
        [fetchCategoryList.rejected]: (state, action) => {
            state.categoryFetching = false;
            state.categoryError = true;
            state.categoryErrorMessage = action?.payload;
        },
        [fetchCategoryList.pending]: (state) => {
            state.categoryFetching = true;
        },
    },
});

export const { categoryClearState } = CategoryListSlice.actions;

export default CategoryListSlice.reducer;
