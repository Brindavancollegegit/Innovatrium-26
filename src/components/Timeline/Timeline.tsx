import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { schedule } from '../../data/schedule';
import { 
  Sparkle, Clock, IdentificationCard, MicrophoneStage, 
  Laptop, Coffee, Code, ChatTeardropText, 
  UserCircle, Sword, PresentationChart, Trophy, 
  CheckCircle 
} from '@phosphor-icons/react';

const IconMap: Record<string, React.ElementType> = {
  'identification-card': IdentificationCard,
  'microphone-stage': MicrophoneStage,
  'laptop': Laptop,
  'coffee': Coffee,
  'code': Code,
  'chat-teardrop-text': ChatTeardropText,
  'user-circle': UserCircle,
  'sword': Sword,
  'presentation-chart': PresentationChart,
  'trophy': Trophy,
  'sparkle': Sparkle,
  'clock': Clock,
};

// ----------------------------------------------------------------------
// Individual Event Node with IntersectionObserver State
// ----------------------------------------------------------------------
function EventNode({ themeColorHex }: { themeColorHex: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" });

  return (
    <motion.div
      ref={ref}
      initial="upcoming"
      animate={isInView ? "entered" : "upcoming"}
      variants={{
        upcoming: {
          backgroundColor: "#030712",
          borderColor: "rgba(255,255,255,0.3)",
          scale: 1,
          boxShadow: "0px 0px 0px rgba(0,0,0,0)"
        },
        entered: {
          backgroundColor: themeColorHex,
          borderColor: "#ffffff",
          scale: [1, 1.35, 1],
          boxShadow: [
            "0px 0px 0px rgba(0,0,0,0)", 
            `0px 0px 24px ${themeColorHex}`, 
            `0px 0px 12px ${themeColorHex}`
          ],
          transition: { duration: 0.5, ease: "easeOut" }
        }
      }}
      className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full border-2 transform -translate-x-1/2 z-20 shadow-md"
    />
  );
}

// ----------------------------------------------------------------------
// Main Timeline Component
// ----------------------------------------------------------------------
export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  
  const dotY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const backgroundPositionY = useTransform(scrollYProgress, [0, 1], ["0px", "50px"]);

  return (
    <section id="timeline" className="py-24 relative overflow-hidden bg-[#030712]">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-[-10%] w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-1/4 left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none mix-blend-screen" />

      {/* CSS Dot-Grid Pattern */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.12) 1.5px, transparent 1.5px)',
          backgroundSize: '32px 32px',
          backgroundPositionY
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-cyan-200 font-sans text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm backdrop-blur-sm"
          >
            <Clock weight="duotone" className="w-4 h-4 text-cyan-300" />
            <span style={{ color: '#bae6fd' }}>Event Timeline</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-teal-200 to-emerald-200 tracking-tight"
          >
            Innovatrium '26
          </motion.h2>
        </div>

        {/* Timeline Container */}
        <div className="relative" ref={containerRef}>
          
          {/* Center Vertical Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] transform -translate-x-1/2 z-0">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <line x1="1" y1="0" x2="1" y2="100%" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
              <motion.line 
                x1="1" y1="0" x2="1" y2="100%" 
                stroke="url(#timelineGradient)" 
                strokeWidth="2.5"
                style={{ pathLength: scrollYProgress }} 
              />
              <defs>
                <linearGradient id="timelineGradient" x1="0" y1="0" x2="0" y2="100%">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Traveling Glow Head Node */}
          <motion.div 
            style={{ top: dotY }}
            className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_24px_rgba(255,255,255,1)] transform -translate-x-1/2 z-30"
          >
            <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
          </motion.div>

          {/* Events List */}
          <div className="relative z-10 space-y-24 pb-16 pt-8">
            {schedule.map((dayData, dayIdx) => {
              const isBlue = false;
              const themeText = isBlue ? 'text-cyan-200' : 'text-emerald-200';
              const themeBadgeBg = isBlue ? 'bg-cyan-500/15' : 'bg-emerald-500/15';
              const themeBorder = isBlue ? 'border-cyan-400/40' : 'border-emerald-400/40';
              const themeHex = isBlue ? '#38bdf8' : '#34d399';
              const themeGlow = isBlue ? 'hover:shadow-[0_0_35px_rgba(56,189,248,0.2)]' : 'hover:shadow-[0_0_35px_rgba(52,211,153,0.2)]';
              
              return (
                <div key={dayIdx} className="space-y-16">
                  
                  {/* Day Anchor Hub */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-100px' }}
                    className="flex items-center justify-start md:justify-center relative"
                  >
                    <div className={`absolute left-6 md:left-1/2 w-72 h-72 rounded-full ${isBlue ? 'bg-cyan-500/20' : 'bg-emerald-500/20'} blur-[90px] transform -translate-x-1/2 z-0 pointer-events-none`} />

                    <div className={`px-8 py-4 rounded-2xl ${themeBadgeBg} ${themeBorder} border backdrop-blur-md shadow-xl flex items-center gap-4 z-10 ml-14 md:ml-0 transition-transform hover:-translate-y-1`}>
                      <Sparkle weight="duotone" className={`w-8 h-8 ${themeText}`} />
                      <div>
                        <div style={{ color: '#ffffff' }} className="font-display font-bold text-2xl md:text-3xl tracking-tight">{dayData.day}</div>
                        <div style={{ color: isBlue ? '#67e8f9' : '#6ee7b7' }} className="text-xs font-mono uppercase tracking-widest font-semibold">{dayData.date}</div>
                      </div>
                    </div>
                    
                    <div className={`absolute left-6 md:left-1/2 w-8 h-8 rounded-full ${themeBadgeBg} border-2 ${themeBorder} transform -translate-x-1/2 z-0`} />
                  </motion.div>

                  {/* Day Events */}
                  <div className="space-y-12">
                    {dayData.events.map((evt, evtIdx) => {
                      const isLeft = evtIdx % 2 === 0;
                      const IconComponent = IconMap[evt.icon] || Sparkle;
                      const stepNumber = String(evtIdx + 1).padStart(2, '0');

                      return (
                        <div key={evtIdx} className="relative flex items-center w-full group">
                          
                          {/* ================= LEFT CARD / RIGHT BADGE ================= */}
                          {isLeft ? (
                            <>
                              {/* Left Content Card */}
                              <div className="w-full md:w-1/2 flex flex-row items-center pl-14 md:pl-0 pr-0 md:pr-8">
                                <motion.div 
                                  initial={{ opacity: 0, x: -30 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true, margin: '-50px' }}
                                  className={`flex-1 p-6 md:p-7 rounded-2xl bg-[#0b1329]/80 border border-white/15 transition-all duration-300 hover:bg-[#0f1b3b]/90 hover:border-cyan-400/50 hover:-translate-y-1 ${themeGlow} backdrop-blur-md shadow-xl md:text-right relative overflow-hidden`}
                                >
                                  <div className="absolute top-0 right-0 w-28 h-28 bg-cyan-400/10 rounded-full blur-xl pointer-events-none" />

                                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-500/15 border border-cyan-400/30 text-xs font-mono font-medium mb-3">
                                    <IconComponent weight="duotone" className="w-4 h-4 text-cyan-300" />
                                    <span style={{ color: '#a5f3fc' }}>{evt.time}</span>
                                  </div>

                                  <h4 style={{ color: '#ffffff' }} className="font-display font-bold text-xl md:text-2xl mb-2 tracking-tight">
                                    {evt.title}
                                  </h4>
                                  <p 
                                    style={{ color: '#cbd5e1' }} 
                                    className="!text-slate-300 text-sm md:text-base leading-relaxed font-normal opacity-100 whitespace-pre-line"
                                  >
                                    {evt.description}
                                  </p>
                                </motion.div>
                                
                                <div className="hidden md:block h-[2px] w-8 bg-gradient-to-r from-transparent to-cyan-400/40 shrink-0" />
                              </div>

                              {/* Right Opposite Filler */}
                              <div className="hidden md:flex md:w-1/2 items-center pl-8">
                                <motion.div 
                                  initial={{ opacity: 0, x: 20 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true }}
                                  className="flex items-center gap-4 select-none opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                                >
                                  <span className="font-mono text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white/60 to-white/20">
                                    {stepNumber}
                                  </span>
                                  <div className="flex flex-col gap-1 border-l border-white/20 pl-3">
                                    <div className="flex items-center gap-1.5 text-xs font-mono">
                                      <CheckCircle weight="bold" className="w-3.5 h-3.5 text-cyan-300" />
                                      <span style={{ color: '#67e8f9' }}>STAGE {stepNumber}</span>
                                    </div>
                                    <span style={{ color: '#94a3b8' }} className="text-[11px] font-sans tracking-wide">Main Track</span>
                                  </div>
                                </motion.div>
                              </div>
                            </>
                          ) : (
                            /* ================= LEFT BADGE / RIGHT CARD ================= */
                            <>
                              {/* Left Opposite Filler */}
                              <div className="hidden md:flex md:w-1/2 items-center justify-end pr-8">
                                <motion.div 
                                  initial={{ opacity: 0, x: -20 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true }}
                                  className="flex items-center flex-row-reverse gap-4 select-none opacity-40 group-hover:opacity-100 transition-opacity duration-300 text-right"
                                >
                                  <span className="font-mono text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-white/60 to-white/20">
                                    {stepNumber}
                                  </span>
                                  <div className="flex flex-col gap-1 border-r border-white/20 pr-3">
                                    <div className="flex items-center justify-end gap-1.5 text-xs font-mono">
                                      <span style={{ color: '#6ee7b7' }}>STAGE {stepNumber}</span>
                                      <CheckCircle weight="bold" className="w-3.5 h-3.5 text-emerald-300" />
                                    </div>
                                    <span style={{ color: '#94a3b8' }} className="text-[11px] font-sans tracking-wide">Main Track</span>
                                  </div>
                                </motion.div>
                              </div>

                              {/* Right Content Card */}
                              <div className="w-full md:w-1/2 flex flex-row items-center pl-14 md:pl-8 pr-0">
                                <div className="hidden md:block h-[2px] w-8 bg-gradient-to-l from-transparent to-emerald-400/40 shrink-0" />
                                
                                <motion.div 
                                  initial={{ opacity: 0, x: 30 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true, margin: '-50px' }}
                                  className={`flex-1 p-6 md:p-7 rounded-2xl bg-[#0b1329]/80 border border-white/15 transition-all duration-300 hover:bg-[#0f1b3b]/90 hover:border-emerald-400/50 hover:-translate-y-1 ${themeGlow} backdrop-blur-md shadow-xl text-left relative overflow-hidden`}
                                >
                                  <div className="absolute top-0 left-0 w-28 h-28 bg-emerald-400/10 rounded-full blur-xl pointer-events-none" />

                                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/15 border border-emerald-400/30 text-xs font-mono font-medium mb-3">
                                    <IconComponent weight="duotone" className="w-4 h-4 text-emerald-300" />
                                    <span style={{ color: '#a7f3d0' }}>{evt.time}</span>
                                  </div>

                                  <h4 style={{ color: '#ffffff' }} className="font-display font-bold text-xl md:text-2xl mb-2 tracking-tight">
                                    {evt.title}
                                  </h4>
                                  <p 
                                    style={{ color: '#cbd5e1' }} 
                                    className="!text-slate-300 text-sm md:text-base leading-relaxed font-normal opacity-100 whitespace-pre-line"
                                  >
                                    {evt.description}
                                  </p>
                                </motion.div>
                              </div>
                            </>
                          )}

                          {/* Center Node Dot */}
                          <EventNode themeColorHex={themeHex} />
                          
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}