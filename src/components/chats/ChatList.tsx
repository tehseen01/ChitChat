"use client";

import React, { useEffect } from "react";
import ChatCard from "./ChatCard";
import {
  getDoc,
  doc,
  onSnapshot,
  DocumentReference,
  DocumentData,
} from "firebase/firestore";
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

    const unsubscribeList: any = [];

    const getChats = async () => {
      try {
        const channelData = await getDoc(channelRef);
        if (channelData.exists()) {
          const chatReferences = channelData.data().chats || [];

          const chatSnapshots: any = [];

          chatReferences.forEach((chatRef: DocumentReference) => {
            const chatUnsubscribe = onSnapshot(chatRef, (chatSnapshot) => {
              chatSnapshots.push(chatSnapshot);

              if (chatSnapshots.length === chatReferences.length) {
                const chats = chatSnapshots.map(
                  (chatSnapshot: DocumentData) => {
                    const chatData = chatSnapshot.data();
                    const serializableChat = {
                      ...chatData,
                      date: chatData.date.toDate().toISOString(),
                    };
                    return serializableChat;
                  }
                );

                dispatch(setChatStatus(false));
                dispatch(setChatList(chats));
              }
            });

            unsubscribeList.push(chatUnsubscribe);
          });
        }
      } catch (err) {
        console.log(err);
      }
    };

    getChats();

    return () => {
      unsubscribeList.forEach((unsubscribe: any) => {
        unsubscribe();
      });
    };
  }, [currentUser, dispatch]);

  return (
    <>
      {chatStatus ? (
        <Loading variant="small" />
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
                    lastMessage={chat.lastMessage}
                    date={chat.date}
                    color={user.color}
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
