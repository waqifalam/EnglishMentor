import "regenerator-runtime/runtime";
import "tailwindcss/tailwind.css";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import ProgressRing from "../components/ProgressRing";
import sendNewTranscript from "../Network/sendNewTranscript";
import useCookies from "../hooks/useCookies";
import ButtonContainer from "../containers/ButtonContainer";
import Button from "../components/Button";
import getQuestion from "../Network/getQuestion";
import { StoreContext } from "../utils/store";
import createTranscript from "../utils/createTranscript";
import utter from "../lib/SpeechSynthesis/SpeechSynthesis";
import SpeakingSvg from "../public/speaking.svg";

const timeInterval = Number(process.env.NEXT_PUBLIC_TIMEINTERVAL);
const speechToTextOptions = {
  continuous: true,
  language: "en-GB",
};

const SpeakingSection = (): JSX.Element => {
  const { results: resultsContext, question: questionContext } = useContext(StoreContext);
  const [results, setResults] = resultsContext;
  const setQuestion = questionContext[1];
  const [isAskingQuestion, setIsAskingQuestion] = useState(false);

  const { interimTranscript, finalTranscript, resetTranscript, listening } = useSpeechRecognition({});

  const [recordingTranscript, setRecordingTranscript] = useState(false);
  const [prevQuestion, setPrevQuestion] = useState("");
  const [cookies] = useCookies({ uuid: "" });

  useEffect(() => {
    if (finalTranscript !== "" && !listening) {
      const { id, text } = createTranscript(finalTranscript);
      sendNewTranscript(cookies.uuid, text, id);
      setResults(() => [...results, { id, text, processingResults: true, correction: "" }]);
      resetTranscript();
    }
  }, [interimTranscript, finalTranscript, listening]);

  useEffect(() => {
    if (recordingTranscript) {
      const interval = setInterval(() => {
        stopListening();
        clearInterval(interval);
      }, timeInterval * 1000);
    }
  }, [recordingTranscript]);

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setRecordingTranscript(false);
    setQuestion("");
  };

  const startListening = () => {
    setIsAskingQuestion(true);
    const lastResult = results.length ? results[results.length - 1].text : "";
    const payload = prevQuestion ? [prevQuestion, lastResult] : [];
    getQuestion(payload).then((question) => {
      setQuestion(question);
      setPrevQuestion(question);
      utter(window.speechSynthesis, question, () => {
        setIsAskingQuestion(false);
        SpeechRecognition.startListening(speechToTextOptions);
        setRecordingTranscript(true);
      });
    });
  };

  return (
    <div>
      <ButtonContainer>
        <Button onClick={listening ? stopListening : startListening} text={listening ? "Listening" : "Start Question"} disabled={isAskingQuestion}>
          {listening ? <ProgressRing radius={20} stroke={4} time={timeInterval} /> : <Image src={SpeakingSvg} height={20} width={20} className="fill-current" alt={""} />}
        </Button>
      </ButtonContainer>
    </div>
  );
};
export default SpeakingSection;
