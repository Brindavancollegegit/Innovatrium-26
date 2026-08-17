import { useState } from 'react';
import { 
  ArrowsClockwise, 
  Users, 
  PresentationChart, 
  ArrowRight, 
  CheckCircle, 
  ShieldWarning, 
  Lightning,
  Sparkle,
  Gear,
  TerminalWindow
} from '@phosphor-icons/react';

const iconMap: Record<string, any> = {
  PresentationChart,
  Gear,
  TerminalWindow,
  Lightning
};
import SpotlightCard from '../ui/SpotlightCard';

export interface TrackProps {
  competitionId: string;
  title: string;
  tagline: string;
  teamSize: string;
  format: string;

  icon?: string;
  rules?: string[];
  evaluation?: string[];
}

export default function TrackCard({
  title,
  tagline,
  teamSize,
  format,

  icon,
  rules = [],
  evaluation = [],
}: TrackProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const TrackIcon = icon && iconMap[icon] ? iconMap[icon] : Lightning;

  return (
    <div 
      className="w-full h-[520px] [perspective:1200px] cursor-pointer group select-none"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full duration-700 [transform-style:preserve-3d] transition-transform ease-out ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* =========================================================
            FRONT FACE: TECH POSTER STYLE
            ========================================================= */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden]">
          <SpotlightCard
            className="h-full p-7 md:p-8 flex flex-col justify-between relative overflow-hidden rounded-3xl bg-slate-900/95 backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:-translate-y-2 group-hover:border-sky-400 group-hover:shadow-[0_20px_40px_-15px_rgba(56,189,248,0.25)]"
            spotlightColor="rgba(56, 189, 248, 0.05)"
          >
            {/* Top Accent Gradient Bar */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Subtle Poster Radial Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.04] pointer-events-none" />
            
            {/* Soft background glow blob */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-sky-400/10 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-50" />

            <div>
              {/* Header Section */}
              <div className="flex justify-between items-start gap-3 mb-6">
                <div className="flex items-center gap-3">
                  {/* Sky Icon Badge */}
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400 shadow-sm group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-sky-400 group-hover:to-blue-500 group-hover:text-white group-hover:border-transparent transition-all duration-500 shrink-0">
                    <TrackIcon weight="duotone" className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-sky-400 uppercase">
                      Official Track
                    </span>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-white tracking-wide leading-tight">
                      {title}
                    </h3>
                  </div>
                </div>

                {/* Flip Indicator */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-sky-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full group-hover:border-sky-400/40 transition-all shrink-0">
                    <ArrowsClockwise weight="duotone" className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                    <span className="text-slate-300 group-hover:text-white transition-colors">Rules</span>
                  </div>
                </div>
              </div>

              {/* Tagline / Poster Description */}
              <p className="font-sans text-sm md:text-[15px] !text-slate-300 leading-relaxed font-normal mb-6">
                {tagline}
              </p>
            </div>

            {/* Bottom Metadata & Button */}
            <div className="space-y-4">
              {/* Translucent Glass Metadata Box */}
              <div className="grid grid-cols-2 gap-3 p-2 rounded-2xl bg-white/[0.02] border border-white/10">
                {/* Team Size */}
                <div className="flex flex-col p-3 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="flex items-center gap-1.5 text-xs font-medium mb-1 text-sky-400">
                    <Users weight="duotone" className="w-4 h-4" />
                    <span className="text-sky-300">Team Size</span>
                  </span>
                  <span className="font-sans text-sm font-semibold text-white">{teamSize}</span>
                </div>

                {/* Format */}
                <div className="flex flex-col p-3 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="flex items-center gap-1.5 text-xs font-medium mb-1 text-sky-400">
                    <PresentationChart weight="duotone" className="w-4 h-4" />
                    <span className="text-sky-300">Format</span>
                  </span>
                  <span className="font-sans text-sm font-semibold text-white">{format}</span>
                </div>
              </div>

              {/* Flip & View Rules CTA */}
              <div className="w-full py-3.5 px-6 rounded-xl bg-white/10 border border-white/20 shadow-sm text-sky-400 font-sans text-sm font-semibold flex items-center justify-center gap-2 group-hover:bg-gradient-to-r group-hover:from-sky-400 group-hover:to-blue-500 group-hover:text-white group-hover:border-transparent group-hover:shadow-lg group-hover:shadow-sky-500/25 transition-all duration-500">
                <span className="transition-colors">View Guidelines & Rules</span>
                <ArrowRight weight="duotone" className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </SpotlightCard>
        </div>

        {/* =========================================================
            BACK FACE: RULES & GUIDELINES (PULLED FROM CONTENT.TS)
            ========================================================= */}
        <div className="absolute inset-0 w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="h-full p-7 md:p-8 flex flex-col justify-between relative overflow-hidden rounded-3xl bg-slate-900/95 backdrop-blur-xl border border-white/10 shadow-[0_20px_40px_-15px_rgba(56,189,248,0.2)]">
            
            {/* Background Soft Blobs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
            
            {/* Top Back Header */}
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400">
                  <ShieldWarning weight="duotone" className="w-5 h-5" />
                  <span className="text-sky-300">Track Blueprint</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] hover:text-white transition-colors text-sky-400">
                  <ArrowsClockwise weight="duotone" className="w-4 h-4" />
                  <span className="text-slate-400">Flip front</span>
                </div>
              </div>

              <h4 className="font-display text-xl font-bold text-white mb-3">
                {title}
              </h4>

              {/* Rules List from content.ts */}
              {rules && rules.length > 0 ? (
                <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                  {rules.map((rule, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs md:text-[13px] text-slate-200 leading-relaxed font-normal">
                      <CheckCircle weight="duotone" className="w-5 h-5 text-sky-400 mt-0.5 shrink-0" />
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">Rules will be briefed before the track begins.</p>
              )}
            </div>

            {/* Direct Register Action Button */}
            <div className="pt-4 border-t border-white/10">
              <a
                href="#register"
                onClick={(e) => {
                  e.stopPropagation(); // Stops card from re-flipping when clicking register
                }}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 font-sans text-sm font-bold shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 text-white"
              >
                <span>Register for {title}</span>
                <ArrowRight weight="bold" className="w-4 h-4 text-white" />
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}