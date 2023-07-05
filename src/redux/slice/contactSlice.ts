import { IUser } from "@/lib/interface";
import { createSlice } from "@reduxjs/toolkit";

interface ContactStateProp {
  isContact: boolean;
  searchResultContact: IUser | null;
  allContacts: IUser[];
  userNotFound: boolean;
}

const initialState: ContactStateProp = {
  isContact: false,
  searchResultContact: null,
  allContacts: [],
  userNotFound: false,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    openContact: (state, action) => {
      state.isContact = action.payload;
    },
    setSearchResultContact: (state, action) => {
      state.searchResultContact = action.payload;
    },
    setContacts: (state, action) => {
      state.allContacts = action.payload;
    },

    setUserNotFound: (state, action) => {
      state.userNotFound = action.payload;
    },
  },
});

export const {
  openContact,
  setSearchResultContact,
  setContacts,
  setUserNotFound,
} = contactSlice.actions;
export default contactSlice.reducer;
