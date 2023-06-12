import Image from "next/image";
import Link from "next/link";
import React from "react";

export const SingleChat = () => {
  return (
    <Link
      href={"/#"}
      className="p-2 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-[#60626782]"
    >
      <div className="w-14 h-14">
        <Image
          src={
            "https://images.pexels.com/photos/432059/pexels-photo-432059.jpeg?auto=compress&cs=tinysrgb&w=600"
          }
          alt="profile picture"
          width={100}
          height={100}
          className="h-full w-full rounded-full object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <h2 className="font-semibold dark:text-white/90">Suhana shah</h2>
          <div className="flex text-sm items-center justify-center w-6 h-6 dark:text-white/80">
            <span>Fri</span>
          </div>
        </div>
        <div className="flex justify-between">
          <p className="text-slate-600 dark:text-white/60">
            Last message was this
          </p>
          <div className="flex bg-gray-400/60 rounded-full text-white w-6 h-6 items-center justify-center dark:bg-gray-600 dark:text-white">
            <span>3</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
