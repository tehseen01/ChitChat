"use client";
import React, { useEffect, useState } from "react";
import {
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  CogIcon,
  EllipsisVerticalIcon,
  MoonIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useTheme } from "next-themes";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import { openContact } from "@/redux/slice/contactSlice";
import { useAppDispatch } from "@/redux/hooks";

const MainMenu = () => {
  const dispatch = useAppDispatch();
  const { theme, setTheme } = useTheme();
  const [openMenu, setOpenMenu] = useState(false);

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const afterClass = theme === "dark" ? "after:right-0" : "after:left-0";
  const spanClass = clsx(
    'relative w-8 h-3 rounded-md after:transition-transform bg-gray-300 inline-block after:content-[""] after:-top-[0.1rem] after:w-4 after:h-4 after:rounded-full after:bg-white after:border after:absolute',
    afterClass
  );

  return (
    <div className="">
      <button
        onClick={handleOpenMenu}
        className="hover:bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center"
      >
        <EllipsisVerticalIcon className="w-6 h-6" />
      </button>
      {openMenu && (
        <div
          className="fixed inset-0 w-full h-full"
          onClick={() => setOpenMenu(!openMenu)}
        ></div>
      )}
      <div
        className={clsx(
          openMenu ? "scale-100" : "scale-0",
          "absolute top-16 right-3 origin-top-right transition-transform shadow-shadow w-[70%] h-56 rounded-lg backdrop-blur-[10px]"
        )}
      >
        <div className="">
          <div className="flex items-center gap-4 hover:bg-black/5 px-2 py-1 rounded-md mx-2 my-1">
            <CogIcon className="w-5 h-5 text-gray-600" />
            <span className="flex-1 font-medium text-sm">Setting</span>
          </div>
          <div
            className="flex items-center gap-4 hover:bg-black/5 px-2 py-1 rounded-md mx-2 my-1 cursor-pointer"
            onClick={handleThemeChange}
          >
            <MoonIcon className="w-5 h-5 text-gray-600" />
            <span className="flex-1 font-medium text-sm">Dark Mode</span>
            <label htmlFor="darkmode" className="touch-manipulation">
              <input
                type="checkbox"
                name="darkmode"
                id="darkmode"
                // checked={theme}
                className="w-0 h-0 opacity-0 appearance-none"
              />
              <span className={spanClass}></span>
            </label>
          </div>
          <div
            onClick={() => dispatch(openContact(true))}
            className="flex items-center gap-4 hover:bg-black/5 px-2 py-1 rounded-md mx-2 my-1 cursor-pointer"
          >
            <UserIcon className="w-5 h-5 text-gray-600" />
            <span className="flex-1 font-medium text-sm">Contacts</span>
          </div>
          <div
            className="flex items-center gap-4 hover:bg-black/5 px-2 py-1 rounded-md mx-2 my-1 cursor-pointer"
            onClick={handleLogOut}
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5 text-gray-600" />
            <span className="flex-1 font-medium text-sm">Log Out</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
