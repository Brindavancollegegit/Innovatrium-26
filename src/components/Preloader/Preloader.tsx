import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth, unhurried 3.5 second total loading duration
    const duration = 3500; 
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const current = Math.min(Math.floor((elapsed / duration) * 100), 100);

      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        // Brief pause at 100% before smooth fade-out
        setTimeout(onComplete, 250); 
      }
    }, 20);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#05080A] pointer-events-auto select-none"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { duration: 0.7, ease: [0.65, 0, 0.35, 1] } 
      }}
    >
      <div className="flex flex-col items-center max-w-md px-6 text-center">
        
        {/* Scaled-Up Logo Pair */}
        <motion.div 
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center justify-center gap-6 mb-8"
        >
          <img 
            src="/Brindavan-logo.webp" 
            alt="Brindavan College" 
            className="h-10 sm:h-14 md:h-16 w-auto object-contain opacity-95" 
          />
          <div className="w-[1px] h-7 bg-white/20" />
          <img 
            src="/IEEE-logo.webp" 
            alt="IEEE SB" 
            className="h-12 sm:h-16 md:h-20 w-auto object-contain opacity-95" 
          />
        </motion.div>

        {/* Larger Title with Gradient Accent '26 */}
        <motion.h1 
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-10"
        >
          Innovatrium{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-400">
            '26
          </span>
        </motion.h1>

        {/* Ultra-Thin Progress Bar */}
        <div className="w-52 sm:w-64 h-[1px] bg-white/15 relative overflow-hidden mb-4">
          <div 
            className="h-full bg-gradient-to-r from-blue-400 to-emerald-400 transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

      </div>

      {/* Huge Bottom-Right Percentage Counter */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 font-display text-7xl sm:text-8xl md:text-[10rem] font-black italic text-white/10 tracking-tighter leading-none"
      >
        {String(progress).padStart(2, '0')}
      </motion.div>
    </motion.div>
  );
}