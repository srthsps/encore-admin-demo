import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../../api'

export const fetchBrandList = createAsyncThunk(
  'admin/Brand-list',
  async ({ limit, offset }, { rejectWithValue }) => {
    //   async ({limit ,offset}, { rejectWithValue }) => {
    try {
      const response = await api.actionHandler({
        // url: api.brandListURL,
        url: api.brandListURL
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
const BrandListSlice = createSlice({
  name: 'Brand-list',
  initialState: {
    BrandList: [],
    brandListFetching: false,
    brandListSuccess: false,
    brandListError: false,
    brandListErrorMessage: '',
    BrandCount: null,
  },
  reducers: {
    brandListClearState: (state) => {
      state.brandListError = false
      state.brandListSuccess = false
      state.brandListFetching = false

      return state
    },
  },
  extraReducers: {
    [fetchBrandList.fulfilled]: (state, { payload }) => {
      state.BrandList = []
      payload.data.results.forEach((item) => state.BrandList.push(item))
      state.BrandListCount = payload.data.count
      state.brandListFetching = false
      state.brandListSuccess = true
      return state
    },
    [fetchBrandList.rejected]: (state, action) => {
      state.brandListFetching = false
      state.brandListError = true
      state.brandListErrorMessage = action?.payload
    },
    [fetchBrandList.pending]: (state) => {
      state.brandListFetching = true
    },
  },
})

export const { brandListClearState } = BrandListSlice.actions

export default BrandListSlice.reducer
