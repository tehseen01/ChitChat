import { IChat, IMessage, IUser } from "@/lib/interface";
import { createSlice } from "@reduxjs/toolkit";

interface InitialStateProp {
  openChat: boolean;
  chatUserProfile: boolean;
  chatStatus: boolean;
  chatList: IChat[];
  singleChat: IChat;
  messages: IMessage[];
  messageStatus: boolean;
}

const initialState: InitialStateProp = {
  openChat: false,
  chatUserProfile: false,
  chatStatus: true,
  chatList: [],
  singleChat: {
    chatID: "",
    date: null,
    members: [],
    lastMessage: "",
  },

  messages: [],
  messageStatus: true,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setOpenChat: (state, action) => {
      state.openChat = action.payload;
    },

    openChatUserProfile: (state, action) => {
      state.chatUserProfile = action.payload;
    },

    setChatList: (state, action) => {
      state.chatList = action.payload;
    },

    setSingleChat: (state, action) => {
      state.singleChat = action.payload;
    },

    setMessages: (state, action) => {
      state.messages = action.payload;
    },

    setMessageStatus: (state, action) => {
      state.messageStatus = action.payload;
    },

    setChatStatus: (state, action) => {
      state.chatStatus = action.payload;
    },
  },
});

export const {
  setOpenChat,
  openChatUserProfile,
  setChatList,
  setSingleChat,
  setMessages,
  setMessageStatus,
  setChatStatus,
} = chatSlice.actions;
export default chatSlice.reducer;
