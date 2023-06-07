import Image from "next/image";
import React, { useEffect, useContext, useState } from "react";
import ResultsContainer from "../containers/ResultsContainer";
import useCookies from "../hooks/useCookies";
import { Result, StoreContext } from "../utils/store";
import scrollToBottom from "../utils/scrollToBottom";
import PusherClient from "../lib/Pusher/PusherClient";

import ProcessingSvg from "../public/Loading.svg";
import ErrorSvg from "../public/RedCross.svg";
import SuccessSvg from "../public/GreenTick.svg";

const RESULTS_STATE = {
  isLoading: "loading",
  noResults: "no-results",
  hasResults: "has-results",
};

const renderResults = (resultsState: string, results: Result[]) => {
  switch (resultsState) {
    case RESULTS_STATE.isLoading:
      return (
        <div className="flex justify-center">
          <p className="text-xl text-indigo-500">Let the linguistic nostalgia begin! Loading your previous conversations in 3...2...1...</p>
        </div>
      );
    case RESULTS_STATE.noResults:
      return (
        <div className="flex justify-center">
          <p className="text-xl text-indigo-500">Let's break the ice and start a conversation – a blank canvas awaits your English mastery!</p>
        </div>
      );
    case RESULTS_STATE.hasResults:
      return results.map((result, key) => {
        const hasErrors = result.correction;
        const status = result.processingResults ? "processing" : hasErrors ? "error" : "success";

        return (
          <div key={key} className="bg-white w-full rounded-xl p-5 my-2 flex flex-col transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
            <div className="flex">
              <div className="mx-7">
                {
                  {
                    processing: <Image src={ProcessingSvg} width="32" height="32" className="animate-spin" alt={""} />,
                    error: <Image src={ErrorSvg} width="32" height="32" alt={""} />,
                    success: <Image src={SuccessSvg} width="32" height="32" alt={""} />,
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
      });
  }
};

const ResultsSection = (): JSX.Element => {
  const { results: resultsContext } = useContext(StoreContext);
  const [results, setResults] = resultsContext;
  const [isLoadingResults, setIsLoadingResults] = useState(false);

  const [cookies] = useCookies();

  useEffect(() => {
    if (cookies.uuid) {
      setIsLoadingResults(true);
      fetch(`/api/messages/${cookies.uuid}`)
        .then((res) => res.json())
        .then((newRes) => {
          setIsLoadingResults(false);
          setResults(newRes.messages);
        });
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

  const resultsState = isLoadingResults ? RESULTS_STATE.isLoading : results && results.length ? RESULTS_STATE.hasResults : RESULTS_STATE.noResults;
  return (
    <ResultsContainer>
      <div className="h-full w-full p-5">{renderResults(resultsState, results)}</div>
    </ResultsContainer>
  );
};
export default ResultsSection;
