import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { useAudio } from '../context/useAudio';
import { Scene1Opening } from './Scene1Opening';
import { Scene2PhotoReveal } from './Scene2PhotoReveal';
import { Scene3VideoMoment } from './Scene3VideoMoment';
import { Scene4SevenThings } from './Scene4SevenThings';
import { RunawayButtonGame } from './games/RunawayButtonGame';
import { ForgivenessMeter } from './games/ForgivenessMeter';
import { HeartCatcherGame } from './games/HeartCatcherGame';
import { BoyfriendCoupons } from './games/BoyfriendCoupons';
import { SignaturePadTreaty } from './ui/SignaturePadTreaty';
import { TypewriterLetter } from './ui/TypewriterLetter';
import { Scene6Ending } from './Scene6Ending';
import { SceneFinalCallback } from './SceneFinalCallback';

export const StoryCardDeck: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const { restartAudio, startAudio } = useAudio();

  const totalSteps = 11;

  const goToStep = (step: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentStep(Math.max(0, Math.min(totalSteps - 1, step)));
  };

  const nextStep = () => {
    goToStep(currentStep + 1);
  };

  const prevStep = () => {
    goToStep(currentStep - 1);
  };

  const handleStart = async () => {
    await startAudio();
    nextStep();
  };

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentStep(0);
    restartAudio();
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col justify-between items-center pb-24 pt-16 px-3 sm:px-6">
      {/* Step Container with AnimatePresence */}
      <div className="w-full max-w-2xl mx-auto flex-1 flex flex-col justify-center items-center">
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5 }}
              className="w-full flex justify-center"
            >
              <Scene1Opening onStart={handleStart} />
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.45 }}
              className="w-full flex flex-col items-center"
            >
              <RunawayButtonGame />
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.45 }}
              className="w-full"
            >
              <Scene2PhotoReveal onNext={nextStep} />
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.45 }}
              className="w-full"
            >
              <Scene3VideoMoment onNext={nextStep} />
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.45 }}
              className="w-full"
            >
              <Scene4SevenThings onNext={nextStep} />
            </motion.div>
          )}

          {currentStep === 5 && (
            <motion.div
              key="step-5"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.45 }}
              className="w-full flex flex-col items-center"
            >
              <ForgivenessMeter />
            </motion.div>
          )}

          {currentStep === 6 && (
            <motion.div
              key="step-6"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.45 }}
              className="w-full flex flex-col items-center"
            >
              <HeartCatcherGame />
            </motion.div>
          )}

          {currentStep === 7 && (
            <motion.div
              key="step-7"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.45 }}
              className="w-full flex flex-col items-center"
            >
              <BoyfriendCoupons />
            </motion.div>
          )}

          {currentStep === 8 && (
            <motion.div
              key="step-8"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.45 }}
              className="w-full flex flex-col items-center"
            >
              <TypewriterLetter onComplete={() => {}} />
            </motion.div>
          )}

          {currentStep === 9 && (
            <motion.div
              key="step-9"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.45 }}
              className="w-full flex flex-col items-center"
            >
              <SignaturePadTreaty onSigned={() => {}} />
            </motion.div>
          )}

          {currentStep === 10 && (
            <motion.div
              key="step-10"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.45 }}
              className="w-full space-y-8"
            >
              <Scene6Ending onNext={nextStep} />
              <SceneFinalCallback onReplay={handleReplay} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Bottom Navigation Bar (The Reel / Blush Moments UI) */}
      {currentStep > 0 && (
        <footer className="fixed bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#10080D]/90 backdrop-blur-xl border border-[#D7B47C]/40 shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
          {/* Back button */}
          <button
            onClick={prevStep}
            disabled={currentStep <= 1}
            className={`p-2 rounded-full transition-all duration-200 cursor-pointer ${
              currentStep <= 1
                ? 'opacity-30 cursor-not-allowed text-white/30'
                : 'text-[#D7B47C] hover:bg-[#4A1228]/60 active:scale-95'
            }`}
            aria-label="Previous card"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots progress indicator */}
          <div className="flex items-center gap-1 sm:gap-1.5 px-2">
            {Array.from({ length: totalSteps - 1 }).map((_, i) => {
              const stepIndex = i + 1;
              const isActive = stepIndex === currentStep;
              const isPast = stepIndex < currentStep;

              return (
                <button
                  key={stepIndex}
                  onClick={() => goToStep(stepIndex)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    isActive
                      ? 'w-5 h-2 bg-[#D7B47C]'
                      : isPast
                      ? 'w-2 h-2 bg-[#B76E79]/80'
                      : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to step ${stepIndex}`}
                />
              );
            })}
          </div>

          {/* Next button */}
          {currentStep < totalSteps - 1 ? (
            <button
              onClick={nextStep}
              className="p-2 rounded-full text-[#D7B47C] hover:bg-[#4A1228]/60 active:scale-95 transition-all cursor-pointer"
              aria-label="Next card"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleReplay}
              className="p-2 rounded-full text-[#D7B47C] hover:bg-[#4A1228]/60 active:scale-95 transition-all cursor-pointer"
              aria-label="Replay experience"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </footer>
      )}
    </div>
  );
};
