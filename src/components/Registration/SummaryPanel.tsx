import React, { useState, useRef } from 'react';
import { Users, Award, ShieldCheck, CheckCircle2, UserCheck, Radio } from 'lucide-react';

export default function SummaryPanel({ participant, personal, competition, liveStats }: any) {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: -1000, y: -1000 })}
      className="relative group p-5 md:p-6 rounded-3xl bg-[rgba(255,255,255,0.03)] border border-white/10 overflow-hidden shadow-xl"
    >
      {/* Edge Glow */}
      <div
        className="absolute -inset-[1px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(220px circle at ${mousePos.x}px ${mousePos.y}px, rgba(56,189,248,0.7), transparent 100%)`,
          padding: '1px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      <div className="relative z-10 space-y-4">
        {/* Live Registrations Counter */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-white/50 block">Live Registrations</span>
            <div className="font-mono text-2xl font-bold text-white mt-0.5">
              {liveStats?.registrations || 0} <span className="text-xs font-sans font-normal text-white/60">teams registered</span>
            </div>
          </div>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-400">
            <Radio className="w-3 h-3 animate-pulse" /> LIVE
          </span>
        </div>

        {/* Current Configuration Summary */}
        <div className="space-y-2.5 text-xs text-white/80">
          <div className="flex items-center justify-between py-1 border-b border-white/5">
            <span className="flex items-center gap-1.5 text-white/50">
              <UserCheck className="w-3.5 h-3.5 text-sky-400" /> Category
            </span>
            <span className="font-mono font-medium text-white">
              {participant === 'ieee' ? 'IEEE Member (₹300)' : participant === 'non-ieee' ? 'General (₹350)' : 'Not selected'}
            </span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-white/5">
            <span className="flex items-center gap-1.5 text-white/50">
              <Award className="w-3.5 h-3.5 text-amber-400" /> Track
            </span>
            <span className="font-mono font-medium text-white truncate max-w-[150px]">
              {competition?.competitionId || 'Not selected'}
            </span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-white/5">
            <span className="flex items-center gap-1.5 text-white/50">
              <Users className="w-3.5 h-3.5 text-emerald-400" /> Team Name
            </span>
            <span className="font-mono font-medium text-white truncate max-w-[150px]">
              {competition?.teamName || 'Not entered'}
            </span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="flex items-center gap-1.5 text-white/50">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Total Members
            </span>
            <span className="font-mono font-medium text-white">
              {(competition?.members?.length || 0) + 1} Attendees
            </span>
          </div>
        </div>

        {/* Verified Badge */}
        <div className="pt-2 flex items-center gap-2 text-[11px] text-white/40">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Automated invoice & instant verification</span>
        </div>
      </div>
    </div>
  );
}