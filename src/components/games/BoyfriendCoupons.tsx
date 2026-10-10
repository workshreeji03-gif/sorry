import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Ticket, Check, Sparkles } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export const BoyfriendCoupons: React.FC = () => {
  const [redeemedIds, setRedeemedIds] = useState<number[]>([]);

  const handleRedeem = (id: number) => {
    if (!redeemedIds.includes(id)) {
      setRedeemedIds((prev) => [...prev, id]);
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D7B47C', '#B76E79', '#FFF0E8'],
      });
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4 sm:p-6 text-center">
      <div className="mb-6">
        <h3 className="font-serif text-2xl sm:text-3xl text-[#FFF0E8] font-normal mb-1 flex items-center justify-center gap-2">
          <span>{siteConfig.gamesHub.coupons.title}</span>
          <Sparkles className="w-4 h-4 text-[#D7B47C]" />
        </h3>
        <p className="font-sans text-xs sm:text-sm text-[#D7B47C]/80 font-light">
          {siteConfig.gamesHub.coupons.subtitle}
        </p>
      </div>

      {/* Coupons List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-left">
        {siteConfig.gamesHub.coupons.items.map((coupon) => {
          const isRedeemed = redeemedIds.includes(coupon.id);

          return (
            <motion.div
              key={coupon.id}
              whileHover={{ y: -3 }}
              className={`relative p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg ${
                isRedeemed
                  ? 'bg-[#1e0c16]/90 border-[#D7B47C]/60'
                  : 'bg-[#150810]/70 border-[#D7B47C]/25 hover:border-[#D7B47C]/60'
              }`}
            >
              {/* Ticket Notch decorations */}
              <div className="absolute top-1/2 -left-2 w-4 h-4 rounded-full bg-[#10080D] -translate-y-1/2 border-r border-[#D7B47C]/30" />
              <div className="absolute top-1/2 -right-2 w-4 h-4 rounded-full bg-[#10080D] -translate-y-1/2 border-l border-[#D7B47C]/30" />

              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5 text-xs text-[#D7B47C] font-mono">
                    <Ticket className="w-3.5 h-3.5" />
                    <span>{coupon.code}</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-[#B76E79]">
                    100% Guaranteed
                  </span>
                </div>

                <h4 className="font-serif text-lg sm:text-xl text-[#FFF0E8] font-normal mb-1">
                  {coupon.title}
                </h4>

                <p className="font-sans text-xs text-[#FFF0E8]/85 leading-relaxed mb-2">
                  {coupon.perk}
                </p>

                <p className="font-sans text-[11px] text-[#D7B47C]/60 italic">
                  "{coupon.terms}"
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-3 border-t border-dashed border-[#D7B47C]/20 flex items-center justify-between">
                <span className="text-[10px] text-[#FFF0E8]/40 font-mono">FOR: PRAPTI</span>

                <button
                  onClick={() => handleRedeem(coupon.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-sans font-medium flex items-center gap-1 transition-all active:scale-95 cursor-pointer ${
                    isRedeemed
                      ? 'bg-[#4A1228] text-[#D7B47C] border border-[#D7B47C]/60 shadow-[0_0_10px_rgba(215,180,124,0.3)]'
                      : 'bg-[#D7B47C]/15 text-[#D7B47C] border border-[#D7B47C]/40 hover:bg-[#D7B47C]/30'
                  }`}
                >
                  {isRedeemed ? (
                    <>
                      <Check className="w-3 h-3 text-[#D7B47C]" />
                      <span>Redeemed!</span>
                    </>
                  ) : (
                    <span>Redeem 🎟️</span>
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
