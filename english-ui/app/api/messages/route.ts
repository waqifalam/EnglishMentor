import sendTranscript from '@/lib/Transcripts/SendTranscript';
import { NextResponse } from 'next/server';
 
export async function POST(request: Request) {
  const body = await request.json()
  const { uuid, text, id } = body;
  const transcript = {
    uuid,
    transcriptItem: {
      id,
      text,
    },
  };

  sendTranscript(transcript);
  return NextResponse.json({ status: 'ok' })
}