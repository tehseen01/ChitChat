import { IUser } from "@/lib/interface";
import { createSlice } from "@reduxjs/toolkit";

interface ChatList {
  chatId: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  members: IUser[];
  latestMessage: {};
}

interface InitialStateProp {
  openChat: boolean;
  chatUserProfile: boolean;
  chatList: ChatList[];
  singleChat: ChatList;
}

const initialState: InitialStateProp = {
  openChat: false,
  chatUserProfile: false,
  chatList: [],
  singleChat: {
    chatId: "",
    createdAt: null,
    updatedAt: null,
    members: [],
    latestMessage: {},
  },
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
  },
});

export const { setOpenChat, openChatUserProfile, setChatList, setSingleChat } =
  chatSlice.actions;
export default chatSlice.reducer;
