"use client";

import React, { Suspense, useEffect, useState } from "react";
import { usePathname, redirect } from "next/navigation";
import MainMenu from "./MainMenu";
import SearchBar from "./SearchBar";
import ChatList from "./chats/ChatList";
import { useAppSelector } from "@/redux/hooks";
import CurrentUserWrapper from "./CurrentUserWrapper";
import Loading from "@/app/loading";
import {
  ChatBubbleBottomCenterIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Profile from "./profile/Profile";
import useFirstLetter from "@/hooks/useFirstLetter";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, isLoading } = useAppSelector((state) => state.auth);
  const [openProfile, setOpenProfile] = useState(false);
  const firstLetter = useFirstLetter({ displayName: currentUser?.displayName });

  const pathname = usePathname();
  const matchPath = ["/signin", "/signup"];

  useEffect(() => {
    if (currentUser && (pathname === "/signin" || pathname == "/signup")) {
      redirect("/");
    }

    if (!currentUser && pathname !== "/signin" && pathname !== "/signup") {
      redirect("/signin");
    }
  }, [currentUser, pathname]);

  const handleOpenProfile = () => {
    setOpenProfile(!openProfile);
  };

  return (
    <>
      <CurrentUserWrapper>
        <Suspense fallback={<Loading />}>
          <div className="sm:grid grid-cols-[auto_1fr] relative overflow-hidden">
            {!matchPath.includes(pathname) ? (
              <aside className="sm:w-[400px] w-full  h-screen border-r border-0 relative">
                <div className="flex items-center gap-2 p-2 relative">
                  <div onClick={handleOpenProfile} className="cursor-pointer">
                    {currentUser ? (
                      currentUser.photoURL === null ? (
                        <div className="w-10 h-10 bg-yellow-500 flex items-center justify-center rounded-full">
                          <span className="font-semibold text-lg">
                            {firstLetter}
                          </span>
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

                  <div className="flex-1">
                    <SearchBar />
                  </div>

                  <MainMenu />
                </div>
                <div className="h-[calc(100vh_-_61px)] overflow-y-scroll">
                  <ChatList />
                </div>
                <Profile
                  openProfile={openProfile}
                  setOpenProfile={setOpenProfile}
                  user={currentUser}
                />
              </aside>
            ) : null}
            {children}
          </div>
        </Suspense>
      </CurrentUserWrapper>
    </>
  );
};

export default Sidebar;
