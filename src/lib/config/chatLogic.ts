import { IMessage } from "../interface";

export const isLastMessage = (
  messages: IMessage[],
  i: number,
  userID: string
) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender.uid !== userID &&
    messages[messages.length - 1].sender.uid
  );
};

export const isSameSender = (
  messages: IMessage[],
  i: number,
  message: IMessage,
  userId: string
) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender.uid !== message.sender.uid ||
      messages[i + 1].sender.uid === undefined) &&
    messages[i].sender.uid !== userId
  );
};

export const isSameUser = (
  messages: IMessage[],
  i: number,
  message: IMessage
) => {
  return i > 0 && messages[i - 1].sender.uid === message.sender.uid;
};
