import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api'

export const fetchProductList = createAsyncThunk(
  'admin/Product-list',
  async ({ limit, offset }, { rejectWithValue }) => {
    //   async ({limit ,offset}, { rejectWithValue }) => {
    try {
      const response = await api.actionHandler({
        // url: api.productListURL,
        url: api.productListURL
          .replace('{limit}', limit)
          .replace('{offset}', offset),
        method: 'GET',
      })

      let data = await response
      if (response.status === 200) {
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
const ProductListSlice = createSlice({
  name: 'Product-list',
  initialState: {
    ProductsList: [],
    bclFetching: false,
    bclSuccess: false,
    bclError: false,
    bclErrorMessage: '',
    ProductCount: null,
  },
  reducers: {
    bclClearState: (state) => {
      state.bclError = false
      state.bclSuccess = false
      state.bclFetching = false

      return state
    },
  },
  extraReducers: {
    [fetchProductList.fulfilled]: (state, { payload }) => {
      state.ProductsList = []
      payload.data.results.forEach((item) => state.ProductsList.push(item))
      state.ProductCount = payload.data.count
      state.bclFetching = false
      state.bclSuccess = true
      return state
    },
    [fetchProductList.rejected]: (state, action) => {
      state.bclFetching = false
      state.bclError = true
      state.bclErrorMessage = action?.payload
    },
    [fetchProductList.pending]: (state) => {
      state.bclFetching = true
    },
  },
})

export const { bclClearState } = ProductListSlice.actions

export default ProductListSlice.reducer
