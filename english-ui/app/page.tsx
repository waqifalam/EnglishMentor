"use client";
import SpeakingSection from "../sections/SpeakingSection";
import ResultsSection from "../sections/ResultsSection";
import QuestionSection from "../sections/QuestionSection";
import IncompatibilitySection from "../sections/IncompatibilitySection";
import StoreProvider from "../utils/store";
import OnboardingTour from "@/components/OnboardingTour";

export default function Home() {
  return (
    <div className="container">
      <main>
        <OnboardingTour />
        <IncompatibilitySection />
        <StoreProvider>
          <div className="px-5">
            <ResultsSection />
            <QuestionSection />
            <SpeakingSection />
          </div>
        </StoreProvider>
      </main>
    </div>
  );
}
