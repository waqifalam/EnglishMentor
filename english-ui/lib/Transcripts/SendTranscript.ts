import GrammarBotLib from "../GrammarBot";
import PusherServer from "../Pusher/PusherServer";
import saveTranscript from "./SaveTranscript";
import { TranscriptDao } from "./transcript";

const sendTranscript = async (transcript: TranscriptDao): Promise<void> => {
  const { uuid, transcriptItem } = transcript;
  const correction = await GrammarBotLib.getCorrection(transcriptItem.text);
  const result = { ...transcriptItem, correction };
  await saveTranscript(uuid, result);
  PusherServer.trigger(uuid, "sendTranscript", result);
};

export default sendTranscript;
