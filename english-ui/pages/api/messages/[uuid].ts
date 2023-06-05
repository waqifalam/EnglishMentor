import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/mongo/dbConnect";
import Transcripts from "../../../lib/mongo/models/transcripts";

const sampleTranscripts = [
  {
    id: "5174280b-161a-40a2-9401-025584be5db3",
    text: "I am good",
    correction: "I am good at it.",
  },
  {
    id: "fcba90ed-3ce3-4ec2-b010-30fb34c9a472",
    text: "I went fishing last week",
    correction: "I went fishing last week.",
  },
  {
    id: "0cfbf7b4-e76d-479a-ae27-8efa94c5f7cb",
    text: "I went fishing last week",
    correction: "",
  },
  {
    id: "7ca04f36-257d-4c79-8948-a40d46e805c5",
    text: "I am doing good",
    correction: "",
  },
  {
    id: "08fbe261-a82a-49f3-b747-7c5155079f3e",
    text: "It was good",
    correction: "",
  },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { uuid } = req.query;
  try {
    res.status(200).json({ messages: sampleTranscripts });
    // await dbConnect();
    // const transcript = await Transcripts.findOne({ uuid }).exec();
    // console.log(transcript.transcripts);
    // res.status(200).json({ messages: transcript.transcripts });
  } catch (err) {
    console.error(err);
    res.status(500);
  }
}
