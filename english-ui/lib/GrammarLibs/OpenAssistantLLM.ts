import axios from "axios";

const callModel = async (inputs: string) => {
  const url = "https://api-inference.huggingface.co/models/OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5";
  const headers = {
    "content-type": "application/json",
    Authorization: `Bearer ${process.env.HUGGING_FACE_BEARER_TOKEN}`,
  };
  const data = {
    inputs,
    options: {
      wait_for_model: true,
    },
  };

  return await axios.post(url, data, { headers });
};

const generateConversation = (previousConversations: string[]) => {
  const generatePrompt = (prompt: string) => `<|prompter|>${prompt}<|endoftext|><|assistant|>`;
  if (!previousConversations || !previousConversations.length) {
    return generatePrompt("Generate a question to ask for small talk");
  }

  return generatePrompt(`Based on the following conversation give me a follow up question: ${previousConversations[0]}\n${previousConversations[1]}`);
};

const getQuestion = async (conversationBits: string[]) => {
  const conversation = generateConversation(conversationBits);
  const response = await callModel(conversation);
  const { data } = response;
  const generatedText = data.pop()?.generated_text;
  if (!generatedText) return "";
  return generatedText.replace(conversation, "");
};

const getCorrection = async (text: string): Promise<string> => {
  const prompt = `<|prompter|>Fix the grammar of this sentence: "${text}". Ignore any spelling mistakes or punctuation or any errors that may happen due to speech transcription.<|endoftext|><|assistant|>`;
  const response = await callModel(prompt);
  if (!response || !response.data) return "";
  const fixedSentence = (response.data.pop()?.generated_text || "").replace(prompt, "");
  if (!fixedSentence) return "";
  const sanitiseString = (str: string) => {
    const punctuation = /[\.,?!]/;
    return str.toLowerCase().replace(punctuation, "");
  };
  if (sanitiseString(fixedSentence) === sanitiseString(text)) return "";
  return fixedSentence;
};

export default {
  getQuestion,
  getCorrection,
};
