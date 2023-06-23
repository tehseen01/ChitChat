import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isAddContactModal: false,
  },
  reducers: {
    openAddContactModal: (state, action) => {
      state.isAddContactModal = action.payload;
    },
  },
});

export const { openAddContactModal } = modalSlice.actions;
export default modalSlice.reducer;
