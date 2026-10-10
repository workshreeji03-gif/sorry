import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn } from 'lucide-react';

interface FullscreenImageViewerProps {
  isOpen: boolean;
  imageSrc: string;
  altText: string;
  caption?: string;
  onClose: () => void;
}

export const FullscreenImageViewer: React.FC<FullscreenImageViewerProps> = ({
  isOpen,
  imageSrc,
  altText,
  caption,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/92 backdrop-blur-xl p-4 sm:p-6"
          onClick={onClose}
        >
          {/* Top Bar with Close button */}
          <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="p-2.5 rounded-full bg-[#1e0c16]/80 text-[#FFF0E8]/90 hover:text-white hover:bg-[#4A1228]/80 border border-[#D7B47C]/30 transition-all duration-200 active:scale-95 shadow-lg"
              aria-label="Close fullscreen view"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Image Container */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-full max-h-[85vh] flex flex-col items-center"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(215,180,124,0.22)] border border-[#D7B47C]/40">
              <img
                src={imageSrc}
                alt={altText}
                className="max-h-[80vh] w-auto max-w-full object-contain select-none"
              />
            </div>

            {caption && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-4 text-center font-serif text-lg sm:text-xl text-[#FFF0E8]/90 italic max-w-lg px-4"
              >
                "{caption}"
              </motion.p>
            )}

            <div className="mt-2 text-xs font-sans text-[#D7B47C]/60 flex items-center gap-1.5">
              <ZoomIn className="w-3.5 h-3.5" />
              <span>Tap anywhere outside to return</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
