import dbConnect from "../mongo/dbConnect";
import Transcripts from "../mongo/models/transcripts";
import { TranscriptResult } from "./transcript";

const saveTranscript = async (uuid: string, result: TranscriptResult): Promise<void> => {
  await dbConnect();
  const userTranscript = await Transcripts.findOne({ uuid }).exec();
  if (userTranscript) {
    await Transcripts.updateOne({ uuid }, { $push: { transcripts: result } });
  } else {
    const newUserTranscript = {
      uuid,
      transcripts: [result],
    };
    await Transcripts.create(newUserTranscript);
  }
};

export default saveTranscript;
