import SpotlightCard from '../ui/SpotlightCard';
import { Lock } from 'lucide-react';

interface SpeakerProps {
  name: string;
  title: string;
  photo: string;
  topics: string[];
  bio: string;
  isRevealed?: boolean; // Toggles the overlay on/off
}

export default function SpeakerCard({ 
  name, 
  title, 
  photo, 
  topics, 
  bio, 
  isRevealed = false // Defaults to false so the overlay shows immediately
}: SpeakerProps) {
  return (
    <SpotlightCard 
      className="h-full p-6 sm:p-8 flex flex-col group !bg-transparent bg-gradient-to-b from-[#080d14]/90 to-[#030712]/90 border border-white/10 border-t-white/20 backdrop-blur-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_32px_rgba(0,0,0,0.4)] rounded-2xl relative overflow-hidden" 
      spotlightColor="rgba(255, 255, 255, 0.15)"
    >
      {/* --- HYPE OVERLAY --- */}
      {!isRevealed && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#030712]/70 backdrop-blur-sm rounded-2xl">
          <div className="flex flex-col items-center gap-3 animate-pulse">
            <div className="flex items-center justify-center w-12 h-12 rounded-full border border-cyan-500/30 bg-cyan-500/10 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
              <Lock className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="text-center">
              <h3 className="font-display text-xl font-bold text-white tracking-tight drop-shadow-md">Revealing Soon</h3>
              <p className="font-sans text-xs sm:text-sm text-cyan-200/70 font-medium mt-1">Speaker lineup is locked</p>
            </div>
          </div>
        </div>
      )}

      {/* --- CONTENT WRAPPER (Blurs when not revealed) --- */}
      <div className={`flex flex-col h-full transition-all duration-500 ${!isRevealed ? 'opacity-30 blur-[4px] grayscale select-none pointer-events-none' : ''}`}>
        
        {/* Subtle glow behind image */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#3B82F6]/15 blur-xl rounded-full pointer-events-none -z-10 transition-opacity duration-500 group-hover:opacity-100 opacity-40" />
        
        <div className="flex items-center gap-5 sm:gap-6 mb-6">
          <div className="relative">
            <img 
              src={photo} 
              alt={name} 
              width="96"
              height="96"
              loading="lazy"
              decoding="async"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-white/10 object-cover shrink-0 bg-white/5 group-hover:border-[#3B82F6]/50 transition-colors duration-500"
            />
            <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10 group-hover:ring-[#3B82F6]/30 transition-all duration-500" />
          </div>
          <div className="flex flex-col gap-1.5">
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-white tracking-tight leading-tight">{name}</h3>
            <p className="font-sans text-[13px] sm:text-[14px] text-white/70 font-medium">{title}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {topics.map((topic, idx) => (
            <span 
              key={idx} 
              className="px-3 py-1 bg-white/5 text-white font-sans text-[11px] font-medium uppercase tracking-[0.05em] rounded-full border border-white/10 whitespace-nowrap"
            >
              {topic}
            </span>
          ))}
        </div>
        
        <p className="font-sans text-[14px] sm:text-[15px] text-white/80 leading-[1.7] flex-grow">
          {bio}
        </p>
      </div>

    </SpotlightCard>
  );
}