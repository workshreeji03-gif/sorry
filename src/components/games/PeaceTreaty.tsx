import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Scroll, Heart, Sparkles, CheckCheck } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export const PeaceTreaty: React.FC = () => {
  const [isSigned, setIsSigned] = useState<boolean>(false);

  const handleSign = () => {
    setIsSigned(true);
    confetti({
      particleCount: 55,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#D7B47C', '#B76E79', '#4A1228', '#FFF0E8'],
    });
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4 sm:p-6 text-center">
      <div className="mb-6">
        <h3 className="font-serif text-2xl sm:text-3xl text-[#FFF0E8] font-normal mb-1 flex items-center justify-center gap-2">
          <Scroll className="w-5 h-5 text-[#D7B47C]" />
          <span>{siteConfig.gamesHub.peaceTreaty.title}</span>
        </h3>
        <p className="font-sans text-xs sm:text-sm text-[#D7B47C]/80 font-light">
          {siteConfig.gamesHub.peaceTreaty.subtitle}
        </p>
      </div>

      {/* The Scroll Document */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-[#1b0d17] border-2 border-[#D7B47C]/50 shadow-[0_20px_50px_rgba(0,0,0,0.85)] text-left space-y-4 overflow-hidden">
        {/* Subtle decorative inner border */}
        <div className="absolute inset-2 border border-[#D7B47C]/20 rounded-2xl pointer-events-none" />

        {/* Clauses */}
        <div className="space-y-3.5 relative z-10">
          {siteConfig.gamesHub.peaceTreaty.clauses.map((clause) => (
            <div key={clause.number} className="space-y-1">
              <h5 className="font-serif text-base sm:text-lg text-[#D7B47C] font-semibold flex items-center gap-2">
                <span>{clause.title}</span>
              </h5>
              <p className="font-sans text-xs sm:text-sm text-[#FFF0E8]/85 leading-relaxed pl-3 border-l border-[#D7B47C]/30">
                {clause.text}
              </p>
            </div>
          ))}
        </div>

        {/* Signature & Seal Area */}
        <div className="mt-8 pt-6 border-t border-[#D7B47C]/30 flex flex-col items-center justify-center text-center relative z-10">
          {isSigned ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 15 }}
              className="flex flex-col items-center space-y-2"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6b1836] to-[#360b1b] border-2 border-[#D7B47C] flex items-center justify-center shadow-[0_0_20px_rgba(215,180,124,0.4)]">
                <Heart className="w-8 h-8 fill-[#D7B47C] text-[#D7B47C]" />
              </div>
              <div className="font-handwriting text-2xl sm:text-3xl text-[#D7B47C] font-semibold">
                Prapti & Shreeji
              </div>
              <p className="text-xs font-sans text-[#FFF0E8]/80 flex items-center gap-1">
                <CheckCheck className="w-3.5 h-3.5 text-[#D7B47C]" />
                <span>{siteConfig.gamesHub.peaceTreaty.sealedMessage}</span>
              </p>
            </motion.div>
          ) : (
            <div className="space-y-3">
              <p className="font-sans text-xs text-[#D7B47C]/80">
                {siteConfig.gamesHub.peaceTreaty.signaturePrompt}
              </p>
              <button
                onClick={handleSign}
                className="px-6 sm:px-8 py-3 rounded-full font-serif text-base sm:text-lg text-[#FFF0E8] bg-gradient-to-r from-[#4A1228] to-[#611634] border border-[#D7B47C] shadow-[0_0_25px_rgba(215,180,124,0.3)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2 mx-auto"
              >
                <Sparkles className="w-4 h-4 text-[#D7B47C]" />
                <span>Sign & Accept Treaty 📜</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
