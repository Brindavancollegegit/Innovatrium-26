import { useEffect, useState } from 'react';
import { ArrowRight, CalendarBlank, MapPin, Trophy, Users, Buildings, Sparkle, CalendarPlus } from '@phosphor-icons/react';
import { motion } from 'motion/react';
import Countdown from '../Registration/Countdown';
import { registration } from '../../data/content';
import { schedule } from '../../data/schedule';
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

  // Derive date from schedule.ts
  const eventDateStr = schedule[0]?.date || 'Sept 16, 2026';
  const eventMonth = eventDateStr.split(' ')[0].toUpperCase();
  const eventDayNum = eventDateStr.split(' ')[1]?.replace(',', '');
  const year = eventDateStr.split(', ')[1] || '2026';

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

        {/* Interactive Spotlight Overlay */}
        <div 
          className="absolute inset-0 transition-all duration-300 ease-out z-10 hidden sm:block"
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
        
        {/* Seamless bottom edge blend into the next section */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#030712] via-[#030712]/80 to-transparent z-20 pointer-events-none translate-y-[1px]" />
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
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-6 lg:gap-8 w-full z-20">
            
            {/* Group: Date & Title (Tighter Gap) */}
            <div className="flex flex-col items-center lg:items-start gap-4 w-full">
              {/* 1. Date Stamp */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md font-mono text-xs sm:text-sm font-bold text-slate-300 tracking-widest uppercase shadow-xl"
              >
                <span className="text-emerald-400">DATE &bull;</span> {eventMonth} {eventDayNum}, {year}
              </motion.div>

              {/* 2. Title with Subtle Grid BG */}
              <motion.div 
                variants={{ hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0 } }}
                className="relative w-full flex justify-center lg:justify-start"
              >
                <div className="absolute -inset-10 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none z-0 hidden sm:block" />
                <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05] drop-shadow-2xl relative z-10">
                  Innovatrium <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-teal-200">'26</span>
                </h1>
              </motion.div>
            </div>

            {/* 3. Shortened Punchy Description */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="flex flex-col items-center lg:items-start gap-3 w-full"
            >
              <h2 className="text-lg sm:text-2xl font-black text-white tracking-widest uppercase opacity-90 leading-snug">
                Bengaluru's Inter-College<br className="hidden lg:block" /> Tech Showdown
              </h2>
              
              <p className="!text-white max-w-xl text-sm sm:text-base leading-relaxed hidden sm:block font-medium drop-shadow-md">
                Step out of the classroom and into the arena.
              </p>
              
              <p className="!font-black !text-transparent !bg-clip-text !bg-gradient-to-r !from-blue-200 via-white !to-emerald-200 !tracking-[0.2em] text-sm sm:text-base mt-1 drop-shadow-lg text-center lg:text-left">
                BUILD | DEFEND | INNOVATE | WIN
              </p>
            </motion.div>

            {/* 4. Action Buttons & Prize Pool */}
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} 
              className="flex flex-col items-center lg:items-start gap-4 w-full mt-4"
            >
              {/* Row for Register & Prize Pool */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                <a 
                  href="#register" 
                  className="group flex w-full sm:w-auto items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 text-white font-bold text-sm sm:text-base px-10 py-4 rounded-xl transition-all duration-200 shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] hover:-translate-y-1 uppercase tracking-wider border !border-white/10"
                >
                  <span>Register Now</span>
                  <ArrowRight weight="bold" className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>

                <div className="flex items-center gap-2 px-6 py-4 rounded-xl border border-yellow-400/50 bg-yellow-400/20 backdrop-blur-md !text-white font-black shadow-[0_0_20px_rgba(250,204,21,0.3)] relative overflow-hidden w-full sm:w-auto justify-center">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/30 to-yellow-400/0 animate-[shimmer_3s_infinite]" />
                  <Trophy weight="fill" className="w-5 h-5 text-yellow-300 relative z-10" />
                  <span className="!text-white text-sm sm:text-base tracking-wide relative z-10 drop-shadow-md whitespace-nowrap">₹30,000+ Prize Pool</span>
                </div>
              </div>
              
              <a 
                href="#tracks" 
                className="group flex items-center justify-center gap-2 text-white font-semibold text-sm px-6 py-2 transition-all duration-200 drop-shadow-md mt-2"
              >
                Explore Tracks <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>

          </div>

          {/* --- RIGHT COLUMN: Live Activity & Countdown Glass Card --- */}
          <motion.div 
            variants={{ hidden: { opacity: 0, scale: 0.95, y: 20 }, visible: { opacity: 1, scale: 1, y: 0 } }}
            className="lg:col-span-5 w-full max-w-md mx-auto flex flex-col gap-5 relative z-20 mt-8 lg:mt-0"
          >
            <div className="relative rounded-3xl border border-white/20 bg-[#030712]/80 p-6 sm:p-7 backdrop-blur-md shadow-2xl hover:border-emerald-500/40 transition-colors duration-300">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-200 tracking-wider uppercase">Event Registration</span>
                </div>
                <span className="text-xs text-slate-400">
                  Closes {new Date(registration.closesAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </span>
              </div>

              {/* Countdown Component */}
              <div className="pt-2">
                <div className="text-xs text-slate-300 text-center mb-3 font-medium">Registration Closes In</div>
                <Countdown targetDate={registration.closesAt} />
              </div>

            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}