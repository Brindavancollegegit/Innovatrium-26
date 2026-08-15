import { ArrowLeft, ArrowRight, Plus, Trash, Users, CheckCircle, Shield } from '@phosphor-icons/react';

export default function Step3Competition({ tracks, value, onChange, onNext, onBack }: any) {
  const selectedTrack = tracks.find((t: any) => t.competitionId === value.competitionId);
  const maxTeam = selectedTrack
    ? parseInt(selectedTrack.teamSize?.split('-').pop() || '4', 10)
    : 4;

  function addMember() {
    if (value.members.length >= maxTeam - 1) return; // Team lead is personal info
    onChange({ ...value, members: [...value.members, { name: '', email: '', phone: '' }] });
  }

  function removeMember(index: number) {
    const updated = value.members.filter((_: any, i: number) => i !== index);
    onChange({ ...value, members: updated });
  }

  const isFormValid = value.competitionId && value.teamName?.trim();

  return (
    <div>
      {/* Competition Selection */}
      <div className="mb-6">
        <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-3">
          Select Competition Track *
        </label>
        <div className="grid grid-cols-1 gap-3">
          {tracks.map((t: any) => {
            const isSelected = value.competitionId === t.competitionId;
            return (
              <button
                key={t.competitionId}
                type="button"
                onClick={() => onChange({ ...value, competitionId: t.competitionId })}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer active:scale-[0.99] ${
                  isSelected
                    ? 'bg-blue-500/15 border-blue-400 text-white shadow-lg shadow-blue-500/10 ring-1 ring-blue-400'
                    : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05] text-white/80'
                }`}
              >
                <div className="flex justify-between items-start gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-medium text-base text-white">{t.title}</span>
                    {isSelected && <CheckCircle weight="duotone" className="w-4 h-4 text-blue-400 shrink-0" />}
                  </div>
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/10 text-white/80 shrink-0 font-mono">
                    {t.teamSize}
                  </span>
                </div>
                <p className="text-xs text-white/60 mt-1.5 leading-relaxed">{t.tagline}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Team Name */}
      <div className="mb-6">
        <label className="flex items-center gap-1.5 text-xs font-medium text-white/70 mb-1.5">
          <Shield weight="duotone" className="w-3.5 h-3.5 text-sky-400" /> Team Name *
        </label>
        <input
          type="text"
          value={value.teamName}
          onChange={(e) => onChange({ ...value, teamName: e.target.value })}
          placeholder="e.g. CyberVanguard"
          className="w-full h-11 sm:h-12 px-4 rounded-xl bg-white/[0.03] border border-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 text-white text-base sm:text-sm outline-none transition-all placeholder:text-white/30"
        />
      </div>

      {/* Additional Team Members */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <label className="flex items-center gap-1.5 text-xs font-medium text-white/70">
            <Users weight="duotone" className="w-3.5 h-3.5 text-sky-400" /> Additional Team Members
          </label>
          <span className="text-[11px] text-white/40 font-mono">
            {value.members.length} of {maxTeam - 1} added
          </span>
        </div>

        <div className="space-y-3">
          {value.members.map((m: any, i: number) => (
            <div key={i} className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2.5">
              <div className="flex justify-between items-center text-xs text-white/60">
                <span className="font-semibold text-white/80">Member {i + 2} Details</span>
                <button
                  type="button"
                  onClick={() => removeMember(i)}
                  className="inline-flex items-center gap-1 text-rose-400 hover:text-rose-300 text-[11px] transition-colors cursor-pointer"
                >
                  <Trash weight="duotone" className="w-3 h-3" /> Remove
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={m.name}
                  onChange={(e) => {
                    const next = [...value.members];
                    next[i] = { ...next[i], name: e.target.value };
                    onChange({ ...value, members: next });
                  }}
                  className="h-10 px-3 text-base sm:text-xs rounded-xl bg-black/40 border border-white/10 text-white focus:border-blue-400 outline-none"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={m.email}
                  onChange={(e) => {
                    const next = [...value.members];
                    next[i] = { ...next[i], email: e.target.value };
                    onChange({ ...value, members: next });
                  }}
                  className="h-10 px-3 text-base sm:text-xs rounded-xl bg-black/40 border border-white/10 text-white focus:border-blue-400 outline-none"
                />
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="Phone"
                  value={m.phone}
                  onChange={(e) => {
                    const next = [...value.members];
                    next[i] = { ...next[i], phone: e.target.value.replace(/\D/g, '') };
                    onChange({ ...value, members: next });
                  }}
                  className="h-10 px-3 text-base sm:text-xs rounded-xl bg-black/40 border border-white/10 text-white focus:border-blue-400 outline-none font-mono"
                />
              </div>
            </div>
          ))}
        </div>

        {value.members.length < maxTeam - 1 && (
          <button
            type="button"
            onClick={addMember}
            className="mt-3 inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all cursor-pointer active:scale-95"
          >
            <Plus weight="duotone" className="w-3.5 h-3.5 text-sky-400" />
            <span>Add Member {value.members.length + 2}</span>
          </button>
        )}
      </div>

      <div className="flex items-center justify-between gap-3">
        <button 
          type="button"
          onClick={onBack} 
          className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-all cursor-pointer active:scale-95"
        >
          <ArrowLeft weight="duotone" className="w-4 h-4" />
          <span>Back</span>
        </button>
        <button
          type="button"
          disabled={!isFormValid}
          onClick={onNext}
          className={`btn-gradient inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-medium text-sm transition-all shadow-md active:scale-95 ${
            !isFormValid ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-blue-500/25'
          }`}
        >
          <span>Review & Pay</span>
          <ArrowRight weight="duotone" className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
