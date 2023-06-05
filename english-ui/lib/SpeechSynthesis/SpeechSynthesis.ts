const utter = (synth: SpeechSynthesis, question: string, callback: () => void): void => {
  const utterThis = new SpeechSynthesisUtterance(question);
  synth.speak(utterThis);
  utterThis.onend = () => callback();
};

export default utter;
