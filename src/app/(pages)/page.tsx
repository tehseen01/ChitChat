"use client";

import Image from "next/image";

export default function Home() {
  return (
    <main className="max-sm:hidden">
      <div className="flex items-center justify-center h-screen flex-col p-8 xl:w-2/3 m-auto">
        <div className="md:w-[340px] md:h-[340px] w-[250px] h-[250px]">
          <Image
            src={"/home_page.svg"}
            alt="home page"
            width={400}
            height={400}
            className="w-full h-full"
          />
        </div>
        <h1 className="text-4xl mb-4">ChitChat Web</h1>
        <p className="text-gray-600 text-center">
          ChitChat is a web app that lets you chat with your friends and family
          in a fun and easy way. You can create groups, send messages, share
          photos and more.
        </p>
      </div>
    </main>
  );
}
