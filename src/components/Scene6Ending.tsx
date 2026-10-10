import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, ChevronDown } from 'lucide-react';
import confetti from 'canvas-confetti';
import { siteConfig } from '../config/siteConfig';

interface Scene6EndingProps {
  onNext: () => void;
}

export const Scene6Ending: React.FC<Scene6EndingProps> = ({ onNext }) => {
  const [response, setResponse] = useState<'yes' | 'angry' | null>(null);

  const handleYes = () => {
    setResponse('yes');

    // Subtle, elegant heart explosion
    const count = 35;
    const defaults = {
      origin: { y: 0.65 },
      colors: ['#D7B47C', '#B76E79', '#4A1228', '#FFF0E8'],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 45,
      shapes: ['circle'],
    });
    fire(0.2, {
      spread: 60,
      shapes: ['circle'],
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.9,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
  };

  const handleAngry = () => {
    setResponse('angry');
  };

  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center py-20 px-4 sm:px-8 text-center select-none overflow-x-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[540px] h-[340px] sm:h-[540px] rounded-full bg-[#4A1228]/35 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-[300px] sm:w-[480px] h-[300px] sm:h-[480px] rounded-full bg-[#D7B47C]/18 blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-xl mx-auto space-y-6">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="font-serif text-2xl sm:text-3xl text-[#FFF0E8]/80 font-light"
        >
          {siteConfig.scene6.prompt1}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="font-serif text-3xl sm:text-5xl text-[#D7B47C] font-normal"
        >
          {siteConfig.scene6.prompt2}
        </motion.h2>

        {/* The Choice Buttons */}
        <AnimatePresence mode="wait">
          {!response ? (
            <motion.div
              key="buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
            >
              {/* Yes, baby */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleYes}
                className="w-full sm:w-auto px-8 py-4 rounded-full font-serif text-lg sm:text-xl text-[#FFF0E8] bg-gradient-to-r from-[#4A1228] to-[#611634] border border-[#D7B47C]/60 shadow-[0_0_30px_rgba(215,180,124,0.3)] hover:border-[#D7B47C] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{siteConfig.scene6.yesButtonText}</span>
              </motion.button>

              {/* Still angry */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleAngry}
                className="w-full sm:w-auto px-8 py-4 rounded-full font-serif text-lg sm:text-xl text-[#B76E79] bg-[#1a0a14]/80 border border-[#B76E79]/40 hover:border-[#B76E79] hover:bg-[#2e0e20]/60 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{siteConfig.scene6.angryButtonText}</span>
              </motion.button>
            </motion.div>
          ) : (
            /* Response Reveal */
            <motion.div
              key="response"
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="pt-6 space-y-6"
            >
              {response === 'yes' ? (
                <div className="p-6 sm:p-8 rounded-3xl glass-panel-gold space-y-3">
                  <Heart className="w-10 h-10 text-[#D7B47C] fill-[#D7B47C] mx-auto animate-gentle-pulse" />
                  <p className="font-serif text-2xl sm:text-3xl text-[#FFF0E8] font-normal gold-text-shimmer">
                    "{siteConfig.scene6.yesResponse}"
                  </p>
                </div>
              ) : (
                <div className="p-6 sm:p-8 rounded-3xl glass-panel space-y-3 border border-[#B76E79]/40">
                  <Sparkles className="w-8 h-8 text-[#B76E79] mx-auto" />
                  <p className="font-serif text-xl sm:text-2xl text-[#FFF0E8]/90 font-light italic">
                    "{siteConfig.scene6.angryResponse}"
                  </p>
                </div>
              )}

              {/* Next to Final Callback */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="pt-4"
              >
                <button
                  onClick={onNext}
                  className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#1e0c16]/80 hover:bg-[#4A1228]/80 text-[#FFF0E8] border border-[#D7B47C]/40 hover:border-[#D7B47C] shadow-lg transition-all duration-300 active:scale-95 cursor-pointer font-serif text-lg tracking-wide"
                >
                  <span>{siteConfig.scene6.proceedText}</span>
                  <ChevronDown className="w-4 h-4 text-[#D7B47C] group-hover:translate-y-1 transition-transform" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
