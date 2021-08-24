import questionsApiClient from '../../lib/grpc/QuestionsApiController';

export default function handler(req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { question: any; }): void; new(): any; }; }; }) {
    questionsApiClient.getQuestion(null, (err: any, response: { text: any; }) => {
        if (err) res.status(400);
        else res.status(200).json({ question: response.text });
    })
}