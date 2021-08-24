import messageApiClient from '../../../lib/grpc/MessagesApiController';

interface Message {
    id: string;
    text: string;
    correction: [];
}

export default function handler(req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { messages: any[]; }): any; new(): any; }; }; }) {
    const uuid = req.query;
    const messages: Message[] = [];
    const call = messageApiClient.getResults(uuid);
    call.on('data', (message: Message) => messages.push(message));
    call.on('end', () => res.status(200).json({ messages }))
}
