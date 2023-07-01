"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect } from "react";
import UserProfile from "./UserProfile";
import clsx from "clsx";
import { useParams } from "next/navigation";
import { setMessages, setSingleChat } from "@/redux/slice/chatSlice";
import { sortID } from "@/lib/sortID";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

const MessageLayout = ({ children }: { children: React.ReactNode }) => {
  const { openChat, chatUserProfile, chatList } = useAppSelector(
    (state) => state.chat
  );
  const { currentUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const combineID = sortID(currentUser.uid, id);

  useEffect(() => {
    const findUserChat = chatList.find((chat) => chat.chatID === combineID);
    dispatch(setSingleChat(findUserChat));
  }, [chatList, combineID, dispatch]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "messages", combineID), async (doc) => {
      try {
        if (doc.exists()) {
          const messageData = doc.data();
          const messages = messageData.messages || [];

          const populatedMessage = await Promise.all(
            messages.map(async (message: any) => {
              const senderDoc = await getDoc(message.sender);
              const senderData = senderDoc.data();

              const populatedMessage = {
                ...message,
                sender: senderData,
                readAt: message.readAt.toDate().toISOString(),
                sendAt: message.sendAt.toDate().toISOString(),
              };
              return populatedMessage;
            })
          );

          dispatch(setMessages(populatedMessage));
        }
      } catch (err) {
        console.log(err);
      }
    });

    return () => {
      unSub();
    };
  }, [combineID, dispatch]);

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
