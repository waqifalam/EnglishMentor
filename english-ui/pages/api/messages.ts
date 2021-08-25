import { NextApiRequest, NextApiResponse } from 'next'
import messageApiClient from '../../lib/grpc/MessagesApiController';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { uuid, text, id } = req.body;
        const requestBody = {
            uuid,
            transcriptItem: {
                id,
                text,
            }
        }
        messageApiClient.sendTranscript(requestBody, (err: { message: string; }) => {
            if (err) console.log(`Error sending transcript to Message API ${err.message}`);
        })
        res.status(200).json({ status: 'ok' });
    } else {
        res.status(400).json({ error: 'Can only POST to this route' });
    }
}
