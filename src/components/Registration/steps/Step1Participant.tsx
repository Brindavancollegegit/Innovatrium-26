import React from 'react';

export default function Step1Participant({ value, onChange, onNext }: any) {
  return (
    <div>
      <div className="text-sm text-white/70 mb-4">Choose your membership status</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => onChange('ieee')}
          className={`p-5 rounded-2xl border text-left transition-all ${
            value === 'ieee'
              ? 'bg-primary/10 border-primary text-white'
              : 'bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.05)]'
          }`}
        >
          <div className="font-display font-medium text-lg text-white">IEEE Member</div>
          <div className="text-sm text-white/60 mt-1">₹300 per team (Flat Fee)</div>
        </button>

        <button
          onClick={() => onChange('non-ieee')}
          className={`p-5 rounded-2xl border text-left transition-all ${
            value === 'non-ieee'
              ? 'bg-primary/10 border-primary text-white'
              : 'bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.05)]'
          }`}
        >
          <div className="font-display font-medium text-lg text-white">Non-IEEE Member</div>
          <div className="text-sm text-white/60 mt-1">₹350 per team (Flat Fee)</div>
        </button>
      </div>

      <div className="mt-8 flex items-center gap-3">
        <button
          disabled={!value}
          onClick={onNext}
          className={`btn-gradient px-8 py-3 rounded-full font-medium ${
            !value ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Next Step
        </button>
      </div>
    </div>
  );
}