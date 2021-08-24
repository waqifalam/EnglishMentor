import { useState, useEffect, useContext } from 'react';
import ResultsContainer from '../containers/ResultsContainer';
import useCookies from '../hooks/useCookies';
import Pusher from 'pusher-js';
import { StoreContext } from '../utils/store';

const ResultsSection = () => {
    const { results: resultsContext } = useContext(StoreContext);
    const [results, setResults] = resultsContext;

    const [cookies] = useCookies();
    useEffect(() => {
        if (cookies.uuid) {
            fetch(`${process.env.NEXT_PUBLIC_MESSAGES_API}/${cookies.uuid}`)
                .then(res => res.json())
                .then(newRes => setResults(newRes.messages));
        }
    }, [cookies])

    useEffect(() => {
        const pusher = new Pusher('3bb15c3711f3dd6e4fa3', {
            cluster: 'ap4'
        }); 
        if (cookies.uuid) {
            const channel = pusher.subscribe(cookies.uuid);
            channel.bind('sendTranscript', (data) => {
                setResults(() => results.map((result) => { return result.id === data.id ? data : result }));
            });
        }
        return () => {
            pusher.unsubscribe(cookies.uuid)
        }
    }, [cookies, results, setResults])

    return (
        <ResultsContainer>
            {(results && results.length) ? results.map((result, key) => (
            <div key={key} className='bg-white w-full rounded-xl min-h-20 p-4 m-4 flex flex-col relative'>
                <div><p>text: {result.text}</p></div>
                {result.processingResults ? <p>This result is being processed</p> : null}
                {(result.correction && result.correction.length) ? (<div>Corrections: {result.correction.map((correction, correctionKey) => (<p key={correctionKey}>{correction.message}</p>))}</div>) : null}
            </div>)) : null}
        </ResultsContainer>
    );
};
export default ResultsSection;
