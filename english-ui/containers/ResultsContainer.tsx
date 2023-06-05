import "tailwindcss/tailwind.css";
import React from "react";

interface Props {
  children?: React.ReactNode;
}

const ResultsContainer: React.FC<Props> = ({ children }) => {
  return (
    <div id="result-container" className="bg-indigo-100 w-full rounded-xl p-6 py-10 flex flex-col justify-end items-center" style={{ height: "450px", overflow: "auto" }}>
      {children}
    </div>
  );
};

export default ResultsContainer;
