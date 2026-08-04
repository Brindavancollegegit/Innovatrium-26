import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero({ isLoading = false }: { isLoading?: boolean }) {
  return (
    <section 
      id="home" 
      className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-[url('/homepage-bg.webp')] bg-cover bg-center" />
      
      {/* Blend Edge into next section */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#05080A] to-transparent z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full relative z-10 pointer-events-none">
        <motion.div 
          initial="hidden"
          animate={isLoading ? "hidden" : "visible"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.2
              }
            }
          }}
          className="flex flex-col items-start gap-6 max-w-2xl pointer-events-auto"
        >
          <motion.h1 
            variants={{ hidden: { opacity: 0, y: 20, filter: "blur(10px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } } }}
            className="font-display text-4xl sm:text-5xl md:text-[80px] font-bold leading-[1.05] tracking-[-0.02em] hyphens-none"
          >
            Innovatrium <span className="text-gradient-accent">'26</span>
          </motion.h1>
          
          <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="font-sans text-base text-white/70 max-w-lg leading-[1.6]">
            A 2-day immersive technology fest by IEEE SB Brindavan. Engage in hands-on workshops, 
            innovative tracks, and collaborate with the brightest minds.
          </motion.p>

          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex flex-wrap items-center gap-4 font-sans text-[14px] font-medium">
            <div className="flex items-center gap-2 glass-card px-4 py-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span>Day 1 & Day 2</span>
            </div>
            <div className="flex items-center gap-2 glass-card px-4 py-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Brindavan College</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-reserved/20 border border-reserved/30 text-reserved">
              <span>Prize Pool: ₹10,000+</span>
            </div>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex items-center gap-3 mt-4">
            <a href="#register" className="flex items-center gap-2 btn-gradient font-sans text-[14px] font-medium px-8 py-3 rounded-full transition-all shadow-lg shadow-blue-500/20">
              Register Now
            </a>
            <a href="#register" className="w-12 h-12 glass-card text-white items-center justify-center rounded-full hover:bg-white/10 transition-colors flex">
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
