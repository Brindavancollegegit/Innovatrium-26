import { motion } from 'motion/react';
import { Play } from 'lucide-react';

export default function VideoSection() {
  return (
    <motion.section 
      id="video" 
      className="py-24 relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Dynamic Geometric Orbs */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617] opacity-80 z-0 pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none mix-blend-overlay" />

      <div className="max-w-5xl mx-auto px-4 md:px-8 relative z-10">
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
          className="flex flex-col items-center text-center mb-12"
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="inline-flex px-3 py-1 rounded-full bg-deep text-primary font-sans text-[11px] font-medium uppercase tracking-[0.05em] mb-4">
            Teaser
          </motion.div>
          <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="font-display text-4xl md:text-[44px] font-medium tracking-[-0.01em] mb-4">
            Experience Innovatrium
          </motion.h2>
          <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="font-sans text-base text-white/70 max-w-2xl leading-[1.6]">
            Get a glimpse of the energy, innovation, and excitement that awaits you.
          </motion.p>
        </motion.div>

        {/* Video Card Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="w-full aspect-video rounded-2xl overflow-hidden relative group border border-white/10 shadow-2xl bg-surface"
        >
          {/* REPLACE THIS DIV WITH YOUR <video> OR <iframe> TAG */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80')] bg-cover bg-center">
             <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-all duration-500 group-hover:bg-black/40 group-hover:backdrop-blur-none" />
             <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-transform duration-300 group-hover:scale-110 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                  <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
               </div>
             </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
