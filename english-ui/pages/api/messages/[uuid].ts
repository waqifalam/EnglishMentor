import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/mongo/dbConnect";
import Transcripts from "../../../lib/mongo/models/transcripts";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { uuid } = req.query;
  try {
    await dbConnect();
    const transcript = await Transcripts.findOne({ uuid }).exec();
    res.status(200).json({ messages: transcript.transcripts });
  } catch (err) {
    console.error(err);
    res.status(500);
  }
}
