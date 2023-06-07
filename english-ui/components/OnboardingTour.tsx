import React, { useState } from "react";
import Image from "next/image";
import Logo from "../public/english-mentor-logo.png";
import dynamic from "next/dynamic";
const JoyRideNoSSR = dynamic(() => import("react-joyride"), { ssr: false });
const OnboardingTour = (): JSX.Element => {
  const steps = [
    {
      target: "#onboarding-button",
      content: <p>Welcome to our Engling speaking app! Practice speaking English without judgment by conversing with our AI. Engage in realistic conversations where the AI generates questions based on your responses.</p>,
      disableBeacon: true,
    },
    {
      target: "#start-button",
      content: <p>Click "Start Question" to hear the AI's question, respond verbally, and view feedback on your speech. </p>,
    },
    {
      target: "#question-container",
      content: <p>This box not only displays the AI's questions in text format but also serves as a helpful resource in case you missed or want to review the question.</p>,
    },
    {
      target: "#result-container",
      content: <p>Learn from mistakes, practice regularly, and enjoy your journey to becoming a confident English speaker. Start now and unlock your potential!</p>,
    },
  ];
  const [runTour, setRunTour] = useState(false);
  const callback = (data: any) => {
    const { type } = data;
    if (type === "tour:end" && runTour) {
      setRunTour(false);
    }
  };

  return (
    <>
      <div className="flex pt-5 pb-5 justify-center">
        <Image src={Logo} width={200} className="fill-current" alt={"EnglishMentor.io Logo"} />
      </div>
      <div className="flex pb-5 pr-10">
        <button onClick={() => setRunTour(true)} className="ml-auto bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded" id="onboarding-button">
          Learn to use!
        </button>
      </div>
      <JoyRideNoSSR
        callback={callback}
        continuous
        hideCloseButton
        run={runTour}
        scrollToFirstStep
        showProgress
        showSkipButton
        steps={steps}
        styles={{
          options: {
            primaryColor: "#6366f1",
          },
        }}
      />
    </>
  );
};

export default OnboardingTour;
