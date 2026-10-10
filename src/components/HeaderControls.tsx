import React from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { useAudio } from '../context/useAudio';

interface HeaderControlsProps {
  currentScene: number;
  totalScenes: number;
  onSceneSelect?: (scene: number) => void;
  showProgress?: boolean;
}

export const HeaderControls: React.FC<HeaderControlsProps> = ({
  currentScene,
  totalScenes,
  showProgress = true,
}) => {
  const { isMuted, isPlaying, toggleMute, hasStarted } = useAudio();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-3.5 sm:py-5 flex items-center justify-between pointer-events-none safe-top">
      {/* Brand / Chapter indicator */}
      <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10080D]/70 backdrop-blur-md border border-[#D7B47C]/20 text-xs sm:text-sm text-[#D7B47C]/80 font-sans tracking-wide">
        <Sparkles className="w-3.5 h-3.5 text-[#D7B47C]" />
        <span className="font-serif italic text-[#FFF0E8]/90">For Prapti</span>
      </div>

      {/* Center scene indicator dots */}
      {showProgress && currentScene > 1 && (
        <div className="pointer-events-auto hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#10080D]/60 backdrop-blur-md border border-white/10">
          {Array.from({ length: totalScenes }).map((_, index) => {
            const sceneNum = index + 1;
            const isActive = sceneNum === currentScene;
            const isPast = sceneNum < currentScene;

            return (
              <span
                key={sceneNum}
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-5 h-1.5 bg-[#D7B47C]'
                    : isPast
                    ? 'w-1.5 h-1.5 bg-[#B76E79]/80'
                    : 'w-1.5 h-1.5 bg-white/20'
                }`}
                title={`Scene ${sceneNum}`}
              />
            );
          })}
        </div>
      )}

      {/* Audio Mute / Unmute Button */}
      <div className="pointer-events-auto flex items-center gap-2">
        <button
          onClick={toggleMute}
          className={`group flex items-center gap-2 px-3.5 py-1.5 sm:py-2 rounded-full backdrop-blur-md border transition-all duration-300 active:scale-95 shadow-md ${
            isMuted
              ? 'bg-[#1e0c16]/80 text-[#B76E79] border-[#B76E79]/30 hover:border-[#B76E79]/60'
              : 'bg-[#1e0c16]/80 text-[#D7B47C] border-[#D7B47C]/30 hover:border-[#D7B47C]/70 shadow-[0_0_15px_rgba(215,180,124,0.15)]'
          }`}
          aria-label={isMuted ? 'Unmute music' : 'Mute music'}
          title={isMuted ? 'Unmute music' : 'Mute music'}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-4 h-4 text-[#B76E79]" />
              <span className="text-xs font-sans text-[#FFF0E8]/70 hidden xs:inline">Muted</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-[#D7B47C] transition-transform duration-200 group-hover:scale-110" />
              {isPlaying && (
                <span className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 h-2 bg-[#D7B47C] rounded-full animate-pulse" />
                  <span className="w-0.5 h-3 bg-[#D7B47C] rounded-full animate-pulse delay-75" />
                  <span className="w-0.5 h-1.5 bg-[#D7B47C] rounded-full animate-pulse delay-150" />
                </span>
              )}
            </>
          )}
          {!hasStarted && (
            <span className="text-[10px] text-[#D7B47C]/80 font-sans tracking-wide">Sound</span>
          )}
        </button>
      </div>
    </header>
  );
};
