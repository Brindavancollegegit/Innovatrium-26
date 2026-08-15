import { useState } from 'react';
import { WarningCircle, ArrowLeft, ShieldCheck, Ticket, CheckCircle } from '@phosphor-icons/react';

export default function Step4Review({
  participant,
  personal,
  competition,
  onEdit,
  onSubmit,
  submitting,
  submissionError,
}: any) {
  const [consent, setConsent] = useState(false);

  const handleFormSubmit = () => {
    onSubmit({ utrNumber: 'FREE', totalAmount: 0 });
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1">
          <div className="font-display text-xl font-bold text-white">Review & Confirm</div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 font-mono text-xs font-semibold uppercase tracking-wider">
            <Ticket weight="duotone" className="w-3.5 h-3.5" /> FREE PASS
          </span>
        </div>
        <div className="text-xs sm:text-sm text-slate-300 mb-4">
          Review your details below and confirm your registration to claim your free event pass.
        </div>

        {/* Server Submission Error Banner */}
        {submissionError && (
          <div className="mb-4 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-rose-300">
            <WarningCircle weight="duotone" className="w-5 h-5 shrink-0 mt-0.5 text-rose-400" />
            <div className="text-xs sm:text-sm">
              <p className="font-semibold text-rose-200">Registration Failed</p>
              <p className="text-rose-300/90 text-xs mt-0.5">{submissionError}</p>
            </div>
          </div>
        )}

        {/* Details Summary Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
          {/* Membership */}
          <div className="flex justify-between items-center text-xs sm:text-sm">
            <div>
              <span className="text-slate-400">Membership: </span>
              <span className="font-mono text-white font-medium">
                {participant === 'ieee' ? 'IEEE Member' : 'Non-IEEE Participant'}
              </span>
              {participant === 'ieee' && personal.ieeeNumber && (
                <span className="text-[11px] text-sky-400 block font-mono">IEEE ID: {personal.ieeeNumber}</span>
              )}
            </div>
            <button 
              type="button" 
              onClick={() => onEdit(1)} 
              className="text-sky-400 text-xs font-semibold hover:underline cursor-pointer"
            >
              Edit
            </button>
          </div>

          {/* Lead Participant */}
          <div className="flex justify-between items-center text-xs sm:text-sm border-t border-white/5 pt-2.5">
            <div>
              <span className="text-slate-400">Team Lead: </span>
              <span className="font-mono text-white">
                {personal.fullName} ({personal.email})
              </span>
            </div>
            <button 
              type="button" 
              onClick={() => onEdit(2)} 
              className="text-sky-400 text-xs font-semibold hover:underline cursor-pointer"
            >
              Edit
            </button>
          </div>

          {/* Track & Team */}
          <div className="flex justify-between items-center text-xs sm:text-sm border-t border-white/5 pt-2.5">
            <div>
              <span className="text-slate-400">Track: </span>
              <span className="font-mono text-white">
                {competition.competitionId} — Team "{competition.teamName}" ({competition.members.length + 1} attendees)
              </span>
            </div>
            <button 
              type="button" 
              onClick={() => onEdit(3)} 
              className="text-sky-400 text-xs font-semibold hover:underline cursor-pointer"
            >
              Edit
            </button>
          </div>
        </div>
      </div>

      {/* Free Pass Banner */}
      <div className="mb-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-blue-500/10 border border-emerald-400/30 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle weight="duotone" className="w-5 h-5 text-emerald-400" />
            <span className="!text-white text-sm sm:text-base font-semibold">Total Registration Fee</span>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold font-mono text-emerald-400">₹0</span>
            <span className="text-[10px] text-emerald-300 uppercase tracking-widest block font-semibold">FREE ENTRY</span>
          </div>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          No payment is required for Innovatrium '26! Upon clicking confirm, your official event pass will be generated immediately.
        </p>
      </div>

      {/* Consent Checkbox */}
      <div className="mb-6">
        <label className="inline-flex items-start gap-2.5 cursor-pointer text-xs text-slate-200 select-none">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 rounded border-white/20 bg-black/40 text-emerald-400 w-4 h-4 cursor-pointer"
          />
          <span>
            I agree to the event guidelines and confirm that all submitted team details are accurate.
          </span>
        </label>
      </div>

      {/* Navigation & Submit Action */}
      <div className="flex items-center justify-between gap-3">
        <button 
          type="button"
          onClick={() => onEdit(3)} 
          className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-all cursor-pointer active:scale-95"
        >
          <ArrowLeft weight="duotone" className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          type="button"
          disabled={!consent || submitting}
          onClick={handleFormSubmit}
          className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm transition-all shadow-lg active:scale-95 ${
            !consent || submitting 
              ? 'opacity-50 cursor-not-allowed bg-white/10 text-slate-400' 
              : 'bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 text-slate-950 hover:shadow-[0_0_25px_rgba(52,211,153,0.4)] cursor-pointer'
          }`}
        >
          <ShieldCheck weight="duotone" className="w-4 h-4" />
          <span>{submitting ? 'Confirming Pass...' : 'Confirm & Claim Free Pass'}</span>
        </button>
      </div>
    </div>
  );
}