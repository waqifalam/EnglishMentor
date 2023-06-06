const getQuestion: (payload: string[]) => Promise<string> = async (payload) => {
  const res = await fetch("/api/question", {
    method: "POST",
    body: JSON.stringify({ conversation: payload }),
  });
  const jsonResponse = await res.json();
  return jsonResponse.question || "";
};

export default getQuestion;
