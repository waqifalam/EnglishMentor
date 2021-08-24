import { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css'
import useCookies from '../hooks/useCookies';

const ResultsContainer = ({ children }) => {
    return (
        <div
            className='bg-indigo-100 w-full rounded-xl p-6 flex flex-col justify-end items-center'
            style={{ maxHeight: '70vh', overflowY: 'auto', position: 'relative', overflowX: 'hidden' }}
        >
          {children}
      </div>
    );
  };
  export default ResultsContainer;
  