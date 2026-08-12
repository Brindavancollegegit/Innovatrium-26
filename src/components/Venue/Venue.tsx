import { venue } from '../../data/content';
import { MapPin, CheckCircle2, Navigation, Compass } from 'lucide-react';
import { motion } from 'motion/react';
import SpotlightCard from '../ui/SpotlightCard';

export default function Venue() {
  return (
    <motion.section 
      id="venue" 
      className="py-24 relative overflow-hidden bg-surface/50 border-y border-surface-border"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Background Enhancements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617] opacity-90 z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-map-dots opacity-20 mix-blend-overlay pointer-events-none" style={{ backgroundSize: '30px 30px', backgroundImage: 'radial-gradient(rgba(245, 158, 11, 0.4) 1px, transparent 1px)' }} />
      <div className="absolute top-1/2 left-0 w-[800px] h-[800px] rounded-full border border-amber-500/10 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] rounded-full border border-amber-500/10 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-amber-500/5 blur-[80px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
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
            className="lg:col-span-5 flex flex-col justify-center gap-8"
          >
            <div>
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-deep text-reserved font-sans text-[11px] font-medium uppercase tracking-[0.05em] mb-6 border border-reserved/20">
                <Compass className="w-3 h-3" /> Location
              </motion.div>
              <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="font-display text-4xl md:text-[56px] font-medium tracking-[-0.01em] mb-4 leading-[1.1]">
                Venue & <br className="hidden md:block" />Facilities
              </motion.h2>
              <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="font-sans text-lg text-white/70 leading-[1.6] mt-4">
                Experience two days of innovation in a space designed for creativity and collaboration.
              </motion.p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <SpotlightCard className="h-full p-8 md:p-12 border-white/10" spotlightColor="rgba(245, 158, 11, 0.15)">
              <div className="flex flex-col md:flex-row gap-8 items-start h-full">
                <div className="flex-1">
                  <div className="flex items-center gap-3 text-reserved mb-4">
                    <MapPin className="w-6 h-6" />
                    <span className="font-sans text-sm font-medium uppercase tracking-widest">Basecamp</span>
                  </div>
                  <h3 className="font-sans text-2xl md:text-[28px] font-medium leading-[1.4] mb-6">{venue.name}</h3>
                  <p className="font-sans text-sm text-white/50 mb-8 max-w-sm">Strategic location with fully equipped labs, auditoriums, and collaborative workspaces.</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                    {venue.facilities.map((facility, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-reserved/10 flex items-center justify-center shrink-0 border border-reserved/20">
                          <CheckCircle2 className="w-3 h-3 text-reserved" />
                        </div>
                        <span className="font-sans text-[14px] font-medium text-white/80">{facility}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <a 
                  href="https://www.google.com/maps/dir/13.007948,77.5054171/Brindavan+College+of+Engineering,+Bagalur+Main+Rd,+Dwarka+Nagar,+Dwarakanagar,+Yelahanka,+Bengaluru,+Karnataka+560063"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:w-48 aspect-square md:aspect-[3/4] relative rounded-lg overflow-hidden border border-white/10 bg-black/50 shrink-0 flex items-center justify-center group"
                >
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 mix-blend-luminosity transition-transform duration-500 group-hover:scale-110"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                  <div className="relative z-10 flex flex-col items-center gap-2 text-white/60 group-hover:text-white transition-colors cursor-pointer">
                    <Navigation className="w-8 h-8 text-amber-500 group-hover:-translate-y-1 transition-transform" />
                    <span className="font-sans text-[11px] font-medium uppercase tracking-[0.05em]">Get Directions</span>
                  </div>
                </a>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
