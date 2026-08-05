import React from 'react';

export default function SummaryPanel({ participant, personal, competition, liveStats }: any) {
  return (
    <div className="glass-card p-4 rounded-3xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)]">
      <div className="text-sm text-white/60 mb-2">Live Registrations</div>
      <div className="font-display text-2xl mb-2">{liveStats.registrations} people</div>

      <div className="mt-3 text-sm text-white/70">
        <div className="mb-2">Participant: <span className="font-mono">{participant || '-'}</span></div>
        <div className="mb-2">Competition: <span className="font-mono">{competition.competitionId || '-'}</span></div>
        <div className="mb-2">Team: <span className="font-mono">{competition.teamName || '-'}</span></div>
        <div className="mb-2">Members: <span className="font-mono">{competition.members?.length || 0}</span></div>
      </div>
    </div>
  );
}
