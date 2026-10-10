import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export const RunawayButtonGame: React.FC = () => {
  const [forgiven, setForgiven] = useState<boolean>(false);
  const [taunt, setTaunt] = useState<string>('');
  const [dodgeCount, setDodgeCount] = useState<number>(0);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const taunts = siteConfig.gamesHub.runawayButton.taunts;

  const handleDodge = () => {
    // Pick random coordinates within bounds
    const randomX = (Math.random() - 0.5) * 220;
    const randomY = (Math.random() - 0.5) * 160;
    setOffset({ x: randomX, y: randomY });

    const nextTaunt = taunts[dodgeCount % taunts.length];
    setTaunt(nextTaunt);
    setDodgeCount((prev) => prev + 1);
  };

  const handleForgive = () => {
    setForgiven(true);
    confetti({
      particleCount: 50,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#D7B47C', '#B76E79', '#4A1228', '#FFF0E8'],
    });
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 sm:p-8 rounded-3xl glass-panel-gold border border-[#D7B47C]/40 text-center relative overflow-hidden min-h-[380px] flex flex-col justify-between">
      {/* Header */}
      <div>
        <h3 className="font-serif text-2xl sm:text-3xl text-[#FFF0E8] font-normal mb-2 flex items-center justify-center gap-2">
          <span>{siteConfig.gamesHub.runawayButton.title}</span>
          <Sparkles className="w-4 h-4 text-[#D7B47C]" />
        </h3>
        <p className="font-sans text-xs sm:text-sm text-[#D7B47C]/80 font-light">
          {siteConfig.gamesHub.runawayButton.subtitle}
        </p>
      </div>

      {/* Main Interactive Stage */}
      <div className="my-8 relative flex-1 flex flex-col items-center justify-center min-h-[170px]">
        <AnimatePresence mode="wait">
          {forgiven ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 15 }}
              className="space-y-3"
            >
              <Heart className="w-14 h-14 text-[#D7B47C] fill-[#D7B47C] mx-auto animate-gentle-pulse" />
              <h4 className="font-serif text-2xl sm:text-3xl text-[#FFF0E8] gold-text-shimmer">
                Yay! Best Girlfriend in the World! 🥰
              </h4>
              <p className="font-sans text-xs sm:text-sm text-[#FFF0E8]/80 max-w-xs mx-auto">
                My heart is officially whole again. I promise to appreciate your beauty every second!
              </p>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center w-full">
              {taunt && (
                <motion.p
                  key={taunt + dodgeCount}
                  initial={{ opacity: 0, scale: 0.85, y: -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="text-xs sm:text-sm font-serif text-[#D7B47C] mb-5 bg-[#4A1228]/60 px-4 py-1.5 rounded-full border border-[#D7B47C]/30 shadow-md"
                >
                  "{taunt}"
                </motion.p>
              )}

              <div className="relative flex flex-wrap items-center justify-center gap-4 sm:gap-6 w-full py-4">
                {/* The Steady Loving Button */}
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleForgive}
                  className="px-6 sm:px-8 py-3.5 rounded-full font-serif text-base sm:text-lg text-[#FFF0E8] bg-gradient-to-r from-[#4A1228] to-[#611634] border border-[#D7B47C] shadow-[0_0_25px_rgba(215,180,124,0.4)] cursor-pointer flex items-center gap-2"
                >
                  <Heart className="w-4 h-4 fill-current text-[#D7B47C]" />
                  <span>{siteConfig.gamesHub.runawayButton.yesText}</span>
                </motion.button>

                {/* The Runaway Button */}
                <motion.button
                  animate={{ x: offset.x, y: offset.y }}
                  transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                  onMouseEnter={handleDodge}
                  onTouchStart={handleDodge}
                  onClick={handleDodge}
                  className="px-5 sm:px-6 py-3 rounded-full font-serif text-sm sm:text-base text-[#B76E79] bg-[#1a0a14]/90 border border-[#B76E79]/50 hover:border-[#B76E79] shadow-md cursor-pointer select-none"
                >
                  <span>{siteConfig.gamesHub.runawayButton.angryText}</span>
                </motion.button>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>

      <div className="text-[11px] font-sans text-[#FFF0E8]/40">
        {dodgeCount > 0 && !forgiven ? `Attempts to be angry: ${dodgeCount} (nice try!)` : 'Tap whichever fits your mood ❤️'}
      </div>
    </div>
  );
};
