import t5FlanGrammar from "../GrammarLibs/t5FlanGrammar";
import PusherServer from "../Pusher/PusherServer";
import saveTranscript from "./SaveTranscript";
import { TranscriptDao } from "./transcript";

const sendTranscript = async (transcript: TranscriptDao): Promise<void> => {
  const { uuid, transcriptItem } = transcript;
  console.log("received transcript");
  console.log({ transcript });
  const correction = await t5FlanGrammar.getCorrection(transcriptItem.text);
  console.log("received correction");
  console.log({ correction });
  const result = { ...transcriptItem, correction };
  await saveTranscript(uuid, result);
  console.log("saved to db");
  await PusherServer.trigger(uuid, "sendTranscript", result);
};

export default sendTranscript;
