import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { useAudio } from '../context/useAudio';

interface Scene1OpeningProps {
  onStart: () => void;
}

export const Scene1Opening: React.FC<Scene1OpeningProps> = ({ onStart }) => {
  const { startAudio } = useAudio();
  const [step, setStep] = useState<number>(0);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

  // Progressive text reveals
  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 900),   // "Hey Prapti..."
      setTimeout(() => setStep(2), 2600),  // "I know I forgot something."
      setTimeout(() => setStep(3), 4400),  // "And I know it mattered to you."
      setTimeout(() => setStep(4), 6200),  // "So I made something just for you."
      setTimeout(() => setStep(5), 7800),  // Button appears
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const handleOpenHeart = async () => {
    setIsFadingOut(true);
    // Trigger audio immediately on user tap for mobile browser compliance
    await startAudio();
    setTimeout(() => {
      onStart();
    }, 1100);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isFadingOut ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.1, ease: 'easeInOut' }}
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-6 sm:px-12 text-center select-none overflow-hidden bg-[#10080D]"
    >
      {/* Background ambient dark burgundy radial aura */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-40">
        <div className="w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] rounded-full bg-[#4A1228] blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
        {/* Pulsing burgundy heart */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="mb-10 sm:mb-14 relative flex items-center justify-center"
        >
          <div className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#4A1228]/40 blur-xl animate-pulse" />
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              filter: [
                'drop-shadow(0 0 12px rgba(74,18,40,0.6))',
                'drop-shadow(0 0 24px rgba(183,110,121,0.8))',
                'drop-shadow(0 0 12px rgba(74,18,40,0.6))',
              ],
            }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-[#4A1228] hover:text-[#B76E79] transition-colors"
          >
            <Heart className="w-12 h-12 sm:w-16 sm:h-16 fill-[#4A1228] stroke-[#B76E79]" />
          </motion.div>
        </motion.div>

        {/* Cinematic sequence texts */}
        <div className="min-h-[160px] sm:min-h-[180px] flex flex-col items-center justify-center space-y-4 sm:space-y-5">
          <AnimatePresence mode="sync">
            {step >= 1 && (
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1 }}
                className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#FFF0E8] font-light tracking-wide"
              >
                {siteConfig.scene1.dialogues[0]}
              </motion.h1>
            )}

            {step >= 2 && (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1 }}
                className="font-serif text-xl sm:text-2xl md:text-3xl text-[#D7B47C] italic font-normal"
              >
                {siteConfig.scene1.dialogues[1]}
              </motion.p>
            )}

            {step >= 3 && (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1 }}
                className="font-sans text-base sm:text-lg md:text-xl text-[#B76E79] font-light tracking-wider"
              >
                {siteConfig.scene1.dialogues[2]}
              </motion.p>
            )}

            {step >= 4 && (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                className="font-serif text-lg sm:text-2xl text-[#FFF0E8]/90 font-light pt-2"
              >
                {siteConfig.scene1.dialogues[3]}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Action Button */}
        <div className="mt-8 sm:mt-12 h-16 flex items-center justify-center">
          <AnimatePresence>
            {step >= 5 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                onClick={handleOpenHeart}
                className="group relative px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-serif text-lg sm:text-xl text-[#FFF0E8] tracking-wider overflow-hidden cursor-pointer shadow-[0_0_35px_rgba(74,18,40,0.5)] border border-[#D7B47C]/40 bg-gradient-to-r from-[#4A1228] via-[#320d1c] to-[#4A1228]"
              >
                {/* Glow ring */}
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D7B47C]/0 via-[#D7B47C]/20 to-[#D7B47C]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <span className="relative flex items-center gap-2.5">
                  <span>{siteConfig.scene1.buttonText}</span>
                </span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
