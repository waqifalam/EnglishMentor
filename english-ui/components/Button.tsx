import React from "react";

interface Props {
  children?: React.ReactNode;
  onClick: () => void;
  text: string;
  disabled: boolean;
}

const Button: React.FC<Props> = ({ children, onClick, text, disabled = false }) => {
  return (
    <div className="p-2 md:w-40 ">
      <a onClick={onClick} className="transition duration-500 ease-in-out flex items-center p-4 rounded-lg shadow-xs cursor-pointer bg-indigo-500 hover:bg-indigo-700 transform hover:-translate-y-1 hover:scale-110 text-white" style={{ pointerEvents: disabled ? "none" : undefined }}>
        {children}
        <div>
          <p className=" text-xs font-medium ml-2 ">{text}</p>
        </div>
      </a>
    </div>
  );
};
export default Button;
