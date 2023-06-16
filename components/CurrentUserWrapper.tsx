"use client";
import React, { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import {
  clearUser,
  setCurrentUser,
  setLoading,
} from "../redux/slice/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

const CurrentUserWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      dispatch(setLoading(true));

      if (user) {
        const { displayName, email, uid, photoURL } = user;
        dispatch(setCurrentUser({ displayName, email, uid, photoURL }));
        dispatch(setLoading(false));
      } else {
        dispatch(clearUser());
      }
    });

    return () => unSub();
  }, [dispatch]);

  return <>{children}</>;
};

export default CurrentUserWrapper;
