import 'regenerator-runtime/runtime'
import React, { useContext, useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import ProgressRing from '../components/ProgressRing';
import sendNewTranscript from '../Network/sendNewTranscript';
import useCookies from '../hooks/useCookies';
import ButtonContainer from '../containers/ButtonContainer';
import Button from '../components/Button';
import getQuestion from '../Network/getQuestion';
import { v4 } from 'uuid';
import { StoreContext } from '../utils/store';

const timeInterval = Number(process.env.NEXT_PUBLIC_TIMEINTERVAL);

const SpeakingSection = () => {
  const { results: resultsContext, question: questionContext } = useContext(StoreContext);
  const [results, setResults] = resultsContext;
  const [_, setQuestion] = questionContext;

  const {
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
  } = useSpeechRecognition({});

  const [recordingTranscript, setRecordingTranscript] = useState(false);
  const [cookies] = useCookies({ uuid: '' });

  useEffect(() => {
    if (finalTranscript !== '' && !listening) {
      const id = v4();
      const text = finalTranscript.charAt(0).toUpperCase() + finalTranscript.slice(1);
      sendNewTranscript(cookies.uuid, text, id);
      setResults(() => [...results, { id, text, processingResults: true  }])
      resetTranscript();
    }
  }, [interimTranscript, finalTranscript, listening]);

//   if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
//     console.log('Your browser does not support speech recognition software! Try Chrome desktop, maybe?');
//     return (<div>Your Browser is not supported</div>);
//   }

  useEffect(() => {
    if (recordingTranscript) {
        const interval = setInterval(() => {
            toggleButton();
            clearInterval(interval);
        }, timeInterval*1000);
    }
  }, [recordingTranscript])

  const toggleButton = () => {
    if (listening) {
        SpeechRecognition.stopListening();
        setRecordingTranscript(false);
        setQuestion('');
    }
    else {
      getQuestion()
        .then(question => {
          setQuestion(question)
          const synth = window.speechSynthesis;
          const utterThis = new SpeechSynthesisUtterance(question);
          synth.speak(utterThis);
          utterThis.onend = function() {
            SpeechRecognition.startListening({
              continuous: true,
              language: 'en-GB',
              });
              setRecordingTranscript(true)
          }  
        })
    }
  };

  return (
      <div>
        <ButtonContainer>
            <Button
                onClick={toggleButton}
                text={listening ? 'Listening' : 'Start Question'}
            >
                {listening ? (
                    <ProgressRing
                        radius={20}
                        stroke={4}
                        time={timeInterval}
                    />
                ) : null}
            </Button>
        </ButtonContainer>
    </div>
  );
};
export default SpeakingSection;
