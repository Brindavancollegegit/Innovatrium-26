import { tracks } from '../../data/content';
import TrackCard from './TrackCard';
import { motion } from 'motion/react';
import SpotlightCard from '../ui/SpotlightCard';

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
      {/* Subtle section glow */}
      <div className="absolute bottom-0 left-[-200px] w-[800px] h-[800px] bg-[#22C55E]/5 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
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
          className="flex flex-col items-center text-center mb-16"
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="inline-flex px-3 py-1 rounded-full bg-deep text-primary font-sans text-[11px] font-medium uppercase tracking-[0.05em] mb-4">
            Day 2
          </motion.div>
          <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="font-display text-4xl md:text-[44px] font-medium tracking-[-0.01em] mb-4">
            Competitive Tracks
          </motion.h2>
          <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="font-sans text-base text-white/70 max-w-2xl leading-[1.6]">
            Choose your battlefield. Engage in high-stakes problem solving, pitch your best ideas, 
            or showcase your research.
          </motion.p>
        </motion.div>

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
            <motion.div key={track.competitionId} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <TrackCard {...track} />
            </motion.div>
          ))}
          
          {/* Placeholder for future tracks */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <SpotlightCard className="h-full p-8 flex flex-col items-center justify-center text-center border-dashed border-white/20" spotlightColor="rgba(255, 255, 255, 0.05)">
              <h3 className="font-sans text-[18px] md:text-[20px] font-medium text-white/40 mb-2">More Tracks</h3>
              <p className="font-sans text-[14px] text-white/30">Revealing soon...</p>
            </SpotlightCard>
          </motion.div>
        </motion.div>

      </div>
    </motion.section>
  );
}
