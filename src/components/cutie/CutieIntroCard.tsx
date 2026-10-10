import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { useAudio } from '../../context/useAudio';

interface CutieIntroCardProps {
  onStart: () => void;
}

export const CutieIntroCard: React.FC<CutieIntroCardProps> = ({ onStart }) => {
  const { startAudio } = useAudio();

  const handleComeIn = async () => {
    await startAudio();
    onStart();
  };

  return (
    <div className="w-full max-w-sm mx-auto p-6 sm:p-8 rounded-3xl bg-[#FFF5F7] text-[#2D2D2D] border border-[#F5C2CD] shadow-[0_20px_50px_rgba(0,0,0,0.4)] text-center relative overflow-hidden select-none">
      {/* Top Header Tag */}
      <div className="flex items-center justify-center gap-1.5 text-xs font-serif tracking-widest text-[#B34057] uppercase font-semibold mb-3">
        <span>TO MY JOY</span>
        <Sparkles className="w-3.5 h-3.5 text-[#B34057] fill-current" />
      </div>

      {/* Main Apology Headline */}
      <div className="space-y-0.5 mb-3">
        <div className="flex items-center justify-center gap-2">
          <span className="font-serif italic text-3xl sm:text-4xl text-[#E85D75] font-normal">
            I'm so
          </span>
          <span className="px-2 py-0.5 rounded-full bg-[#FCE4E9] text-[11px] font-sans font-medium text-[#B34057] rotate-[-4deg] shadow-sm">
            so so so
          </span>
        </div>
        <h1 className="font-sans font-extrabold text-3xl sm:text-4xl text-[#1E1E1E] tracking-tight">
          SORRY
        </h1>
      </div>

      {/* Tender Apology Subtext */}
      <p className="font-sans text-xs sm:text-sm text-[#555] leading-relaxed max-w-xs mx-auto mb-6">
        I know I upset you, and a sorry over text felt too small. So I made you this tiny website instead, to steal at least one smile from you 💖
      </p>

      {/* Hello Kitty Illustration */}
      <div className="relative my-4 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          className="relative"
        >
          <img
            src="/media/kitty-heart.png"
            alt="Hello Kitty drawing a heart"
            className="w-48 sm:w-52 h-auto object-contain mx-auto drop-shadow-sm select-none"
          />
        </motion.div>
      </div>

      {/* Come in button */}
      <div className="mt-6 flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleComeIn}
          className="px-8 py-3 rounded-full font-sans text-sm font-semibold bg-[#FAD2DC] hover:bg-[#F7BDCC] text-[#7A283B] border border-[#F2A8BC] shadow-sm transition-all cursor-pointer flex items-center gap-2"
        >
          <span>Come in →</span>
        </motion.button>
      </div>
    </div>
  );
};
