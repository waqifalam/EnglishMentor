import React from "react";

interface Props {
  children?: React.ReactNode;
}

const ButtonContainer: React.FC<Props> = ({ children }) => {
  return (
    <div id="button-container" className="container mx-auto px-6 my-1 py-10 flex flex-wrap -m-4 w-screen justify-center">
      {children}
    </div>
  );
};

export default ButtonContainer;
