import React from "react";

interface BackBtnProps {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const BackBtn = ({ children, onClick }: BackBtnProps) => {
  return (
    <button
      className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default BackBtn;
