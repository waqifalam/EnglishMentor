const getQuestion: () => Promise<string> = () => {
  return fetch("/api/question")
    .then((res) => res.json())
    .then((jsonResponse) => jsonResponse.question || "");
};

export default getQuestion;
