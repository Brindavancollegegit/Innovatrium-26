import React, { useState, useRef } from 'react';
import { Users, Medal, ShieldCheck, CheckCircle, UserCheck,  } from '@phosphor-icons/react';

export default function SummaryPanel({ participant, personal, competition }: any) {
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


        {/* Current Configuration Summary */}
        <div className="space-y-2.5 text-xs text-white/80">
          <div className="flex items-center justify-between py-1 border-b border-white/5">
            <span className="flex items-center gap-1.5 text-white/50">
              <UserCheck weight="duotone" className="w-3.5 h-3.5 text-sky-400" /> Category
            </span>
            <span className="font-mono font-medium text-white">
              {participant === 'ieee' ? 'IEEE Member (Free)' : participant === 'non-ieee' ? 'General (Free)' : 'Not selected'}
            </span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-white/5">
            <span className="flex items-center gap-1.5 text-white/50">
              <Medal weight="duotone" className="w-3.5 h-3.5 text-amber-400" /> Track
            </span>
            <span className="font-mono font-medium text-white truncate max-w-[150px]">
              {competition?.competitionId || 'Not selected'}
            </span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-white/5">
            <span className="flex items-center gap-1.5 text-white/50">
              <Users weight="duotone" className="w-3.5 h-3.5 text-emerald-400" /> Team Name
            </span>
            <span className="font-mono font-medium text-white truncate max-w-[150px]">
              {competition?.teamName || 'Not entered'}
            </span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="flex items-center gap-1.5 text-white/50">
              <ShieldCheck weight="duotone" className="w-3.5 h-3.5 text-blue-400" /> Total Members
            </span>
            <span className="font-mono font-medium text-white">
              {(competition?.members?.length || 0) + 1} Attendees
            </span>
          </div>
        </div>

        {/* Verified Badge */}
        <div className="pt-2 flex items-center gap-2 text-[11px] text-white/40">
          <CheckCircle weight="duotone" className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Automated invoice & instant verification</span>
        </div>
      </div>
    </div>
  );
}
