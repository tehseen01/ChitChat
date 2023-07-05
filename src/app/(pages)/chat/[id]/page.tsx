import MessageHeader from "@/components/messages/MessageHeader";
import MessageInput from "@/components/messages/MessageInput";
import MessageList from "@/components/messages/MessageList";
import React from "react";

const Chat = () => {
  return (
    <>
      <MessageHeader />
      <MessageList />
      <MessageInput />
    </>
  );
};

export default Chat;
