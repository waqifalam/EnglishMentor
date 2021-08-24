import React, { useState } from 'react'

const initialState = {
  question: ['', () => {}],
  results: [[], () => {}],
};

export const StoreContext = React.createContext(initialState);

interface Props {
  children?: React.ReactNode;
}

const StoreProvider: React.FC<Props> = ({ children }) => {
  const store = {
    question: useState(''),
    results: useState([]),
  };

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export default StoreProvider;
