import Link from "next/link";
import React from "react";

export const SigninForm = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full lg:w-[60%] m-auto md:w-[80%] w-[90%] ">
      <h1>Chit Chat</h1>
      <p className="text-gray-500 text-3xl">Welcome to ChitChat</p>
      <form className="flex  flex-col w-full mt-16" autoComplete="off">
        <div className="flex flex-col py-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-transparent border-0 border-b border-gray-400 focus:ring-0 focus:outline-none focus:border-blue-400 focus:border-b-2"
          />
        </div>
        <div className="flex flex-col py-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="bg-transparent border-0 border-b border-gray-400 focus:ring-0 focus:outline-none focus:border-blue-400 focus:border-b-2"
          />
        </div>
        <div className="text-center mt-8">
          <button
            className="bg-gray-500 rounded-3xl px-12 py-2 text-lg text-white hover:bg-gray-700"
            type="submit"
          >
            Sign in
          </button>
        </div>
      </form>
      <div className="flex items-center justify-center gap-2 mt-8">
        <div className="w-24 h-[1px] bg-gray-300"></div>
        <span className="text-gray-400">or</span>
        <div className="w-24 h-[1px] bg-gray-300"></div>
      </div>
      <div className="pt-4 flex items-center justify-center gap-1 text-gray-500">
        <p>New on ChitChat?</p>{" "}
        <Link href={"/auth/signup"} className="underline">
          Create account
        </Link>
      </div>
    </div>
  );
};
