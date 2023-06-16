import React, { useEffect, useState } from "react";

const useFirstLetter = ({ displayName }: { displayName: string }) => {
  const [firstLetter, setFirstLetter] = useState<string>("");

  useEffect(() => {
    if (displayName) {
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
    }
  }, [displayName]);
  return firstLetter;
};

export default useFirstLetter;
