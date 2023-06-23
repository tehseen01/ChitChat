"use client";
import { useAppSelector } from "@/redux/hooks";
import React from "react";
import UserProfile from "./UserProfile";
import clsx from "clsx";

const MessageLayout = ({ children }: { children: React.ReactNode }) => {
  const { openChat, chatUserProfile } = useAppSelector((state) => state.chat);

  return (
    <main className="bg-gray-50">
      <div
        className={clsx(
          chatUserProfile ? "lg:w-100-right-profile" : "",
          "max-sm:fixed inset-0 bg-background h-full"
        )}
      >
        {children}
        <div className={clsx("fixed inset-0 pointer-events-none")}>
          <UserProfile isOpenProfile={chatUserProfile} />
        </div>
      </div>
    </main>
  );
};

export default MessageLayout;
