const getQuestion: () => Promise<string> = async () => {
  const res = await fetch("/api/question");
  const jsonResponse = await res.json();
  return jsonResponse.question || "";
};

export default getQuestion;
