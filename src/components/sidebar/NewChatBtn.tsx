"use client";
import { useAppDispatch } from "@/redux/hooks";
import { openContact } from "@/redux/slice/contactSlice";
import {
  PencilIcon,
  UserGroupIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

const NewChatBtn = ({ isHovered }: { isHovered: boolean }) => {
  const [openBox, setOpenBox] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isHovered && openBox) {
      setOpenBox(!openBox);
    }
  }, [isHovered, openBox]);

  return (
    <div
      className={clsx(
        isHovered ? "translate-y-0" : "translate-y-20",
        "absolute bottom-4 origin-bottom-right transition-transform right-4 "
      )}
    >
      <div
        className={clsx(
          openBox
            ? "scale-100 opacity-100 translate-y-0"
            : "translate-y-20 scale-0 opacity-0",
          "p-2 absolute bg-white/25 bottom-20 right-4 backdrop-blur-md rounded-lg shadow-shadow flex gap-2 flex-col w-40"
        )}
      >
        <button className="py-1 px-2 rounded-md flex gap-2 items-center hover:bg-gray-100">
          <UserGroupIcon className="w-5 h-5" />

          <span>New group</span>
        </button>
        <button
          className="py-1 px-2 rounded-md flex gap-2 items-center hover:bg-gray-100"
          onClick={() => dispatch(openContact(true))}
        >
          <UserIcon className="w-5 h-5" />
          <span>New message</span>
        </button>
      </div>
      <button
        className="w-14 h-14 rounded-full bg-blue-500 flex-center text-white"
        onClick={() => setOpenBox(!openBox)}
      >
        {!openBox ? (
          <PencilIcon className="w-6 h-6" />
        ) : (
          <XMarkIcon className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};

export default NewChatBtn;
