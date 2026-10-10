import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Scroll, Heart, RotateCcw, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

interface SignaturePadTreatyProps {
  onSigned?: () => void;
}

export const SignaturePadTreaty: React.FC<SignaturePadTreatyProps> = ({ onSigned }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [hasDrawn, setHasDrawn] = useState<boolean>(false);
  const [isSealed, setIsSealed] = useState<boolean>(false);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize for high DPI
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    ctx.strokeStyle = '#D7B47C';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    } else if ('clientX' in e) {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
    return { x: 0, y: 0 };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (isSealed) return;
    const { x, y } = getCoordinates(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    setHasDrawn(true);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || isSealed) return;
    const { x, y } = getCoordinates(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const handleSeal = () => {
    setIsSealed(true);
    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#D7B47C', '#B76E79', '#4A1228', '#FFF0E8'],
    });
    onSigned?.();
  };

  return (
    <div className="w-full max-w-lg mx-auto p-5 sm:p-7 rounded-3xl bg-[#1b0d17] border-2 border-[#D7B47C]/50 shadow-[0_20px_60px_rgba(0,0,0,0.85)] text-left relative overflow-hidden">
      {/* Decorative inner border */}
      <div className="absolute inset-2 border border-[#D7B47C]/20 rounded-2xl pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-5 relative z-10">
        <h3 className="font-serif text-2xl sm:text-3xl text-[#FFF0E8] font-normal mb-1 flex items-center justify-center gap-2">
          <Scroll className="w-5 h-5 text-[#D7B47C]" />
          <span>{siteConfig.gamesHub.peaceTreaty.title}</span>
        </h3>
        <p className="font-sans text-xs text-[#D7B47C]/80 font-light">
          {siteConfig.gamesHub.peaceTreaty.subtitle}
        </p>
      </div>

      {/* Treaty Articles */}
      <div className="space-y-3 relative z-10 text-xs sm:text-sm text-[#FFF0E8]/90 font-sans max-h-[160px] overflow-y-auto pr-1">
        {siteConfig.gamesHub.peaceTreaty.clauses.map((clause) => (
          <div key={clause.number} className="pl-3 border-l border-[#D7B47C]/40 py-0.5">
            <span className="font-serif text-[#D7B47C] font-semibold block">{clause.title}</span>
            <span className="text-[#FFF0E8]/80">{clause.text}</span>
          </div>
        ))}
      </div>

      {/* Signature Canvas Pad */}
      <div className="mt-5 pt-4 border-t border-[#D7B47C]/25 relative z-10">
        <div className="flex items-center justify-between text-xs font-sans text-[#D7B47C] mb-2">
          <span>Sign here with your finger ✍️</span>
          {!isSealed && hasDrawn && (
            <button
              onClick={clearCanvas}
              className="text-[11px] text-[#B76E79] hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear</span>
            </button>
          )}
        </div>

        <div className="relative w-full h-[100px] rounded-xl bg-[#10080D]/90 border border-[#D7B47C]/30 overflow-hidden shadow-inner flex items-center justify-center">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="w-full h-full cursor-crosshair touch-none"
          />

          {!hasDrawn && !isSealed && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-xs text-[#FFF0E8]/30 font-serif italic">
              Draw signature here...
            </div>
          )}

          {isSealed && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none"
            >
              <div className="px-3 py-1 rounded-full bg-[#4A1228]/90 border border-[#D7B47C] text-xs font-serif text-[#D7B47C] flex items-center gap-1.5 shadow-lg">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D7B47C]" />
                <span>Officially Signed & Sealed</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Seal Button or Confirmation */}
        <div className="mt-4 text-center">
          {!isSealed ? (
            <button
              onClick={handleSeal}
              disabled={!hasDrawn}
              className={`w-full py-2.5 rounded-full font-serif text-sm sm:text-base border transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                hasDrawn
                  ? 'bg-gradient-to-r from-[#4A1228] to-[#611634] text-[#FFF0E8] border-[#D7B47C] shadow-[0_0_20px_rgba(215,180,124,0.3)] hover:scale-[1.02]'
                  : 'bg-[#150810]/50 text-[#FFF0E8]/40 border-white/10 cursor-not-allowed'
              }`}
            >
              <Heart className="w-4 h-4 fill-current text-[#D7B47C]" />
              <span>Affix Royal Wax Seal 📜</span>
            </button>
          ) : (
            <div className="p-2.5 rounded-xl bg-[#4A1228]/40 border border-[#D7B47C]/40 text-center">
              <p className="font-serif text-sm text-[#D7B47C] gold-text-shimmer">
                "{siteConfig.gamesHub.peaceTreaty.sealedMessage}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
