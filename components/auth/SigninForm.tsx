"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { SignInFormData, signInSchema } from "@/lib/validation/signin";

const SignInForm = () => {
  const {
    register,
    reset,
    formState: { errors, isSubmitting, isDirty },
    handleSubmit,
  } = useForm<SignInFormData>({ resolver: zodResolver(signInSchema) });

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
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
        <label htmlFor="email">Email</label>
        <input
          type="email"
          {...register("email")}
          id="email"
          className="bg-transparent border-0 border-b border-gray-400 focus:ring-0 focus:outline-none focus:border-blue-400 focus:border-b-2"
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
          className="bg-transparent border-0 border-b border-gray-400 focus:ring-0 focus:outline-none focus:border-blue-400 focus:border-b-2"
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>
      <div className="text-center mt-8">
        <button
          className="bg-gray-500 rounded-3xl px-12 py-2 text-lg text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:hover:bg-gray-500"
          type="submit"
          disabled={isSubmitting || !isDirty || !isFormError}
        >
          {isSubmitting ? "loading..." : "Sign in"}
        </button>
      </div>
    </form>
  );
};

export default SignInForm;
