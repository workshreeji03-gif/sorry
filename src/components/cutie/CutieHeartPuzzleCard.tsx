import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles } from 'lucide-react';

interface CutieHeartPuzzleCardProps {
  onSolved?: () => void;
}

export const CutieHeartPuzzleCard: React.FC<CutieHeartPuzzleCardProps> = ({ onSolved }) => {
  const [isPlaced, setIsPlaced] = useState<boolean>(false);

  const handlePlaceHeart = () => {
    if (isPlaced) return;
    setIsPlaced(true);
    confetti({
      particleCount: 50,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#E85D75', '#FAD2DC', '#C4435B', '#FFF0E8'],
    });
    onSolved?.();
  };

  return (
    <div className="w-full max-w-sm mx-auto p-5 sm:p-7 rounded-3xl bg-[#FFF9FA] text-[#2D2D2D] border border-[#F8D2DB] shadow-[0_20px_50px_rgba(0,0,0,0.4)] text-center relative overflow-hidden select-none">
      {/* Title */}
      <h2 className="font-serif italic text-2xl sm:text-3xl text-[#C4435B] font-medium mb-5 flex items-center justify-center gap-1.5">
        <span>One heart is missing, place it</span>
        <span>💘</span>
      </h2>

      {/* 3x3 Grid */}
      <div className="relative p-3 rounded-2xl bg-white border border-[#F5CCD6] shadow-sm max-w-[260px] mx-auto">
        <div className="grid grid-cols-3 gap-2.5">
          {/* Row 1 */}
          <div className="h-16 rounded-xl bg-[#FFF5F7] flex items-center justify-center text-2xl border border-[#FAD2DC]/60 shadow-sm">
            ❤️
          </div>
          <div className="h-16 rounded-xl bg-[#FAFAFA] flex items-center justify-center text-lg font-bold text-[#888] border border-black/5">
            ✖
          </div>
          <div className="h-16 rounded-xl bg-[#FAFAFA] flex items-center justify-center text-lg font-bold text-[#888] border border-black/5">
            ✖
          </div>

          {/* Row 2 */}
          <div className="h-16 rounded-xl bg-[#FAFAFA] flex items-center justify-center text-lg font-bold text-[#888] border border-black/5">
            ✖
          </div>
          {/* CENTER TILE - The Missing Heart */}
          <motion.button
            whileHover={{ scale: isPlaced ? 1 : 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePlaceHeart}
            className={`h-16 rounded-xl flex items-center justify-center cursor-pointer transition-all ${
              isPlaced
                ? 'bg-[#FFF5F7] border-2 border-[#E85D75] shadow-[0_0_15px_rgba(232,93,117,0.3)]'
                : 'bg-[#FFF0F4] border-2 border-dashed border-[#E85D75] hover:bg-[#FFE6ED] animate-pulse'
            }`}
            aria-label="Place missing heart"
          >
            <AnimatePresence mode="wait">
              {isPlaced ? (
                <motion.span
                  key="heart"
                  initial={{ scale: 0, rotate: -25 }}
                  animate={{ scale: 1.25, rotate: 0 }}
                  transition={{ type: 'spring', damping: 12 }}
                  className="text-2xl"
                >
                  ❤️
                </motion.span>
              ) : (
                <motion.div
                  key="prompt"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  className="text-xs font-sans text-[#E85D75] font-semibold"
                >
                  tap here
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
          <div className="h-16 rounded-xl bg-[#FAFAFA] flex items-center justify-center text-lg font-bold text-[#888] border border-black/5">
            ✖
          </div>

          {/* Row 3 */}
          <div className="h-16 rounded-xl bg-[#FAFAFA] flex items-center justify-center text-lg font-bold text-[#888] border border-black/5">
            ✖
          </div>
          <div className="h-16 rounded-xl bg-[#FAFAFA] flex items-center justify-center text-lg font-bold text-[#888] border border-black/5">
            ✖
          </div>
          <div className="h-16 rounded-xl bg-[#FFF5F7] flex items-center justify-center text-2xl border border-[#FAD2DC]/60 shadow-sm">
            ❤️
          </div>
        </div>

        {/* Diagonal Win Line indicator when placed */}
        {isPlaced && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 pointer-events-none flex items-center justify-center"
          >
            <div className="w-[110%] h-1 bg-gradient-to-r from-[#E85D75]/0 via-[#E85D75] to-[#E85D75]/0 rotate-45 transform" />
          </motion.div>
        )}
      </div>

      {/* Result feedback */}
      <div className="mt-4 min-h-[30px] flex items-center justify-center">
        {isPlaced ? (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCE4E9] text-xs font-serif text-[#B34057] font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E85D75]" />
            <span>You completed the line! Always a winner in my heart 🥰</span>
          </motion.div>
        ) : (
          <p className="text-xs font-sans text-[#888] italic">
            Tap the empty center tile to complete the love line ✨
          </p>
        )}
      </div>
    </div>
  );
};
