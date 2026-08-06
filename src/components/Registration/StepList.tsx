import { CheckCircle2, Lock, User, Users, FileText, CreditCard } from 'lucide-react';

export default function StepList({ steps, current, goTo, isStepAccessible }: any) {
  const stepMeta: Record<number, { label: string; icon: any }> = {
    1: { label: 'Participant Type', icon: User },
    2: { label: 'Personal Info', icon: FileText },
    3: { label: 'Competition Track', icon: Users },
    4: { label: 'Review & Pay', icon: CreditCard },
  };

  const progressPercent = Math.round(((current - 1) / (steps.length - 1)) * 100);

  return (
    <div className="w-full">
      {/* Mobile Compact Stepper (< 768px) */}
      <div className="block md:hidden mb-6 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
        <div className="flex items-center justify-between text-xs text-white/70 mb-2">
          <span className="font-semibold text-white">
            Step {current} of {steps.length}: <span className="text-sky-400 font-normal">{stepMeta[current]?.label}</span>
          </span>
          <span className="font-mono text-[11px] text-white/50">{progressPercent}% Completed</span>
        </div>
        
        {/* Animated Progress Track */}
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-3">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 rounded-full transition-all duration-300"
            style={{ width: `${Math.max(10, progressPercent)}%` }}
          />
        </div>

        {/* 4 Interactive Step Pill Dots */}
        <div className="flex items-center justify-between gap-1.5">
          {steps.map((s: number) => {
            const accessible = isStepAccessible(s);
            const isCurrent = current === s;
            const isCompleted = s < current;
            return (
              <button
                key={s}
                type="button"
                disabled={!accessible}
                onClick={() => accessible && goTo(s)}
                className={`flex-1 py-1.5 px-2 rounded-lg text-center text-[11px] font-medium transition-all ${
                  isCurrent
                    ? 'bg-blue-500/20 border border-blue-400/40 text-blue-300'
                    : isCompleted
                    ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                    : accessible
                    ? 'bg-white/5 text-white/60 hover:bg-white/10'
                    : 'bg-transparent text-white/20 cursor-not-allowed'
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop Vertical Stepper (>= 768px) */}
      <div className="hidden md:flex flex-col space-y-3">
        {steps.map((s: number, idx: number) => {
          const accessible = isStepAccessible(s);
          const isCurrent = current === s;
          const isCompleted = s < current;
          const Icon = stepMeta[s]?.icon || User;

          return (
            <button
              key={s}
              type="button"
              disabled={!accessible}
              onClick={() => accessible && goTo(s)}
              className={`w-full text-left p-3.5 rounded-2xl transition-all duration-200 ${
                isCurrent
                  ? 'bg-primary/10 border border-primary/40 text-white font-medium shadow-md shadow-blue-500/10'
                  : isCompleted
                  ? 'bg-white/[0.02] border border-emerald-500/30 text-white/90 hover:bg-white/5 cursor-pointer'
                  : accessible
                  ? 'bg-transparent border border-white/5 text-white/70 hover:bg-white/5 hover:text-white cursor-pointer'
                  : 'bg-transparent border border-transparent text-white/25 cursor-not-allowed opacity-50'
              }`}
            >
              <div className="flex justify-between items-center text-[11px] uppercase tracking-wider text-white/50 mb-1">
                <span className="flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5 text-white/60" />
                  Step {idx + 1}
                </span>
                {isCompleted ? (
                  <span className="inline-flex items-center gap-1 text-emerald-400 text-[11px] font-semibold lowercase">
                    <CheckCircle2 className="w-3.5 h-3.5" /> done
                  </span>
                ) : !accessible ? (
                  <span className="inline-flex items-center gap-1 text-white/40 text-[10px]">
                    <Lock className="w-3 h-3" /> locked
                  </span>
                ) : null}
              </div>
              <div className="font-display text-sm font-medium">{stepMeta[s]?.label}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}