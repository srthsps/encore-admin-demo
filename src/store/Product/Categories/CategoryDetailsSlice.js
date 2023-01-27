import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";

export const fetchcategoryDetailsList = createAsyncThunk(
    "admin/categoryDetails-list",
    async ({ DetailsID }, { rejectWithValue }) => {

        try {
            const response = await api.actionHandler({
                url: api.categoriesDetailsURL.replace("{id}", DetailsID),
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
const categoryDetailsListSlice = createSlice({
    name: "categoryDetails-list",
    initialState: {
        categoryDetailsList: {},
        categoryDetailsFetching: false,
        categoryDetailsSuccess: false,
        categoryDetailsError: false,
        categoryDetailsErrorMessage: "",
    },
    reducers: {
        categoryDetailsClearState: (state) => {
            state.categoryDetailsError = false;
            state.categoryDetailsSuccess = false;
            state.categoryDetailsFetching = false;

            return state;
        },
    },
    extraReducers: {
        [fetchcategoryDetailsList.fulfilled]: (state, { payload }) => {
            state.categoryDetailsList = payload.data;
            // payload.data.results.forEach((item) => state.categoryDetailsList.push(item));
            state.categoryDetailsFetching = false;
            state.categoryDetailsSuccess = true;
            return state;
        },
        [fetchcategoryDetailsList.rejected]: (state, action) => {
            state.categoryDetailsFetching = false;
            state.categoryDetailsError = true;
            state.categoryDetailsErrorMessage = action?.payload;
        },
        [fetchcategoryDetailsList.pending]: (state) => {
            state.categoryDetailsFetching = true;
        },
    },
});

export const { categoryDetailsClearState } = categoryDetailsListSlice.actions;

export default categoryDetailsListSlice.reducer;
