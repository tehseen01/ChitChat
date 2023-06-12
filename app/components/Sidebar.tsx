import React from "react";
import { SearchBar, ChatList, MainMenu } from "./";

export const Sidebar = () => {
  return (
    <aside className="sm:w-[350px] w-full bg-white h-screen dark:bg-[#202123]">
      <div className="flex items-center gap-2 p-2 relative">
        <MainMenu />

        <div className="flex-1">
          <SearchBar />
        </div>
      </div>
      <div className="h-[calc(100vh_-_61px)] overflow-y-scroll">
        <ChatList />
      </div>
    </aside>
  );
};
