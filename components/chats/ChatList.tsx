"use client";

import React, { useEffect } from "react";
import ChatCard from "./ChatCard";
import { getDoc, doc, onSnapshot } from "firebase/firestore";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { db } from "@/lib/firebase";
import { setChatList } from "@/redux/slice/chatSlice";
import { IUser } from "@/lib/interface";

interface Chat {
  chatID: string;
  members: IUser[];
  latestMessage: string;
  createdAt: Date;
  updatedAt: Date;
}

const ChatList = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const { chatList } = useAppSelector((state) => state.chat);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const channelRef = doc(db, "channel", currentUser.uid);

    const unsubscribe = onSnapshot(channelRef, async (docSnap) => {
      try {
        if (docSnap.exists()) {
          const chatData = docSnap.data();
          const updatedChats = chatData.chats || [];

          const populatedChats: Chat[] = await Promise.all(
            updatedChats.map(async (chatRef: any) => {
              const chatDoc = await getDoc(chatRef);

              if (chatDoc.exists()) {
                const chatData = chatDoc.data() as any;

                const memberRefs = chatData.members;

                const memberSnapshots = await Promise.all(
                  memberRefs.map((memberRef: any) => getDoc(memberRef))
                );

                const members = memberSnapshots.map((memberSnap) =>
                  memberSnap.data()
                ) as IUser[];

                const populatedChat: Chat = {
                  chatID: chatData.chatID,
                  members: members,
                  latestMessage: chatData.latestMessage,
                  createdAt: chatData.createdAt.toDate().toISOString(),
                  updatedAt: chatData.updatedAt.toDate().toISOString(),
                };

                return populatedChat;
              }

              return null; // Chat document doesn't exist
            })
          );

          const validPopulatedChats = populatedChats.filter(
            (chat) => chat !== null
          );

          dispatch(setChatList(validPopulatedChats));
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
            <div key={chat.chatID}>
              <ChatCard
                type="chat"
                displayName={user.displayName}
                photoURL={user.photoURL}
                username={user.username}
                id={user.uid}
                latestMessage={chat.latestMessage}
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
