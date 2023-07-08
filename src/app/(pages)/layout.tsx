"use client";

import { ThemeProvider } from "@/components/helper/ThemeProvider";
import { auth, db } from "@/lib/firebase";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  clearUser,
  setAuthStatus,
  setCurrentUser,
  setLoading,
} from "@/redux/slice/authSlice";
import { User, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import Loading from "../loading";
import { usePathname, useRouter } from "next/navigation";
import SidebarHeader from "@/components/sidebar/SidebarHeader";
import ChatList from "@/components/chats/ChatList";
import Profile from "@/components/profile/Profile";
import Contacts from "@/components/sidebar/Contacts";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import SignIn from "./(auth)/signin/page";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { openContact } from "@/redux/slice/contactSlice";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const [openProfile, setOpenProfile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const dispatch = useAppDispatch();
  const { isLoading, authStatus, currentUser } = useAppSelector(
    (state) => state.auth
  );
  const { isContact } = useAppSelector((state) => state.contact);

  const pathname = usePathname();
  const router = useRouter();
  const matchPath = ["/signin", "/signup"];

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user?.uid);
        const userDocExists = await getDoc(userDocRef);

        if (userDocExists.exists()) {
          await updateDoc(userDocRef, {
            isOnline: true,
          });
        }

        const userDoc = await getDoc(userDocRef);

        dispatch(setCurrentUser(userDoc.data()));
        dispatch(setAuthStatus(true));
        dispatch(setAuthStatus(true));
        dispatch(setLoading(false));
      } else {
        if (currentUser) {
          await updateDoc(doc(db, "users", currentUser?.uid), {
            isOnline: false,
          });
        }

        dispatch(setCurrentUser(null));
        dispatch(setAuthStatus(false));
        dispatch(setLoading(false));
      }
    });

    return () => unSub();
  }, [dispatch]);

  useEffect(() => {
    if (!authStatus) {
      router.replace("/signin");
      return;
    }
  }, [authStatus]);

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

                    <button
                      className="w-10 h-10 rounded-full bg-blue-500 flex-center text-white absolute bottom-5 right-3"
                      onClick={() => dispatch(openContact(true))}
                    >
                      <ChatBubbleOvalLeftEllipsisIcon className="w-8 h-8" />
                    </button>

                    {isContact && <Contacts />}
                  </aside>
                ) : null}
                {children}
              </div>
            ) : (
              <>{children}</>
            )}
          </>
        )}
      </ThemeProvider>
    </>
  );
};

export default ProtectedLayout;
