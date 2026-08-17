import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Play } from '@phosphor-icons/react';

export default function VideoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress relative to the section's position
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // "start 90%" means animation begins when top of container hits 90% of viewport height
    // "center center" means animation finishes when center of container hits center of viewport
    offset: ["start 90%", "center center"]
  });

  // Transform width from a narrow slit to almost full width
  const maskWidth = useTransform(scrollYProgress, [0, 1], ["20%", "95%"]);
  // Transform height from a small strip to full height of its container
  const maskHeight = useTransform(scrollYProgress, [0, 1], ["100px", "100%"]);
  // Round corners heavily at the start, square them off slightly at the end
  const maskRadius = useTransform(scrollYProgress, [0, 1], ["50px", "24px"]);
  // Scale the image slightly as it opens for a parallax effect
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  return (
    <section 
      id="video" 
      className="py-24 relative overflow-hidden"
    >
      {/* Dynamic Geometric Orbs & Fluid Mesh */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-transparent to-[#030712] opacity-80 z-0 pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-fluid-mesh opacity-40 pointer-events-none mix-blend-overlay" />

      {/* Header Text */}
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
          className="flex flex-col items-center text-center mb-4"
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/25 text-blue-300 font-sans text-xs font-semibold uppercase tracking-wider mb-4">
            Teaser
          </motion.div>
          <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="font-display text-4xl md:text-[44px] font-bold tracking-tight text-white mb-4">
            Experience Innovatrium
          </motion.h2>
          <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="font-sans text-base text-slate-300 max-w-2xl leading-relaxed">
            Get a glimpse of the energy, innovation, and excitement that awaits you.
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll-Triggered Expanding Video Mask */}
      <div ref={containerRef} className="w-full h-[50vh] md:h-[75vh] flex justify-center items-center mt-12 relative z-10 px-4 md:px-0">
        <motion.div 
          style={{ 
            width: maskWidth,
            height: maskHeight,
            borderRadius: maskRadius
          }}
          className="relative overflow-hidden group shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 bg-[#0b1329] flex-shrink-0"
        >
          {/* The actual video / image background inside */}
          <motion.div 
              style={{ scale: imageScale }}
              className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80')] bg-cover bg-center origin-center"
          />
          
          {/* Dark overlay that brightens on hover */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-all duration-700 group-hover:bg-black/20 group-hover:backdrop-blur-none" />
          
          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-md flex items-center justify-center cursor-pointer hover:bg-emerald-500/40 transition-all duration-300 group-hover:scale-110 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <Play weight="duotone" className="w-8 h-8 md:w-10 md:h-10 text-emerald-300 ml-1" />
              </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
