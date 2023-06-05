import t5FlanGrammar from "../GrammarLibs/t5FlanGrammar";
import PusherServer from "../Pusher/PusherServer";
import saveTranscript from "./SaveTranscript";
import { TranscriptDao } from "./transcript";

const MAX_API_FAILURE_RETRY = 3;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const sendTranscript = async (transcript: TranscriptDao): Promise<void> => {
  const { uuid, transcriptItem } = transcript;
  for (let i = 0; i < MAX_API_FAILURE_RETRY; i++) {
    try {
      const correction = await t5FlanGrammar.getCorrection(transcriptItem.text);
      const result = { ...transcriptItem, correction };
      await saveTranscript(uuid, result);
      await PusherServer.trigger(uuid, "sendTranscript", result);
      break;
    } catch (err) {
      console.error(`Failed to get correction on ${i + 1} attempt`);
      await sleep(200);
    }
  }
};

export default sendTranscript;
