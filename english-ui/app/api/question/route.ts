import dbConnect from "@/lib/mongo/dbConnect";
import { NextResponse } from "next/server";
import Questions from "@/lib/mongo/models/questions";

export async function GET(request: Request) {
  await dbConnect();
  const question = await Questions.aggregate([{ $sample: { size: 1 } }]);
  if (!question.length) {
    console.error("DB does not contain any questions");
    return NextResponse.json({ question: "" });
  }
  return NextResponse.json({ question: question[0].question });
}
