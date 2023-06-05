import { NextApiRequest, NextApiResponse } from "next";
import sendTranscript from "../../lib/Transcripts/SendTranscript";

export default function handler(req: NextApiRequest, res: NextApiResponse): void {
  if (req.method === "POST") {
    const { uuid, text, id } = req.body;
    const transcript = {
      uuid,
      transcriptItem: {
        id,
        text,
      },
    };
    sendTranscript(transcript);
    res.status(200).json({ status: "ok" });
  } else {
    res.status(400).json({ error: "Can only POST to this route" });
  }
}
