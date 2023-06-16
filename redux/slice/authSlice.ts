import { createSlice } from "@reduxjs/toolkit";

interface State {
  currentUser: any;
  isLoading: boolean;
  isError: boolean;
}

const initialState: State = {
  currentUser: null,
  isLoading: false,
  isError: false,
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
  },
});

export const { setCurrentUser, clearUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
