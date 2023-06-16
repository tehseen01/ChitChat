import SignUpForm from "@/components/auth/SignUpForm";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SignUp = () => {
  return (
    <div className="grid sm:grid-cols-2 h-screen relative">
      <section className="p-4 max-sm:fixed inset-0 backdrop-blur-[10px] bg-white/75">
        <div className="flex flex-col items-center justify-center h-full lg:w-[60%] m-auto md:w-[80%] w-[90%] ">
          <h1>Chit Chat</h1>
          <p className="text-gray-500 text-3xl">Welcome to ChitChat</p>
          <SignUpForm />
          <div className="flex items-center justify-center gap-2 mt-8">
            <div className="w-24 h-[1px] bg-gray-300"></div>
            <span className="text-gray-400">or</span>
            <div className="w-24 h-[1px] bg-gray-300"></div>
          </div>
          <div className="pt-4 flex items-center justify-center gap-1 text-gray-500">
            <p>Have an account?</p>{" "}
            <Link href={"/signin"} className="underline">
              Sign in
            </Link>
          </div>
        </div>
      </section>
      <section className="bg-[#a4c4b5] flex flex-col items-center justify-center">
        <div className="">
          <Image
            src={"/login-bg3.png"}
            width={300}
            height={300}
            alt="login page"
            className=""
          />
        </div>
        <div className="text-gray-100 text-2xl w-3/4 text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum,
          commodi!
        </div>
      </section>
    </div>
  );
};

export default SignUp;
