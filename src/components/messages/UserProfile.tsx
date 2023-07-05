"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ArrowLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import BackBtn from "@/components/helper/BackBtn";
import { openChatUserProfile } from "@/redux/slice/chatSlice";
import ProfileImage from "@/components/profile/ProfileImage";

const UserProfile = ({ isOpenProfile }: { isOpenProfile: boolean }) => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const { singleChat } = useAppSelector((state) => state.chat);
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
        {singleChat &&
          singleChat.members
            .filter((user) => user.uid !== currentUser.uid)
            .map((member) => (
              <div className="relative" key={member.uid}>
                <ProfileImage
                  photoURL={member.photoURL}
                  displayName={member.displayName}
                  variant="large"
                />
              </div>
            ))}
      </div>
    </div>
  );
};

export default UserProfile;
