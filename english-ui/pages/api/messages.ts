import messageApiClient from '../../lib/grpc/MessagesApiController';

export default function handler(req: { method: string; body: { uuid: any; text: any; id: string }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { status?: string; error?: string; }): void; new(): any; }; }; }) {
    if (req.method === 'POST') {
        const { uuid, text, id } = req.body;
        const requestBody = {
            uuid,
            transcriptItem: {
                id,
                text,
            }
        }
        messageApiClient.sendTranscript(requestBody, (err: { message: any; }) => {
            if (err) console.log(`Error sending transcript to Message API ${err.message}`);
        })
        res.status(200).json({ status: 'ok' });
    } else {
        res.status(400).json({ error: 'Can only POST to this route' });
    }
}
