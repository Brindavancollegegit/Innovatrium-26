import { useState } from 'react';
import { ArrowLeft, ArrowRight, User, Mail, Phone, Building2, BookOpen, Calendar, AlertCircle } from 'lucide-react';

export default function Step2Personal({ participant, value, onChange, onNext, onBack }: any) {
  const [errors, setErrors] = useState<any>({});

  function handleBlur(field: string, val: string) {
    let err = '';
    if (field === 'email' && val && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val)) err = 'Invalid email address format';
    if (field === 'phone' && val && !/^\d{10}$/.test(val)) err = 'Phone must be a valid 10-digit number';
    if (field === 'ieeeNumber' && participant === 'ieee' && !val.trim()) err = 'IEEE Membership Number is required';
    setErrors((e: any) => ({ ...e, [field]: err }));
  }

  const isFormValid =
    value.fullName?.trim() &&
    value.email?.trim() &&
    value.phone?.trim() &&
    value.college?.trim() &&
    (participant !== 'ieee' || value.ieeeNumber?.trim());

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Conditional IEEE Membership Number Field */}
        {participant === 'ieee' && (
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-sky-400 uppercase tracking-wider mb-1.5">
              IEEE Membership Number *
            </label>
            <input
              type="text"
              value={value.ieeeNumber || ''}
              onBlur={(e) => handleBlur('ieeeNumber', e.target.value)}
              onChange={(e) => onChange({ ...value, ieeeNumber: e.target.value })}
              placeholder="e.g. 98765432"
              className="w-full h-11 sm:h-12 px-4 rounded-xl bg-white/[0.03] border border-sky-400/50 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 text-white font-mono text-base sm:text-sm outline-none transition-all"
            />
            {errors.ieeeNumber && (
              <p className="flex items-center gap-1 text-rose-400 text-xs mt-1.5">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.ieeeNumber}
              </p>
            )}
          </div>
        )}

        {/* Full Name */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-medium text-white/70 mb-1.5">
            <User className="w-3.5 h-3.5 text-white/50" /> Full Name *
          </label>
          <input
            type="text"
            placeholder="John Doe"
            value={value.fullName}
            onChange={(e) => onChange({ ...value, fullName: e.target.value })}
            className="w-full h-11 sm:h-12 px-4 rounded-xl bg-white/[0.03] border border-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 text-white text-base sm:text-sm outline-none transition-all placeholder:text-white/30"
          />
        </div>

        {/* Email */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-medium text-white/70 mb-1.5">
            <Mail className="w-3.5 h-3.5 text-white/50" /> Email Address *
          </label>
          <input
            type="email"
            placeholder="john@example.com"
            value={value.email}
            onBlur={(e) => handleBlur('email', e.target.value)}
            onChange={(e) => onChange({ ...value, email: e.target.value })}
            className="w-full h-11 sm:h-12 px-4 rounded-xl bg-white/[0.03] border border-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 text-white text-base sm:text-sm outline-none transition-all placeholder:text-white/30"
          />
          {errors.email && (
            <p className="flex items-center gap-1 text-rose-400 text-xs mt-1.5">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-medium text-white/70 mb-1.5">
            <Phone className="w-3.5 h-3.5 text-white/50" /> Phone (WhatsApp) *
          </label>
          <input
            type="tel"
            maxLength={10}
            placeholder="9876543210"
            value={value.phone}
            onBlur={(e) => handleBlur('phone', e.target.value)}
            onChange={(e) => onChange({ ...value, phone: e.target.value.replace(/\D/g, '') })}
            className="w-full h-11 sm:h-12 px-4 rounded-xl bg-white/[0.03] border border-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 text-white font-mono text-base sm:text-sm outline-none transition-all placeholder:text-white/30"
          />
          {errors.phone && (
            <p className="flex items-center gap-1 text-rose-400 text-xs mt-1.5">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
            </p>
          )}
        </div>

        {/* College */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-medium text-white/70 mb-1.5">
            <Building2 className="w-3.5 h-3.5 text-white/50" /> College / Institution *
          </label>
          <input
            type="text"
            placeholder="e.g. Brindavan College of Engineering"
            value={value.college}
            onChange={(e) => onChange({ ...value, college: e.target.value })}
            className="w-full h-11 sm:h-12 px-4 rounded-xl bg-white/[0.03] border border-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 text-white text-base sm:text-sm outline-none transition-all placeholder:text-white/30"
          />
        </div>

        {/* Branch */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-medium text-white/70 mb-1.5">
            <BookOpen className="w-3.5 h-3.5 text-white/50" /> Branch / Department
          </label>
          <input
            type="text"
            placeholder="e.g. Computer Science"
            value={value.branch}
            onChange={(e) => onChange({ ...value, branch: e.target.value })}
            className="w-full h-11 sm:h-12 px-4 rounded-xl bg-white/[0.03] border border-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 text-white text-base sm:text-sm outline-none transition-all placeholder:text-white/30"
          />
        </div>

        {/* Year of Study */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-medium text-white/70 mb-1.5">
            <Calendar className="w-3.5 h-3.5 text-white/50" /> Year of Study
          </label>
          <select
            value={value.year}
            onChange={(e) => onChange({ ...value, year: e.target.value })}
            className="w-full h-11 sm:h-12 px-4 rounded-xl bg-[#090d14] border border-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 text-white text-base sm:text-sm outline-none transition-all cursor-pointer"
          >
            <option value="">Select current year</option>
            <option value="1">1st Year (Fresher)</option>
            <option value="2">2nd Year (Sophomore)</option>
            <option value="3">3rd Year (Junior)</option>
            <option value="4">4th Year (Senior)</option>
          </select>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-3">
        <button 
          type="button"
          onClick={onBack} 
          className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-all cursor-pointer active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <button
          type="button"
          disabled={!isFormValid}
          onClick={onNext}
          className={`btn-gradient inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-medium text-sm transition-all shadow-md active:scale-95 ${
            !isFormValid ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-blue-500/25'
          }`}
        >
          <span>Choose Competition Track</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}