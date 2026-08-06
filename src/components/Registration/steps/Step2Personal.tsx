import React, { useState } from 'react';

export default function Step2Personal({ participant, value, onChange, onNext, onBack }: any) {
  const [errors, setErrors] = useState<any>({});

  function handleBlur(field: string, val: string) {
    let err = '';
    if (field === 'email' && val && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val)) err = 'Invalid email address';
    if (field === 'phone' && val && !/^\d{10}$/.test(val)) err = 'Phone must be 10 digits';
    if (field === 'ieeeNumber' && participant === 'ieee' && !val.trim()) err = 'IEEE Number is required';
    setErrors((e: any) => ({ ...e, [field]: err }));
  }

  const isFormValid =
    value.fullName &&
    value.email &&
    value.phone &&
    value.college &&
    (participant !== 'ieee' || value.ieeeNumber);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Conditional IEEE Membership Number Field */}
        {participant === 'ieee' && (
          <div className="md:col-span-2">
            <label className="block text-sm text-primary mb-1 font-medium">IEEE Membership Number *</label>
            <input
              value={value.ieeeNumber || ''}
              onBlur={(e) => handleBlur('ieeeNumber', e.target.value)}
              onChange={(e) => onChange({ ...value, ieeeNumber: e.target.value })}
              placeholder="e.g. 98765432"
              className="w-full p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-primary/40 focus:border-primary text-white outline-none"
            />
            {errors.ieeeNumber && <div className="text-rose-400 text-sm mt-1">{errors.ieeeNumber}</div>}
          </div>
        )}

        <div>
          <label className="block text-sm text-white/70 mb-1">Full Name *</label>
          <input
            value={value.fullName}
            onChange={(e) => onChange({ ...value, fullName: e.target.value })}
            className="w-full p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] text-white outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-white/70 mb-1">Email *</label>
          <input
            value={value.email}
            onBlur={(e) => handleBlur('email', e.target.value)}
            onChange={(e) => onChange({ ...value, email: e.target.value })}
            className="w-full p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] text-white outline-none"
          />
          {errors.email && <div className="text-rose-400 text-sm mt-1">{errors.email}</div>}
        </div>

        <div>
          <label className="block text-sm text-white/70 mb-1">Phone *</label>
          <input
            value={value.phone}
            onBlur={(e) => handleBlur('phone', e.target.value)}
            onChange={(e) => onChange({ ...value, phone: e.target.value })}
            className="w-full p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] text-white outline-none"
          />
          {errors.phone && <div className="text-rose-400 text-sm mt-1">{errors.phone}</div>}
        </div>

        <div>
          <label className="block text-sm text-white/70 mb-1">College *</label>
          <input
            value={value.college}
            onChange={(e) => onChange({ ...value, college: e.target.value })}
            className="w-full p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] text-white outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-white/70 mb-1">Branch</label>
          <input
            value={value.branch}
            onChange={(e) => onChange({ ...value, branch: e.target.value })}
            className="w-full p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] text-white outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-white/70 mb-1">Year of Study</label>
          <select
            value={value.year}
            onChange={(e) => onChange({ ...value, year: e.target.value })}
            className="w-full p-3 rounded-xl bg-[#0d1117] border border-[rgba(255,255,255,0.04)] text-white outline-none"
          >
            <option value="">Select year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-3">
        <button onClick={onBack} className="px-6 py-3 rounded-full bg-[rgba(255,255,255,0.05)] text-white">
          Back
        </button>
        <button
          disabled={!isFormValid}
          onClick={onNext}
          className={`btn-gradient px-8 py-3 rounded-full ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Next
        </button>
      </div>
    </div>
  );
}