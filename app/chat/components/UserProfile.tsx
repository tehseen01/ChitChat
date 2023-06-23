"use client";

import { useAppDispatch } from "@/redux/hooks";
import { ArrowLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import React from "react";
import BackBtn from "@/components/helper/BackBtn";
import { openChatUserProfile } from "@/redux/slice/chatSlice";

const UserProfile = ({ isOpenProfile }: { isOpenProfile: boolean }) => {
  const dispatch = useAppDispatch();

  return (
    <div
      className={clsx(
        isOpenProfile ? "translate-x-0 shadow-2xl" : "translate-x-[100vw]",
        " absolute top-0 right-0 h-full sm:w-[--right-profile-width] bg-background pointer-events-auto w-full border-l transition-transform"
      )}
    >
      <div className="flex p-4 items-center gap-4 border-b">
        <BackBtn onClick={() => dispatch(openChatUserProfile(false))}>
          <XMarkIcon className="w-6 h-6" />
        </BackBtn>
        <div className="font-medium text-lg flex-1">User Info</div>
      </div>

      <div>
        <div className="relative">
          <div className="w-full aspect-square">
            <Image
              src={
                "https://images.pexels.com/photos/432059/pexels-photo-432059.jpeg?auto=compress&cs=tinysrgb&w=600"
              }
              alt="profile picture"
              width={400}
              height={400}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-0 h-16 w-full bg-yellow-100">
            hello
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
