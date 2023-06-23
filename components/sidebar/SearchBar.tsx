"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useRef, useState } from "react";
import { query, where, getDocs } from "firebase/firestore";
import { userDocRef } from "@/lib/firebase";
import {
  setInputFocus,
  setSearchResult,
  setSearchResultBox,
} from "@/redux/slice/searchSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { searchInput, searchResult, searchResultBox, inputFocus } =
    useAppSelector((state) => state.search);

  const handleInputIcon = () => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  };

  const handleSearchUser = async () => {
    const q = query(userDocRef, where("displayName", "==", searchInput));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        dispatch(setSearchResult(doc.data()));
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.code === "Enter" && handleSearchUser();
  };

  return (
    <div
      className={clsx(
        inputFocus ? " border-blue-400" : " border-gray-100",
        "flex items-center bg-gray-100 rounded-3xl px-2 border-2"
      )}
    >
      <MagnifyingGlassIcon
        className={clsx(
          inputFocus ? "text-blue-400" : "text-gray-400",
          "w-6 h-6 "
        )}
        onClick={handleInputIcon}
      />
      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent w-full focus:outline-none focus:ring-0 focus:border-0 py-2 px-1"
        ref={inputRef}
        value={searchInput}
        onChange={(e) => dispatch(setSearchResult(e.target.value))}
        onFocus={() => dispatch(setInputFocus(true))}
        onBlur={() => dispatch(setInputFocus(false))}
        onClick={() => dispatch(setSearchResultBox(true))}
        onKeyDown={handleKeyDown}
      />
      {searchResultBox && (
        <div className="absolute top-[60px] inset-x-0 h-[calc(100vh_-_60px)] bg-gray-50 p-2">
          result
        </div>
      )}
    </div>
  );
};

export default SearchBar;
