import Image from "next/image";
import React, { useEffect, useContext } from "react";
import ResultsContainer from "../containers/ResultsContainer";
import useCookies from "../hooks/useCookies";
import { Result, StoreContext } from "../utils/store";
import scrollToBottom from "../utils/scrollToBottom";
import PusherClient from "../lib/Pusher/PusherClient";

const ResultsSection = (): JSX.Element => {
  const { results: resultsContext } = useContext(StoreContext);
  const [results, setResults] = resultsContext;

  const [cookies] = useCookies();

  useEffect(() => {
    if (cookies.uuid) {
      fetch(`/api/messages/${cookies.uuid}`)
        .then((res) => res.json())
        .then((newRes) => setResults(newRes.messages));
    }
  }, [cookies]);

  useEffect(() => {
    scrollToBottom("result-container");
  }, [results]);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_PUSHER_KEY) return;
    if (cookies.uuid) {
      const subscribedChannel = PusherClient.subscribe(cookies.uuid);
      subscribedChannel.bind("sendTranscript", (data: Result) => {
        setResults((prevRes) => prevRes.map((result) => (result.id === data.id ? data : result)));
      });
    }
    return () => {
      PusherClient.unsubscribe(cookies.uuid);
    };
  }, [cookies]);

  return (
    <ResultsContainer>
      <div className="h-full w-full p-5">
        {results && results.length
          ? results.map((result, key) => {
              const hasErrors = result.correction;
              const status = result.processingResults ? "processing" : hasErrors ? "error" : "success";

              return (
                <div key={key} className="bg-white w-full rounded-xl p-5 my-2 flex flex-col transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                  <div className="flex">
                    <div className="mx-7">
                      {
                        {
                          processing: <Image src="/loading.svg" width="32" height="32" className="animate-spin" />,
                          error: <Image src="/redcross.svg" width="32" height="32" />,
                          success: <Image src="/greentick.svg" width="32" height="32" />,
                        }[status]
                      }
                    </div>
                    <div>
                      <div>
                        <p className={hasErrors ? "text-red-500" : "text-green-600"}>{result.text}</p>
                      </div>
                      {
                        {
                          processing: <p className="italic text-xs">This result is being processed</p>,
                          error: (
                            <div>
                              <p className="italic">Correction:</p>
                              <ul className="list-disc mx-5">{result.correction}</ul>
                            </div>
                          ),
                          success: (
                            <div>
                              <p className="italic text-green-600 text-xs">Good Job!</p>
                            </div>
                          ),
                        }[status]
                      }
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </ResultsContainer>
  );
};
export default ResultsSection;
