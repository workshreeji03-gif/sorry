import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, RotateCcw, Sparkles } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { FullscreenImageViewer } from './FullscreenImageViewer';

interface SceneFinalCallbackProps {
  onReplay: () => void;
}

export const SceneFinalCallback: React.FC<SceneFinalCallbackProps> = ({ onReplay }) => {
  const [step, setStep] = useState<number>(0);
  const [isViewerOpen, setIsViewerOpen] = useState<boolean>(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 1000), // Photo starts fading in
      setTimeout(() => setStep(2), 2400), // "If only you could see yourself through my eyes..."
      setTimeout(() => setStep(3), 4200), // "You'd know just how beautiful you are."
      setTimeout(() => setStep(4), 6000), // "I love you, Prapti. ❤️"
      setTimeout(() => setStep(5), 7800), // Replay button
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center py-20 px-4 sm:px-8 text-center select-none overflow-hidden bg-[#10080D]">
      {/* Background radial spotlight */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[360px] sm:w-[600px] h-[360px] sm:h-[600px] rounded-full bg-[#4A1228]/40 blur-[130px]" />
        <div className="w-[280px] sm:w-[420px] h-[280px] sm:h-[420px] rounded-full bg-[#D7B47C]/15 blur-[140px]" />
      </div>

      {/* Floating Gentle Glowing Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              y: '100vh',
              x: `${15 + i * 15}vw`,
              opacity: 0,
              scale: 0.6 + (i % 3) * 0.2,
            }}
            animate={{
              y: '-20vh',
              opacity: [0, 0.4, 0.7, 0],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              delay: i * 2,
              ease: 'linear',
            }}
            className="absolute text-[#D7B47C]/40"
          >
            <Heart className="w-6 h-6 fill-current" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
        {/* Her photograph reappears with warm cinematic glow */}
        {step >= 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
            onClick={() => setIsViewerOpen(true)}
            className="relative cursor-pointer group mb-8 sm:mb-10"
          >
            <div className="absolute -inset-3 sm:-inset-5 rounded-3xl bg-gradient-to-r from-[#D7B47C]/25 via-[#4A1228]/40 to-[#B76E79]/25 blur-xl group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative rounded-2xl sm:rounded-3xl p-2 bg-gradient-to-b from-[#2a111e] via-[#1a0a14] to-[#250d1a] border border-[#D7B47C]/50 shadow-[0_20px_50px_rgba(0,0,0,0.9)] max-w-[280px] sm:max-w-[340px]">
              <img
                src={siteConfig.media.photo}
                alt={siteConfig.media.photoAlt}
                className="w-full h-auto max-h-[45vh] object-contain rounded-xl sm:rounded-2xl select-none"
              />
            </div>
          </motion.div>
        )}

        {/* Cinematic Ending Quotes */}
        <div className="min-h-[160px] flex flex-col items-center justify-center space-y-4 px-2">
          {step >= 2 && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="font-serif text-xl sm:text-2xl md:text-3xl text-[#FFF0E8]/90 font-light"
            >
              "{siteConfig.finalScene.line1}"
            </motion.p>
          )}

          {step >= 3 && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="font-serif text-lg sm:text-2xl text-[#D7B47C] italic font-normal"
            >
              "{siteConfig.finalScene.line2}"
            </motion.p>
          )}

          {step >= 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.4 }}
              className="pt-2"
            >
              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#FFF0E8] font-medium tracking-wide gold-text-shimmer flex items-center justify-center gap-3">
                <span>{siteConfig.finalScene.line3}</span>
              </h2>
            </motion.div>
          )}
        </div>

        {/* Replay Button */}
        {step >= 5 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mt-10 sm:mt-12"
          >
            <button
              onClick={onReplay}
              className="group flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#1e0c16]/80 hover:bg-[#4A1228]/80 text-[#FFF0E8] border border-[#D7B47C]/30 hover:border-[#D7B47C]/70 shadow-lg transition-all duration-300 active:scale-95 cursor-pointer font-serif text-base sm:text-lg"
            >
              <RotateCcw className="w-4 h-4 text-[#D7B47C] group-hover:-rotate-45 transition-transform" />
              <span>{siteConfig.finalScene.replayText}</span>
              <Sparkles className="w-3.5 h-3.5 text-[#D7B47C]" />
            </button>
          </motion.div>
        )}
      </div>

      {/* Lightbox Modal */}
      <FullscreenImageViewer
        isOpen={isViewerOpen}
        imageSrc={siteConfig.media.photo}
        altText={siteConfig.media.photoAlt}
        caption="Unforgettably beautiful, that night and always."
        onClose={() => setIsViewerOpen(false)}
      />
    </section>
  );
};
