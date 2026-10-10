import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, Maximize, AlertCircle, ChevronDown, Sparkles } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { useAudio } from '../context/useAudio';

interface Scene3VideoMomentProps {
  onNext: () => void;
}

export const Scene3VideoMoment: React.FC<Scene3VideoMomentProps> = ({ onNext }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { duckAudio } = useAudio();

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [hasError, setHasError] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [aspectRatio, setAspectRatio] = useState<string>('auto');

  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const v = videoRef.current;
      setDuration(v.duration);
      if (v.videoWidth && v.videoHeight) {
        setAspectRatio(`${v.videoWidth} / ${v.videoHeight}`);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }
  };

  const handleNativePlay = () => {
    setIsPlaying(true);
    duckAudio(true);
  };

  const handleNativePause = () => {
    setIsPlaying(false);
    duckAudio(false);
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    duckAudio(false);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        duckAudio(true);
      }).catch((err) => {
        console.warn('Video play error:', err);
      });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      duckAudio(false);
    }
  };

  const handleAdvance = () => {
    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
    }
    duckAudio(false);
    onNext();
  };

  const toggleVideoMute = () => {
    if (!videoRef.current) return;
    const newMuted = !videoRef.current.muted;
    videoRef.current.muted = newMuted;
    setIsVideoMuted(newMuted);
    if (isPlaying) {
      // If video is muted by user, restore background music, else mute background music
      duckAudio(!newMuted);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current || !duration) return;
    const seekTo = (parseFloat(e.target.value) / 100) * duration;
    videoRef.current.currentTime = seekTo;
    setProgress(parseFloat(e.target.value));
  };

  const handleFullscreen = () => {
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(console.warn);
    } else {
      containerRef.current.requestFullscreen().catch((err) => {
        // Fallback for iOS Safari which supports video.webkitEnterFullscreen
        if (videoRef.current && (videoRef.current as any).webkitEnterFullscreen) {
          (videoRef.current as any).webkitEnterFullscreen();
        } else {
          console.warn('Fullscreen request failed:', err);
        }
      });
    }
  };

  // Clean up ducking if component unmounts while video was playing
  useEffect(() => {
    return () => {
      duckAudio(false);
    };
  }, [duckAudio]);

  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col items-center justify-start py-20 px-4 sm:px-8 text-center select-none overflow-x-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[540px] h-[340px] sm:h-[540px] rounded-full bg-[#4A1228]/30 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[280px] sm:w-[460px] h-[280px] sm:h-[460px] rounded-full bg-[#D7B47C]/15 blur-[140px] pointer-events-none" />

      {/* Intro Headings */}
      <div className="relative z-10 max-w-2xl mx-auto mb-8 sm:mb-12 space-y-3 px-2">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
          className="font-serif text-xl sm:text-2xl md:text-3xl text-[#FFF0E8]/90 font-light tracking-wide"
        >
          {siteConfig.scene3.intro1}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.8 }}
          className="font-serif text-lg sm:text-xl md:text-2xl text-[#D7B47C] italic font-normal"
        >
          {siteConfig.scene3.intro2}
        </motion.p>
      </div>

      {/* Video Container Frame */}
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.94, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.3, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[340px] sm:max-w-[420px] md:max-w-[480px] mx-auto rounded-2xl sm:rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-[#2a111e] via-[#1a0a14] to-[#250d1a] border border-[#D7B47C]/40 shadow-[0_20px_50px_rgba(0,0,0,0.85)] group"
        onMouseEnter={() => setShowControls(true)}
      >
        {/* Subtle golden ambient highlight */}
        <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[#D7B47C]/20 via-[#4A1228]/35 to-[#B76E79]/20 blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Video Inner Frame */}
        <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-black border border-[#D7B47C]/20 flex items-center justify-center">
          {hasError ? (
            <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center space-y-3 min-h-[360px]">
              <AlertCircle className="w-10 h-10 text-[#B76E79]" />
              <p className="font-serif text-lg text-[#FFF0E8]/90">
                {siteConfig.scene3.videoErrorMessage}
              </p>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                src={siteConfig.media.video}
                playsInline
                preload="metadata"
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleVideoEnded}
                onPlay={handleNativePlay}
                onPause={handleNativePause}
                onError={() => setHasError(true)}
                onClick={togglePlay}
                style={{ aspectRatio }}
                className="w-full h-auto max-h-[64vh] object-contain cursor-pointer"
              />

              {/* Big Centered Play Button when paused */}
              {!isPlaying && (
                <div
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/35 backdrop-blur-[2px] cursor-pointer transition-opacity duration-300"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#4A1228]/90 text-[#FFF0E8] border-2 border-[#D7B47C] flex items-center justify-center shadow-[0_0_35px_rgba(215,180,124,0.4)] cursor-pointer"
                  >
                    <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-[#FFF0E8] text-[#FFF0E8] ml-1" />
                  </motion.div>
                </div>
              )}

              {/* Custom Cinematic Bottom Controls */}
              <div
                className={`absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col gap-2 transition-opacity duration-300 ${
                  showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {/* Seek Bar */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={handleSeek}
                  className="w-full h-1 bg-[#FFF0E8]/20 accent-[#D7B47C] rounded-lg cursor-pointer"
                  aria-label="Video scrubber"
                />

                <div className="flex items-center justify-between text-xs text-[#FFF0E8]/90 font-sans pt-1">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlay}
                      className="p-1 hover:text-[#D7B47C] transition-colors"
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>
                    <button
                      onClick={toggleVideoMute}
                      className="p-1 hover:text-[#D7B47C] transition-colors"
                      aria-label={isVideoMuted ? 'Unmute' : 'Mute'}
                    >
                      {isVideoMuted ? <VolumeX className="w-4 h-4 text-[#B76E79]" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <span>
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <button
                    onClick={handleFullscreen}
                    className="p-1 hover:text-[#D7B47C] transition-colors"
                    aria-label="Fullscreen"
                  >
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Golden Corner Accents */}
        <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-[#D7B47C] rounded-tl-sm pointer-events-none" />
        <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-[#D7B47C] rounded-tr-sm pointer-events-none" />
        <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-[#D7B47C] rounded-bl-sm pointer-events-none" />
        <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-[#D7B47C] rounded-br-sm pointer-events-none" />
      </motion.div>

      {/* Caption under video */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, delay: 2.2 }}
        className="relative z-10 mt-4 text-xs sm:text-sm font-sans text-[#D7B47C]/80 flex items-center gap-1.5"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#D7B47C]" />
        <span>{siteConfig.scene3.caption}</span>
      </motion.p>

      {/* Advance to next scene button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 2.8 }}
        className="relative z-10 mt-10 sm:mt-14 pb-8"
      >
        <button
          onClick={handleAdvance}
          className="group flex flex-col items-center gap-2 px-8 py-3.5 rounded-full bg-[#1e0c16]/80 hover:bg-[#4A1228]/80 text-[#FFF0E8] border border-[#D7B47C]/30 hover:border-[#D7B47C]/70 shadow-lg transition-all duration-300 active:scale-95 cursor-pointer"
        >
          <span className="font-serif text-base sm:text-lg tracking-wider text-[#FFF0E8]/95 group-hover:text-[#FFF0E8]">
            Seven things I should have said
          </span>
          <ChevronDown className="w-4 h-4 text-[#D7B47C] group-hover:translate-y-1 transition-transform" />
        </button>
      </motion.div>
    </section>
  );
};
