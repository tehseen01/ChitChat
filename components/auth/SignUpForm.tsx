"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import { doc, setDoc } from "firebase/firestore";
import { SignUpFormData, signUpSchema } from "@/lib/validation/signup";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(res.user, {
        displayName: data.name,
      });

      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName: data.name,
        email: data.email,
        photoURL: res.user.photoURL,
      });

      await setDoc(doc(db, "chats", res.user.uid), {});

      reset();
    } catch (err) {
      console.log(err);
    }
  };

  const isFormError = Object.entries(errors).length === 0;

  return (
    <form
      className="flex  flex-col w-full mt-16"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col py-2">
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          {...register("name")}
          id="name"
          className="border-0 border-b border-gray-400 focus:ring-0 focus:outline-none focus:border-blue-400 focus:border-b-2 bg-transparent"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>
      {/* <div className="flex flex-col py-2">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          {...register("username")}
          id="username"
          className="border-0 border-b border-gray-400 focus:ring-0 focus:outline-none focus:border-blue-400 focus:border-b-2 bg-transparent"
        />
        {errors.username && (
          <p className="text-sm text-red-500">{errors.username.message}</p>
        )}
      </div> */}
      <div className="flex flex-col py-2">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          {...register("email")}
          id="email"
          className="border-0 border-b border-gray-400 focus:ring-0 focus:outline-none focus:border-blue-400 focus:border-b-2 bg-transparent"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div className="flex flex-col py-2">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          {...register("password")}
          id="password"
          className="border-0 border-b border-gray-400 focus:ring-0 focus:outline-none focus:border-blue-400 focus:border-b-2 bg-transparent"
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>
      <div className="text-center mt-8">
        <button
          className="bg-gray-500 rounded-3xl px-12 py-2 text-lg text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:hover:bg-gray-500"
          type="submit"
          disabled={!isFormError || isSubmitting || !isDirty}
        >
          {isSubmitting ? "loading..." : "Sign Up"}
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
