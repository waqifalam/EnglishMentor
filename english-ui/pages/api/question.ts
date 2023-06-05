import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/mongo/dbConnect";
import Question from "../../lib/mongo/models/questions";

const questions = ["Are you on track to meet the deadline?", "Hey, what's going on?", "How are you? How is life outside of work?", "How are your parents/grandparents? Where do they live? Do you visit them?", "How is your family?", "How was your weekend?", "How’s it going?", "If around a holiday: Do you celebrate [Holiday]? If so, can I ask what are you plans?", "If they have children: How is [name of child] doing? (Ask something related to their age like starting school, playing sports, or other interests.)", "I’ve noticed you’re a little quieter than usual. Is there anything you’d like to talk about?", "So, what’s on your mind? (or Anything on your mind?)", "Tell me a story...", "Tell me about anything you stumbled over.", "Tell me about last week.", "Tell me about what you’ve been working on.", "Tell me about your family/weekend/ activities?", "Tell me about your week – what’s it been like?", "What can I do to make your day better?", "What do you like to do in your free time? What are your hobbies?", "What have you been doing for fun lately?", "What would you like to focus on at this meeting?", "What would you like to start with?", "What's something I don't know, but should?", "Who do you really admire? Why? (People often admire those they want to become)", "Would you like to walk today, or go somewhere else outside the office?"];

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    res.status(200).json({ question: questions[Math.floor(Math.random() * questions.length)] });
    // await dbConnect();
    // const question = await Question.aggregate([{ $sample: { size: 1 } }]);
    // if (!question.length) {
    //   console.error("DB does not contain any questions");
    //   res.status(404);
    // } else {
    //   res.status(200).json({ question: question.pop().question });
    // }
  } catch (err) {
    console.error("Error when quering for question", err);
    res.status(500);
  }
}
