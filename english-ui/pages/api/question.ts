import { NextApiRequest, NextApiResponse } from 'next'
import questionsApiClient from '../../lib/grpc/QuestionsApiController';

export default function handler(req: NextApiRequest, res: NextApiResponse): void {
    questionsApiClient.getQuestion(null, (err: unknown, response: { text: string; }) => {
        if (err) res.status(400);
        else res.status(200).json({ question: response.text });
    })
}