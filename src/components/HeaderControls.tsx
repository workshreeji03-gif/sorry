import React from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { useAudio } from '../context/useAudio';

interface HeaderControlsProps {
  onNavigate?: (sectionId: string) => void;
  showNav?: boolean;
}

export const HeaderControls: React.FC<HeaderControlsProps> = ({
  onNavigate,
  showNav = true,
}) => {
  const { isMuted, isPlaying, toggleMute, hasStarted } = useAudio();

  const navItems = [
    { id: 'photo', label: 'Photo', icon: '📸' },
    { id: 'video', label: 'Video', icon: '🎥' },
    { id: 'compliments', label: 'Compliments', icon: '💖' },
    { id: 'meter', label: 'Forgiveness', icon: '🌡️' },
    { id: 'runaway', label: 'Still Angry?', icon: '🏃‍♂️' },
    { id: 'catcher', label: 'Catch Hearts', icon: '🌟' },
    { id: 'coupons', label: 'Coupons', icon: '🎟️' },
    { id: 'treaty', label: 'Peace Treaty', icon: '📜' },
    { id: 'letter', label: 'Letter', icon: '💌' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between pointer-events-none safe-top bg-[#10080D]/85 backdrop-blur-md border-b border-[#D7B47C]/15 shadow-lg">
      {/* Brand / Tag */}
      <div className="pointer-events-auto flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1e0c16]/80 border border-[#D7B47C]/30 text-xs text-[#D7B47C] font-sans shrink-0">
        <Sparkles className="w-3.5 h-3.5 text-[#D7B47C]" />
        <span className="font-serif italic text-[#FFF0E8]/90 font-medium">For Prapti ❤️</span>
      </div>

      {/* Nav items pills (horizontal scrollable on mobile) */}
      {showNav && (
        <nav className="pointer-events-auto flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-0.5 px-2 max-w-[65vw] sm:max-w-[70vw]">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate?.(item.id)}
              className="px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-sans whitespace-nowrap bg-[#1a0a14]/70 hover:bg-[#4A1228]/80 text-[#FFF0E8]/85 hover:text-white border border-[#D7B47C]/20 hover:border-[#D7B47C]/50 transition-all active:scale-95 cursor-pointer flex items-center gap-1 shrink-0"
            >
              <span>{item.icon}</span>
              <span className="hidden xs:inline">{item.label}</span>
            </button>
          ))}
        </nav>
      )}

      {/* Sound Mute / Unmute Button */}
      <div className="pointer-events-auto flex items-center gap-2 shrink-0">
        <button
          onClick={toggleMute}
          className={`flex items-center gap-1.5 px-3 py-1 sm:py-1.5 rounded-full backdrop-blur-md border transition-all duration-300 active:scale-95 shadow-md ${
            isMuted
              ? 'bg-[#1e0c16]/90 text-[#B76E79] border-[#B76E79]/40'
              : 'bg-[#1e0c16]/90 text-[#D7B47C] border-[#D7B47C]/40 shadow-[0_0_12px_rgba(215,180,124,0.2)]'
          }`}
          aria-label={isMuted ? 'Unmute music' : 'Mute music'}
        >
          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5 text-[#B76E79]" />
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#D7B47C]" />
              {isPlaying && (
                <span className="flex items-end gap-0.5 h-2.5">
                  <span className="w-0.5 h-1.5 bg-[#D7B47C] rounded-full animate-pulse" />
                  <span className="w-0.5 h-2.5 bg-[#D7B47C] rounded-full animate-pulse delay-75" />
                  <span className="w-0.5 h-1 bg-[#D7B47C] rounded-full animate-pulse delay-150" />
                </span>
              )}
            </>
          )}
          <span className="text-[10px] sm:text-xs font-sans hidden sm:inline">
            {isMuted ? 'Muted' : hasStarted ? 'Music' : 'Start'}
          </span>
        </button>
      </div>
    </header>
  );
};
