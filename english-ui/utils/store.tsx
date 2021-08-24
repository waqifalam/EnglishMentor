import React, { useState } from 'react'

export const StoreContext = React.createContext(null)

const StoreProvider = ({ children }) => {
  const [question, setQuestion] = useState('...');
  const [results, setResults] = useState([]);

  const store = {
    question: [question, setQuestion],
    results: [results, setResults],
  };

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export default StoreProvider;
