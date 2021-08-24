const getQuestion = () => {
    return fetch(process.env.NEXT_PUBLIC_QUESTION_API)
        .then((res) => res.json())
        .then((jsonResponse) => (jsonResponse.question || ''));
}

export default getQuestion;
