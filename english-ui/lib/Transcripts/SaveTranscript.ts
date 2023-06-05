import dbConnect from "../mongo/dbConnect";
import Transcripts from "../mongo/models/transcripts";
import { TranscriptResult } from "./transcript";

const saveTranscript = async (uuid: string, result: TranscriptResult): Promise<void> => {
  console.log("connecting");
  await dbConnect();
  console.log("connected");
  const userTranscript = await Transcripts.findOne({ uuid }).exec();
  console.log("user transcript is ");
  console.log({ userTranscript });
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
