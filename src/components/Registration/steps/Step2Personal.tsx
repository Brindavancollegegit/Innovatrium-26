import React, { useState } from 'react';

export default function Step2Personal({ value, onChange, onNext, onBack }: any) {
  const [errors, setErrors] = useState<any>({});

  function handleBlur(field: string, val: string) {
    let err = '';
    if (field === 'email' && val && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val)) err = 'Invalid email';
    if (field === 'phone' && val && !/^\d{10}$/.test(val)) err = 'Phone must be 10 digits';
    setErrors((e:any)=>({ ...e, [field]: err }));
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-white/70 mb-1">Full Name</label>
          <input value={value.fullName} onChange={(e)=>onChange({ ...value, fullName: e.target.value })} className="w-full p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]" />
        </div>
        <div>
          <label className="block text-sm text-white/70 mb-1">Email</label>
          <input value={value.email} onBlur={(e)=>handleBlur('email', e.target.value)} onChange={(e)=>onChange({ ...value, email: e.target.value })} className="w-full p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]" />
          {errors.email && <div className="text-rose-400 text-sm mt-1">{errors.email}</div>}
        </div>

        <div>
          <label className="block text-sm text-white/70 mb-1">Phone</label>
          <input value={value.phone} onBlur={(e)=>handleBlur('phone', e.target.value)} onChange={(e)=>onChange({ ...value, phone: e.target.value })} className="w-full p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]" />
          {errors.phone && <div className="text-rose-400 text-sm mt-1">{errors.phone}</div>}
        </div>

        <div>
          <label className="block text-sm text-white/70 mb-1">College</label>
          <input value={value.college} onChange={(e)=>onChange({ ...value, college: e.target.value })} className="w-full p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]" />
        </div>
        <div>
          <label className="block text-sm text-white/70 mb-1">Branch</label>
          <input value={value.branch} onChange={(e)=>onChange({ ...value, branch: e.target.value })} className="w-full p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]" />
        </div>

        <div>
          <label className="block text-sm text-white/70 mb-1">Year of Study</label>
          <select value={value.year} onChange={(e)=>onChange({ ...value, year: e.target.value })} className="w-full p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]">
            <option value="">Select year</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button onClick={onBack} className="px-6 py-3 rounded-full bg-[rgba(255,255,255,0.02)]">Back</button>
        <button onClick={onNext} className="btn-gradient px-6 py-3 rounded-full">Next</button>
      </div>
    </div>
  );
}
