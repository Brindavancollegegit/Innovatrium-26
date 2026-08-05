import React, { useState } from 'react';

export default function Step4Review({ participant, personal, competition, onEdit, onSubmit, submitting }: any) {
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  return (
    <div>
      <div className="mb-4">
        <div className="font-display text-xl mb-2">Review & Submit</div>
        <div className="font-sans text-sm text-white/70 mb-4">Please confirm your details before submitting.</div>

        <div className="mb-3">
          <div className="font-sans text-sm text-white/60">Participant Type</div>
          <div className="font-mono">{participant}</div>
          <a onClick={()=>onEdit(1)} className="text-primary ml-2 cursor-pointer">Edit</a>
        </div>

        <div className="mb-3">
          <div className="font-sans text-sm text-white/60">Personal</div>
          <div className="font-mono">{personal.fullName} — {personal.email}</div>
          <a onClick={()=>onEdit(2)} className="text-primary ml-2 cursor-pointer">Edit</a>
        </div>

        <div className="mb-3">
          <div className="font-sans text-sm text-white/60">Competition</div>
          <div className="font-mono">{competition.competitionId || 'N/A'} — Team: {competition.teamName || 'N/A'}</div>
          <a onClick={()=>onEdit(3)} className="text-primary ml-2 cursor-pointer">Edit</a>
        </div>
      </div>

      <div className="mb-4">
        <div className="font-sans text-sm text-white/70 mb-2">Registration fee: ₹[amount] — payment details will be shared with you separately after you register.</div>
      </div>

      <div className="mb-4">
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" checked={consent} onChange={(e)=>setConsent(e.target.checked)} />
          <span className="text-sm">I agree to the event terms and code of conduct</span>
        </label>
      </div>

      {/* honeypot */}
      <input className="hidden" value={honeypot} onChange={(e)=>setHoneypot(e.target.value)} />

      <div className="flex items-center gap-3">
        <button onClick={()=>onEdit(3)} className="px-6 py-3 rounded-full bg-[rgba(255,255,255,0.02)]">Back</button>
        <button disabled={!consent || submitting} onClick={()=>onSubmit(honeypot)} className="btn-gradient px-6 py-3 rounded-full">
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </div>
  );
}
