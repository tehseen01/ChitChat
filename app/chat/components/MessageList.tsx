"use client";
import { useAppSelector } from "@/redux/hooks";
import clsx from "clsx";
import React from "react";

const MessageList = () => {
  const { messages } = useAppSelector((state) => state.chat);
  const { currentUser } = useAppSelector((state) => state.auth);

  return (
    <div className="h-[calc(100vh_-_130px)] overflow-y-scroll">
      {messages.length > 0 ? (
        messages.map((message) => (
          <div key={message.id}>
            {message.type === "text" && (
              <div
                className={clsx(
                  message.sender.uid === currentUser.uid ? "text-right" : ""
                )}
              >
                {message.content}
              </div>
            )}
          </div>
        ))
      ) : (
        <div>No messages!</div>
      )}
    </div>
  );
};

export default MessageList;
