import Image from "next/image";
import React from "react";

const Loading = ({ variant }: { variant: "small" | "large" }) => {
  return (
    <div className="flex items-center justify-center h-[100dvh]">
      <Image
        src={"/Spinner.svg"}
        alt="spinner loader"
        width={variant === "small" ? 100 : 150}
        height={variant === "small" ? 100 : 150}
      />
    </div>
  );
};

export default Loading;
