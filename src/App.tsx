import React, { useState } from 'react';
import { AudioProvider } from './context/AudioContext';
import { FilmGrain } from './components/FilmGrain';
import { ParticleBackground } from './components/ParticleBackground';
import { HeaderControls } from './components/HeaderControls';
import { StoryCardDeck } from './components/StoryCardDeck';
import { CutieIntroCard } from './components/cutie/CutieIntroCard';
import { CutieFlowerSurpriseCard } from './components/cutie/CutieFlowerSurpriseCard';
import { CutieHeartPuzzleCard } from './components/cutie/CutieHeartPuzzleCard';
import { CutieNoteCard } from './components/cutie/CutieNoteCard';
import { Scene2PhotoReveal } from './components/Scene2PhotoReveal';
import { Scene3VideoMoment } from './components/Scene3VideoMoment';
import { Scene4SevenThings } from './components/Scene4SevenThings';
import { ForgivenessMeter } from './components/games/ForgivenessMeter';
import { RunawayButtonGame } from './components/games/RunawayButtonGame';
import { HeartCatcherGame } from './components/games/HeartCatcherGame';
import { BoyfriendCoupons } from './components/games/BoyfriendCoupons';
import { SignaturePadTreaty } from './components/ui/SignaturePadTreaty';
import { TypewriterLetter } from './components/ui/TypewriterLetter';
import { SceneFinalCallback } from './components/SceneFinalCallback';
import { Sparkles, Gamepad2, Layers, AlignJustify } from 'lucide-react';
import { useAudio } from './context/useAudio';

const MainApp: React.FC = () => {
  // 'deck' mode = exact card-by-card Cutiepage / Reel experience
  // 'scroll' mode = continuous full page scroll
  const [viewMode, setViewMode] = useState<'deck' | 'scroll'>('deck');
  const { restartAudio, startAudio } = useAudio();

  const scrollTo = (id: string) => {
    setViewMode('scroll');
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    restartAudio();
  };

  return (
    <div className="relative min-h-[100dvh] bg-[#10080D] text-[#FFF0E8] overflow-x-hidden selection:bg-[#4A1228] selection:text-[#FFF0E8]">
      {/* Film grain texture */}
      <FilmGrain />

      {/* Floating golden stardust particle canvas */}
      <ParticleBackground />

      {/* Top Header with quick links & Sound toggle */}
      <HeaderControls
        onNavigate={(id) => {
          startAudio();
          scrollTo(id);
        }}
        showNav={true}
      />

      {/* Floating Mode Switcher Button (Top Right Under Header) */}
      <div className="fixed top-14 right-3 sm:right-6 z-40 flex items-center gap-1 p-1 rounded-full bg-[#10080D]/80 backdrop-blur-md border border-[#D7B47C]/30 text-xs shadow-md">
        <button
          onClick={() => setViewMode('deck')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all cursor-pointer ${
            viewMode === 'deck'
              ? 'bg-[#4A1228] text-[#D7B47C] font-medium border border-[#D7B47C]/40'
              : 'text-[#FFF0E8]/70 hover:text-white'
          }`}
          title="Card-by-card story mode (like the Instagram reel)"
        >
          <Layers className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">Reel Cards</span>
        </button>

        <button
          onClick={() => setViewMode('scroll')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all cursor-pointer ${
            viewMode === 'scroll'
              ? 'bg-[#4A1228] text-[#D7B47C] font-medium border border-[#D7B47C]/40'
              : 'text-[#FFF0E8]/70 hover:text-white'
          }`}
          title="Continuous scroll mode"
        >
          <AlignJustify className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">Scroll View</span>
        </button>
      </div>

      {/* RENDER VIEW MODE */}
      <main className="relative z-10 w-full pt-12 sm:pt-14">
        {viewMode === 'deck' ? (
          /* EXACT CARD-BY-CARD REEL EXPERIENCE */
          <StoryCardDeck />
        ) : (
          /* FULL SCROLLABLE EXPERIENCE */
          <div className="w-full">
            {/* 1. HELLO KITTY INTRO */}
            <div id="gate" className="w-full py-8 flex justify-center px-4">
              <CutieIntroCard onStart={() => scrollTo('surprises')} />
            </div>

            {/* 2. LITTLE SURPRISES FLOWER KITTY */}
            <div id="surprises" className="scroll-mt-16 w-full py-8 flex justify-center px-4">
              <CutieFlowerSurpriseCard />
            </div>

            {/* 3. ONE HEART IS MISSING 3x3 PUZZLE */}
            <div id="puzzle" className="scroll-mt-16 w-full py-8 flex justify-center px-4">
              <CutieHeartPuzzleCard />
            </div>

            {/* 4. A NOTE JUST FOR YOU WITH TULIP CAT */}
            <div id="note" className="scroll-mt-16 w-full py-8 flex justify-center px-4">
              <CutieNoteCard />
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D7B47C]/20 to-transparent my-8" />

            {/* 5. HER NAVRATRI PHOTO REVEAL */}
            <div id="photo" className="scroll-mt-16 w-full">
              <Scene2PhotoReveal onNext={() => scrollTo('video')} />
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D7B47C]/20 to-transparent my-8" />

            {/* 6. HER NAVRATRI VIDEO MOMENT */}
            <div id="video" className="scroll-mt-16 w-full">
              <Scene3VideoMoment onNext={() => scrollTo('compliments')} />
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D7B47C]/20 to-transparent my-8" />

            {/* 7. SEVEN COMPLIMENTS */}
            <div id="compliments" className="scroll-mt-16 w-full">
              <Scene4SevenThings onNext={() => scrollTo('meter')} />
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D7B47C]/20 to-transparent my-8" />

            {/* 8. APOLOGY GAMES & ACTIVITIES */}
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
              </div>

              {/* FORGIVENESS METER */}
              <div id="meter" className="scroll-mt-20 my-12 w-full flex justify-center">
                <ForgivenessMeter />
              </div>

              {/* RUNAWAY STILL ANGRY BUTTON */}
              <div id="runaway" className="scroll-mt-20 my-12 w-full flex justify-center">
                <RunawayButtonGame />
              </div>

              {/* CATCH HEARTS */}
              <div id="catcher" className="scroll-mt-20 my-12 w-full flex justify-center">
                <HeartCatcherGame />
              </div>

              {/* BOYFRIEND LOVE COUPONS */}
              <div id="coupons" className="scroll-mt-20 my-12 w-full flex justify-center">
                <BoyfriendCoupons />
              </div>

              {/* OFFICIAL PEACE TREATY WITH FINGER SIGNATURE PAD */}
              <div id="treaty" className="scroll-mt-20 my-12 w-full flex justify-center">
                <SignaturePadTreaty onSigned={() => {}} />
              </div>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D7B47C]/20 to-transparent my-8" />

            {/* LIVE TYPEWRITER LETTER */}
            <div id="letter" className="scroll-mt-16 w-full py-8 flex justify-center px-4">
              <TypewriterLetter onComplete={() => {}} />
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D7B47C]/20 to-transparent my-8" />

            {/* FINAL CINEMATIC CALLBACK */}
            <div id="final-callback" className="w-full">
              <SceneFinalCallback onReplay={handleReplay} />
            </div>
          </div>
        )}
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
