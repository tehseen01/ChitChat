"use client";

import BackBtn from "@/components/helper/BackBtn";
import ProfileImage from "@/components/profile/ProfileImage";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { openChatUserProfile } from "@/redux/slice/chatSlice";
import {
  ArrowLeftIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";

import { useRouter } from "next/navigation";

const MessageHeader = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const { singleChat } = useAppSelector((state) => state.chat);

  const dispatch = useAppDispatch();
  const router = useRouter();
  return (
    <div className="flex items-center gap-2 p-3 border-0 border-b bg-background">
      <BackBtn onClick={() => router.back()}>
        <ArrowLeftIcon className="w-6 h-6" />
      </BackBtn>
      <div
        className="flex-1 flex items-center cursor-pointer gap-2"
        onClick={() => dispatch(openChatUserProfile(true))}
      >
        {singleChat &&
          singleChat.members
            .filter((user) => user.uid !== currentUser.uid)
            .map((member) => (
              <div key={member.uid} className="flex items-center gap-4">
                <ProfileImage
                  variant="small"
                  displayName={member.displayName}
                  photoURL={member.photoURL}
                  color={member.color}
                />
                <h1 className="font-medium ">{member.displayName}</h1>
              </div>
            ))}
      </div>
      <div>
        <EllipsisVerticalIcon className="w-6 h-6" />
      </div>
    </div>
  );
};

export default MessageHeader;
