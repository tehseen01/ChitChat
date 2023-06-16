import useFirstLetter from "@/hooks/useFirstLetter";
import { IUser } from "@/lib/interface";
import Image from "next/image";
import React from "react";

const ProfileImage = ({ user }: { user: IUser }) => {
  const firstLetter = useFirstLetter({ displayName: user.displayName });

  return (
    <div className="relative">
      <div className="w-full aspect-square">
        {user ? (
          user.photoURL === null ? (
            <div className="bg-yellow-500 flex items-center justify-center w-full h-full">
              <span className="font-bold text-[10rem]">{firstLetter}</span>
            </div>
          ) : (
            <Image
              src={user.photoURL}
              alt={user.displayName}
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          )
        ) : null}
      </div>
      <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-black/50 to-black/0 flex flex-col justify-end px-4 pb-2">
        <div className="text-lg font-semibold text-white">
          {user.displayName}
        </div>
      </div>
    </div>
  );
};

export default ProfileImage;
