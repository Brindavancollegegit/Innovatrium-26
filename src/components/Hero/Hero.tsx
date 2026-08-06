import { useEffect, useState } from 'react';
import { ArrowRight, Calendar, MapPin, Trophy, Users, Building2, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import Countdown from '../Registration/Countdown';
import { registration } from '../../data/content';
import { getLiveStats } from '../../lib/registrationApi';
import WaveShader from './WaveShader';

export default function Hero({ isLoading = false }: { isLoading?: boolean }) {
  const [liveStats, setLiveStats] = useState({ registrations: 0, colleges: 0 });
  const [mousePos, setMousePos] = useState({ x: 500, y: 500 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let mounted = true;
    getLiveStats().then((result: any) => {
      if (!mounted) return;
      setLiveStats({ 
        registrations: result.registrations || 0, 
        colleges: result.colleges || 0 
      });
    });

    return () => {
      mounted = false;
    };
  }, []);

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
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        
        {/* The Three.js Canvas */}
        <WaveShader />

        {/* 
            Interactive Spotlight Overlay:
            Creates a transparent hole at the cursor's location, revealing the shader.
            Fades to a dark solid color at the edges to maintain text readability.
        */}
        <div 
          className="absolute inset-0 transition-all duration-300 ease-out"
          style={{
            background: isHovered 
              ? `radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, transparent 15%, rgba(3, 7, 18, 0.85) 65%, #030712 100%)`
              : `radial-gradient(circle at center, rgba(3, 7, 18, 0.4) 0%, rgba(3, 7, 18, 0.85) 70%, #030712 100%)`
          }}
        />
        
        {/* Base bottom fade to ensure the countdown card never loses contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-90" />
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
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold backdrop-blur-md shadow-lg"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-emerald-300" />
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
              <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-[#030712]/60 px-3.5 py-2 backdrop-blur-md text-gray-200 shadow-sm">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span>2 Days Event</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-[#030712]/60 px-3.5 py-2 backdrop-blur-md text-gray-200 shadow-sm">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Brindavan College</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/20 px-3.5 py-2 backdrop-blur-md text-emerald-300 font-semibold shadow-md">
                <Trophy className="w-4 h-4 text-emerald-400" />
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
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a 
                href="#tracks" 
                className="flex w-full sm:w-auto items-center justify-center gap-2 border border-white/20 bg-[#030712]/60 hover:bg-white/10 text-gray-200 font-medium text-sm px-6 py-3.5 rounded-xl backdrop-blur-md transition-all duration-200"
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
            <div className="relative rounded-3xl border border-white/20 bg-[#030712]/60 p-6 sm:p-7 backdrop-blur-2xl shadow-2xl hover:border-emerald-500/40 transition-colors duration-300">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-semibold text-gray-200 tracking-wider uppercase">Live Activity</span>
                </div>
                <span className="text-xs text-gray-400">
                  Closes {new Date(registration.closesAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </span>
              </div>

              {/* Live Statistics */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 text-blue-400 text-xs font-medium mb-1">
                    <Users className="w-3.5 h-3.5" />
                    <span>Registrations</span>
                  </div>
                  <div className="font-display text-2xl font-bold text-white">
                    {liveStats.registrations}+
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-medium mb-1">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Colleges</span>
                  </div>
                  <div className="font-display text-2xl font-bold text-white">
                    {liveStats.colleges}
                  </div>
                </div>
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