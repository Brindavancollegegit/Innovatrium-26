import { CheckCircle, Medal, Users, ArrowRight } from '@phosphor-icons/react';

export default function Step1Participant({ value, onChange, onNext }: any) {
  return (
    <div>
      <div className="text-sm text-white/70 mb-5">
        Select your team's IEEE membership status to determine entry pricing:
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* IEEE Member Option */}
        <button
          type="button"
          onClick={() => onChange('ieee')}
          className={`relative p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer active:scale-[0.98] ${
            value === 'ieee'
              ? 'bg-blue-500/15 border-blue-400 text-white shadow-lg shadow-blue-500/10 ring-1 ring-blue-400'
              : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05] text-white/80'
          }`}
        >
          <div className="flex justify-between items-start mb-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
              <Medal weight="duotone" className="w-5 h-5" />
            </div>
            {value === 'ieee' && <CheckCircle weight="duotone" className="w-5 h-5 text-blue-400" />}
          </div>

          <div className="font-display font-semibold text-lg text-white">IEEE Member</div>
          <div className="text-xs text-white/60 mt-1">Lead participant holds an active IEEE membership.</div>
          
          <div className="mt-4 pt-3 border-t border-white/10 flex items-baseline justify-between">
            
            <span className="font-mono text-lg font-bold text-sky-400">Free</span>
          </div>
        </button>

        {/* Non-IEEE Option */}
        <button
          type="button"
          onClick={() => onChange('non-ieee')}
          className={`relative p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer active:scale-[0.98] ${
            value === 'non-ieee'
              ? 'bg-blue-500/15 border-blue-400 text-white shadow-lg shadow-blue-500/10 ring-1 ring-blue-400'
              : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05] text-white/80'
          }`}
        >
          <div className="flex justify-between items-start mb-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
              <Users weight="duotone" className="w-5 h-5" />
            </div>
            {value === 'non-ieee' && <CheckCircle weight="duotone" className="w-5 h-5 text-blue-400" />}
          </div>

          <div className="font-display font-semibold text-lg text-white">Non-IEEE Participant</div>
          <div className="text-xs text-white/60 mt-1">Open to all university and college students.</div>
          
          <div className="mt-4 pt-3 border-t border-white/10 flex items-baseline justify-between">
            <span className="font-mono text-lg font-bold text-emerald-400">Free</span>
          </div>
        </button>
      </div>

      <div className="mt-8 flex items-center justify-end">
        <button
          type="button"
          disabled={!value}
          onClick={onNext}
          className={`btn-gradient inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-medium text-sm transition-all shadow-md active:scale-95 ${
            !value ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-blue-500/25'
          }`}
        >
          <span>Continue to Personal Info</span>
          <ArrowRight weight="duotone" className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
