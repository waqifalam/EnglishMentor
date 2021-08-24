import Image from 'next/image'
import { useEffect, useContext } from 'react';
import ResultsContainer from '../containers/ResultsContainer';
import useCookies from '../hooks/useCookies';
import Pusher from 'pusher-js';
import { StoreContext } from '../utils/store';
import scrollToBottom from '../utils/scrollToBottom';

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
        scrollToBottom('result-container');
    }, [results])

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
            <div className='h-full w-full p-5'>
                {(results && results.length) ? results.map((result, key) => {
                  const hasErrors = result.correction && result.correction.length;
                  const isProcessing = result.processingResults;

                  return (
                    <div 
                        key={key}
                        className='bg-white w-full rounded-xl p-5 my-2 flex flex-col transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105'
                        style={{ minHeight: '100px' }}
                    >
                      <div className='flex'>
                        <div className='mx-7'>
                          <Image src={isProcessing ? ('/loading.svg') : (hasErrors ? '/redcross2.svg' : '/greentick.svg')} width="32" height="32"/>
                        </div>
                        <div>
                          <div><p className={hasErrors ? 'text-red-500' : 'text-green-600'}>{result.text}</p></div>
                          {isProcessing ? <p>This result is being processed</p> : null}
                          {(result.correction && result.correction.length) ? (
                            <div><p className='italic'>Corrections:</p>
                              <ul className='list-disc mx-5'>
                              {result.correction.map((correction, correctionKey) => (<li key={correctionKey}>{correction.message}</li>))}
                              </ul>
                            </div>
                          ) : (
                            <div><p className='italic text-green-600 text-xs'>Good Job!</p></div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                }) : null}
            </div>
        </ResultsContainer>
    );
};
export default ResultsSection;
