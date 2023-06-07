import React, { useContext } from "react";
import { StoreContext } from "../utils/store";

const QuestionSection = (): JSX.Element => {
  const { question: questionContext } = useContext(StoreContext);
  const [question] = questionContext;
  const flashingCss = !question ? "animate-pulse" : "";
  const defaultText = `Indulge your curiosity, click 'Start Question' and let the English journey begin!`;

  return (
    <div id="question-container" className={`my-2 bg-indigo-100 w-full rounded-xl p-6 flex flex-col justify-end items-center ${flashingCss}`}>
      <p className="text-indigo-600">{question ? question : defaultText}</p>
    </div>
  );
};

export default QuestionSection;
