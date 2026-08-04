import SpotlightCard from '../ui/SpotlightCard';

interface SpeakerProps {
  name: string;
  title: string;
  photo: string;
  topics: string[];
  bio: string;
}

export default function SpeakerCard({ name, title, photo, topics, bio }: SpeakerProps) {
  return (
    <SpotlightCard className="h-full p-6 sm:p-8 flex flex-col group !bg-transparent bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 border-t-white/20 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_8px_32px_rgba(0,0,0,0.4)] rounded-2xl relative overflow-hidden" spotlightColor="rgba(255, 255, 255, 0.15)">
      {/* Subtle glow behind image */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#3B82F6]/20 blur-[60px] rounded-full pointer-events-none -z-10 transition-opacity duration-500 group-hover:opacity-100 opacity-50" />
      
      <div className="flex items-center gap-5 sm:gap-6 mb-6">
        <div className="relative">
          <img 
            src={photo} 
            alt={name} 
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
    </SpotlightCard>
  );
}
