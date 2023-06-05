import dbConnect from "@/lib/mongo/dbConnect";
import Transcripts from "@/lib/mongo/models/transcripts";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { uuid: string } }) {
  const { uuid } = params;
  await dbConnect();
  const userTranscript = await Transcripts.findOne({ uuid }).exec();
  const transcripts = userTranscript.transcripts.map(({ id, text, correction }: { id: string; text: string; correction: string }) => ({ id, text, correction }));
  return NextResponse.json({ messages: transcripts });
}
