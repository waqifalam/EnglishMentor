import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/mongo/dbConnect";
import Question from "../../lib/mongo/models/questions";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    await dbConnect();
    const question = await Question.aggregate([{ $sample: { size: 1 } }]);
    if (!question.length) {
      console.error("DB does not contain any questions");
      res.status(404);
    } else {
      res.status(200).json({ question: question.pop().question });
    }
  } catch (err) {
    console.error("Error when quering for question", err);
    res.status(500);
  }
}
