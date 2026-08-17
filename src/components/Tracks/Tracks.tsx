import { tracks } from '../../data/content';
import TrackCard from './TrackCard';
import { motion } from 'motion/react';
import SpotlightCard from '../ui/SpotlightCard';
import { Sparkle, Lightning } from '@phosphor-icons/react';

export default function Tracks() {
  return (
    <motion.section 
      id="tracks" 
      className="py-24 relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Background Elements - Hexagonal Tech-Hive */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617] pointer-events-none opacity-80" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/15 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/15 blur-[120px] rounded-full mix-blend-screen pointer-events-none translate-x-1/4 -translate-y-1/4" />
      
      {/* Animated Hex Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-hex-hive opacity-40 mix-blend-screen" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 }
            }
          }}
          className="flex flex-col items-center text-center mb-10 md:mb-14"
        >
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} 
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-400 font-sans text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Lightning weight="duotone" className="w-3.5 h-3.5 text-emerald-400" />
            <span>Competitive Events</span>
          </motion.div>

          <motion.h2 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} 
            className="font-display text-3xl sm:text-4xl md:text-[44px] font-bold text-white tracking-tight mb-4"
          >
            Competitive Tracks
          </motion.h2>

          <motion.p 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} 
            className="font-sans text-sm sm:text-base !text-white/80 max-w-2xl leading-relaxed"
          >
            Choose your battlefield. Engage in high-stakes problem solving, pitch your best ideas, 
            or showcase your research.
          </motion.p>
        </motion.div>

        {/* Tracks Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {tracks.map((track) => (
            <motion.div 
              key={track.competitionId.trim()} 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="h-full"
            >
              <TrackCard {...track} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </motion.section>
  );
}