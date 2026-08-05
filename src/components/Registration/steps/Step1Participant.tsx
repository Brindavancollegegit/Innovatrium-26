import React from 'react';

export default function Step1Participant({ value, onChange, onNext }: any) {
  return (
    <div>
      <div className="text-sm text-white/70 mb-4">Choose participation type</div>
      <div className="flex gap-3">
        <button onClick={() => onChange('day1')} className={`px-4 py-2 rounded-full ${value==='day1' ? 'bg-primary text-black' : 'bg-[rgba(255,255,255,0.02)]'}`}>Day 1 Workshop only</button>
        <button onClick={() => onChange('day2')} className={`px-4 py-2 rounded-full ${value==='day2' ? 'bg-primary text-black' : 'bg-[rgba(255,255,255,0.02)]'}`}>Day 2 Competition</button>
        <button onClick={() => onChange('both')} className={`px-4 py-2 rounded-full ${value==='both' ? 'bg-primary text-black' : 'bg-[rgba(255,255,255,0.02)]'}`}>Both</button>
      </div>
      <div className="mt-6 flex items-center gap-3">
        <button disabled={!value} onClick={onNext} className={`btn-gradient px-6 py-3 rounded-full ${!value ? 'opacity-50 cursor-not-allowed' : ''}`}>Next</button>
      </div>
    </div>
  );
}
