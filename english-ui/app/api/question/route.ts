import { NextResponse } from "next/server";
import OpenAssistantLLM from "@/lib/GrammarLibs/OpenAssistantLLM";

export async function POST(request: Request) {
  const body = await request.json();
  const { conversation } = body;
  const question = await OpenAssistantLLM.getQuestion(conversation);
  return NextResponse.json({ question });
}
