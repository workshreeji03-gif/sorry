import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AudioProvider } from './context/AudioContext';
import { useAudio } from './context/useAudio';
import { FilmGrain } from './components/FilmGrain';
import { ParticleBackground } from './components/ParticleBackground';
import { HeaderControls } from './components/HeaderControls';
import { Scene1Opening } from './components/Scene1Opening';
import { Scene2PhotoReveal } from './components/Scene2PhotoReveal';
import { Scene3VideoMoment } from './components/Scene3VideoMoment';
import { Scene4SevenThings } from './components/Scene4SevenThings';
import { ForgivenessMeter } from './components/games/ForgivenessMeter';
import { RunawayButtonGame } from './components/games/RunawayButtonGame';
import { HeartCatcherGame } from './components/games/HeartCatcherGame';
import { BoyfriendCoupons } from './components/games/BoyfriendCoupons';
import { PeaceTreaty } from './components/games/PeaceTreaty';
import { Scene5Letter } from './components/Scene5Letter';
import { Scene6Ending } from './components/Scene6Ending';
import { SceneFinalCallback } from './components/SceneFinalCallback';
import { Sparkles, Gamepad2 } from 'lucide-react';

const MainApp: React.FC = () => {
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const { restartAudio, startAudio } = useAudio();

  const scrollTo = (id: string) => {
    setHasStarted(true);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleStart = () => {
    setHasStarted(true);
    setTimeout(() => {
      scrollTo('photo');
    }, 400);
  };

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setHasStarted(false);
    restartAudio();
  };

  return (
    <div className="relative min-h-[100dvh] bg-[#10080D] text-[#FFF0E8] overflow-x-hidden selection:bg-[#4A1228] selection:text-[#FFF0E8]">
      {/* Film grain texture */}
      <FilmGrain />

      {/* Floating golden stardust particle canvas */}
      <ParticleBackground />

      {/* Floating Header Controls with quick navigation */}
      <HeaderControls
        onNavigate={(id) => {
          if (!hasStarted) {
            startAudio();
          }
          scrollTo(id);
        }}
        showNav={true}
      />

      {/* Main Content Area */}
      <main className="relative z-10 w-full pt-14">
        {/* SCENE 1: THE OPENING */}
        <AnimatePresence>
          {!hasStarted && (
            <motion.section
              key="opening-gate"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full"
            >
              <Scene1Opening onStart={handleStart} />
            </motion.section>
          )}
        </AnimatePresence>

        {/* FULL INTERACTIVE EXPERIENCE (VISIBLE & SCROLLABLE) */}
        <div className={`transition-opacity duration-1000 ${hasStarted ? 'opacity-100' : 'opacity-90'}`}>
          {/* SECTION 1: PHOTO REVEAL */}
          <div id="photo" className="scroll-mt-16 w-full">
            <Scene2PhotoReveal onNext={() => scrollTo('video')} />
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D7B47C]/20 to-transparent my-8" />

          {/* SECTION 2: VIDEO MOMENT */}
          <div id="video" className="scroll-mt-16 w-full">
            <Scene3VideoMoment onNext={() => scrollTo('compliments')} />
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D7B47C]/20 to-transparent my-8" />

          {/* SECTION 3: SEVEN COMPLIMENTS */}
          <div id="compliments" className="scroll-mt-16 w-full">
            <Scene4SevenThings onNext={() => scrollTo('meter')} />
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D7B47C]/20 to-transparent my-8" />

          {/* SECTION 4 - 8: THE APOLOGY GAMES & ACTIVITIES */}
          <div className="w-full py-8 px-4 sm:px-8 text-center">
            <div className="max-w-xl mx-auto mb-8 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1e0c16]/80 border border-[#D7B47C]/40 text-xs text-[#D7B47C]">
                <Gamepad2 className="w-3.5 h-3.5" />
                <span>The Apology Arcade & Games</span>
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#FFF0E8] font-normal">
                Everything to Win Back Your Smile
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#D7B47C]/80 font-light">
                Play, explore, redeem, and make peace with your bhulakar boyfriend.
              </p>
            </div>

            {/* 1. FORGIVENESS METER */}
            <div id="meter" className="scroll-mt-20 my-12 w-full flex justify-center">
              <ForgivenessMeter />
            </div>

            {/* 2. RUNAWAY STILL ANGRY BUTTON */}
            <div id="runaway" className="scroll-mt-20 my-12 w-full flex justify-center">
              <RunawayButtonGame />
            </div>

            {/* 3. CATCH PRA PTI'S HEARTS */}
            <div id="catcher" className="scroll-mt-20 my-12 w-full flex justify-center">
              <HeartCatcherGame />
            </div>

            {/* 4. BOYFRIEND LOVE COUPONS */}
            <div id="coupons" className="scroll-mt-20 my-12 w-full flex justify-center">
              <BoyfriendCoupons />
            </div>

            {/* 5. OFFICIAL PEACE TREATY */}
            <div id="treaty" className="scroll-mt-20 my-12 w-full flex justify-center">
              <PeaceTreaty />
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D7B47C]/20 to-transparent my-8" />

          {/* SECTION 9: MY HANDWRITTEN LETTER */}
          <div id="letter" className="scroll-mt-16 w-full">
            <Scene5Letter onNext={() => scrollTo('ending')} />
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D7B47C]/20 to-transparent my-8" />

          {/* SECTION 10: ENDING CHOICE & CALLBACK */}
          <div id="ending" className="scroll-mt-16 w-full space-y-12">
            <Scene6Ending onNext={() => scrollTo('final-callback')} />
            <div id="final-callback" className="w-full">
              <SceneFinalCallback onReplay={handleReplay} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default function App() {
  return (
    <AudioProvider>
      <MainApp />
    </AudioProvider>
  );
}
