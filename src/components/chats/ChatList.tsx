"use client";

import React, { useEffect } from "react";
import ChatCard from "./ChatCard";
import { getDoc, doc, onSnapshot } from "firebase/firestore";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { db } from "@/lib/firebase";
import { setChatList, setChatStatus } from "@/redux/slice/chatSlice";
import { IChat, IUser } from "@/lib/interface";
import Loading from "@/app/loading";

const ChatList = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const { chatList, chatStatus } = useAppSelector((state) => state.chat);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const channelRef = doc(db, "channel", currentUser.uid);

    const unsubscribe = onSnapshot(channelRef, async (docSnap) => {
      try {
        if (docSnap.exists()) {
          const chatData = docSnap.data();
          const updatedChats = chatData.chats || [];

          const populatedChats: IChat[] = await Promise.all(
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

                const populatedChat: IChat = {
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
          dispatch(setChatStatus(false));
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
    <>
      {chatStatus ? (
        <Loading width={100} height={100} />
      ) : (
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
                    updatedAt={chat.updatedAt}
                  />
                </div>
              ));
            })
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              Start a new chat
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ChatList;
