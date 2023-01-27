import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api'

export const editProduct = createAsyncThunk(
  'admin/product-edit',
  async ({ payload, productID }, { rejectWithValue }) => {
    try {
      const response = await api.actionHandler({
        url: api.productEditURL.replace('{id}', productID),
        method: 'PATCH',
        data: payload,
      })

      let data = await response
      if (response.status === 201) {
        let sam = response.data
        return sam
      } else {
        return rejectWithValue(data)
      }
    } catch (e) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString()

      return rejectWithValue(message)
    }
  },
)
const EditProductSlice = createSlice({
  name: 'product-edit',
  initialState: {
    editProductFetching: false,
    editProductSuccess: false,
    editProductError: false,
    editProductErrorMessage: '',
  },
  reducers: {
    cleareditProductState: (state) => {
      state.editProductError = false
      state.editProductSuccess = false
      state.editProductFetching = false

      return state
    },
  },
  extraReducers: {
    [editProduct.fulfilled]: (state, { payload }) => {
      state.editProductFetching = false
      state.editProductSuccess = true
      return state
    },
    [editProduct.rejected]: (state, action) => {
      state.editProductFetching = false
      state.editProductError = true
      state.editProductErrorMessage = action?.payload
    },
    [editProduct.pending]: (state) => {
      state.editProductFetching = true
    },
  },
})

export const { cleareditProductState } = EditProductSlice.actions

export default EditProductSlice.reducer
