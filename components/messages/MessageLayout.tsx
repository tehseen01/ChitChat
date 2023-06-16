import { useAppSelector } from "@/redux/hooks";
import React from "react";
import UserProfile from "./UserProfile";
import clsx from "clsx";

const MessageLayout = ({ children }: { children: React.ReactNode }) => {
  const { openChat, chatUserProfile } = useAppSelector((state) => state.chat);

  return (
    <main className="bg-gray-50">
      {openChat && (
        <div
          className={clsx(
            openChat ? "max-sm:translate-x-0" : "max-sm:translate-x-[100vw]",
            chatUserProfile ? "lg:w-100-right-profile" : "",
            "max-sm:fixed inset-0  bg-white dark:bg-[#212121]"
          )}
        >
          {children}
          <div className={clsx("fixed inset-0 pointer-events-none")}>
            <UserProfile isOpenProfile={chatUserProfile} />
          </div>
        </div>
      )}
    </main>
  );
};

export default MessageLayout;
