import axios from "axios";

const { GRAMMARBOT_URL, GRAMMARBOT_HOST, GRAMMARBOT_KEY } = process.env;

const callGrammarBot = async (params: unknown) => {
  const options = {
    method: "POST",
    url: GRAMMARBOT_URL,
    headers: {
      "x-rapidapi-host": GRAMMARBOT_HOST,
      "x-rapidapi-key": GRAMMARBOT_KEY,
    },
    params,
  };

  return await axios.request(options);
};

const getCorrection = async (transcriptText: string): Promise<string> => {
  // TODO: remove after testing
  return "";
  const response = await callGrammarBot({ text: transcriptText });
  const grammarbotResponse = response.data;
  if (grammarbotResponse.edits?.length) return grammarbotResponse.correction;
  return "";
};

export default {
  getCorrection,
};
