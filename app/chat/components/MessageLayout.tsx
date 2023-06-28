"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect } from "react";
import UserProfile from "./UserProfile";
import clsx from "clsx";
import { useParams } from "next/navigation";
import { setSingleChat } from "@/redux/slice/chatSlice";

const MessageLayout = ({ children }: { children: React.ReactNode }) => {
  const { openChat, chatUserProfile, chatList } = useAppSelector(
    (state) => state.chat
  );
  const { currentUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const combineID =
    currentUser.uid > id ? currentUser.uid + id : id + currentUser.uid;

  useEffect(() => {
    const findUserChat = chatList.find((chat) => chat.chatId === combineID);
    dispatch(setSingleChat(findUserChat));
  }, [chatList, combineID, dispatch]);

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
