import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAudio } from '../context/useAudio';
import { CutieIntroCard } from './cutie/CutieIntroCard';
import { CutieFlowerSurpriseCard } from './cutie/CutieFlowerSurpriseCard';
import { CutieHeartPuzzleCard } from './cutie/CutieHeartPuzzleCard';
import { CutieNoteCard } from './cutie/CutieNoteCard';
import { RunawayButtonGame } from './games/RunawayButtonGame';
import { Scene2PhotoReveal } from './Scene2PhotoReveal';
import { Scene3VideoMoment } from './Scene3VideoMoment';
import { Scene4SevenThings } from './Scene4SevenThings';
import { ForgivenessMeter } from './games/ForgivenessMeter';
import { BoyfriendCoupons } from './games/BoyfriendCoupons';
import { TypewriterLetter } from './ui/TypewriterLetter';
import { SignaturePadTreaty } from './ui/SignaturePadTreaty';
import { SceneFinalCallback } from './SceneFinalCallback';

export const StoryCardDeck: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const { restartAudio, startAudio } = useAudio();

  const totalSteps = 13;

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
    <div className="relative min-h-[100dvh] w-full flex flex-col justify-between items-center pb-28 pt-14 px-3 sm:px-6">
      {/* Centered Card Stage */}
      <div className="w-full max-w-xl mx-auto flex-1 flex flex-col justify-center items-center my-auto">
        <AnimatePresence mode="wait">
          {/* 0: Hello Kitty Intro Card */}
          {currentStep === 0 && (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.4 }}
              className="w-full flex justify-center"
            >
              <CutieIntroCard onStart={handleStart} />
            </motion.div>
          )}

          {/* 1: Little Surprises Flower Kitty */}
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 35 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -35 }}
              transition={{ duration: 0.35 }}
              className="w-full flex justify-center"
            >
              <CutieFlowerSurpriseCard />
            </motion.div>
          )}

          {/* 2: One heart is missing 3x3 game */}
          {currentStep === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 35 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -35 }}
              transition={{ duration: 0.35 }}
              className="w-full flex justify-center"
            >
              <CutieHeartPuzzleCard />
            </motion.div>
          )}

          {/* 3: A Note Just For You with Tulip Cat & Love Stamp */}
          {currentStep === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 35 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -35 }}
              transition={{ duration: 0.35 }}
              className="w-full flex justify-center"
            >
              <CutieNoteCard />
            </motion.div>
          )}

          {/* 4: The Runaway Still Angry Game */}
          {currentStep === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, x: 35 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -35 }}
              transition={{ duration: 0.35 }}
              className="w-full flex justify-center"
            >
              <RunawayButtonGame />
            </motion.div>
          )}

          {/* 5: Her Navratri Photo Reveal */}
          {currentStep === 5 && (
            <motion.div
              key="step-5"
              initial={{ opacity: 0, x: 35 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -35 }}
              transition={{ duration: 0.35 }}
              className="w-full"
            >
              <Scene2PhotoReveal onNext={nextStep} />
            </motion.div>
          )}

          {/* 6: Her Navratri Video Moment */}
          {currentStep === 6 && (
            <motion.div
              key="step-6"
              initial={{ opacity: 0, x: 35 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -35 }}
              transition={{ duration: 0.35 }}
              className="w-full"
            >
              <Scene3VideoMoment onNext={nextStep} />
            </motion.div>
          )}

          {/* 7: Seven Compliments */}
          {currentStep === 7 && (
            <motion.div
              key="step-7"
              initial={{ opacity: 0, x: 35 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -35 }}
              transition={{ duration: 0.35 }}
              className="w-full"
            >
              <Scene4SevenThings onNext={nextStep} />
            </motion.div>
          )}

          {/* 8: Forgiveness Meter */}
          {currentStep === 8 && (
            <motion.div
              key="step-8"
              initial={{ opacity: 0, x: 35 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -35 }}
              transition={{ duration: 0.35 }}
              className="w-full flex justify-center"
            >
              <ForgivenessMeter />
            </motion.div>
          )}

          {/* 9: Boyfriend Love Coupons */}
          {currentStep === 9 && (
            <motion.div
              key="step-9"
              initial={{ opacity: 0, x: 35 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -35 }}
              transition={{ duration: 0.35 }}
              className="w-full flex justify-center"
            >
              <BoyfriendCoupons />
            </motion.div>
          )}

          {/* 10: Live Typewriter Letter */}
          {currentStep === 10 && (
            <motion.div
              key="step-10"
              initial={{ opacity: 0, x: 35 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -35 }}
              transition={{ duration: 0.35 }}
              className="w-full flex justify-center"
            >
              <TypewriterLetter onComplete={() => {}} />
            </motion.div>
          )}

          {/* 11: Peace Treaty with Finger Signature Pad */}
          {currentStep === 11 && (
            <motion.div
              key="step-11"
              initial={{ opacity: 0, x: 35 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -35 }}
              transition={{ duration: 0.35 }}
              className="w-full flex justify-center"
            >
              <SignaturePadTreaty onSigned={() => {}} />
            </motion.div>
          )}

          {/* 12: Grand Finale & Callback */}
          {currentStep === 12 && (
            <motion.div
              key="step-12"
              initial={{ opacity: 0, x: 35 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -35 }}
              transition={{ duration: 0.35 }}
              className="w-full flex justify-center"
            >
              <SceneFinalCallback onReplay={handleReplay} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Bottom Nav Buttons (Exact Cutiepage style from screenshots) */}
      <footer className="fixed bottom-3 sm:bottom-5 left-0 right-0 z-50 flex items-center justify-center gap-4 px-4 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-4 p-1.5 rounded-full bg-[#10080D]/70 backdrop-blur-md shadow-lg border border-white/10">
          {/* Pastel Blue Back Button */}
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`px-5 py-2 rounded-full font-sans text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer shadow-sm ${
              currentStep === 0
                ? 'opacity-35 cursor-not-allowed bg-[#BEE3F8]/30 text-[#888]'
                : 'bg-[#BEE3F8] hover:bg-[#A0D4F5] text-[#2B6CB0] active:scale-95'
            }`}
          >
            ← Back
          </button>

          {/* Step Pill */}
          <span className="text-[11px] font-mono text-[#FFF0E8]/70 px-1">
            {currentStep + 1} / {totalSteps}
          </span>

          {/* Pastel Pink Next Button */}
          {currentStep < totalSteps - 1 ? (
            <button
              onClick={nextStep}
              className="px-5 py-2 rounded-full font-sans text-xs sm:text-sm font-semibold bg-[#FED7E2] hover:bg-[#FBB6CE] text-[#97266D] active:scale-95 transition-all duration-200 cursor-pointer shadow-sm"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleReplay}
              className="px-5 py-2 rounded-full font-sans text-xs sm:text-sm font-semibold bg-[#FED7E2] hover:bg-[#FBB6CE] text-[#97266D] active:scale-95 transition-all duration-200 cursor-pointer shadow-sm"
            >
              Replay ✨
            </button>
          )}
        </div>
      </footer>
    </div>
  );
};
