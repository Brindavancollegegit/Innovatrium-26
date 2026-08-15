import { useEffect, useState } from 'react';
import { getLiveStats } from '../../lib/registrationApi';
import { stats as initialStats } from '../../data/content';
import { motion } from 'motion/react';
import { CalendarBlank, Buildings, Trophy, Sparkle, ArrowUpRight } from '@phosphor-icons/react';

export default function About() {
  const prizeStat = initialStats.find((s) => s.isPrize || s.key === 'prize');

  return (
    <motion.section
      id="about"
      className="py-24 relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Background Image Replacement - Fluid Aurora Mesh */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-fluid-mesh mix-blend-screen opacity-80" />
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full translate-x-1/4 -translate-y-1/4 mix-blend-screen" />
        <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full -translate-x-1/4 translate-y-1/4 mix-blend-screen" />
        
        {/* Soft edge fading to blend with adjacent sections */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617] opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* --- LEFT COLUMN: Editorial Content --- */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
            }}
            className="lg:col-span-6 flex flex-col gap-6"
          >
            <motion.div
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/25 text-blue-300 font-sans text-xs font-semibold uppercase tracking-wider self-start"
            >
              <Sparkle weight="duotone" className="w-3.5 h-3.5 text-blue-400" />
              <span>About The Fest</span>
            </motion.div>

            <motion.h2
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
              className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.15]"
            >
              Where Ideas <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-white">
                Meet Execution
              </span>
            </motion.h2>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
              className="font-sans text-base text-slate-200 leading-relaxed font-normal"
            >
              Innovatrium '26 is the flagship technical fest organized by IEEE SB Brindavan College of Engineering. Over two intense days, top student minds converge to build, pitch, and compete.
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
              className="grid sm:grid-cols-2 gap-4 mt-2"
            >
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-blue-400/30 transition-colors">
                <div className="flex items-center gap-2 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  <CalendarBlank weight="duotone" className="w-4 h-4" />
                  Day 1
                </div>
                <h4 className="text-white font-semibold text-sm mb-1">Expert Workshop</h4>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Hands-on technical training sessions led by industry pioneers.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-blue-400/30 transition-colors">
                <div className="flex items-center gap-2 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  <Trophy weight="duotone" className="w-4 h-4" />
                  Day 2
                </div>
                <h4 className="text-white font-semibold text-sm mb-1">Competitive Tracks</h4>
                <p className="text-slate-300 text-xs leading-relaxed">
                  High-stakes competitions designed to challenge real-world problem solving.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* --- RIGHT COLUMN: Bento Metric Grid --- */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            className="lg:col-span-6 grid grid-cols-2 gap-4"
          >
            
            {/* --- ENHANCED PRIZE POOL CARD WITH GLOW AURA --- */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="col-span-2 relative group p-[1px] rounded-3xl overflow-hidden"
            >
              {/* Outer Ambient Multi-Color Glow Aura */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-500/30 via-amber-500/30 to-emerald-500/30 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* 1px Fine Rainbow Edge Border */}
              <div 
                className="absolute inset-0 rounded-3xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'linear-gradient(110deg, #3b82f6, #8b5cf6, #f59e0b, #10b981, #3b82f6)',
                }}
              />

              {/* Inner Card Backdrop with Radial Backlight */}
              <div className="relative h-[200px] sm:h-[220px] p-6 md:p-8 rounded-[23px] bg-[#080d14]/90 backdrop-blur-md z-10 overflow-hidden group/badge">
                
                {/* Backlight Spotlights behind Prize Amount */}
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-amber-500/20 blur-3xl rounded-full pointer-events-none group-hover:bg-amber-500/30 transition-all duration-500" />
                <div className="absolute top-0 left-0 w-48 h-48 bg-blue-500/10 blur-2xl rounded-full pointer-events-none" />

                {/* Large Trophy Illustration on Right */}
                <div className="absolute right-0 bottom-0 translate-x-4 sm:translate-x-8 translate-y-4 sm:translate-y-8 w-40 h-40 sm:w-56 sm:h-56 opacity-90 group-hover/badge:scale-110 group-hover/badge:-rotate-6 transition-transform duration-700 pointer-events-none z-0">
                  <img src="/trophy.webp" alt="Prize Trophy" className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(245,158,11,0.4)]" />
                </div>

                <div className="relative z-10 flex flex-col h-full justify-between max-w-[65%] sm:max-w-[60%]">
                  <div>
                    <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-amber-400 block mb-1">
                      {prizeStat?.label || 'Prize Pool'}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-[180px] sm:max-w-[220px]">Awarded across all competitive tracks</p>
                  </div>

                  {/* Glowing Text Amount */}
                  <div className="font-mono text-4xl sm:text-5xl font-bold text-white tracking-tight drop-shadow-[0_0_25px_rgba(245,158,11,0.3)]">
                    {prizeStat?.value || '₹30,000+'}
                  </div>
                </div>
              </div>
            </motion.div>


            {/* Event Duration Banner */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="col-span-2 p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-blue-400">
                  <CalendarBlank weight="duotone" className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">2 Action-Packed Days</p>
                  <p className="text-[11px] text-slate-300">Workshop & Competitions</p>
                </div>
              </div>
              <a
                href="#tracks"
                className="inline-flex items-center gap-1 text-xs font-medium text-blue-400 hover:text-white transition-colors"
              >
                Explore Tracks <ArrowUpRight weight="duotone" className="w-3.5 h-3.5" />
              </a>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}