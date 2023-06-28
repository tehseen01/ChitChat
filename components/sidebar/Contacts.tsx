"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import BackBtn from "../helper/BackBtn";
import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { openContact, setContacts } from "@/redux/slice/contactSlice";
import clsx from "clsx";
import { openAddContactModal } from "@/redux/slice/modalSlice";
import AddNewContact from "./AddNewContact";
import {
  DocumentData,
  DocumentReference,
  QuerySnapshot,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { contactDocRef, db } from "@/lib/firebase";
import { IUser } from "@/lib/interface";
import ChatCard from "../chats/ChatCard";

const Contacts = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isFocus, setIsFocus] = useState(false);
  const { isAddContactModal } = useAppSelector((state) => state.modal);
  const { currentUser } = useAppSelector((state) => state.auth);
  const { allContacts } = useAppSelector((state) => state.contact);
  const dispatch = useAppDispatch();

  const handleSearchIcon = () => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    const getContacts = async () => {
      try {
        const docSnap = await getDoc(doc(db, "contacts", currentUser.uid));

        if (docSnap.exists()) {
          const users = await docSnap.data();

          const userPromises = users.userId.map(async (ref: any) => {
            const userDoc = await getDoc(ref.user);
            return userDoc.data();
          });

          // Wait for all user promises to resolve
          const userArray = await Promise.all(userPromises);
          dispatch(setContacts(userArray));
        } else {
          console.log("No such documents!");
        }
      } catch (err) {
        console.log(err);
      }
    };

    getContacts();
  }, [dispatch, currentUser.uid]);

  return (
    <div className="absolute inset-0 bg-background">
      <div className="flex items-center gap-2 px-2 py-3 bg-secondary">
        <BackBtn onClick={() => dispatch(openContact(false))}>
          <ArrowLeftIcon className="w-6 h-6 select-none" />
        </BackBtn>
        <div
          className={clsx(
            isFocus ? "border-blue-400" : "border-gray-100",
            "flex items-center bg-white rounded-3xl px-2 border-2 flex-1"
          )}
        >
          <MagnifyingGlassIcon
            className="w-6 h-6 "
            onClick={handleSearchIcon}
          />
          <input
            type="text"
            placeholder="Search..."
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            className="bg-transparent w-full focus:outline-none focus:ring-0 focus:border-0 py-2 px-1"
            ref={inputRef}
          />
        </div>
      </div>
      <div className="relative h-[calc(100vh_-_69px)]">
        <Suspense fallback={<div>loading...</div>}>
          {allContacts ? (
            allContacts.map((contact) => (
              <div key={contact.uid}>
                <ChatCard
                  type="contact"
                  id={contact.uid}
                  displayName={contact.displayName}
                  photoURL={contact.photoURL}
                  username={contact.username}
                />
              </div>
            ))
          ) : (
            <div className="font-medium flex items-center justify-center">
              Add contact to start a new chat.
            </div>
          )}
        </Suspense>
        <button
          className="w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center absolute bottom-4 right-4 text-white"
          onClick={() => dispatch(openAddContactModal(true))}
        >
          <UserPlusIcon className="h-6 w-6" />
        </button>
        {isAddContactModal && <AddNewContact />}
      </div>
    </div>
  );
};

export default Contacts;
