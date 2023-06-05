import { NextResponse } from 'next/server';

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

export async function GET(request: Request) {
    return NextResponse.json({ messages: sampleTranscripts });
}