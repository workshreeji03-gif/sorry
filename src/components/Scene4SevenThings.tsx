import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, ChevronDown, CheckCircle2 } from 'lucide-react';
import { siteConfig, type Compliment } from '../config/siteConfig';

interface Scene4SevenThingsProps {
  onNext: () => void;
}

export const Scene4SevenThings: React.FC<Scene4SevenThingsProps> = ({ onNext }) => {
  const [openedIds, setOpenedIds] = useState<number[]>([]);
  const [activeCompliment, setActiveCompliment] = useState<Compliment | null>(null);

  const toggleCompliment = (item: Compliment) => {
    if (!openedIds.includes(item.id)) {
      setOpenedIds((prev) => [...prev, item.id]);
    }
    setActiveCompliment(item);
  };

  const isAllOpened = openedIds.length === siteConfig.scene4.compliments.length;

  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col items-center justify-start py-20 px-4 sm:px-8 text-center select-none overflow-x-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[600px] h-[380px] sm:h-[600px] rounded-full bg-[#4A1228]/30 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] rounded-full bg-[#D7B47C]/18 blur-[150px] pointer-events-none" />

      {/* Header Titles */}
      <div className="relative z-10 max-w-xl mx-auto mb-6 sm:mb-8 space-y-3 px-2">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="font-serif text-2xl sm:text-4xl md:text-5xl text-[#FFF0E8] font-light tracking-wide"
        >
          {siteConfig.scene4.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="font-sans text-xs sm:text-sm text-[#D7B47C]/80 font-light"
        >
          {siteConfig.scene4.subtitle}
        </motion.p>

        {/* Small progress counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1e0c16]/70 border border-[#D7B47C]/25 text-xs text-[#FFF0E8]/90 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#D7B47C]" />
          <span>
            {openedIds.length} of {siteConfig.scene4.compliments.length} hearts unlocked
          </span>
          {isAllOpened && <CheckCircle2 className="w-3.5 h-3.5 text-[#D7B47C]" />}
        </motion.div>
      </div>

      {/* Seven Interactive Glowing Hearts Grid / Constellation */}
      <div className="relative z-10 w-full max-w-2xl mx-auto my-4 sm:my-6">
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-3 sm:gap-4 justify-items-center items-center px-2">
          {siteConfig.scene4.compliments.map((comp, index) => {
            const isOpened = openedIds.includes(comp.id);
            const isSelected = activeCompliment?.id === comp.id;

            return (
              <motion.button
                key={comp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => toggleCompliment(comp)}
                className={`relative group flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-[#4A1228]/80 border-[#D7B47C] shadow-[0_0_25px_rgba(215,180,124,0.4)] scale-105'
                    : isOpened
                    ? 'bg-[#2a101d]/60 border-[#D7B47C]/40 text-[#D7B47C]'
                    : 'bg-[#1a0a14]/60 border-[#D7B47C]/20 hover:border-[#D7B47C]/60 hover:bg-[#2e0e1f]/50'
                }`}
                aria-label={`Unlock thought ${comp.id}`}
              >
                {/* Glow ring */}
                <div
                  className={`absolute -inset-1 rounded-2xl transition-opacity duration-300 blur-sm pointer-events-none ${
                    isOpened
                      ? 'bg-[#D7B47C]/20 opacity-100'
                      : 'bg-[#B76E79]/10 opacity-0 group-hover:opacity-100'
                  }`}
                />

                <Heart
                  className={`w-7 h-7 sm:w-8 sm:h-8 transition-all duration-300 ${
                    isOpened
                      ? 'fill-[#D7B47C] stroke-[#D7B47C] drop-shadow-[0_0_8px_rgba(215,180,124,0.6)]'
                      : 'fill-transparent stroke-[#B76E79] group-hover:stroke-[#D7B47C]'
                  }`}
                />

                <span className="mt-1 text-[11px] font-serif text-[#FFF0E8]/70">
                  #{comp.id}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Active Compliment Reveal Card */}
      <div className="relative z-10 w-full max-w-xl mx-auto min-h-[170px] flex items-center justify-center px-4 my-4">
        <AnimatePresence mode="wait">
          {activeCompliment ? (
            <motion.div
              key={activeCompliment.id}
              initial={{ opacity: 0, y: 15, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="w-full p-6 sm:p-8 rounded-2xl sm:rounded-3xl glass-panel-gold relative overflow-hidden"
            >
              {/* Subtle top gold line */}
              <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#D7B47C] to-transparent" />

              <span className="inline-block text-xs font-sans tracking-widest text-[#D7B47C] uppercase mb-2">
                Thought {activeCompliment.id} of 7
              </span>

              <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-[#FFF0E8] font-normal leading-relaxed">
                "{activeCompliment.text}"
              </h3>

              {activeCompliment.subtext && (
                <p className="font-sans text-xs sm:text-sm text-[#B76E79] font-light mt-3 italic">
                  — {activeCompliment.subtext}
                </p>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 rounded-2xl border border-dashed border-[#D7B47C]/20 text-[#FFF0E8]/50 text-sm font-serif italic"
            >
              Touch any heart above to reveal what I held inside ❤️
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* All unlocked announcement */}
      {isAllOpened && (
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 text-sm font-serif text-[#D7B47C] mt-2 gold-text-shimmer"
        >
          {siteConfig.scene4.allOpenedMessage}
        </motion.p>
      )}

      {/* Advance to next scene button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-10 mt-10 sm:mt-14 pb-8"
      >
        <button
          onClick={onNext}
          className="group flex flex-col items-center gap-2 px-8 py-3.5 rounded-full bg-[#1e0c16]/80 hover:bg-[#4A1228]/80 text-[#FFF0E8] border border-[#D7B47C]/30 hover:border-[#D7B47C]/70 shadow-lg transition-all duration-300 active:scale-95 cursor-pointer"
        >
          <span className="font-serif text-base sm:text-lg tracking-wider text-[#FFF0E8]/95 group-hover:text-[#FFF0E8]">
            One more thing, baby...
          </span>
          <ChevronDown className="w-4 h-4 text-[#D7B47C] group-hover:translate-y-1 transition-transform" />
        </button>
      </motion.div>
    </section>
  );
};
