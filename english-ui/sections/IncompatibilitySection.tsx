import React, { useState, useEffect} from "react";
import SpeechRecognition from 'react-speech-recognition';
import Modal from '../components/Modal';

const IncompatibilitySection = (): JSX.Element => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) setShowModal(true);
  }, [])

  return (
    <Modal handleClose={() => setShowModal(false)} show={showModal}>
      <p>Your browser does not support speech recognition software! Try Chrome desktop, maybe?</p>
    </Modal>
  );
};

export default IncompatibilitySection;
