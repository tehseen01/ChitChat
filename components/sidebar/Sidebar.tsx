"use client";

import React, { Suspense, useEffect, useState } from "react";
import { usePathname, redirect } from "next/navigation";
import ChatList from "../chats/ChatList";
import { useAppSelector } from "@/redux/hooks";
import CurrentUserWrapper from "../CurrentUserWrapper";
import Loading from "@/app/loading";
import Profile from "../profile/Profile";
import SidebarHeader from "./SidebarHeader";
import NewChatBtn from "./NewChatBtn";
import Contacts from "./Contacts";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, isLoading } = useAppSelector((state) => state.auth);
  const { isContact } = useAppSelector((state) => state.contact);
  const [openProfile, setOpenProfile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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

  return (
    <>
      <CurrentUserWrapper>
        <Suspense fallback={<Loading />}>
          <div className="sm:grid grid-cols-[auto_1fr] relative overflow-hidden">
            {!matchPath.includes(pathname) ? (
              <aside
                className="sm:w-[400px] w-full  h-screen border-r border-0 relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <SidebarHeader
                  currentUser={currentUser}
                  openProfile={openProfile}
                  setOpenProfile={setOpenProfile}
                />
                <div className="h-[calc(100vh_-_61px)] overflow-y-scroll">
                  <ChatList />
                </div>
                <Profile
                  openProfile={openProfile}
                  setOpenProfile={setOpenProfile}
                  user={currentUser}
                />

                <NewChatBtn isHovered={isHovered} />
                {isContact && <Contacts />}
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
