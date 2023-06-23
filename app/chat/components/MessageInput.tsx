"use client";
import { PaperAirplaneIcon, PhotoIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

const MessageInput = () => {
  const [message, setMessage] = useState("");

  return (
    <div className="w-full bg-gray-100 h-full ">
      <div className="flex items-center px-4 py-2 gap-4">
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="focus:outline-none focus:ring-0 focus:border-0 w-full h-full bg-white rounded-full p-3 flex-1"
        />

        {message ? (
          <button className="w-10 h-10 rounded-full hover:bg-blue-400 hover:text-white flex-center">
            <PaperAirplaneIcon className="w-6 h-6" />
          </button>
        ) : (
          <button className="w-10 h-10 rounded-full hover:bg-blue-400 hover:text-white flex-center">
            <PhotoIcon className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
};

export default MessageInput;
