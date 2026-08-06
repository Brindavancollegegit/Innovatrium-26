import React from 'react';

export default function StepList({ steps, current, goTo, isStepAccessible }: any) {
  const labels: any = {
    1: 'Participant',
    2: 'Personal',
    3: 'Competition',
    4: 'Review',
  };

  return (
    <div className="space-y-3">
      {steps.map((s: number, idx: number) => {
        const accessible = isStepAccessible(s);
        const isCurrent = current === s;

        return (
          <button
            key={s}
            type="button" // CRITICAL: Prevents default form triggers
            disabled={!accessible}
            onClick={() => accessible && goTo(s)}
            className={`w-full text-left p-3.5 rounded-xl transition-all duration-200 ${
              isCurrent
                ? 'bg-primary/10 border border-primary/40 text-white font-medium'
                : accessible
                ? 'bg-transparent text-white/70 hover:bg-white/5 hover:text-white cursor-pointer'
                : 'bg-transparent text-white/25 cursor-not-allowed opacity-50'
            }`}
          >
            <div className="flex justify-between items-center text-xs uppercase tracking-wider text-white/50 mb-1">
              <span>Step {idx + 1}</span>
              {!accessible && <span className="text-xs">🔒 Locked</span>}
            </div>
            <div className="font-display text-base font-medium">{labels[s]}</div>
          </button>
        );
      })}
    </div>
  );
}