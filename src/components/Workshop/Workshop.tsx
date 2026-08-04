import { speakers } from '../../data/speakers';
import SpeakerCard from './SpeakerCard';
import { motion } from 'motion/react';

export default function Workshop() {
  return (
    <motion.section 
      id="workshop" 
      className="py-24 relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Subtle section glow */}
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
            Day 1
          </motion.div>
          <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="font-display text-4xl md:text-[44px] font-medium tracking-[-0.01em] mb-4">
            Hands-on Workshop
          </motion.h2>
          <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="font-sans text-base text-white/70 max-w-2xl leading-[1.6]">
            Kick off the fest with an exclusive, deeply technical workshop led by industry experts.
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
          className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          {speakers.map((speaker) => (
            <motion.div key={speaker.id} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <SpeakerCard {...speaker} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
