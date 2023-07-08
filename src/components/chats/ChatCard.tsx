"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import React from "react";
import ProfileImage from "../profile/ProfileImage";
import {
  arrayUnion,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

import { sortID } from "@/lib/helper/sortID";
import formattedDate from "@/lib/formatedDate";

interface ChatCardProp {
  type: string;
  id: string;
  displayName: string;
  username: string;
  photoURL: string;
  lastMessage?: string;
  date?: Date | null;
  color: string;
  isOnline?: boolean;
}

const ChatCard = ({
  type,
  id,
  displayName,
  photoURL,
  username,
  lastMessage,
  date,
  color,
  isOnline,
}: ChatCardProp) => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const {} = useAppSelector((state) => state.chat);

  const sortedID = sortID(currentUser.uid, id);

  const currentUserRef = doc(db, "users", id);
  const otherUserRef = doc(db, "users", currentUser.uid);
  const chatRef = doc(db, "chats", sortedID);
  const currentUserChannelRef = doc(db, "channel", currentUser.uid);
  const otherUserChannelRef = doc(db, "channel", id);
  const messageRef = doc(db, "messages", sortedID);

  const handleChat = async () => {
    try {
      const chatDoc = await getDoc(chatRef);

      const currentUserDoc = (await getDoc(currentUserRef)).data();
      const otherUserDoc = (await getDoc(otherUserRef)).data();

      if (!chatDoc.exists()) {
        await setDoc(chatRef, {
          members: [currentUserDoc, otherUserDoc],
          chatID: sortedID,
          lastMessage: "",
          date: serverTimestamp(),
        });

        await setDoc(messageRef, { messages: [] });

        await updateDoc(currentUserChannelRef, {
          chats: arrayUnion(chatRef),
        });

        await updateDoc(otherUserChannelRef, {
          chats: arrayUnion(chatRef),
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Link
      href={`/chat/${id}`}
      className="p-2 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-[#60626782] cursor-pointer"
      onClick={handleChat}
    >
      <ProfileImage
        displayName={displayName}
        photoURL={photoURL}
        color={color}
        variant="small"
      />

      <div className="flex-1">
        <div className="flex justify-between">
          <h2 className="font-semibold dark:text-white/90">{displayName}</h2>
          {type === "chat" && (
            <div className="flex text-sm items-center justify-center h-6 dark:text-white/80">
              <span>{date ? formattedDate(date) : ""}</span>
            </div>
          )}
        </div>
        <div className="flex justify-between">
          <p className="text-slate-600 dark:text-white/60">{lastMessage}</p>
          {/* {type === "chat" && (
            <div className="flex bg-gray-400/60 rounded-full text-white w-6 h-6 items-center justify-center dark:bg-gray-600 dark:text-white">
              <span>3</span>
            </div>
          )} */}
        </div>
      </div>
    </Link>
  );
};

export default ChatCard;
