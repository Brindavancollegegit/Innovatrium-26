import { ArrowRight, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export default function RegistrationPlaceholder() {
  return (
    <motion.section 
      id="register" 
      className="py-24 relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-50" />
      
      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="glass-card p-12 md:p-16 relative overflow-hidden"
        >
          {/* Ambient glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-primary/10 blur-[80px] pointer-events-none" />
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15, delayChildren: 0.2 }
              }
            }}
            className="relative z-10 flex flex-col items-center"
          >
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="w-16 h-16 rounded-full glass-card flex items-center justify-center mb-6 border-primary/30">
              <Clock className="w-8 h-8 text-primary" />
            </motion.div>
            
            <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="font-display text-4xl md:text-[44px] font-medium tracking-[-0.01em] mb-4">
              Registration Opening Soon
            </motion.h2>
            
            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="font-sans text-base text-white/70 max-w-xl mx-auto leading-[1.6] mb-8">
              We are finalizing the payment structure and gateway integrations. 
              The official registration portal with live team formation will be available shortly.
            </motion.p>
            
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex flex-col sm:flex-row items-center gap-4">
              <button disabled className="glass-card text-white/40 font-sans text-[14px] font-medium px-8 py-3 rounded-full cursor-not-allowed">
                Portal Locked
              </button>
              <a href="#contact" className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors font-sans text-[14px] font-medium">
                Contact Coordinators <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </motion.section>
  );
}
