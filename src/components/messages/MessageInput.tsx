"use client";
import { db } from "@/lib/firebase";
import { useAppSelector } from "@/redux/hooks";
import { PaperAirplaneIcon, PhotoIcon } from "@heroicons/react/24/outline";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
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

  const sendMessage = async () => {
    const messageDocRef = doc(db, "messages", singleChat.chatID);
    const currentUserDocRef = doc(db, "users", currentUser.uid);

    try {
      const docSnap = await getDoc(messageDocRef);

      if (!docSnap.exists()) {
        await setDoc(messageDocRef, { messages: [] });

        console.log("Doc created");
      } else {
        await updateDoc(messageDocRef, {
          messages: arrayUnion({
            id: uuid(),
            type: "text",
            content: message,
            mediaURL: null,
            sender: currentUserDocRef,
            receiver: singleChat.chatID,
            sendAt: new Date(),
            read: false,
          }),
        });
        console.log("Doc updated");
      }

      await updateDoc(doc(db, "chats", singleChat.chatID), {
        lastMessage: message,
        date: serverTimestamp(),
      });

      setMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && message) {
      sendMessage();
    }
  };

  return (
    <div className="w-full border-t h-full ">
      <div className="flex items-center px-4 py-2 gap-4">
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={onKeyUp}
          className="focus:outline-none focus:ring-0 focus:border-0 w-full h-full dark:bg-white bg-gray-200 rounded-full p-3 flex-1 dark:text-black/90"
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
