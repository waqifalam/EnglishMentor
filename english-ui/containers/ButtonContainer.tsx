import React from "react";
import "tailwindcss/tailwind.css";

interface Props {
  children?: React.ReactNode;
}

const ButtonContainer: React.FC<Props> = ({ children }) => {
  return <div className="container mx-auto px-6 my-1 flex flex-wrap -m-4 w-screen justify-center	">{children}</div>;
};

export default ButtonContainer;
