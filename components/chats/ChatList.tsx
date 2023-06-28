"use client";

import React, { useEffect } from "react";
import ChatCard from "./ChatCard";
import {
  getDoc,
  doc,
  DocumentReference,
  Timestamp,
  onSnapshot,
  DocumentData,
} from "firebase/firestore";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { db } from "@/lib/firebase";
import { setChatList } from "@/redux/slice/chatSlice";
import { IUser } from "@/lib/interface";

interface Chat {
  chatId: string;
  members: IUser[];
  latestMessage: Message;
  createdAt: Date;
  updatedAt: Date;
}

interface ChatData {
  chats: Chat[];
}

interface Member {
  // Define your member properties here
}

interface Message {}

const ChatList = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const { chatList } = useAppSelector((state) => state.chat);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const chatDocRef = doc(db, "chats", currentUser.uid);
    const unsubscribe = onSnapshot(chatDocRef, async (docSnap) => {
      try {
        if (docSnap.exists()) {
          const chatData = docSnap.data();
          const updatedChats = chatData.chats || [];

          const populatedChats: Chat[] = await Promise.all(
            updatedChats.map(async (chat: any) => {
              const populatedChat: Chat = {
                chatId: chat.id,
                members: chat.members,
                latestMessage: chat.latestMessage,
                createdAt: chat.createdAt.toDate().toISOString(),
                updatedAt: chat.updatedAt.toDate().toISOString(),
              };

              return populatedChat;
            })
          );
          dispatch(setChatList(populatedChats));
        }
      } catch (err) {
        console.log(err);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [currentUser, dispatch]);

  return (
    <div>
      {chatList.length > 0 ? (
        chatList.map((chat) => {
          const chatUser = chat.members.filter(
            (member) => member.uid !== currentUser.uid
          );

          return chatUser.map((user) => (
            <div key={chat.chatId}>
              <ChatCard
                type="chat"
                displayName={user.displayName}
                photoURL={user.photoURL}
                username={user.username}
                id={user.uid}
              />
            </div>
          ));
        })
      ) : (
        <div>start chat!</div>
      )}
    </div>
  );
};

export default ChatList;
