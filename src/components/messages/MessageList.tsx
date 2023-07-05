"use client";
import Loading from "@/app/loading";
import {
  isLastMessage,
  isSameSender,
  isSameUser,
} from "@/lib/config/chatLogic";
import { useAppSelector } from "@/redux/hooks";
import clsx from "clsx";
import React, { useEffect, useRef } from "react";

const MessageList = () => {
  const { messages, messageStatus } = useAppSelector((state) => state.chat);
  const { currentUser } = useAppSelector((state) => state.auth);

  const scrollRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      block: "end",
      behavior: "smooth",
      inline: "nearest",
    });
  }, [messages]);

  return (
    <>
      {messageStatus ? (
        <Loading variant="small" />
      ) : (
        <div className="h-[calc(100dvh_-_130px)] overflow-y-scroll py-2 bg-pattern dark:bg-background">
          {messages.length > 0 ? (
            messages.map((message, i) => (
              <div key={message.id} className="px-2">
                {message.type === "text" && (
                  <div
                    className={clsx(
                      message.sender.uid === currentUser.uid
                        ? "justify-end"
                        : "",
                      "flex gap-1 items-center"
                    )}
                  >
                    <div
                      className={clsx(
                        isSameUser(messages, i, message) ? "mt-1" : "mt-3",
                        message?.sender?.uid === currentUser.uid
                          ? "bg-blue-500 text-white"
                          : "bg-white/95 dark:bg-[#999]",
                        isSameSender(messages, i, message, currentUser.uid) ||
                          isLastMessage(messages, i, currentUser.uid)
                          ? "rounded-bl-none rounded-lg"
                          : "rounded-lg rounded-br-none",
                        "px-2 py-1  max-w-[80%] md:max-w-md"
                      )}
                    >
                      {message.content}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              No messages!
            </div>
          )}
          <div ref={scrollRef} className="h-2" />
        </div>
      )}
    </>
  );
};

export default MessageList;
