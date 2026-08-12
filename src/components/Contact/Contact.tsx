import { coordinators } from '../../data/content';
import { Mail, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import SpotlightCard from '../ui/SpotlightCard';

export default function Contact() {
  return (
    <motion.section 
      id="contact" 
      className="py-24 relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Background Enhancements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617] opacity-90 z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-500/10 blur-[120px] rounded-[100%] pointer-events-none" />
      
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
          <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="font-display text-4xl md:text-[44px] font-medium tracking-[-0.01em] mb-4">
            Need Assistance?
          </motion.h2>
          <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="font-sans text-base text-white/70 max-w-2xl leading-[1.6]">
            Have questions about tracks, accommodation, or the registration process? 
            Reach out to our core coordinators.
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
          className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {coordinators.map((coordinator, idx) => (
            <motion.div key={idx} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <SpotlightCard className="h-full p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6" spotlightColor="rgba(255, 255, 255, 0.1)">
                <div>
                  <h3 className="font-sans text-[18px] md:text-[20px] font-medium mb-1">{coordinator.name}</h3>
                  <p className="font-sans text-[11px] font-medium uppercase tracking-[0.05em] text-primary mb-4">{coordinator.role}</p>
                  <div className="flex flex-col gap-2">
                    <a href={`tel:${coordinator.phone.replace(/\s+/g, '')}`} className="inline-flex items-center gap-2 font-sans text-[14px] text-white/70 hover:text-white transition-colors">
                      <Phone className="w-4 h-4" /> {coordinator.phone}
                    </a>
                    <a href={`mailto:${coordinator.email}`} className="inline-flex items-center gap-2 font-sans text-[14px] text-white/70 hover:text-white transition-colors">
                      <Mail className="w-4 h-4" /> {coordinator.email}
                    </a>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
