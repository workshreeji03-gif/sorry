import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AudioProvider } from './context/AudioContext';
import { useAudio } from './context/useAudio';
import { FilmGrain } from './components/FilmGrain';
import { ParticleBackground } from './components/ParticleBackground';
import { HeaderControls } from './components/HeaderControls';
import { Scene1Opening } from './components/Scene1Opening';
import { Scene2PhotoReveal } from './components/Scene2PhotoReveal';
import { Scene3VideoMoment } from './components/Scene3VideoMoment';
import { Scene4SevenThings } from './components/Scene4SevenThings';
import { SceneGamesHub } from './components/SceneGamesHub';
import { Scene5Letter } from './components/Scene5Letter';
import { Scene6Ending } from './components/Scene6Ending';
import { SceneFinalCallback } from './components/SceneFinalCallback';

const MainApp: React.FC = () => {
  const [currentScene, setCurrentScene] = useState<number>(1);
  const { restartAudio } = useAudio();

  const handleNext = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentScene((prev) => Math.min(8, prev + 1));
  };

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentScene(1);
    restartAudio();
  };

  const handleSceneSelect = (scene: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentScene(scene);
  };

  return (
    <div className="relative min-h-[100dvh] bg-[#10080D] text-[#FFF0E8] overflow-x-hidden selection:bg-[#4A1228] selection:text-[#FFF0E8]">
      {/* Film grain texture */}
      <FilmGrain />

      {/* Floating golden stardust particle canvas */}
      <ParticleBackground />

      {/* Floating Header Controls */}
      <HeaderControls
        currentScene={currentScene}
        totalScenes={8}
        onSceneSelect={handleSceneSelect}
        showProgress={currentScene > 1}
      />

      {/* Scene Render with Smooth Cross-fades */}
      <main className="relative z-10 w-full min-h-[100dvh]">
        <AnimatePresence mode="wait">
          {currentScene === 1 && (
            <motion.div
              key="scene-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
              className="w-full"
            >
              <Scene1Opening onStart={handleNext} />
            </motion.div>
          )}

          {currentScene === 2 && (
            <motion.div
              key="scene-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
              className="w-full"
            >
              <Scene2PhotoReveal onNext={handleNext} />
            </motion.div>
          )}

          {currentScene === 3 && (
            <motion.div
              key="scene-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
              className="w-full"
            >
              <Scene3VideoMoment onNext={handleNext} />
            </motion.div>
          )}

          {currentScene === 4 && (
            <motion.div
              key="scene-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
              className="w-full"
            >
              <Scene4SevenThings onNext={handleNext} />
            </motion.div>
          )}

          {currentScene === 5 && (
            <motion.div
              key="scene-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
              className="w-full"
            >
              <SceneGamesHub onNext={handleNext} />
            </motion.div>
          )}

          {currentScene === 6 && (
            <motion.div
              key="scene-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
              className="w-full"
            >
              <Scene5Letter onNext={handleNext} />
            </motion.div>
          )}

          {currentScene === 7 && (
            <motion.div
              key="scene-7"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
              className="w-full"
            >
              <Scene6Ending onNext={handleNext} />
            </motion.div>
          )}

          {currentScene === 8 && (
            <motion.div
              key="scene-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: 'easeInOut' }}
              className="w-full"
            >
              <SceneFinalCallback onReplay={handleReplay} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default function App() {
  return (
    <AudioProvider>
      <MainApp />
    </AudioProvider>
  );
}
