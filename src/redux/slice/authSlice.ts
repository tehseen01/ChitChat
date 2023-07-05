import { createSlice } from "@reduxjs/toolkit";

interface State {
  currentUser: any;
  isLoading: boolean;
  isError: boolean;
  authStatus: boolean;
}

const initialState: State = {
  currentUser: null,
  isLoading: true,
  isError: false,
  authStatus: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    clearUser: (state) => {
      state.currentUser = null;
    },

    setAuthStatus: (state, action) => {
      state.authStatus = action.payload;
    },
  },
});

export const { setCurrentUser, clearUser, setLoading, setAuthStatus } =
  authSlice.actions;
export default authSlice.reducer;
