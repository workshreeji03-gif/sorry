import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Check } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

interface TypewriterLetterProps {
  onComplete?: () => void;
}

export const TypewriterLetter: React.FC<TypewriterLetterProps> = ({ onComplete }) => {
  const fullText = [
    siteConfig.scene5.letterHeader,
    "",
    ...siteConfig.scene5.letterBody,
    "",
    siteConfig.scene5.letterClosing,
  ].join("\n\n");

  const [displayedLength, setDisplayedLength] = useState<number>(0);

  useEffect(() => {
    if (displayedLength < fullText.length) {
      const char = fullText[displayedLength];
      // Slightly longer pause on punctuation
      const delay = char === '.' || char === '!' || char === '?' ? 120 : char === '\n' ? 80 : 25;

      const timer = setTimeout(() => {
        setDisplayedLength((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    } else {
      onComplete?.();
    }
  }, [displayedLength, fullText, onComplete]);

  const handleSkip = () => {
    setDisplayedLength(fullText.length);
    onComplete?.();
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 sm:p-8 rounded-3xl bg-[#1b0d16] border-2 border-[#D7B47C]/50 shadow-[0_20px_60px_rgba(0,0,0,0.85)] relative overflow-hidden text-left">
      {/* Decorative gold border */}
      <div className="absolute inset-2 border border-[#D7B47C]/20 rounded-2xl pointer-events-none" />

      {/* Header controls */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#D7B47C]/20 relative z-10">
        <div className="flex items-center gap-1.5 text-xs text-[#D7B47C] font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Live Apology Message</span>
        </div>
        {displayedLength < fullText.length && (
          <button
            onClick={handleSkip}
            className="text-[11px] font-sans text-[#FFF0E8]/60 hover:text-[#D7B47C] transition-colors cursor-pointer px-2 py-0.5 rounded-full bg-[#10080D]/60 border border-[#D7B47C]/20"
          >
            Show all
          </button>
        )}
      </div>

      {/* Letter text formatted */}
      <div className="relative z-10 font-handwriting text-xl sm:text-2xl text-[#FFF0E8] leading-relaxed whitespace-pre-wrap select-text min-h-[320px]">
        {fullText.slice(0, displayedLength)}
        {displayedLength < fullText.length && (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.7, repeat: Infinity }}
            className="inline-block w-1.5 h-5 bg-[#D7B47C] ml-1 align-middle"
          />
        )}
      </div>

      {displayedLength >= fullText.length && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 pt-4 border-t border-[#D7B47C]/20 flex items-center justify-between text-xs font-sans text-[#D7B47C]/80 relative z-10"
        >
          <span>Written with remorse & love</span>
          <span className="flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-[#D7B47C]" />
            <span>Delivered</span>
          </span>
        </motion.div>
      )}
    </div>
  );
};
