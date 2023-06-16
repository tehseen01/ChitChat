"use client";

import { useAppDispatch } from "@/redux/hooks";
import { openChatUserProfile, setOpenChat } from "@/redux/slice/chatSlice";
import {
  ArrowLeftIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";

const MessageHeader = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  return (
    <div className="flex items-center gap-4 p-3 border-0 border-b">
      <div
        className="cursor-pointer sm:hidden w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center"
        onClick={() => dispatch(setOpenChat(false))}
      >
        <ArrowLeftIcon className="w-6 h-6" />
      </div>
      <div
        className="flex-1 flex items-center cursor-pointer gap-2"
        onClick={() => dispatch(openChatUserProfile(true))}
      >
        <div className="w-10 h-10">
          <Image
            src={
              "https://images.pexels.com/photos/432059/pexels-photo-432059.jpeg?auto=compress&cs=tinysrgb&w=600"
            }
            alt="user image"
            width={100}
            height={100}
            className="object-cover rounded-full w-full h-full"
          />
        </div>
        <h1 className="font-medium ">User name</h1>
      </div>
      <div>
        <EllipsisVerticalIcon className="w-6 h-6" />
      </div>
    </div>
  );
};

export default MessageHeader;
