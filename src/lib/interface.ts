export interface IUser {
  displayName: string;
  uid: string;
  photoURL: string;
  email: string;
  username: string;
  color: string;
  isOnline: boolean;
}

export interface IMessage {
  id: string;
  type: "text" | "media";
  content: string;
  mediaURL: string | null;
  sender: IUser;
  receiver: string;
  sendAt: Date;
  readAt: Date;
}

export interface IChat {
  chatID: string;
  members: IUser[];
  lastMessage: string;
  date: Date | null;
}
