import Image from "next/image";
import React from "react";
import { SigninForm } from "../components";

const SignIn = () => {
  return (
    <div className="grid sm:grid-cols-2 h-screen relative">
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
      <section className="p-4 max-sm:fixed inset-0 backdrop-blur-[10px] bg-white/75">
        <SigninForm />
      </section>
    </div>
  );
};

export default SignIn;
