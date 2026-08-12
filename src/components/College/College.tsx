import { college } from '../../data/content';
import { ExternalLink, MapPin, Building2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function College() {
  return (
    <motion.section 
      id="college" 
      className="py-24 relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Background Enhancements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617] opacity-90 z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-map-dots opacity-20 mix-blend-overlay pointer-events-none" style={{ backgroundSize: '30px 30px', backgroundImage: 'radial-gradient(rgba(59, 130, 246, 0.4) 1px, transparent 1px)' }} />
      <div className="absolute top-1/2 left-[-100px] w-[800px] h-[800px] rounded-full border border-blue-500/10 -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 left-[-100px] w-[600px] h-[600px] rounded-full border border-blue-500/10 -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 left-[-100px] -translate-y-1/2 w-[350px] h-[350px] bg-blue-600/10 blur-3xl opacity-30 pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-white/15 bg-[#080d14]/90 backdrop-blur-sm overflow-hidden shadow-2xl"
        >
          <div className="grid md:grid-cols-5 h-full">
            
            {/* Campus Image Section */}
            <div className="md:col-span-2 relative min-h-[300px] md:min-h-[420px] overflow-hidden group">
              <img 
                src="/brindavan-campas.webp" 
                alt="Brindavan College Campus" 
                loading="lazy" 
                decoding="async"
                width="600"
                height="420"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              
              {/* Soft Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent md:bg-gradient-to-r md:from-transparent md:to-slate-950/80" />
              
              {/* Floating Venue Badge */}
              <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900/80 border border-blue-400/30 backdrop-blur-sm">
                <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-300 shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-400">Host Campus</p>
                  <p className="text-xs font-medium text-white">Main Event Venue</p>
                </div>
              </div>

              {/* Accent Top Blue Bar */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 via-sky-400 to-transparent" />
            </div>
            
            {/* Details Section */}
            <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-between">
              <div>
                {/* Category Tag */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
                  Venue & Location
                </div>

                <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
                  {college.name}
                </h2>

                {/* Address with Location Icon */}
                <div className="flex items-start gap-2.5 !text-slate-100 font-sans text-sm md:text-base mb-6">
                  <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-1" />
                  <span>{college.address}</span>
                </div>
                
                {/* Quote / Positioning Block */}
                <div className="p-4 md:p-5 rounded-2xl !bg-white/[0.03] border border-white/10 border-l-4 border-l-blue-400 mb-8">
                  <p className="font-sans text-sm md:text-base leading-relaxed !text-slate-100 italic">
                    "{college.positioning}"
                  </p>
                </div>
              </div>

              {/* Action Button (Pure White Text on Hover) */}
              <div>
                <a 
                  href={college.website} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600/30 border border-blue-400/40 text-white font-sans text-sm font-semibold hover:bg-blue-500 hover:text-white hover:border-blue-300 transition-all duration-300 group/btn shadow-md hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]"
                >
                  <span className="text-white">Visit Official Website</span>
                  <ExternalLink className="w-4 h-4 text-blue-300 group-hover/btn:text-white transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
              </div>

            </div>
            
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
}