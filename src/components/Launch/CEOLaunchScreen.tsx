import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Power } from '@phosphor-icons/react';

export default function CEOLaunchScreen({ onComplete }: { onComplete?: () => void }) {
  const [isMounted, setIsMounted] = useState(false);
  const [phase, setPhase] = useState<'booting' | 'standby' | 'playing_video' | 'launched'>('booting');

  // Hidden hotkey to reset (Ctrl + Shift + R)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'r') {
        sessionStorage.removeItem('site_launched');
        setPhase('booting');
        // Retrigger boot sequence
        setTimeout(() => setPhase('standby'), 3500);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const hasLaunched = sessionStorage.getItem('site_launched');
    if (hasLaunched) {
      setPhase('launched');
    } else {
      // Trigger cinematic boot sequence on first load
      setTimeout(() => setPhase('standby'), 3500);
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

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {phase !== 'launched' && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black overflow-hidden select-none"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] } 
          }}
        >
          {/* Extremely subtle ambient glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.03)_0%,transparent_70%)] pointer-events-none" />

          {/* Phase 0: Cinematic Booting Sequence */}
          <AnimatePresence>
            {phase === 'booting' && (
              <motion.div
                key="booting"
                className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                exit={{ opacity: 0, filter: "blur(10px)", transition: { duration: 0.8 } }}
              >
                {/* Vertical Laser Cut */}
                <motion.div 
                  className="absolute w-[2px] h-full bg-cyan-500 shadow-[0_0_30px_#0ff]"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 1, ease: "circOut" }}
                />
                {/* Horizontal Laser Cut */}
                <motion.div 
                  className="absolute w-full h-[2px] bg-cyan-500 shadow-[0_0_30px_#0ff]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.8, ease: "circOut" }}
                />
                
                {/* Center Node Ignition */}
                <motion.div 
                  className="absolute w-4 h-4 bg-white rounded-full shadow-[0_0_40px_#fff]"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 5, 0] }}
                  transition={{ duration: 1.2, delay: 1.8, ease: "easeInOut" }}
                />
                
                {/* Core Shockwave */}
                <motion.div 
                  className="absolute w-20 h-20 rounded-full border border-cyan-300 mix-blend-screen"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 10, opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, delay: 2, ease: "easeOut" }}
                />

                <motion.div
                  className="absolute bottom-20 text-cyan-500/50 font-mono text-[10px] tracking-[0.5em] uppercase"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0.5, 1, 0] }}
                  transition={{ duration: 2, delay: 1 }}
                >
                  Establishing Secure Uplink...
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Phase 1: Standby */}
          <AnimatePresence mode="wait">
            {phase === 'standby' && (
              <motion.div
                key="standby"
                className="flex flex-col items-center justify-center w-full h-full relative z-10"
                initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 2, ease: "easeOut" } }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)", transition: { duration: 0.5, ease: "easeInOut" } }}
              >
                {/* Fullscreen Video Background for Standby */}
                <video 
                  src="/vid 2.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="absolute inset-0 w-full h-full object-cover opacity-50 z-0 pointer-events-none mix-blend-screen" 
                />

                {/* Background Circuit Pulsing Lines */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40 mix-blend-screen">
                  {/* Left to Center */}
                  <div className="absolute top-1/2 left-0 w-1/2 h-[1px] bg-gradient-to-r from-transparent to-cyan-500/30">
                    <motion.div 
                      className="w-32 h-full bg-white shadow-[0_0_15px_#0ff]" 
                      animate={{ x: ['-20vw', '50vw'] }} 
                      transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }} 
                    />
                  </div>
                  {/* Right to Center */}
                  <div className="absolute top-1/2 right-0 w-1/2 h-[1px] bg-gradient-to-l from-transparent to-cyan-500/30">
                    <motion.div 
                      className="w-32 h-full bg-white shadow-[0_0_15px_#0ff]" 
                      animate={{ x: ['20vw', '-50vw'] }} 
                      transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }} 
                    />
                  </div>
                  {/* Top to Center */}
                  <div className="absolute top-0 left-1/2 w-[1px] h-1/2 bg-gradient-to-b from-transparent to-cyan-500/30">
                    <motion.div 
                      className="w-full h-32 bg-white shadow-[0_0_15px_#0ff]" 
                      animate={{ y: ['-20vh', '50vh'] }} 
                      transition={{ duration: 2.5, delay: 1.25, repeat: Infinity, ease: "linear" }} 
                    />
                  </div>
                  {/* Bottom to Center */}
                  <div className="absolute bottom-0 left-1/2 w-[1px] h-1/2 bg-gradient-to-t from-transparent to-cyan-500/30">
                    <motion.div 
                      className="w-full h-32 bg-white shadow-[0_0_15px_#0ff]" 
                      animate={{ y: ['20vh', '-50vh'] }} 
                      transition={{ duration: 2.5, delay: 1.25, repeat: Infinity, ease: "linear" }} 
                    />
                  </div>
                  {/* Faint Grid */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none" />
                </div>

                {/* Minimalist Title */}
                <h1 className="text-white/90 text-sm md:text-base font-mono tracking-[1em] uppercase mb-16 ml-[1em] opacity-50 relative z-20">
                  Innovatrium '26
                </h1>

                {/* Elegant Button */}
                <button
                  onClick={() => setPhase('playing_video')}
                  className="relative group flex items-center justify-center focus:outline-none w-28 h-28 rounded-full border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-700 ease-out z-20 bg-black/50 backdrop-blur-sm"
                >
                  {/* Idle Button Pulse */}
                  <div className="absolute inset-0 rounded-full border border-cyan-400/30 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
                  {/* Subtle Inner Glow */}
                  <div className="absolute inset-0 rounded-full bg-cyan-400/0 group-hover:bg-cyan-400/10 transition-colors duration-700 shadow-[inset_0_0_20px_rgba(34,211,238,0)] group-hover:shadow-[inset_0_0_20px_rgba(34,211,238,0.5)]" />
                  <Power weight="light" className="w-10 h-10 text-cyan-500/50 group-hover:text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0)] group-hover:drop-shadow-[0_0_15px_rgba(34,211,238,0.8)] transition-all duration-700" />
                </button>
                
                {/* Minimalist instruction */}
                <div className="absolute bottom-12 text-cyan-500/30 text-[10px] font-mono tracking-[0.4em] uppercase z-20">
                  System Awaiting Input
                </div>
              </motion.div>
            )}

            {/* Phase 2: Playing Fullscreen Video with Audio */}
            {phase === 'playing_video' && (
              <motion.div
                key="playing_video"
                className="absolute inset-0 z-50 bg-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <video 
                  src="/vid 1.mp4" 
                  autoPlay 
                  playsInline
                  controls={false}
                  className="w-full h-full object-cover" 
                  onEnded={() => {
                    sessionStorage.setItem('site_launched', 'true');
                    setPhase('launched');
                    if (onComplete) onComplete();
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
