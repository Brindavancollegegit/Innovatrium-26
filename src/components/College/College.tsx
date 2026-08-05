import { college } from '../../data/content';
import { ExternalLink } from 'lucide-react';
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
      {/* Subtle section glow */}
      <div className="absolute top-1/2 left-[-200px] -translate-y-1/2 w-[800px] h-[800px] bg-[#3B82F6]/5 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="card-dark overflow-hidden bg-black/40"
        >
          <div className="grid md:grid-cols-5 h-full">
            
            <div className="md:col-span-2 relative min-h-[300px] bg-deep p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-surface-border">
              <img src="/brindavan-campas.png" alt="Brindavan College Campus" loading="lazy" className="w-full h-full object-cover" />
               <div className="w-32 h-32 rounded-full bg-surface border border-surface-border flex items-center justify-center">
               </div>
               {/* Accent decoration */}
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            </div>
            
            <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-center">
              <h2 className="font-display text-3xl md:text-[36px] font-medium tracking-[-0.01em] mb-2">{college.name}</h2>
              <p className="font-sans text-[14px] text-white/60 mb-6">{college.address}</p>
              
              <div className="pl-4 border-l-2 border-primary/50 py-2 mb-8">
                <p className="font-sans text-base leading-[1.6] text-white/90 italic">
                  "{college.positioning}"
                </p>
              </div>
              
              <a 
                href={college.website} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-sans text-[14px] font-medium text-primary hover:text-white transition-colors self-start"
              >
                Visit Official Website <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
}
