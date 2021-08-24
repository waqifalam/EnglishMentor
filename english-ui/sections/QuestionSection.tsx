import { useContext } from "react";
import { StoreContext } from "../utils/store";

const QuestionSection = () => {
    const { question: questionContext } = useContext(StoreContext)
    const [question] = questionContext

    return (
        <div className='my-2 bg-indigo-100 w-full rounded-xl p-6 flex flex-col justify-end items-center'>
            {question}
        </div>
    );
};
export default QuestionSection;
