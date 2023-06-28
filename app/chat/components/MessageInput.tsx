"use client";
import { db } from "@/lib/firebase";
import { useAppSelector } from "@/redux/hooks";
import { PaperAirplaneIcon, PhotoIcon } from "@heroicons/react/24/outline";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

const MessageInput = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const { singleChat } = useAppSelector((state) => state.chat);
  const [message, setMessage] = useState("");

  const userID = singleChat.members.find(
    (user) => user.uid !== currentUser.uid
  )?.uid;

  const combineID =
    currentUser.uid > userID
      ? currentUser.uid + userID
      : userID + currentUser.uid;

  const sendMessage = async () => {
    const messageDocRef = doc(db, "messages", combineID);
    const currentUserDocRef = doc(db, "users", currentUser.uid);

    try {
      await updateDoc(messageDocRef, {
        messages: arrayUnion({
          id: uuid(),
          type: "text",
          content: message,
          mediaURL: null,
          sender: currentUserDocRef,
          receiver: singleChat.chatId,
          sendAt: new Date(),
          readAt: new Date(),
        }),
      });

      await updateDoc(doc(db, "chats", currentUser.uid), {
        [singleChat.chatId + ".latestMessage"]: {
          message,
        },
        [singleChat.chatId + ".updatedAt"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "chats", userID), {
        [singleChat.chatId + ".latestMessage"]: {
          message,
        },
        [singleChat.chatId + ".updatedAt"]: serverTimestamp(),
      });

      setMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full bg-gray-100 h-full ">
      <div className="flex items-center px-4 py-2 gap-4">
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="focus:outline-none focus:ring-0 focus:border-0 w-full h-full bg-white rounded-full p-3 flex-1"
        />

        {message ? (
          <button
            className="w-10 h-10 rounded-full hover:bg-blue-400 hover:text-white flex-center"
            onClick={sendMessage}
          >
            <PaperAirplaneIcon className="w-6 h-6" />
          </button>
        ) : (
          <button className="w-10 h-10 rounded-full hover:bg-blue-400 hover:text-white flex-center">
            <PhotoIcon className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
};

export default MessageInput;
