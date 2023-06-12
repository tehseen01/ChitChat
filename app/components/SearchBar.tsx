"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useRef, useState } from "react";

export const SearchBar = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleInputIcon = () => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
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
      />
    </div>
  );
};
