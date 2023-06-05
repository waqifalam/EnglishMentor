import React from "react";
import Button from "./Button";

interface Props {
  children?: React.ReactNode;
  handleClose: () => void;
  show: boolean;
}

const Modal: React.FC<Props> = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "block" : "hidden";

  return (
    <div className={`z-10 fixed top-0 flex justify-center items-center left-0 w-full h-full ${showHideClassName}`} style={{ background: "rgba(0, 0, 0, 0.6)" }}>
      <section className="fixed p-5 bg-white w-2/5 h-1/4 flex items-center justify-center flex-col rounded-lg">
        <div className="h-full py-5 text-center px-2">{children}</div>
        <Button text="Close Modal" onClick={handleClose} disabled={false} />
      </section>
    </div>
  );
};

export default Modal;
