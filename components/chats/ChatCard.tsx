"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import React from "react";
import ProfileImage from "../profile/ProfileImage";
import {
  Timestamp,
  addDoc,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { v4 as uuid } from "uuid";

interface ChatCardProp {
  type: string;
  id: string;
  displayName: string;
  username: string;
  photoURL: string;
}

const ChatCard = ({
  type,
  id,
  displayName,
  photoURL,
  username,
}: ChatCardProp) => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const combineID = currentUser.uid + id;
  const reversedID = id + currentUser.uid;

  const firstMemberRef = doc(db, "users", currentUser.uid);
  const secondMemberRef = doc(db, "users", id);
  const messageRef = doc(db, "messages", combineID);

  const handleChat = async () => {
    try {
      const docSnap = await getDoc(messageRef);

      if (!docSnap.exists()) {
        await setDoc(messageRef, { messages: [] });

        const currentUserChatRef = doc(db, "chats", currentUser.uid);
        const secondUserChatRef = doc(db, "chats", id);

        const user1 = await getDoc(firstMemberRef);
        const user2 = await getDoc(secondMemberRef);

        await updateDoc(currentUserChatRef, {
          chats: arrayUnion({
            id: reversedID,
            members: [user1.data(), user2.data()],
            latestMessage: messageRef,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
          }),
        });

        await updateDoc(secondUserChatRef, {
          chats: arrayUnion({
            id: reversedID,
            members: [user1.data(), user2.data()],
            latestMessage: {},
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
          }),
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
        variant="small"
      />

      <div className="flex-1">
        <div className="flex justify-between">
          <h2 className="font-semibold dark:text-white/90">{displayName}</h2>
          {type === "chat" && (
            <div className="flex text-sm items-center justify-center w-6 h-6 dark:text-white/80">
              <span>Fri</span>
            </div>
          )}
        </div>
        <div className="flex justify-between">
          <p className="text-slate-600 dark:text-white/60">
            Last message was this
          </p>
          {type === "chat" && (
            <div className="flex bg-gray-400/60 rounded-full text-white w-6 h-6 items-center justify-center dark:bg-gray-600 dark:text-white">
              <span>3</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ChatCard;
