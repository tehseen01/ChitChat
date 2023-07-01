import { IUser } from "@/lib/interface";
import { createSlice } from "@reduxjs/toolkit";

interface ChatList {
  chatID: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  members: IUser[];
  latestMessage: string;
}

interface IMessage {
  id: string;
  type: "text" | "media";
  content: string;
  mediaURL: string | null;
  sender: IUser;
  receiver: string;
  sendAt: Date;
  readAt: Date;
}

interface InitialStateProp {
  openChat: boolean;
  chatUserProfile: boolean;
  chatList: ChatList[];
  singleChat: ChatList;
  messages: IMessage[];
}

const initialState: InitialStateProp = {
  openChat: false,
  chatUserProfile: false,
  chatList: [],
  singleChat: {
    chatID: "",
    createdAt: null,
    updatedAt: null,
    members: [],
    latestMessage: "",
  },

  messages: [],
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
  },
});

export const {
  setOpenChat,
  openChatUserProfile,
  setChatList,
  setSingleChat,
  setMessages,
} = chatSlice.actions;
export default chatSlice.reducer;
