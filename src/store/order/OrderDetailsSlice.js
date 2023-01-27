import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api'

export const fetchorderDetails = createAsyncThunk(
  'admin/order-Details',
  async ({ orderID }, { rejectWithValue }) => {
    console.log('id:::', orderID)
    try {
      const response = await api.actionHandler({
        url: api.orderDetails.replace('{id}', orderID),
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
const orderDetailsSlice = createSlice({
  name: 'order-Details',
  initialState: {
    orderDetails: {},
    orderDetailsStatus: {},
    orderDetailspro: [],
    orderDetailsFetching: false,
    orderDetailsSuccess: false,
    orderDetailsError: false,
    orderDetailsErrorMessage: '',
  },
  reducers: {
    clearorderDetailsState: (state) => {
      state.orderDetailsError = false
      state.orderDetailsSuccess = false
      state.orderDetailsFetching = false

      return state
    },
  },
  extraReducers: {
    [fetchorderDetails.fulfilled]: (state, { payload }) => {
      state.orderDetails = payload.data
      state.orderDetailspro = payload.data.products
      state.orderDetailsStatus = payload.data.products.status
      // payload.data.products.forEach(data => state.orderDetailspro.push(data))
      state.orderDetailsFetching = false
      state.orderDetailsSuccess = true
      return state
    },
    [fetchorderDetails.rejected]: (state, action) => {
      state.orderDetailsFetching = false
      state.orderDetailsError = true
      state.orderDetailsErrorMessage = action?.payload
    },
    [fetchorderDetails.pending]: (state) => {
      state.orderDetailsFetching = true
    },
  },
})

export const { clearorderDetailsState } = orderDetailsSlice.actions

export default orderDetailsSlice.reducer
