import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 150); 
          return 100;
        }
        return p + Math.floor(Math.random() * 25) + 20;
      });
    }, 35);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
    >
      <motion.div 
        className="absolute inset-0 bg-[#05080A] pointer-events-auto"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      />
      
      {/* Numbers in right corner */}
      <motion.div 
        className="absolute bottom-8 right-8 md:bottom-12 md:right-12 font-display text-5xl md:text-[140px] font-bold text-white/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.4 } }}
      >
        {Math.min(progress, 100)}
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }}
        exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)", transition: { duration: 0.8, ease: "easeInOut" } }}
        className="font-display text-4xl sm:text-5xl md:text-[80px] font-bold leading-[1.05] tracking-[-0.02em] text-white text-center hyphens-none relative z-10 pointer-events-auto"
      >
        Innovatrium <span className="text-gradient-accent">'26</span>
      </motion.h1>
    </motion.div>
  );
}
