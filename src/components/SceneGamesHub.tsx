import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ChevronDown } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { ForgivenessMeter } from './games/ForgivenessMeter';
import { RunawayButtonGame } from './games/RunawayButtonGame';
import { HeartCatcherGame } from './games/HeartCatcherGame';
import { BoyfriendCoupons } from './games/BoyfriendCoupons';
import { PeaceTreaty } from './games/PeaceTreaty';

interface SceneGamesHubProps {
  onNext: () => void;
}

type TabType = 'meter' | 'runaway' | 'catcher' | 'coupons' | 'treaty';

export const SceneGamesHub: React.FC<SceneGamesHubProps> = ({ onNext }) => {
  const [activeTab, setActiveTab] = useState<TabType>('meter');

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'meter', label: 'Forgiveness', icon: '🌡️' },
    { id: 'runaway', label: 'Still Angry?', icon: '🏃‍♂️' },
    { id: 'catcher', label: 'Catch Hearts', icon: '🌟' },
    { id: 'coupons', label: 'Love Coupons', icon: '🎟️' },
    { id: 'treaty', label: 'Peace Treaty', icon: '📜' },
  ];

  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col items-center justify-start py-20 px-4 sm:px-8 text-center select-none overflow-x-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[600px] h-[380px] sm:h-[600px] rounded-full bg-[#4A1228]/30 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] rounded-full bg-[#D7B47C]/18 blur-[150px] pointer-events-none" />

      {/* Hub Header */}
      <div className="relative z-10 max-w-xl mx-auto mb-6 sm:mb-8 space-y-2 px-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10080D]/70 border border-[#D7B47C]/30 text-xs text-[#D7B47C] mb-2"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Apology Arcade</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#FFF0E8] font-light tracking-wide"
        >
          {siteConfig.gamesHub.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-sans text-xs sm:text-sm text-[#D7B47C]/80 font-light"
        >
          {siteConfig.gamesHub.subtitle}
        </motion.p>
      </div>

      {/* Tab Selectors */}
      <div className="relative z-10 flex items-center justify-center flex-wrap gap-2 sm:gap-2.5 max-w-xl mx-auto mb-6 px-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-sans flex items-center gap-1.5 transition-all duration-300 active:scale-95 cursor-pointer ${
                isActive
                  ? 'bg-[#4A1228] text-[#FFF0E8] border border-[#D7B47C] shadow-[0_0_15px_rgba(215,180,124,0.3)] font-medium'
                  : 'bg-[#1a0a14]/60 text-[#FFF0E8]/70 border border-[#D7B47C]/20 hover:border-[#D7B47C]/50 hover:text-white'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Display */}
      <div className="relative z-10 w-full max-w-2xl mx-auto min-h-[420px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {activeTab === 'meter' && (
            <motion.div
              key="meter"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="w-full"
            >
              <ForgivenessMeter />
            </motion.div>
          )}

          {activeTab === 'runaway' && (
            <motion.div
              key="runaway"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="w-full"
            >
              <RunawayButtonGame />
            </motion.div>
          )}

          {activeTab === 'catcher' && (
            <motion.div
              key="catcher"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="w-full"
            >
              <HeartCatcherGame />
            </motion.div>
          )}

          {activeTab === 'coupons' && (
            <motion.div
              key="coupons"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="w-full"
            >
              <BoyfriendCoupons />
            </motion.div>
          )}

          {activeTab === 'treaty' && (
            <motion.div
              key="treaty"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="w-full"
            >
              <PeaceTreaty />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Advance to next scene button */}
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
            One more thing, baby...
          </span>
          <ChevronDown className="w-4 h-4 text-[#D7B47C] group-hover:translate-y-1 transition-transform" />
        </button>
      </motion.div>
    </section>
  );
};
