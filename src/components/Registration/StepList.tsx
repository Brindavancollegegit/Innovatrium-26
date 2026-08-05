import React from 'react';

export default function StepList({ steps, current, goTo, participant } : any) {
  const labels: any = {
    1: 'Participant',
    2: 'Personal',
    3: 'Competition',
    4: 'Review'
  };

  return (
    <div className="space-y-3">
      {steps.map((s: number, idx: number) => (
        <button key={s} onClick={() => goTo(s)} className={`w-full text-left p-3 rounded-xl ${current===s ? 'bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)]' : 'bg-transparent'} transition-colors`}>
          <div className="font-sans text-sm text-white/70">Step {idx+1}</div>
          <div className="font-display text-lg font-medium">{labels[s]}</div>
        </button>
      ))}
    </div>
  );
}
