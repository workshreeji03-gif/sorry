import React from 'react';
import { Sparkles } from 'lucide-react';

export const CutieNoteCard: React.FC = () => {
  return (
    <div className="w-full max-w-sm mx-auto p-6 sm:p-8 rounded-3xl bg-[#FFF9FA] text-[#2D2D2D] border border-[#F8D2DB] shadow-[0_20px_50px_rgba(0,0,0,0.4)] text-left relative overflow-hidden select-none min-h-[380px] flex flex-col justify-between">
      {/* Cat with tulips sticker at top right corner */}
      <div className="absolute top-2 right-2 w-16 h-16 pointer-events-none z-10">
        <img
          src="/media/kitty-tulip.png"
          alt="Cute cat with tulips"
          className="w-full h-full object-contain drop-shadow-sm select-none"
        />
      </div>

      {/* Love Stamped circular ink stamp at bottom left */}
      <div className="absolute -bottom-2 -left-2 w-24 h-24 pointer-events-none opacity-85 z-10 rotate-[-12deg]">
        <img
          src="/media/love-stamp.png"
          alt="Love stamped circular seal"
          className="w-full h-full object-contain select-none"
        />
      </div>

      {/* Header */}
      <div className="text-center pt-1 mb-4 relative z-10">
        <div className="text-[11px] font-sans uppercase tracking-widest text-[#777] font-semibold">
          A NOTE
        </div>
        <div className="font-serif italic text-2xl text-[#E85D75] font-semibold flex items-center justify-center gap-1.5 mt-0.5">
          <span>JUST FOR YOU</span>
          <Sparkles className="w-3.5 h-3.5 text-[#E85D75] fill-current" />
        </div>
      </div>

      {/* Note Content */}
      <div className="relative z-10 px-2 my-auto space-y-3">
        <h3 className="font-serif italic text-xl text-[#C4435B] font-semibold">
          To my joy (Prapti),
        </h3>

        <p className="font-sans text-xs sm:text-sm text-[#444] leading-relaxed">
          I hate it when we fight, and I hate it more when it's my fault. You matter more to me than being right ever will. I'm sorry, truly. 💖
        </p>

        <p className="font-serif italic text-sm text-[#222] font-semibold pt-2">
          Yours always, Shreeji 💌
        </p>
      </div>

      {/* Bottom spacer so stamp doesn't obscure text */}
      <div className="h-6" />
    </div>
  );
};
