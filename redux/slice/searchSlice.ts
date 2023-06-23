import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchInput: "",
    searchResult: {},
    searchResultBox: false,
    inputFocus: false,
  },
  reducers: {
    setSearchInput: (state, action) => {
      state.searchInput = action.payload;
    },
    setSearchResult: (state, action) => {
      state.searchResult = action.payload;
    },
    setSearchResultBox: (state, action) => {
      state.searchResultBox = action.payload;
    },
    setInputFocus: (state, action) => {
      state.inputFocus = action.payload;
    },
  },
});

export const {
  setSearchInput,
  setInputFocus,
  setSearchResult,
  setSearchResultBox,
} = searchSlice.actions;
export default searchSlice.reducer;
