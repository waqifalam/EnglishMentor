import OpenAssistantLLM from "../GrammarLibs/OpenAssistantLLM";
import PusherServer from "../Pusher/PusherServer";
import saveTranscript from "./SaveTranscript";
import { TranscriptDao } from "./transcript";

const sendTranscript = async (transcript: TranscriptDao): Promise<void> => {
  const { uuid, transcriptItem } = transcript;
  const correction = await OpenAssistantLLM.getCorrection(transcriptItem.text);
  const result = { ...transcriptItem, correction };
  await saveTranscript(uuid, result);
  await PusherServer.trigger(uuid, "sendTranscript", result);
};

export default sendTranscript;
