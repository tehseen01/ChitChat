"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useRef, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

const SearchBar = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleInputIcon = () => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  };

  const handleSearchUser = async () => {
    console.log("running");
    const q = query(
      collection(db, "users"),
      where("displayName", "==", inputValue)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.data());
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
        isInputFocused ? " border-blue-400" : " border-gray-100",
        "flex items-center bg-gray-100 rounded-3xl px-2 border-2"
      )}
    >
      <MagnifyingGlassIcon
        className={clsx(
          isInputFocused ? "text-blue-400" : "text-gray-400",
          "w-6 h-6 "
        )}
        onClick={handleInputIcon}
      />
      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent w-full focus:outline-none focus:ring-0 focus:border-0 py-2 px-1"
        ref={inputRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchBar;
