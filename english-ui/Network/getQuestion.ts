const getQuestion = () => {
    const url = process.env.NEXT_PUBLIC_QUESTION_API;
    if (url) {
        return fetch(url)
            .then((res) => res.json())
            .then((jsonResponse) => (jsonResponse.question || ''));
    }
    else throw new Error('No URL environment var set');
}

export default getQuestion;
