"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect } from "react";
import clsx from "clsx";
import { useParams } from "next/navigation";
import {
  setMessageStatus,
  setMessages,
  setSingleChat,
} from "@/redux/slice/chatSlice";
import { sortID } from "@/lib/sortID";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import UserProfile from "@/components/messages/UserProfile";

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
          dispatch(setMessageStatus(false));
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
    <div
      className={clsx(
        chatUserProfile ? "lg:w-100-right-profile" : "",
        "max-sm:fixed inset-0 bg-background h-[100dvh]"
      )}
    >
      {children}
      <div className={clsx("fixed inset-0 pointer-events-none")}>
        <UserProfile isOpenProfile={chatUserProfile} />
      </div>
    </div>
  );
};

export default MessageLayout;
