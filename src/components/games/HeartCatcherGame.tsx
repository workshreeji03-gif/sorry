import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Trophy, RotateCcw } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

interface FloatingTarget {
  id: number;
  x: number;
  y: number;
  scale: number;
  color: string;
}

const createHeart = (): FloatingTarget => {
  const colors = ['#D7B47C', '#B76E79', '#FFF0E8'];
  return {
    id: Date.now() + Math.random(),
    x: 15 + Math.random() * 70, // percentage within container
    y: 15 + Math.random() * 70,
    scale: 0.9 + Math.random() * 0.4,
    color: colors[Math.floor(Math.random() * colors.length)],
  };
};

export const HeartCatcherGame: React.FC = () => {
  const [score, setScore] = useState<number>(0);
  const [activeHeart, setActiveHeart] = useState<FloatingTarget | null>(() => createHeart());
  const target = siteConfig.gamesHub.heartCatcher.targetScore;

  const isWon = score >= target;

  useEffect(() => {
    if (isWon) return;
    const interval = setInterval(() => {
      setActiveHeart(createHeart());
    }, 2200);
    return () => clearInterval(interval);
  }, [isWon]);

  const handleCatchHeart = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    const nextScore = score + 1;
    setScore(nextScore);

    if (nextScore >= target) {
      confetti({
        particleCount: 45,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D7B47C', '#B76E79', '#4A1228'],
      });
    } else {
      setActiveHeart(createHeart());
    }
  };

  const resetGame = () => {
    setScore(0);
    setActiveHeart(createHeart());
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 sm:p-8 rounded-3xl glass-panel-gold border border-[#D7B47C]/40 text-center relative overflow-hidden flex flex-col justify-between min-h-[380px]">
      <div>
        <h3 className="font-serif text-2xl sm:text-3xl text-[#FFF0E8] font-normal mb-2 flex items-center justify-center gap-2">
          <span>{siteConfig.gamesHub.heartCatcher.title}</span>
          <Sparkles className="w-4 h-4 text-[#D7B47C]" />
        </h3>
        <p className="font-sans text-xs sm:text-sm text-[#D7B47C]/80 font-light">
          {siteConfig.gamesHub.heartCatcher.subtitle}
        </p>

        {/* Score indicator */}
        <div className="mt-3 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#10080D]/70 border border-[#D7B47C]/30 text-xs text-[#FFF0E8]/90">
          <Heart className="w-3.5 h-3.5 fill-[#D7B47C] text-[#D7B47C]" />
          <span>Hearts caught: {Math.min(target, score)} / {target}</span>
        </div>
      </div>

      {/* Game Play Area */}
      <div className="relative my-6 w-full h-[180px] rounded-2xl bg-[#10080D]/80 border border-[#D7B47C]/20 overflow-hidden flex items-center justify-center select-none shadow-inner">
        {/* Subtle grid background texture */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D7B47C_1px,transparent_1px)] [background-size:16px_16px]" />

        <AnimatePresence mode="wait">
          {isWon ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-4 flex flex-col items-center justify-center text-center space-y-2 relative z-10"
            >
              <Trophy className="w-10 h-10 text-[#D7B47C] mx-auto animate-bounce" />
              <p className="font-serif text-lg sm:text-xl text-[#FFF0E8] font-medium leading-relaxed gold-text-shimmer">
                {siteConfig.gamesHub.heartCatcher.victoryText}
              </p>
              <button
                onClick={resetGame}
                className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs text-[#D7B47C] hover:text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Play again</span>
              </button>
            </motion.div>
          ) : (
            activeHeart && (
              <motion.button
                key={activeHeart.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: activeHeart.scale, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{
                  left: `${activeHeart.x}%`,
                  top: `${activeHeart.y}%`,
                }}
                onClick={handleCatchHeart}
                onTouchStart={handleCatchHeart}
                className="absolute -translate-x-1/2 -translate-y-1/2 p-3 rounded-full cursor-pointer group active:scale-90 transition-transform"
                aria-label="Catch floating heart"
              >
                <div className="absolute inset-0 rounded-full bg-[#D7B47C]/20 blur-md group-hover:bg-[#D7B47C]/40 animate-ping" />
                <Heart
                  className="w-9 h-9 sm:w-10 sm:h-10 fill-current drop-shadow-[0_0_12px_rgba(215,180,124,0.7)]"
                  style={{ color: activeHeart.color }}
                />
              </motion.button>
            )
          )}
        </AnimatePresence>
      </div>

      <div className="text-[11px] font-sans text-[#FFF0E8]/40">
        {isWon ? 'Pledge permanently saved to boyfriend record 📝' : 'Tap the floating hearts before they drift away!'}
      </div>
    </div>
  );
};
