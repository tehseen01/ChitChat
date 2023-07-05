"use client";

import { ThemeProvider } from "@/components/helper/ThemeProvider";
import { auth } from "@/lib/firebase";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  clearUser,
  setAuthStatus,
  setCurrentUser,
  setLoading,
} from "@/redux/slice/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import Loading from "../loading";
import SignIn from "./(auth)/signin/page";
import { usePathname } from "next/navigation";
import SidebarHeader from "@/components/sidebar/SidebarHeader";
import ChatList from "@/components/chats/ChatList";
import Profile from "@/components/profile/Profile";
import NewChatBtn from "@/components/sidebar/NewChatBtn";
import Contacts from "@/components/sidebar/Contacts";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const [openProfile, setOpenProfile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const dispatch = useAppDispatch();
  const { isLoading, authStatus, currentUser } = useAppSelector(
    (state) => state.auth
  );
  const { isContact } = useAppSelector((state) => state.contact);

  const pathname = usePathname();
  const matchPath = ["/signin", "/signup"];

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        dispatch(setCurrentUser({ displayName, email, uid, photoURL }));
        dispatch(setLoading(false));
        dispatch(setAuthStatus(true));
      } else {
        dispatch(clearUser());
        dispatch(setLoading(false));
      }
    });

    return () => unSub();
  }, [dispatch]);

  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        {isLoading ? (
          <Loading variant="large" />
        ) : (
          <>
            {authStatus ? (
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
                    <div className="h-[calc(100dvh_-_61px)] overflow-y-scroll">
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
            ) : (
              <SignIn />
            )}
          </>
        )}
      </ThemeProvider>
    </>
  );
};

export default ProtectedLayout;
