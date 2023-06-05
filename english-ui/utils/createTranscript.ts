import { v4 } from "uuid";

const createTranscript: (finalTranscript: string) => { id: string; text: string } = (finalTranscript: string) => {
  return {
    id: v4(),
    text: finalTranscript.charAt(0).toUpperCase() + finalTranscript.slice(1),
  };
};

export default createTranscript;
