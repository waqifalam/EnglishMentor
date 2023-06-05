import React, { useState } from "react";

export type Correction = {
  status: string;
  message: string;
  replacements: { value: string }[];
  offset: number;
  length: number;
  sentence: string;
};

export type Result = {
  id: string;
  text: string;
  correction: string;
  processingResults: boolean | undefined;
};

type StoreContextType = {
  question: [string, React.Dispatch<React.SetStateAction<string>>];
  results: [Result[], React.Dispatch<React.SetStateAction<Result[]>>];
};

const emptyArray: Result[] = [];
const initialState: StoreContextType = {
  question: [
    "",
    () => {
      return;
    },
  ],
  results: [
    emptyArray,
    () => {
      return;
    },
  ],
};

export const StoreContext = React.createContext(initialState);

interface Props {
  children?: React.ReactNode;
}

const StoreProvider: React.FC<Props> = ({ children }) => {
  const store = {
    question: useState(""),
    results: useState(emptyArray),
  };

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export default StoreProvider;
