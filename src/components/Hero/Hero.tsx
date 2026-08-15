import { useEffect, useState } from 'react';
import { ArrowRight, CalendarBlank, MapPin, Trophy, Users, Buildings, Sparkle } from '@phosphor-icons/react';
import { motion } from 'motion/react';
import Countdown from '../Registration/Countdown';
import { registration } from '../../data/content';
import { getLiveStats } from '../../lib/registrationApi';
import WaveShader from './WaveShader';

export default function Hero({ isLoading = false }: { isLoading?: boolean }) {
  const [mousePos, setMousePos] = useState({ x: 500, y: 500 });
  const [isHovered, setIsHovered] = useState(false);

  // Update mouse position for the spotlight reveal
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ 
      x: e.clientX - rect.left, 
      y: e.clientY - rect.top 
    });
  };

  return (
    <section 
      id="home" 
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative isolate min-h-[100svh] overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center justify-center bg-[#030712]"
    >
      {/* --- WEBGL SHADER BACKGROUND --- */}
      <div className="absolute top-0 left-0 w-full h-[100svh] z-0 overflow-hidden pointer-events-none">
        
        {/* The Three.js Canvas */}
        <WaveShader />

        {/* 
            Interactive Spotlight Overlay:
            Creates a transparent hole at the cursor's location, revealing the shader.
            Reduced darkness to make the background much brighter.
        */}
        <div 
          className="absolute inset-0 transition-all duration-300 ease-out z-10"
          style={{
            background: isHovered 
              ? `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, transparent 15%, rgba(3, 7, 18, 0.4) 65%, rgba(3, 7, 18, 0.8) 100%)`
              : `radial-gradient(circle at center, transparent 0%, rgba(3, 7, 18, 0.4) 70%, rgba(3, 7, 18, 0.8) 100%)`
          }}
        />
        
        {/* Abstract Grid Overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 mix-blend-overlay z-10 pointer-events-none" />

        {/* Base bottom fade to ensure the countdown card never loses contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/40 to-transparent opacity-60 z-20 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 pointer-events-auto">
        <motion.div 
          initial="hidden"
          animate={isLoading ? "hidden" : "visible"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.2 }
            }
          }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
        >
          {/* --- LEFT COLUMN: Event Details --- */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
            
            {/* Host Badge */}
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold backdrop-blur-sm shadow-md"
            >
              <Sparkle weight="duotone" className="w-3.5 h-3.5 animate-pulse text-emerald-300" />
              <span>Presented by IEEE SB Brindavan</span>
            </motion.div>

            {/* Title */}
            <motion.h1 
              variants={{ hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0 } }}
              className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05] drop-shadow-2xl"
            >
              Innovatrium <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-teal-200">'26</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="text-base sm:text-lg text-gray-200 max-w-xl font-sans leading-relaxed drop-shadow-md"
            >
              A 2-day immersive technology fest. Engage in hands-on workshops, 
              innovative tracks, and collaborate with the brightest minds.
            </motion.p>

            {/* Meta Tags */}
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} 
              className="flex flex-wrap justify-center lg:justify-start gap-2.5 font-sans text-xs sm:text-sm font-medium"
            >
              <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-[#030712]/70 px-3.5 py-2 backdrop-blur-sm text-gray-200 shadow-sm">
                <CalendarBlank weight="duotone" className="w-4 h-4 text-blue-400" />
                <span>2 Days Event</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-[#030712]/70 px-3.5 py-2 backdrop-blur-sm text-gray-200 shadow-sm">
                <MapPin weight="duotone" className="w-4 h-4 text-emerald-400" />
                <span>Brindavan College</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/20 px-3.5 py-2 backdrop-blur-sm text-emerald-300 font-semibold shadow-md">
                <Trophy weight="duotone" className="w-4 h-4 text-emerald-400" />
                <span>Prize Pool: ₹30,000+</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} 
              className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto pt-2"
            >
              <a 
                href="#register" 
                className="group flex w-full sm:w-auto items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 text-white font-semibold text-sm px-8 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
              >
                <span>Register Now</span>
                <ArrowRight weight="duotone" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a 
                href="#tracks" 
                className="flex w-full sm:w-auto items-center justify-center gap-2 border border-white/20 bg-[#030712]/70 hover:bg-white/10 text-gray-200 font-medium text-sm px-6 py-3.5 rounded-xl backdrop-blur-sm transition-all duration-200"
              >
                Explore Tracks
              </a>
            </motion.div>

          </div>

          {/* --- RIGHT COLUMN: Live Activity & Countdown Glass Card --- */}
          <motion.div 
            variants={{ hidden: { opacity: 0, scale: 0.95, y: 20 }, visible: { opacity: 1, scale: 1, y: 0 } }}
            className="lg:col-span-5 w-full max-w-md mx-auto"
          >
            <div className="relative rounded-3xl border border-white/20 bg-[#030712]/80 p-6 sm:p-7 backdrop-blur-md shadow-2xl hover:border-emerald-500/40 transition-colors duration-300">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-200 tracking-wider uppercase">Event Registration</span>
                </div>
                <span className="text-xs text-gray-400">
                  Closes {new Date(registration.closesAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </span>
              </div>

              {/* Countdown Component */}
              <div className="pt-2">
                <div className="text-xs text-gray-300 text-center mb-3 font-medium">Registration Closes In</div>
                <Countdown targetDate={registration.closesAt} />
              </div>

            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}