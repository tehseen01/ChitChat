"use client";
import { IUser } from "@/lib/interface";
import Image from "next/image";
import React, { SetStateAction } from "react";
import SearchBar from "./SearchBar";
import MainMenu from "./MainMenu";
import useFirstLetter from "@/hooks/useFirstLetter";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import BackBtn from "../helper/BackBtn";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { setSearchResultBox } from "@/redux/slice/searchSlice";

interface SidebarHeaderProp {
  currentUser: IUser;
  openProfile: boolean;
  setOpenProfile: React.Dispatch<SetStateAction<boolean>>;
}

const SidebarHeader = ({
  currentUser,
  setOpenProfile,
  openProfile,
}: SidebarHeaderProp) => {
  const firstLetter = useFirstLetter({
    displayName: currentUser?.displayName,
  });

  const dispatch = useAppDispatch();
  const { searchResultBox } = useAppSelector((state) => state.search);

  const handleOpenProfile = () => {
    setOpenProfile(!openProfile);
  };
  return (
    <div className="flex items-center gap-2 p-2 relative">
      {searchResultBox ? (
        <BackBtn onClick={() => dispatch(setSearchResultBox(false))}>
          <ArrowLeftIcon className="w-6 h-6" />
        </BackBtn>
      ) : (
        <div onClick={handleOpenProfile} className="cursor-pointer">
          {currentUser ? (
            currentUser.photoURL === null ? (
              <div className="w-10 h-10 bg-yellow-500 flex items-center justify-center rounded-full">
                <span className="font-semibold text-lg">{firstLetter}</span>
              </div>
            ) : (
              <Image
                src={currentUser.photoURL}
                alt={currentUser.displayName}
                width={50}
                height={50}
              />
            )
          ) : null}
        </div>
      )}

      <div className="flex-1">
        <SearchBar />
      </div>

      {!searchResultBox && <MainMenu />}
    </div>
  );
};

export default SidebarHeader;
