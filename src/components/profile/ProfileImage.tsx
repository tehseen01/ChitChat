import { IUser } from "@/lib/interface";
import clsx from "clsx";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface ProfileImageProps {
  displayName: string;
  photoURL: string;
  variant: "small" | "large";
}

const ProfileImage = ({
  displayName,
  photoURL,
  variant,
}: ProfileImageProps) => {
  const [firstLetter, setFirstLetter] = useState<string>("");

  useEffect(() => {
    let splitName = displayName.split(" ");
    let result =
      splitName.length === 1
        ? splitName[0].charAt(0).toUpperCase()
        : splitName
            .slice(0, 2)
            .map((word) => word.charAt(0))
            .join("")
            .toUpperCase();

    setFirstLetter(result);
  }, [displayName]);

  return (
    <>
      <div
        className={clsx(
          variant === "small" ? "w-10 h-10 rounded-full" : "w-full",
          " aspect-square"
        )}
      >
        {photoURL === null ? (
          <div
            className={clsx(
              variant === "small" && "rounded-full",
              "bg-yellow-500 flex items-center justify-center w-full h-full"
            )}
          >
            <span
              className={clsx(
                variant === "small" ? "text-xl" : "text-[10rem]",
                "font-medium "
              )}
            >
              {firstLetter}
            </span>
          </div>
        ) : (
          <Image
            src={photoURL}
            alt={displayName}
            width={variant === "large" ? 400 : 50}
            height={variant === "large" ? 400 : 50}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      {variant === "large" && (
        <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-black/50 to-black/0 flex flex-col justify-end px-4 pb-2">
          <div className="text-lg font-semibold text-white">{displayName}</div>
        </div>
      )}
    </>
  );
};

export default ProfileImage;
