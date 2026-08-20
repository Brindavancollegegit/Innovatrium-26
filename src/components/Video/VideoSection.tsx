import { Sparkle } from '@phosphor-icons/react';

// We duplicate the 8 items to create a perfect 16-sided seamless 3D cylinder
const BASE_MEMORIES = [
  { id: 1, title: 'Official Launch', tag: 'LIVE SPRINT', imageUrl: 'launch.webp' },
  { id: 2, title: 'CS Society', tag: 'INNAUGRATION', imageUrl: 'pic2.webp' },
  { id: 3, title: 'SPS Society', tag: 'INNAUGRATION', imageUrl: 'pic5.webp' },
  { id: 4, title: 'The Core Squad', tag: 'COMMUNITY', imageUrl: 'pic1.webp' },
  { id: 5, title: 'Official Launch', tag: 'ACHIVE', imageUrl: 'launch.webp' },
  { id: 6, title: 'CS Society', tag: 'KEYNOTE', imageUrl: 'pic2.webp' },
  { id: 7, title: 'SPS Society', tag: 'VALEDICTORY', imageUrl: 'pic5.webp' },
  { id: 8, title: 'Wie Society', tag: 'INNOVATION', imageUrl: 'pic4.webp' },
];

const MEMORIES = [...BASE_MEMORIES, ...BASE_MEMORIES];

export default function VideoSection() {
  return (
    <section 
      id="activities" 
      className="py-24 relative overflow-hidden bg-[#030712] select-none flex flex-col items-center justify-center min-h-screen"
    >
      {/* 
        THE MAGIC MATH:
        Width = 300px. 16 Items. 
        Angle = 360 / 16 = 22.5deg.
        Radius = (300 / 2) / tan(11.25deg) = 150 / 0.1989 = 754px.
      */}
      <style>
        {`
          @keyframes spin-cylinder {
            0% { transform: translateZ(350px) rotateY(0deg); }
            100% { transform: translateZ(350px) rotateY(-360deg); }
          }
          .pano-cylinder {
            transform-style: preserve-3d;
            animation: spin-cylinder 35s linear infinite;
          }
          .pano-container:hover .pano-cylinder {
            animation-play-state: paused;
          }
          .pano-panel {
            backface-visibility: hidden;
          }
        `}
      </style>

      {/* Background Ambient Glows */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-transparent to-[#030712] opacity-90 z-0 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Header Section */}
      <div className="max-w-3xl mx-auto px-4 relative z-20 text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-sans text-xs font-bold uppercase tracking-widest mb-6 shadow-xl">
          <Sparkle weight="fill" className="w-4 h-4" />
          <span>IEEE SB Activities</span>
        </div>

        <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
          Moments & Milestones
        </h2>
        
        <p className="font-sans text-base text-slate-400 font-light max-w-xl mx-auto">
          A continuous glimpse into the late nights, the breakthroughs, and the vibrant community that powers Innovatrium.
        </p>
      </div>

      {/* True 3D Panoramic Stage */}
      <div 
        className="pano-container relative w-full h-[400px] md:h-[450px] flex items-center justify-center z-10"
        style={{ perspective: '1000px' }} 
      >
        {/* Edge Mask Gradients to fade out the sides beautifully */}
        <div className="absolute top-0 left-0 w-16 md:w-48 h-full bg-gradient-to-r from-[#030712] to-transparent z-30 pointer-events-none" />
        <div className="absolute top-0 right-0 w-16 md:w-48 h-full bg-gradient-to-l from-[#030712] to-transparent z-30 pointer-events-none" />

        {/* The Rotating Cylinder */}
        <div className="pano-cylinder relative w-0 h-0 flex items-center justify-center">
          
          {MEMORIES.map((item, index) => {
            const angle = index * 22.5; // 360 / 16
            
            return (
              <div
                key={index}
                className="pano-panel absolute w-[300px] h-[400px] md:h-[450px] bg-slate-900 cursor-pointer group"
                style={{
                  // 1. Rotate to position on cylinder
                  // 2. Push outward by exact radius (754px)
                  // 3. Rotate 180deg so the image faces INWARD toward the center
                  transform: `rotateY(${angle}deg) translateZ(754px) rotateY(180deg)`,
                  // Slight border to define the panels exactly like the Framer example
                  borderRight: '1px solid rgba(255, 255, 255, 0.05)',
                }}
              >
                {/* Cinematic Image Container (Solves cropping) */}
                <div className="absolute inset-0 w-full h-full brightness-[0.6] group-hover:brightness-100 transition-all duration-500 overflow-hidden pointer-events-none">
                  {/* Blurred Backdrop to fill empty space seamlessly */}
                  <img
                    src={item.imageUrl}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover blur-xl scale-125 opacity-50"
                  />
                  {/* Uncropped Main Image */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-contain z-10 shadow-2xl"
                  />
                </div>

                {/* Dark Vignette Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-90" />

                {/* Card Info Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block self-start px-2.5 py-1 rounded-md bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-mono text-[10px] font-bold tracking-widest uppercase mb-2 opacity-80 group-hover:opacity-100 transition-opacity">
                    {item.tag}
                  </span>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-white tracking-wide">
                    {item.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}