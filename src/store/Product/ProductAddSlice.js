import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api'

export const addProduct = createAsyncThunk(
  'admin/product-add',
  async ({ payload }, { rejectWithValue }) => {
    try {
      const response = await api.actionHandler({
        url: api.productAddURL,
        method: 'POST',
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
const productAddSlice = createSlice({
  name: 'product-add',
  initialState: {
    addProductFetching: false,
    addProductSuccess: false,
    addProductError: false,
    addProductErrorMessage: '',
  },
  reducers: {
    clearaddProductState: (state) => {
      state.addProductError = false
      state.addProductSuccess = false
      state.addProductFetching = false

      return state
    },
  },
  extraReducers: {
    [addProduct.fulfilled]: (state, { payload }) => {
      state.addProductFetching = false
      state.addProductSuccess = true
      return state
    },
    [addProduct.rejected]: (state, action) => {
      state.addProductFetching = false
      state.addProductError = true
      state.addProductErrorMessage = action?.payload
    },
    [addProduct.pending]: (state) => {
      state.addProductFetching = true
    },
  },
})

export const { clearaddProductState } = productAddSlice.actions

export default productAddSlice.reducer
