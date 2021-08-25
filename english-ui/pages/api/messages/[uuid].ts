import { NextApiRequest, NextApiResponse } from 'next'
import messageApiClient from '../../../lib/grpc/MessagesApiController';

interface Message {
    id: string;
    text: string;
    correction: [];
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const uuid = req.query;
    const messages: Message[] = [];
    const call = messageApiClient.getResults(uuid);
    call.on('data', (message: Message) => messages.push(message));
    call.on('end', () => res.status(200).json({ messages }))
}
