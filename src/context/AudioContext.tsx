import React, { createContext, useEffect, useRef, useState, useCallback } from 'react';
import { siteConfig } from '../config/siteConfig';

interface AudioContextType {
  isPlaying: boolean;
  isMuted: boolean;
  isDucked: boolean;
  hasStarted: boolean;
  startAudio: () => Promise<boolean>;
  toggleMute: () => void;
  duckAudio: (duck: boolean) => void;
  setVolumeLevel: (level: number) => void;
  restartAudio: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isDucked, setIsDucked] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);
  const currentVolumeRef = useRef<number>(siteConfig.audio.defaultVolume);
  const targetVolumeRef = useRef<number>(siteConfig.audio.defaultVolume);

  // Smooth volume transition utility
  const fadeTo = useCallback((targetVol: number, durationMs: number = siteConfig.audio.fadeDurationMs) => {
    if (!audioRef.current) return;
    
    if (fadeIntervalRef.current) {
      window.clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }

    targetVolumeRef.current = targetVol;
    const audio = audioRef.current;
    const startVol = audio.volume;
    const diff = targetVol - startVol;
    const steps = 30;
    const stepTime = durationMs / steps;
    let stepCount = 0;

    fadeIntervalRef.current = window.setInterval(() => {
      stepCount++;
      const progress = stepCount / steps;
      // Ease in-out cubic
      const eased = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
      const newVol = Math.max(0, Math.min(1, startVol + diff * eased));
      audio.volume = newVol;
      currentVolumeRef.current = newVol;

      if (stepCount >= steps) {
        if (fadeIntervalRef.current) {
          window.clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
        }
        audio.volume = Math.max(0, Math.min(1, targetVol));
        currentVolumeRef.current = targetVol;
      }
    }, stepTime);
  }, []);

  // Initialize audio once
  useEffect(() => {
    const audio = new Audio(siteConfig.media.music);
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0; // starts at 0 for smooth fade-in
    audioRef.current = audio;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onError = (e: Event) => {
      console.warn('Audio playback error / file loading notification', e);
    };

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('error', onError);

    return () => {
      if (fadeIntervalRef.current) {
        window.clearInterval(fadeIntervalRef.current);
      }
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('error', onError);
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, []);

  const startAudio = useCallback(async (): Promise<boolean> => {
    if (!audioRef.current) return false;
    try {
      audioRef.current.volume = 0;
      await audioRef.current.play();
      setHasStarted(true);
      setIsPlaying(true);
      fadeTo(siteConfig.audio.defaultVolume, 1500);
      return true;
    } catch (err) {
      console.warn('Audio auto-unlock requirement:', err);
      // Even if blocked momentarily, mark hasStarted so user can tap mute button
      setHasStarted(true);
      return false;
    }
  }, [fadeTo]);

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    if (!hasStarted) {
      startAudio();
      return;
    }

    if (isMuted) {
      // Unmuting
      audio.muted = false;
      setIsMuted(false);
      const restoreVol = isDucked ? siteConfig.audio.duckedVolume : siteConfig.audio.defaultVolume;
      fadeTo(restoreVol, 600);
      if (audio.paused) {
        audio.play().catch(console.warn);
      }
    } else {
      // Muting
      fadeTo(0, 400);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.muted = true;
          setIsMuted(true);
        }
      }, 400);
    }
  }, [hasStarted, isMuted, isDucked, startAudio, fadeTo]);

  const duckAudio = useCallback((duck: boolean) => {
    setIsDucked(duck);
    if (!audioRef.current || isMuted) return;

    if (duck) {
      fadeTo(siteConfig.audio.duckedVolume, 800);
    } else {
      fadeTo(siteConfig.audio.defaultVolume, 1200);
    }
  }, [isMuted, fadeTo]);

  const setVolumeLevel = useCallback((level: number) => {
    if (!audioRef.current || isMuted) return;
    fadeTo(Math.max(0, Math.min(1, level)), 400);
  }, [isMuted, fadeTo]);

  const restartAudio = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    if (audioRef.current.paused && hasStarted && !isMuted) {
      audioRef.current.play().catch(console.warn);
    }
  }, [hasStarted, isMuted]);

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        isMuted,
        isDucked,
        hasStarted,
        startAudio,
        toggleMute,
        duckAudio,
        setVolumeLevel,
        restartAudio,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export { AudioContext };
export type { AudioContextType };
