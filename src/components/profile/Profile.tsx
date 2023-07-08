import clsx from "clsx";
import React, { SetStateAction } from "react";
import BackBtn from "../helper/BackBtn";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import ProfileImage from "./ProfileImage";
import { useAppSelector } from "@/redux/hooks";
import { IUser } from "@/lib/interface";

interface ProfileProps {
  openProfile: boolean;
  setOpenProfile: React.Dispatch<SetStateAction<boolean>>;
  user: IUser;
}

const Profile = ({ openProfile, setOpenProfile, user }: ProfileProps) => {
  const closeProfile = () => {
    setOpenProfile(!openProfile);
  };

  return (
    <div
      className={clsx(
        openProfile ? "translate-x-0" : "translate-x-[-100vw]",
        "absolute inset-0 bg-background  transition"
      )}
    >
      <div className="flex items-center gap-4 px-4 py-2 border-b">
        <BackBtn onClick={closeProfile}>
          <ArrowLeftIcon className="w-6 h-6" />
        </BackBtn>
        <div className="text-lg font-semibold">Profile</div>
      </div>
      <div className="relative">
        <ProfileImage
          photoURL={user.photoURL}
          displayName={user.displayName}
          color={user.color}
          variant="large"
        />
      </div>
    </div>
  );
};

export default Profile;
