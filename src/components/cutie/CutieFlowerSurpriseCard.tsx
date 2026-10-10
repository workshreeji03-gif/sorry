import React from 'react';
import { motion } from 'motion/react';

export const CutieFlowerSurpriseCard: React.FC = () => {
  return (
    <div className="w-full max-w-sm mx-auto p-5 sm:p-7 rounded-3xl bg-[#FFF9FA] text-[#2D2D2D] border border-[#F8D2DB] shadow-[0_20px_50px_rgba(0,0,0,0.4)] text-center relative overflow-hidden select-none">
      {/* Title */}
      <h2 className="font-serif text-3xl sm:text-4xl text-[#C4435B] font-medium mb-3">
        Little Surprises
      </h2>

      {/* From / To Bar */}
      <div className="flex items-center justify-between text-[11px] font-sans font-medium text-[#777] uppercase tracking-wider px-2 mb-4">
        <div>
          <span>FROM: </span>
          <span className="text-[#333] font-semibold">Shreeji</span>
        </div>
        <div>
          <span>TO: </span>
          <span className="text-[#333] font-semibold">My joy (Prapti)</span>
        </div>
      </div>

      {/* Center Illustration Frame */}
      <div className="relative rounded-2xl bg-white p-2 border border-[#F4CCD6] shadow-sm my-3 flex flex-col items-center justify-center">
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-full flex justify-center"
        >
          <img
            src="/media/kitty-flower.png"
            alt="White kitty holding pink flowers for you"
            className="w-full max-h-[220px] object-contain rounded-xl select-none"
          />
        </motion.div>
      </div>

      {/* Date & Validity Footer */}
      <div className="mt-4 pt-3 border-t border-dashed border-[#F4CCD6] flex items-center justify-between text-[11px] font-sans text-left">
        <div className="space-y-0.5">
          <div>
            <span className="text-[#888] font-semibold">DATE: </span>
            <span className="text-[#444]">Now</span>
          </div>
          <div>
            <span className="text-[#888] font-semibold">VALID FOR: </span>
            <span className="text-[#444]">Forever</span>
          </div>
        </div>

        <div className="font-serif italic text-xs text-[#C4435B] font-medium">
          sealed with love, Shreeji 💌
        </div>
      </div>
    </div>
  );
};
