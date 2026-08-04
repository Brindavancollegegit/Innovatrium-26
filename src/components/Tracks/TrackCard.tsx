import SpotlightCard from '../ui/SpotlightCard';

interface TrackProps {
  title: string;
  tagline: string;
  teamSize: string;
  format: string;
  slotsRemaining: number;
}

export default function TrackCard({ title, tagline, teamSize, format, slotsRemaining }: TrackProps) {
  return (
    <SpotlightCard className="h-full p-8 flex flex-col group" spotlightColor="rgba(255, 255, 255, 0.1)">
      <div className="flex justify-between items-start mb-6">
        <h3 className="font-sans text-[18px] md:text-[20px] font-medium">{title}</h3>
        {slotsRemaining <= 5 && (
          <span className="px-3 py-1 bg-reserved/20 text-reserved font-sans text-[11px] font-medium uppercase tracking-[0.05em] rounded-full border border-reserved/30 whitespace-nowrap">
            {slotsRemaining} slots left
          </span>
        )}
      </div>
      
      <p className="font-sans text-base text-white/70 leading-[1.6] mb-8 flex-grow">
        {tagline}
      </p>
      
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between py-2 border-b border-surface-border group-hover:border-white/20 transition-colors">
          <span className="font-sans text-[14px] text-white/50">Team Size</span>
          <span className="font-sans text-[14px] font-medium">{teamSize}</span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-surface-border group-hover:border-white/20 transition-colors">
          <span className="font-sans text-[14px] text-white/50">Format</span>
          <span className="font-sans text-[14px] font-medium">{format}</span>
        </div>
      </div>
      
      <div className="mt-8">
         <a href="#register" className="inline-flex items-center justify-center w-full py-3 rounded-full bg-surface-border/50 text-white font-sans text-[14px] font-medium hover:bg-white hover:text-black transition-all">
           Select Track
         </a>
      </div>
    </SpotlightCard>
  );
}
