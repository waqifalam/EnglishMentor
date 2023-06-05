import axios from "axios";

interface IHuggingFaceGeneratedText {
  generated_text: string;
}

const fixGrammar = async (text: string) => {
  const url = "https://api-inference.huggingface.co/models/vennify/t5-base-grammar-correction";
  const headers = {
    "content-type": "application/json",
  };
  const data = {
    inputs: text,
  };

  return await axios.post<IHuggingFaceGeneratedText[]>(url, data, { headers });
};

const getCorrection = async (text: string): Promise<string> => {
  const response = await fixGrammar(text);
  if (!response || !response.data) return "";
  const fixedSentences = response.data.pop()?.generated_text;
  if (!fixedSentences) return "";
  if (fixedSentences === `${text}.`) return "";
  return fixedSentences;
};

export default { getCorrection };
