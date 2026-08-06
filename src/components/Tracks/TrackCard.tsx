import SpotlightCard from '../ui/SpotlightCard';

interface TrackProps {
  title: string;
  tagline: string;
  teamSize: string;
  format: string;
  slotsRemaining?: number;
}

export default function TrackCard({
  title,
  tagline,
  teamSize,
  format,
  slotsRemaining,
}: TrackProps) {
  return (
    <SpotlightCard
      className="h-full p-7 md:p-8 flex flex-col group relative overflow-hidden rounded-3xl bg-[#080d14]/90 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/50 hover:shadow-[0_0_25px_rgba(52,211,153,0.2)]"
      spotlightColor="rgba(52, 211, 153, 0.15)"
    >
      {/* Top Accent Gradient Bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Header Section */}
      <div className="flex justify-between items-start gap-4 mb-5">
        <div className="flex items-center gap-3">
          {/* Emerald Icon Badge */}
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-400 group-hover:text-slate-950 transition-all duration-300 shrink-0">
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h3 className="font-display text-xl md:text-2xl font-bold text-white tracking-wide">
            {title}
          </h3>
        </div>

        {/* Slot Badge */}
        {slotsRemaining !== undefined && slotsRemaining > 0 && slotsRemaining <= 5 && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/15 text-amber-300 font-sans text-xs font-semibold uppercase tracking-wider rounded-full border border-amber-400/30 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
            {slotsRemaining} left
          </span>
        )}
      </div>

      {/* High-Visibility White/Light Description */}
      <p className="font-sans text-sm md:text-base !text-slate-100 leading-relaxed mb-8 flex-grow font-normal">
        {tagline}
      </p>

      {/* Translucent Glass Metadata Box (No Black Fill) */}
      <div className="grid grid-cols-2 gap-3 mb-8 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 group-hover:border-emerald-500/30 transition-colors">
        {/* Team Size */}
        <div className="flex flex-col p-3 rounded-xl bg-white/[0.04] border border-white/10">
          <span className="flex items-center gap-1.5 text-xs text-emerald-300 font-medium mb-1">
            <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Team Size
          </span>
          <span className="font-sans text-sm font-semibold text-white">{teamSize}</span>
        </div>

        {/* Format */}
        <div className="flex flex-col p-3 rounded-xl bg-white/[0.04] border border-white/10">
          <span className="flex items-center gap-1.5 text-xs text-emerald-300 font-medium mb-1">
            <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
            </svg>
            Format
          </span>
          <span className="font-sans text-sm font-semibold text-white">{format}</span>
        </div>
      </div>

      {/* Button with Emerald Gradient Hover */}
      <div>
        <a
          href="#register"
          className="group/btn relative inline-flex items-center justify-center w-full py-3.5 px-6 rounded-xl bg-white/10 border border-white/20 text-white font-sans text-sm font-semibold hover:bg-gradient-to-r hover:from-emerald-400 hover:to-teal-300 hover:text-slate-950 hover:border-transparent transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(52,211,153,0.3)]"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            Select Track
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </a>
      </div>
    </SpotlightCard>
  );
}