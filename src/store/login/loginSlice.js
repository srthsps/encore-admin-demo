import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const loginUser = createAsyncThunk(
  "users/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await api.actionHandler({
        url: api.loginURL,
        method: "POST",
        data: {
          username,
          password,
        },
      });

      let data = await response;
      if (response.status === 200) {
        let sam = response.data;
        localStorage.setItem("admin-token", sam.data.token.access);
        return data;
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
const userSlice = createSlice({
  name: "staff",
  initialState: {
    username: "",
    email: "",
    userID: null,
    loginFetching: false,
    loginSuccess: false,
    loginError: false,
    loginErrorMessage: "",
  },
  reducers: {
    clearLoginState: (state) => {
      state.loginError = false;
      state.loginSuccess = false;
      state.loginFetching = false;

      return state;
    },
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.username = payload.data.data.user.username;
      localStorage.setItem("username", payload.data.data.user.username);
      state.userID = payload.data.data.user.id;
      localStorage.setItem("userID", payload.data.data.user.id);
      state.loginFetching = false;
      state.loginSuccess = true;
      return state;
    },
    [loginUser.rejected]: (state, action) => {
      state.loginFetching = false;
      state.loginError = true;
      state.loginErrorMessage = action?.payload;
    },
    [loginUser.pending]: (state) => {
      state.loginFetching = true;
    },
  },
});

export const { clearLoginState } = userSlice.actions;

export default userSlice.reducer;
