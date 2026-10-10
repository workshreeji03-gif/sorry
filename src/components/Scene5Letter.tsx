import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Heart, ChevronDown } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface Scene5LetterProps {
  onNext: () => void;
}

export const Scene5Letter: React.FC<Scene5LetterProps> = ({ onNext }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col items-center justify-start py-20 px-4 sm:px-8 text-center select-none overflow-x-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[560px] h-[340px] sm:h-[560px] rounded-full bg-[#4A1228]/35 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[300px] sm:w-[480px] h-[300px] sm:h-[480px] rounded-full bg-[#D7B47C]/18 blur-[150px] pointer-events-none" />

      {/* Intro prompt */}
      <div className="relative z-10 max-w-xl mx-auto mb-8 space-y-2 px-2">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#FFF0E8] font-light tracking-wide"
        >
          {siteConfig.scene5.envelopePrompt}
        </motion.p>
      </div>

      {/* Envelope & Letter Container */}
      <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col items-center">
        {!isOpen ? (
          /* Sealed Envelope */
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.0, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            {/* The Envelope Graphic */}
            <div className="relative w-[300px] sm:w-[380px] h-[200px] sm:h-[240px] rounded-2xl bg-gradient-to-br from-[#2a101d] via-[#1a0a14] to-[#3b1225] border-2 border-[#D7B47C]/50 shadow-[0_25px_60px_rgba(0,0,0,0.85)] flex items-center justify-center overflow-hidden">
              {/* Envelope flap lines */}
              <div className="absolute top-0 left-0 right-0 h-0 border-x-[150px] sm:border-x-[190px] border-x-transparent border-t-[100px] sm:border-t-[120px] border-t-[#3a1324]/80 drop-shadow-md pointer-events-none" />
              <div className="absolute inset-0 border border-[#D7B47C]/20 pointer-events-none m-2 rounded-xl" />

              {/* Wax Seal */}
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="relative z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#6b1836] to-[#360b1b] border-2 border-[#D7B47C] flex items-center justify-center shadow-[0_0_25px_rgba(215,180,124,0.5)] cursor-pointer"
              >
                <Heart className="w-8 h-8 sm:w-10 sm:h-10 fill-[#D7B47C] stroke-[#4A1228]" />
              </motion.div>
            </div>

            {/* Read my letter button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="mt-8 px-8 py-3.5 rounded-full font-serif text-lg text-[#FFF0E8] border border-[#D7B47C]/50 bg-gradient-to-r from-[#4A1228] to-[#2e0c1a] shadow-[0_0_30px_rgba(74,18,40,0.6)] cursor-pointer flex items-center gap-2.5"
            >
              <Mail className="w-4 h-4 text-[#D7B47C]" />
              <span>{siteConfig.scene5.buttonText}</span>
            </motion.button>
          </motion.div>
        ) : (
          /* Opened Letter */
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 35, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="w-full text-left p-6 sm:p-10 rounded-3xl bg-[#1b0d16] border-2 border-[#D7B47C]/60 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(215,180,124,0.15)] relative overflow-hidden"
            >
              {/* Gold decorative border insets */}
              <div className="absolute inset-2 border border-[#D7B47C]/25 rounded-2xl pointer-events-none" />
              
              {/* Subtle watermark heart */}
              <div className="absolute right-4 bottom-4 pointer-events-none opacity-5">
                <Heart className="w-48 h-48 fill-[#D7B47C]" />
              </div>

              {/* Letter Header */}
              <div className="mb-6 relative z-10">
                <h3 className="font-handwriting text-3xl sm:text-4xl text-[#D7B47C] font-bold tracking-wide">
                  {siteConfig.scene5.letterHeader}
                </h3>
              </div>

              {/* Letter Body */}
              <div className="font-handwriting text-xl sm:text-2xl text-[#FFF0E8]/95 leading-relaxed space-y-4 relative z-10 font-normal">
                {siteConfig.scene5.letterBody.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Letter Closing */}
              <div className="mt-8 pt-6 border-t border-[#D7B47C]/20 relative z-10">
                <p className="font-handwriting text-2xl sm:text-3xl text-[#D7B47C] font-semibold">
                  {siteConfig.scene5.letterClosing}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Advance to Scene 6 button (available once letter is opened) */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative z-10 mt-10 sm:mt-14 pb-8"
        >
          <button
            onClick={onNext}
            className="group flex flex-col items-center gap-2 px-8 py-3.5 rounded-full bg-[#1e0c16]/80 hover:bg-[#4A1228]/80 text-[#FFF0E8] border border-[#D7B47C]/30 hover:border-[#D7B47C]/70 shadow-lg transition-all duration-300 active:scale-95 cursor-pointer"
          >
            <span className="font-serif text-base sm:text-lg tracking-wider text-[#FFF0E8]/95 group-hover:text-[#FFF0E8]">
              Before you go...
            </span>
            <ChevronDown className="w-4 h-4 text-[#D7B47C] group-hover:translate-y-1 transition-transform" />
          </button>
        </motion.div>
      )}
    </section>
  );
};
