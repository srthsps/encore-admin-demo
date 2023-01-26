import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";

export const editCategory = createAsyncThunk(
  "admin/Category-edit",
  async ({ payload, categoryID }, { rejectWithValue }) => {
    try {
      const response = await api.actionHandler({
        url: api.categoriesEditURL.replace("{id}", categoryID),
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
const CategoryEditSlice = createSlice({
  name: "Category-edit",
  initialState: {
    CategoryFetching: false,
    CategorySuccess: false,
    CategoryError: false,
    CategoryErrorMessage: "",
  },
  reducers: {
    clearCategoryState: (state) => {
      state.CategoryError = false;
      state.CategorySuccess = false;
      state.CategoryFetching = false;

      return state;
    },
  },
  extraReducers: {
    [editCategory.fulfilled]: (state, { payload }) => {
      state.CategoryFetching = false;
      state.CategorySuccess = true;
      return state;
    },
    [editCategory.rejected]: (state, action) => {
      state.CategoryFetching = false;
      state.CategoryError = true;
      state.CategoryErrorMessage = action?.payload;
    },
    [editCategory.pending]: (state) => {
      state.CategoryFetching = true;
    },
  },
});

export const { clearCategoryState } = CategoryEditSlice.actions;

export default CategoryEditSlice.reducer;
