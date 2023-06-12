"use client";
import React, { useEffect, useState } from "react";
import {
  Bars3Icon,
  CogIcon,
  MoonIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

export const MainMenu = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, [darkMode]);

  const handleDarkMode = () => {
    if (darkMode) {
      localStorage.theme = "light";
    } else {
      localStorage.theme = "dark";
    }
    setDarkMode(!darkMode);
  };

  return (
    <div className="">
      <button onClick={handleOpenMenu}>
        <Bars3Icon className="w-6 h-6" />
      </button>
      <div
        className={clsx(
          openMenu ? "scale-100" : "scale-0",
          "absolute top-14 left-3 origin-top-left dark:bg-black/50 transition-transform shadow-lg w-[80%] h-56 rounded-lg bg-white/75 backdrop-blur-[10px]"
        )}
      >
        <div className="">
          <div className="flex items-center gap-4 hover:bg-black/5 px-2 py-1 rounded-md mx-2 my-1">
            <CogIcon className="w-5 h-5 text-gray-600" />
            <span className="flex-1 font-medium text-sm">Setting</span>
          </div>
          <div
            className="flex items-center gap-4 hover:bg-black/5 px-2 py-1 rounded-md mx-2 my-1 cursor-pointer"
            onClick={handleDarkMode}
          >
            <MoonIcon className="w-5 h-5 text-gray-600" />
            <span className="flex-1 font-medium text-sm">Dark Mode</span>
            <label htmlFor="darkmode" className="touch-manipulation">
              <input
                type="checkbox"
                name="darkmode"
                id="darkmode"
                checked={darkMode}
                onChange={handleDarkMode}
                className="w-0 h-0 opacity-0 appearance-none"
              />
              <span
                className={clsx(
                  darkMode ? "after:right-0" : "after:left-0",
                  "relative w-8 h-3 rounded-md after:transition-transform bg-gray-300 inline-block after:content-[''] after:-top-[0.1rem] after:w-4 after:h-4 after:rounded-full after:bg-white after:border after:absolute"
                )}
              ></span>
            </label>
          </div>
          <div className="flex items-center gap-4 hover:bg-black/5 px-2 py-1 rounded-md mx-2 my-1">
            <UserIcon className="w-5 h-5 text-gray-600" />
            <span className="flex-1 font-medium text-sm">Profile</span>
          </div>
        </div>
      </div>
    </div>
  );
};
