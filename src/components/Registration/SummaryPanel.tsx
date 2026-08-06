import React, { useState, useRef } from 'react';

export default function SummaryPanel({ participant, personal, competition, liveStats }: any) {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const cardRef = useRef<HTMLDivElement>(null);

  // Track mouse position relative to the card
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
      className="relative group p-4 rounded-3xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)]"
    >
      {/* --- EDGE ILLUMINATION LAYER --- */}
      <div
        className="absolute -inset-[1px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          // Change the rgba color here to match your brand (currently cyan/blue)
          background: `radial-gradient(250px circle at ${mousePos.x}px ${mousePos.y}px, rgba(56,189,248,0.8), transparent 100%)`,
          
          // The CSS Mask Magic: Restricts the background strictly to the 1px padding area
          padding: '1px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      {/* --- EXISTING CONTENT --- */}
      <div className="relative z-10">
        <div className="text-sm text-white/60 mb-2">Live Registrations</div>
        {/* Note: Added optional chaining (?.) for safety during initial load */}
        <div className="font-display text-2xl mb-2">{liveStats?.registrations || 0} people</div>

        <div className="mt-3 text-sm text-white/70">
          <div className="mb-2">Participant: <span className="font-mono">{participant || '-'}</span></div>
          <div className="mb-2">Competition: <span className="font-mono">{competition?.competitionId || '-'}</span></div>
          <div className="mb-2">Team: <span className="font-mono">{competition?.teamName || '-'}</span></div>
          <div className="mb-2">Members: <span className="font-mono">{competition?.members?.length || 0}</span></div>
        </div>
      </div>
    </div>
  );
}