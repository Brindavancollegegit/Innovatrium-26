import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Power } from '@phosphor-icons/react';

export default function CEOLaunchScreen({ onComplete }: { onComplete?: () => void }) {
  const [isMounted, setIsMounted] = useState(false);
  const [phase, setPhase] = useState<'standby' | 'countdown' | 'launched'>('standby');
  const [count, setCount] = useState(5);

  // Hidden hotkey to reset (Ctrl + Shift + R)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'r') {
        sessionStorage.removeItem('site_launched');
        setPhase('standby');
        setCount(5);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const hasLaunched = sessionStorage.getItem('site_launched');
    if (hasLaunched) {
      setPhase('launched');
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (phase !== 'launched') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [phase]);

  useEffect(() => {
    let timer: any;
    if (phase === 'countdown') {
      if (count > 0) {
        timer = setTimeout(() => setCount(c => c - 1), 1000);
      } else {
        // Countdown reached 0
        timer = setTimeout(() => {
          sessionStorage.setItem('site_launched', 'true');
          setPhase('launched');
          if (onComplete) onComplete();
        }, 1000); // 1 second dramatic pause before reveal
      }
    }
    return () => clearTimeout(timer);
  }, [phase, count]);

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {phase !== 'launched' && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black overflow-hidden select-none"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.05, 
            transition: { duration: 2, ease: [0.22, 1, 0.36, 1] } // Very cinematic, slow ease out
          }}
        >
          {/* Extremely subtle ambient glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_60%)] pointer-events-none" />

          {/* Phase 1: Standby */}
          <AnimatePresence mode="wait">
            {phase === 'standby' && (
              <motion.div
                key="standby"
                className="flex flex-col items-center justify-center w-full h-full relative z-10"
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)", transition: { duration: 2, ease: "easeOut" } }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)", transition: { duration: 1.5, ease: "easeInOut" } }}
              >
                
                {/* Minimalist Title */}
                <h1 className="text-white/90 text-sm md:text-base font-mono tracking-[1em] uppercase mb-16 ml-[1em] opacity-50">
                  Innovatrium '26
                </h1>

                {/* Elegant Button */}
                <button
                  onClick={() => setPhase('countdown')}
                  className="relative group flex items-center justify-center focus:outline-none w-24 h-24 rounded-full border border-white/10 hover:border-white/40 transition-all duration-700 ease-out"
                >
                  {/* Subtle Inner Glow */}
                  <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/5 transition-colors duration-700" />
                  
                  <Power weight="light" className="w-8 h-8 text-white/40 group-hover:text-white transition-colors duration-700" />
                </button>
                
                {/* Minimalist instruction */}
                <div className="absolute bottom-12 text-white/20 text-[10px] font-mono tracking-[0.3em] uppercase">
                  Awaiting Initialization
                </div>
              </motion.div>
            )}

            {/* Phase 2: Countdown */}
            {phase === 'countdown' && (
              <motion.div
                key="countdown"
                className="flex flex-col items-center justify-center w-full h-full relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 1 } }}
              >
                {/* Cinematic Number Fade */}
                <div className="relative h-full w-full flex items-center justify-center">
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={count}
                      initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)", transition: { duration: 0.8, ease: "easeInOut" } }}
                      className="text-white text-[150px] md:text-[250px] font-display font-light tracking-tighter leading-none"
                    >
                      {count > 0 ? count : ""}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
