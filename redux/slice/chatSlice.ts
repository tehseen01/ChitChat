import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    openChat: false,
    chatUserProfile: false,
  },
  reducers: {
    setOpenChat: (state, action) => {
      state.openChat = action.payload;
    },

    openChatUserProfile: (state, action) => {
      state.chatUserProfile = action.payload;
    },
  },
});

export const { setOpenChat, openChatUserProfile } = chatSlice.actions;
export default chatSlice.reducer;
