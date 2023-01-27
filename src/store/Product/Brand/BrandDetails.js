import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../../api'

export const fetchBrandDetails = createAsyncThunk(
  'admin/Brand-details',
  async ({ BrandID }, { rejectWithValue }) => {
    //   async ({limit ,offset}, { rejectWithValue }) => {
    try {
      const response = await api.actionHandler({
        url: api.BrandDetailsURL.replace('{id}', BrandID),
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
const BrandDetailsSlice = createSlice({
  name: 'Brand-details',
  initialState: {
    BrandDetails: {},
    BrandDetailsFetching: false,
    BrandDetailsSuccess: false,
    BrandDetailsError: false,
    BrandDetailsErrorMessage: '',
    BrandCount: null,
  },
  reducers: {
    BrandDetailsClearState: (state) => {
      state.BrandDetailsError = false
      state.BrandDetailsSuccess = false
      state.BrandDetailsFetching = false

      return state
    },
  },
  extraReducers: {
    [fetchBrandDetails.fulfilled]: (state, { payload }) => {
      state.BrandDetails = payload.data
      // payload.data.results.forEach((item) => state.BrandDetails.push(item));
      state.BrandDetailsCount = payload.data.count
      state.BrandDetailsFetching = false
      state.BrandDetailsSuccess = true
      return state
    },
    [fetchBrandDetails.rejected]: (state, action) => {
      state.BrandDetailsFetching = false
      state.BrandDetailsError = true
      state.BrandDetailsErrorMessage = action?.payload
    },
    [fetchBrandDetails.pending]: (state) => {
      state.BrandDetailsFetching = true
    },
  },
})

export const { BrandDetailsClearState } = BrandDetailsSlice.actions

export default BrandDetailsSlice.reducer
