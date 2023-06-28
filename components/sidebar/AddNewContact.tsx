import { contactDocRef, db, userDocRef } from "@/lib/firebase";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setSearchResultContact,
  setUserNotFound,
} from "@/redux/slice/contactSlice";
import { openAddContactModal } from "@/redux/slice/modalSlice";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Timestamp,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = { username: string };

const AddNewContact = () => {
  const dispatch = useAppDispatch();
  const { searchResultContact, userNotFound } = useAppSelector(
    (state) => state.contact
  );
  const { currentUser } = useAppSelector((state) => state.auth);

  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const q = query(userDocRef, where("username", "==", data.username));

    try {
      dispatch(setSearchResultContact(null));
      dispatch(setUserNotFound(false));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          dispatch(setSearchResultContact(doc.data()));
        });
      } else {
        dispatch(setUserNotFound(true));
      }
      reset();
    } catch (err) {
      console.log(err);
    }
  };

  const addInContactList = async () => {
    const contactRef = doc(db, "contacts", currentUser.uid);
    try {
      const userRef = doc(db, `users/${searchResultContact?.uid}`);
      const contactDoc = await getDoc(contactRef);

      if (!contactDoc.exists()) {
        await setDoc(doc(db, "contacts", currentUser.uid), {
          userId: [{ user: userRef, date: Timestamp.now() }],
        });
        console.log("Contact list created");
      } else {
        const contactData = contactDoc.data();
        const existingUsers = contactData.userId;

        const userExists = existingUsers.some(
          (user: any) => user.user.id === userRef.id
        );

        if (!userExists) {
          await updateDoc(doc(db, "contacts", currentUser.uid), {
            userId: arrayUnion({
              user: userRef,
              date: Timestamp.now(),
            }),
          });
          console.log("User added to contact list");
        } else {
          console.log("User already exists in contact list");
        }
      }

      dispatch(openAddContactModal(false));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center">
      <div className="rounded-md p-4 bg-white w-11/12 sm:w-2/5 grid gap-4">
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold">New Contact</div>
          <button
            className="uppercase"
            onClick={() => dispatch(openAddContactModal(false))}
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <input
            type="text"
            placeholder="Username"
            {...register("username")}
            className="border-2 p-2"
          />
          <div className="flex items-center gap-4 justify-end">
            <button
              className="text-blue-400 text-sm font-semibold"
              type="submit"
            >
              {isSubmitting ? "Searching..." : "Search"}
            </button>
          </div>
        </form>
        {userNotFound && <p className=" text-red-500">User not found!</p>}
        {searchResultContact && (
          <div
            className="flex items-center gap-4 bg-gray-50 p-2 hover:bg-gray-100 cursor-pointer"
            onClick={addInContactList}
          >
            <div className="w-14 h-14 bg-[#faebd7] rounded-full">
              {searchResultContact.photoURL ? (
                <Image
                  src={searchResultContact?.photoURL}
                  width={100}
                  height={100}
                  alt={searchResultContact?.displayName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <span className="font-bold text-4xl uppercase">
                    {searchResultContact.displayName.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            <div>
              <h3 className="font-medium">
                {searchResultContact?.displayName}
              </h3>
              <span>{searchResultContact?.username}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddNewContact;
