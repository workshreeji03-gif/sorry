import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Maximize2, Sparkles, ChevronDown } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { FullscreenImageViewer } from './FullscreenImageViewer';

interface Scene2PhotoRevealProps {
  onNext: () => void;
}

export const Scene2PhotoReveal: React.FC<Scene2PhotoRevealProps> = ({ onNext }) => {
  const [isViewerOpen, setIsViewerOpen] = useState<boolean>(false);
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  // Gentle Parallax effect with spring smoothing
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  const rotateX = useTransform(smoothMouseY, [-200, 200], [6, -6]);
  const rotateY = useTransform(smoothMouseX, [-200, 200], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col items-center justify-start py-20 px-4 sm:px-8 text-center select-none overflow-x-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[560px] h-[340px] sm:h-[560px] rounded-full bg-[#4A1228]/35 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[450px] h-[280px] sm:h-[450px] rounded-full bg-[#D7B47C]/15 blur-[140px] pointer-events-none" />

      {/* Intro Headings */}
      <div className="relative z-10 max-w-2xl mx-auto mb-8 sm:mb-12 space-y-3 px-2">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.3 }}
          className="font-serif text-xl sm:text-2xl md:text-3xl text-[#FFF0E8]/90 font-light tracking-wide"
        >
          {siteConfig.scene2.heading1}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 1.2 }}
          className="font-serif text-lg sm:text-xl md:text-2xl text-[#D7B47C] italic font-normal"
        >
          {siteConfig.scene2.heading2}
        </motion.p>
      </div>

      {/* Photo Frame with Parallax and Zoom Reveal */}
      <div
        className="relative z-10 perspective-[1000px] flex flex-col items-center"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          style={{ rotateX, rotateY }}
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 2.0, ease: [0.16, 1, 0.3, 1] }}
          className="relative group cursor-pointer"
          onClick={() => setIsViewerOpen(true)}
        >
          {/* Subtle golden ambient spotlight behind frame */}
          <div className="absolute -inset-4 sm:-inset-6 rounded-3xl bg-gradient-to-r from-[#D7B47C]/20 via-[#4A1228]/30 to-[#B76E79]/20 blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-700" />

          {/* Luxury Frame Container */}
          <div className="relative rounded-2xl sm:rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-[#2a111e] via-[#1a0a14] to-[#250d1a] border border-[#D7B47C]/40 shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
            {/* Inner gold border */}
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-[#D7B47C]/20 max-w-[340px] sm:max-w-[420px] md:max-w-[460px]">
              <img
                src={siteConfig.media.photo}
                alt={siteConfig.media.photoAlt}
                onLoad={() => setIsImageLoaded(true)}
                className={`w-full h-auto max-h-[58vh] sm:max-h-[64vh] object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02] ${
                  isImageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                loading="eager"
              />

              {/* Tap to expand overlay badge */}
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#10080D]/80 backdrop-blur-md border border-[#D7B47C]/40 text-[#FFF0E8] text-xs font-sans shadow-lg opacity-90 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5 text-[#D7B47C]" />
                <span className="hidden xs:inline">Full view</span>
              </div>
            </div>
          </div>

          {/* Golden Corner Accents */}
          <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-[#D7B47C] rounded-tl-sm pointer-events-none" />
          <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-[#D7B47C] rounded-tr-sm pointer-events-none" />
          <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-[#D7B47C] rounded-bl-sm pointer-events-none" />
          <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-[#D7B47C] rounded-br-sm pointer-events-none" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3.2 }}
          className="mt-3 text-xs sm:text-sm font-sans text-[#D7B47C]/70 flex items-center gap-1.5 cursor-pointer hover:text-[#D7B47C]"
          onClick={() => setIsViewerOpen(true)}
        >
          <Sparkles className="w-3 h-3 text-[#D7B47C]" />
          <span>{siteConfig.scene2.tapPrompt}</span>
        </motion.p>
      </div>

      {/* Revealing Compliment Quotes */}
      <div className="relative z-10 max-w-xl mx-auto mt-8 sm:mt-12 space-y-3 sm:space-y-4 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 3.8 }}
          className="font-serif text-2xl sm:text-4xl text-[#FFF0E8] font-light tracking-wide"
        >
          {siteConfig.scene2.revealQuote1}
        </motion.h2>

        <div className="space-y-1">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 4.8 }}
            className="font-serif text-lg sm:text-2xl text-[#B76E79] font-normal italic"
          >
            {siteConfig.scene2.revealQuote2}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 5.6 }}
            className="font-serif text-xl sm:text-3xl text-[#D7B47C] font-semibold gold-text-shimmer"
          >
            {siteConfig.scene2.revealQuote3}
          </motion.p>
        </div>
      </div>

      {/* Advance to next scene button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 6.4 }}
        className="relative z-10 mt-10 sm:mt-14 pb-8"
      >
        <button
          onClick={onNext}
          className="group flex flex-col items-center gap-2 px-8 py-3.5 rounded-full bg-[#1e0c16]/80 hover:bg-[#4A1228]/80 text-[#FFF0E8] border border-[#D7B47C]/30 hover:border-[#D7B47C]/70 shadow-lg transition-all duration-300 active:scale-95 cursor-pointer"
        >
          <span className="font-serif text-base sm:text-lg tracking-wider text-[#FFF0E8]/95 group-hover:text-[#FFF0E8]">
            And that wasn't all...
          </span>
          <ChevronDown className="w-4 h-4 text-[#D7B47C] group-hover:translate-y-1 transition-transform" />
        </button>
      </motion.div>

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
