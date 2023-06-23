import React from "react";
import MessageLayout from "../components/MessageLayout";
import MessageHeader from "../components/MessageHeader";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";

const Chat = () => {
  return (
    <MessageLayout>
      <MessageHeader />
      <MessageList />
      <MessageInput />
    </MessageLayout>
  );
};

export default Chat;
