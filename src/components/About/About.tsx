import { useEffect, useState } from 'react';
import { getLiveStats } from '../../lib/registrationApi';
import { stats as initialStats } from '../../data/content';
import { motion } from 'motion/react';
import SpotlightCard from '../ui/SpotlightCard';

export default function About() {
  const [liveStats, setLiveStats] = useState(initialStats);

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await getLiveStats();
        setLiveStats(current => current.map(stat => {
          if (stat.key === 'colleges') return { ...stat, value: data.colleges?.toString() || stat.value };
          if (stat.key === 'registrations') return { ...stat, value: data.registrations?.toString() || stat.value };
          return stat;
        }));
      } catch (e) {
        console.error('Failed to fetch stats', e);
      }
    }
    fetchStats();
  }, []);

  return (
    <motion.section 
      id="about" 
      className="py-24 relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-[url('/about-sec-bg.webp')] bg-cover bg-center opacity-30 mix-blend-screen" />
      
      {/* Blend edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05080A] via-transparent to-[#05080A] z-0 pointer-events-none" />

      {/* Subtle section glow */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
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
            className="flex flex-col gap-6"
          >
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="inline-flex px-3 py-1 rounded-full bg-deep text-primary font-sans text-[11px] font-medium uppercase tracking-[0.05em] self-start">
              About the Fest
            </motion.div>
            <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="font-display text-4xl md:text-[44px] font-medium tracking-[-0.01em]">
              Where Ideas <br/><span className="text-white/50">Meet Execution</span>
            </motion.h2>
            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="font-sans text-base text-white/70 leading-[1.6]">
              Innovatrium '26 is the flagship technical fest of IEEE SB Brindavan College of Engineering. 
              Spanning across two days, it brings together students from various colleges to learn, 
              innovate, and compete.
            </motion.p>
            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="font-sans text-base text-white/70 leading-[1.6]">
              Day 1 features an exclusive hands-on workshop led by industry experts. Day 2 is action-packed 
              with competitive tracks designed to test your technical mettle and creative problem-solving skills.
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
            className="grid grid-cols-2 gap-4"
          >
            {liveStats.map((stat, idx) => (
              <motion.div 
                key={idx} 
                variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }}
                className={idx === 2 ? 'col-span-2 sm:col-span-1' : ''}
              >
                <SpotlightCard 
                  className={`h-full p-4 sm:p-6 flex flex-col justify-between gap-4 sm:gap-6 !bg-transparent bg-gradient-to-b from-white/[0.02] to-primary/[0.2] border border-white/5 border-t-white/15 border-l-white/10 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_24px_48px_rgba(255,255,255,0.02),0_8px_32px_rgba(0,0,0,0.5)] rounded-2xl ${stat.isPrize ? '!to-reserved/[0.2] border-t-reserved/30 border-l-reserved/20' : ''}`}
                  spotlightColor={stat.isPrize ? "rgba(245, 158, 11, 0.3)" : "rgba(59, 130, 246, 0.3)"}
                >
                  <div className="font-sans text-[11px] sm:text-[13px] font-medium text-white/80 tracking-wide self-start uppercase">
                    {stat.label}
                  </div>
                  <div className={`font-mono text-4xl md:text-5xl lg:text-4xl xl:text-5xl tracking-tight font-bold self-center my-auto w-full text-center ${stat.isPrize ? 'bg-gradient-to-b from-white via-reserved to-orange-900 text-transparent bg-clip-text drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]' : 'bg-gradient-to-b from-white via-primary to-blue-900 text-transparent bg-clip-text drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]'}`}>
                    {stat.value}
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
            <motion.div 
              variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }}
              className="col-span-2 sm:col-span-1"
            >
              <SpotlightCard 
                className="h-full p-4 sm:p-6 flex flex-col justify-between gap-4 sm:gap-6 !bg-transparent bg-gradient-to-b from-white/[0.02] to-[#22c55e]/[0.2] border border-white/5 border-t-white/15 border-l-white/10 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_24px_48px_rgba(255,255,255,0.02),0_8px_32px_rgba(0,0,0,0.5)] rounded-2xl" 
                spotlightColor="rgba(34, 197, 94, 0.3)"
              >
                <div className="font-sans text-[11px] sm:text-[13px] font-medium text-white/80 tracking-wide self-start uppercase">
                  Action Packed Days
                </div>
                <div className="font-mono text-4xl md:text-5xl lg:text-4xl xl:text-5xl tracking-tight font-bold self-center my-auto w-full text-center bg-gradient-to-b from-white via-[#22c55e] to-green-900 text-transparent bg-clip-text drop-shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                  2
                </div>
              </SpotlightCard>
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </motion.section>
  );
}
