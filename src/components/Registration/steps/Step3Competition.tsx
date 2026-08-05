import React from 'react';

export default function Step3Competition({ tracks, value, onChange, onNext, onBack }: any) {
  const selectedTrack = tracks.find((t:any)=>t.competitionId===value.competitionId);
  const maxTeam = selectedTrack ? (selectedTrack.teamSize ? parseInt(selectedTrack.teamSize.split('-').pop()||'1') : 1) : 1;

  function addMember() {
    if (value.members.length >= maxTeam) return;
    onChange({ ...value, members: [...value.members, { name: '', email: '', phone: '' }] });
  }

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm text-white/70 mb-1">Competition</label>
        <div className="flex gap-2">
          {tracks.map((t:any)=> (
            <button key={t.competitionId} onClick={()=>onChange({ ...value, competitionId: t.competitionId })} className={`px-3 py-2 rounded-full ${value.competitionId===t.competitionId ? 'bg-primary text-black' : 'bg-[rgba(255,255,255,0.02)]'}`}>{t.title}</button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-white/70 mb-1">Category</label>
        <select value={value.category} onChange={(e)=>onChange({ ...value, category: e.target.value })} className="w-full p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]">
          <option>General</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-white/70 mb-1">Team Name</label>
        <input value={value.teamName} onChange={(e)=>onChange({ ...value, teamName: e.target.value })} className="w-full p-3 rounded-xl bg-[rgba(255,255,255,0.02)]" />
      </div>

      <div className="mb-4">
        <label className="block text-sm text-white/70 mb-1">Team Members</label>
        <div className="space-y-2">
          {value.members.map((m:any, i:number)=> (
            <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <input placeholder="Name" value={m.name} onChange={(e)=>{
                const next = value.members.slice(); next[i] = { ...next[i], name: e.target.value }; onChange({ ...value, members: next });
              }} className="p-2 rounded-xl bg-[rgba(255,255,255,0.02)]" />
              <input placeholder="Email" value={m.email} onChange={(e)=>{
                const next = value.members.slice(); next[i] = { ...next[i], email: e.target.value }; onChange({ ...value, members: next });
              }} className="p-2 rounded-xl bg-[rgba(255,255,255,0.02)]" />
              <input placeholder="Phone" value={m.phone} onChange={(e)=>{
                const next = value.members.slice(); next[i] = { ...next[i], phone: e.target.value }; onChange({ ...value, members: next });
              }} className="p-2 rounded-xl bg-[rgba(255,255,255,0.02)]" />
            </div>
          ))}
        </div>
        <div className="mt-3">
          <button onClick={addMember} className="px-4 py-2 rounded-full bg-[rgba(255,255,255,0.02)]">Add Member</button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={onBack} className="px-6 py-3 rounded-full bg-[rgba(255,255,255,0.02)]">Back</button>
        <button onClick={onNext} className="btn-gradient px-6 py-3 rounded-full">Next</button>
      </div>
    </div>
  );
}
