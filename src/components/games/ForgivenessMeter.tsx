import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export const ForgivenessMeter: React.FC = () => {
  const [level, setLevel] = useState<number>(30);
  const [hasCelebrated, setHasCelebrated] = useState<boolean>(false);

  const getEmoji = (val: number) => {
    if (val < 20) return '😤';
    if (val < 45) return '🥺';
    if (val < 70) return '🤔';
    if (val < 95) return '🥰';
    return '💖';
  };

  const getMessage = (val: number) => {
    const levels = siteConfig.gamesHub.forgivenessMeter.levels;
    if (val < 20) return levels[0];
    if (val < 45) return levels[25];
    if (val < 70) return levels[50];
    if (val < 95) return levels[75];
    return levels[100];
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setLevel(val);

    if (val >= 98 && !hasCelebrated) {
      setHasCelebrated(true);
      confetti({
        particleCount: 40,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D7B47C', '#B76E79', '#4A1228', '#FFF0E8'],
      });
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 sm:p-8 rounded-3xl glass-panel-gold border border-[#D7B47C]/40 text-center relative overflow-hidden">
      {/* Top gold line accent */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#D7B47C] to-transparent" />

      <h3 className="font-serif text-2xl sm:text-3xl text-[#FFF0E8] font-normal mb-2 flex items-center justify-center gap-2">
        <span>{siteConfig.gamesHub.forgivenessMeter.title}</span>
        <Sparkles className="w-4 h-4 text-[#D7B47C]" />
      </h3>
      <p className="font-sans text-xs sm:text-sm text-[#D7B47C]/80 mb-6 font-light">
        {siteConfig.gamesHub.forgivenessMeter.subtitle}
      </p>

      {/* Emoji & Percentage Indicator */}
      <div className="my-4 flex flex-col items-center justify-center">
        <motion.div
          key={getEmoji(level)}
          initial={{ scale: 0.8, rotate: -10 }}
          animate={{ scale: 1.15, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          className="text-5xl sm:text-6xl mb-2 select-none"
        >
          {getEmoji(level)}
        </motion.div>

        <div className="flex items-center gap-2">
          <span className="font-serif text-3xl sm:text-4xl text-[#D7B47C] font-semibold">
            {level}%
          </span>
          <span className="text-xs uppercase tracking-wider text-[#FFF0E8]/70 font-sans">
            {level >= 95 ? 'Fully Restored' : 'Forgiveness'}
          </span>
        </div>
      </div>

      {/* Slider Bar */}
      <div className="my-6 px-2">
        <input
          type="range"
          min="0"
          max="100"
          value={level}
          onChange={handleSliderChange}
          className="w-full h-3 bg-[#10080D]/80 rounded-full appearance-none cursor-pointer accent-[#D7B47C] border border-[#D7B47C]/30 shadow-inner"
          aria-label="Forgiveness meter slider"
        />

        <div className="flex justify-between text-[11px] font-sans text-[#FFF0E8]/50 mt-2 px-1">
          <span>0% Grumpy</span>
          <span>50% Softening</span>
          <span>100% Angelic</span>
        </div>
      </div>

      {/* Dynamic Feedback Message Card */}
      <motion.div
        key={getMessage(level)}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="p-4 rounded-2xl bg-[#10080D]/70 border border-[#D7B47C]/25 text-sm sm:text-base font-serif text-[#FFF0E8] italic shadow-md min-h-[64px] flex items-center justify-center"
      >
        "{getMessage(level)}"
      </motion.div>

      {level >= 95 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#4A1228]/80 border border-[#D7B47C]/50 text-xs text-[#D7B47C]"
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-[#D7B47C]" />
          <span>Full Pardon Granted to Boyfriend! ❤️</span>
        </motion.div>
      )}
    </div>
  );
};
