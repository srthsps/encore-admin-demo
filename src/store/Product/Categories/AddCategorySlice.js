import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";

export const fetchCategoryAdd = createAsyncThunk(
  "admin/category-add",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const response = await api.actionHandler({
        url: api.categoriesAddURL,
        method: "POST",
        data: payload,
      });

      let data = await response;
      if (response.status === 201) {
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
const CategoryAddSlice = createSlice({
  name: "category-add",
  initialState: {
    CategoryAddFetching: false,
    CategoryAddSuccess: false,
    CategoryAddError: false,
    CategoryAddErrorMessage: "",
  },
  reducers: {
    clearCategoryAddState: (state) => {
      state.CategoryAddError = false;
      state.CategoryAddSuccess = false;
      state.CategoryAddFetching = false;

      return state;
    },
  },
  extraReducers: {
    [fetchCategoryAdd.fulfilled]: (state, { payload }) => {
      state.CategoryAddFetching = false;
      state.CategoryAddSuccess = true;
      return state;
    },
    [fetchCategoryAdd.rejected]: (state, action) => {
      state.CategoryAddFetching = false;
      state.CategoryAddError = true;
      state.CategoryAddErrorMessage = action?.payload;
    },
    [fetchCategoryAdd.pending]: (state) => {
      state.CategoryAddFetching = true;
    },
  },
});

export const { clearCategoryAddState } = CategoryAddSlice.actions;

export default CategoryAddSlice.reducer;
