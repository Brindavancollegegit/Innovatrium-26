import React from 'react';

export default function Step3Competition({ tracks, value, onChange, onNext, onBack }: any) {
  const selectedTrack = tracks.find((t: any) => t.competitionId === value.competitionId);
  const maxTeam = selectedTrack
    ? parseInt(selectedTrack.teamSize?.split('-').pop() || '4', 10)
    : 4;

  function addMember() {
    if (value.members.length >= maxTeam - 1) return; // -1 because team lead is personal info
    onChange({ ...value, members: [...value.members, { name: '', email: '', phone: '' }] });
  }

  function removeMember(index: number) {
    const updated = value.members.filter((_: any, i: number) => i !== index);
    onChange({ ...value, members: updated });
  }

  return (
    <div>
      <div className="mb-6">
        <label className="block text-sm text-white/70 mb-2">Select Competition *</label>
        <div className="grid grid-cols-1 gap-3">
          {tracks.map((t: any) => (
            <button
              key={t.competitionId}
              type="button"
              onClick={() => onChange({ ...value, competitionId: t.competitionId })}
              className={`p-4 rounded-xl border text-left transition-all ${
                value.competitionId === t.competitionId
                  ? 'bg-primary/10 border-primary text-white'
                  : 'bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)]'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-white">{t.title}</span>
                <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/80">{t.teamSize}</span>
              </div>
              <p className="text-xs text-white/60 mt-1">{t.tagline}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-white/70 mb-1">Team Name *</label>
        <input
          value={value.teamName}
          onChange={(e) => onChange({ ...value, teamName: e.target.value })}
          placeholder="Enter team name"
          className="w-full p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] text-white outline-none"
        />
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm text-white/70">Additional Team Members</label>
          <span className="text-xs text-white/50">Max {maxTeam - 1} additional members</span>
        </div>

        <div className="space-y-3">
          {value.members.map((m: any, i: number) => (
            <div key={i} className="p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] space-y-2">
              <div className="flex justify-between text-xs text-white/60">
                <span>Member {i + 2}</span>
                <button type="button" onClick={() => removeMember(i)} className="text-rose-400 hover:underline">
                  Remove
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <input
                  placeholder="Name"
                  value={m.name}
                  onChange={(e) => {
                    const next = [...value.members];
                    next[i] = { ...next[i], name: e.target.value };
                    onChange({ ...value, members: next });
                  }}
                  className="p-2 text-sm rounded-lg bg-black/30 border border-white/5 text-white"
                />
                <input
                  placeholder="Email"
                  value={m.email}
                  onChange={(e) => {
                    const next = [...value.members];
                    next[i] = { ...next[i], email: e.target.value };
                    onChange({ ...value, members: next });
                  }}
                  className="p-2 text-sm rounded-lg bg-black/30 border border-white/5 text-white"
                />
                <input
                  placeholder="Phone"
                  value={m.phone}
                  onChange={(e) => {
                    const next = [...value.members];
                    next[i] = { ...next[i], phone: e.target.value };
                    onChange({ ...value, members: next });
                  }}
                  className="p-2 text-sm rounded-lg bg-black/30 border border-white/5 text-white"
                />
              </div>
            </div>
          ))}
        </div>

        {value.members.length < maxTeam - 1 && (
          <button
            type="button"
            onClick={addMember}
            className="mt-3 px-4 py-2 text-sm rounded-full bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] text-white transition-colors"
          >
            + Add Member
          </button>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button onClick={onBack} className="px-6 py-3 rounded-full bg-[rgba(255,255,255,0.05)] text-white">
          Back
        </button>
        <button
          disabled={!value.competitionId || !value.teamName}
          onClick={onNext}
          className={`btn-gradient px-8 py-3 rounded-full ${
            !value.competitionId || !value.teamName ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}