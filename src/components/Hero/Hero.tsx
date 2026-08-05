import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import Countdown from '../Registration/Countdown';
import { registration } from '../../data/content';

export default function Hero({ isLoading = false }: { isLoading?: boolean }) {
  return (
    <section 
      id="home" 
      className="relative min-h-[100svh] pt-24 pb-16 sm:pt-32 sm:pb-20 flex items-start sm:items-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-[url('/homepage-bg.webp')] bg-cover bg-center" />
      <div className="absolute inset-x-0 bottom-0 h-32 sm:h-40 z-0 pointer-events-none bg-gradient-to-t from-[#05080A] via-[#05080A]/80 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full relative z-10 pointer-events-none">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pointer-events-auto">
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
            className="flex flex-col items-start gap-4 sm:gap-6 max-w-[32rem] pt-8 sm:pt-0"
          >
          <motion.h1 
            variants={{ hidden: { opacity: 0, y: 20, filter: "blur(10px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } } }}
            className="font-display text-[clamp(2.1rem,11vw,5rem)] sm:text-5xl md:text-[80px] font-bold leading-[0.94] tracking-[-0.04em] hyphens-none max-w-[11ch] sm:max-w-none"
          >
            Innovatrium <span className="text-gradient-accent">'26</span>
          </motion.h1>
          
          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="font-sans text-[15px] sm:text-base max-w-[34ch] sm:max-w-lg leading-[1.6] drop-shadow-[0_2px_14px_rgba(0,0,0,0.65)]"
            style={{ color: 'rgba(255, 255, 255, 0.96)' }}
          >
            A 2-day immersive technology fest by IEEE SB Brindavan. Engage in hands-on workshops, 
            innovative tracks, and collaborate with the brightest minds.
          </motion.p>

          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex flex-wrap items-stretch gap-2.5 font-sans text-[14px] font-medium">
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 backdrop-blur-md sm:glass-card sm:px-4 sm:py-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span>Day 1 & Day 2</span>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 backdrop-blur-md sm:glass-card sm:px-4 sm:py-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Brindavan College</span>
            </div>
            <div className="flex items-center gap-2 rounded-2xl px-3 py-2.5 bg-reserved/20 border border-reserved/30 text-reserved sm:rounded-full sm:px-4 sm:py-2">
              <span>Prize Pool: ₹30,000+</span>
            </div>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex w-full flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-2 sm:mt-4">
            <a href="#register" className="flex w-full sm:w-auto items-center justify-center gap-2 btn-gradient font-sans text-[14px] font-medium px-8 py-3.5 rounded-2xl sm:rounded-full transition-all shadow-lg shadow-blue-500/20">
              Register Now
            </a>
            <a href="#register" className="w-full sm:w-12 h-12 glass-card text-white items-center justify-center rounded-2xl sm:rounded-full hover:bg-white/10 transition-colors flex">
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
          </motion.div>
          {/* Right column - countdown (centered vertically) */}
          <motion.div initial="hidden" animate={isLoading ? "hidden" : "visible"} variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="w-full flex items-center justify-center md:justify-end">
            <div className="w-full max-w-xs md:ml-6">
              <Countdown targetDate={registration.closesAt} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
