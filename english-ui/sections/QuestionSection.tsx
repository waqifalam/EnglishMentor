import React, { useContext } from "react";
import { StoreContext } from "../utils/store";

const QuestionSection = (): JSX.Element => {
  const { question: questionContext } = useContext(StoreContext)
  const [question] = questionContext
  const flashingCss = !question ? 'animate-pulse' : '';
  const defaultText = `Click on 'Start Question' to start`;

  return (
    <div className={`my-2 bg-indigo-100 w-full rounded-xl p-6 flex flex-col justify-end items-center ${flashingCss}`}>
      <p className='text-indigo-600'>{question ? question : defaultText}</p>
    </div>
  );
};

export default QuestionSection;
