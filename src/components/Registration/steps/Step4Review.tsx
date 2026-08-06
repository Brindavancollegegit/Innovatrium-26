import { useState } from 'react';
import { Copy, Check, ExternalLink, AlertCircle, ArrowLeft, ShieldCheck, CheckCircle2, CreditCard } from 'lucide-react';

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
  const [utrNumber, setUtrNumber] = useState('');
  const [utrError, setUtrError] = useState('');
  const [copied, setCopied] = useState(false);

  const totalAmount = participant === 'ieee' ? 300 : 350;
  const upiId = 'your-upi-id@okaxis'; // UPDATE YOUR UPI ID HERE
  const upiPayUrl = `upi://pay?pa=${upiId}&pn=Innovatrium26&am=${totalAmount}&cu=INR`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
    upiPayUrl
  )}`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormSubmit = () => {
    if (!/^\d{12}$/.test(utrNumber)) {
      setUtrError('Please enter a valid 12-digit UTR / UPI Ref Number');
      return;
    }
    setUtrError('');
    onSubmit({ utrNumber, totalAmount });
  };

  return (
    <div>
      <div className="mb-6">
        <div className="font-display text-xl font-bold text-white mb-1">Review & Payment</div>
        <div className="text-xs sm:text-sm text-white/70 mb-4">
          Confirm your details, complete payment via UPI, and submit your bank reference ID.
        </div>

        {/* Server Submission Error Banner */}
        {submissionError && (
          <div className="mb-4 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-rose-300">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-400" />
            <div className="text-xs sm:text-sm">
              <p className="font-semibold text-rose-200">Registration Failed</p>
              <p className="text-rose-300/90 text-xs mt-0.5">{submissionError}</p>
            </div>
          </div>
        )}

        {/* Details Summary Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
          <div className="flex justify-between items-center text-xs sm:text-sm">
            <div>
              <span className="text-white/50">Membership: </span>
              <span className="font-mono text-white font-medium">
                {participant === 'ieee' ? 'IEEE Member (₹300)' : 'Non-IEEE Participant (₹350)'}
              </span>
              {participant === 'ieee' && (
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

          <div className="flex justify-between items-center text-xs sm:text-sm border-t border-white/5 pt-2.5">
            <div>
              <span className="text-white/50">Lead: </span>
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

          <div className="flex justify-between items-center text-xs sm:text-sm border-t border-white/5 pt-2.5">
            <div>
              <span className="text-white/50">Track: </span>
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

      {/* Paywall & UTR Section */}
      <div className="mb-6 p-5 sm:p-6 rounded-2xl bg-blue-500/5 border border-blue-500/20 space-y-5">
        <div className="flex justify-between items-center">
          <span className="text-white text-xs sm:text-sm font-medium">Total Team Payable Amount:</span>
          <span className="text-2xl font-bold font-mono text-sky-400">₹{totalAmount}</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-5 bg-black/50 p-4 sm:p-5 rounded-2xl border border-white/5">
          <img 
            src={qrCodeUrl} 
            alt="UPI Payment QR Code" 
            width="130" 
            height="130" 
            loading="lazy" 
            decoding="async" 
            className="w-32 h-32 rounded-xl bg-white p-1.5 shrink-0 shadow-md" 
          />
          <div className="text-xs text-white/70 space-y-2 text-center sm:text-left flex-1">
            <p className="font-semibold text-white flex items-center justify-center sm:justify-start gap-1.5">
              <CreditCard className="w-4 h-4 text-sky-400" />
              <span>Scan & Pay with Any UPI App</span>
            </p>
            
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <span className="text-white/50">UPI ID:</span>
              <span className="font-mono text-sky-400 font-bold">{upiId}</span>
              <button
                type="button"
                onClick={handleCopyUpi}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>

            <p className="text-[11px] text-white/50 leading-relaxed">
              Amount is pre-fixed to ₹{totalAmount}. After payment, copy the 12-digit UTR / UPI Ref ID from your payment history.
            </p>
            
            {/* Mobile Direct Pay Intent */}
            <div className="pt-1.5 block sm:hidden">
              <a
                href={upiPayUrl}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-500/20 border border-blue-400/40 text-blue-300 font-medium text-xs hover:bg-blue-500/30 transition-colors w-full justify-center"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Pay via Installed UPI App
              </a>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
            12-Digit UTR / Transaction Reference ID *
          </label>
          <input
            type="text"
            maxLength={12}
            value={utrNumber}
            onChange={(e) => {
              setUtrNumber(e.target.value.replace(/\D/g, ''));
              if (utrError) setUtrError('');
            }}
            placeholder="e.g. 423819203812"
            className="w-full h-12 px-4 rounded-xl bg-black/60 border border-blue-400/40 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 text-white font-mono tracking-widest text-base outline-none transition-all placeholder:tracking-normal placeholder:font-sans placeholder:text-xs placeholder:text-white/30"
          />
          {utrError && (
            <p className="flex items-center gap-1 text-rose-400 text-xs mt-1.5">
              <AlertCircle className="w-3.5 h-3.5" /> {utrError}
            </p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <label className="inline-flex items-start gap-2.5 cursor-pointer text-xs text-white/80 select-none">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 rounded border-white/20 bg-black/40 text-primary w-4 h-4"
          />
          <span>
            I agree to the event guidelines and confirm that all submitted details and payment reference IDs are accurate.
          </span>
        </label>
      </div>

      <div className="flex items-center justify-between gap-3">
        <button 
          type="button"
          onClick={() => onEdit(3)} 
          className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-all cursor-pointer active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <button
          type="button"
          disabled={!consent || utrNumber.length !== 12 || submitting}
          onClick={handleFormSubmit}
          className={`btn-gradient inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm transition-all shadow-lg active:scale-95 ${
            !consent || utrNumber.length !== 12 || submitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-blue-500/30'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>{submitting ? 'Submitting Registration...' : 'Complete & Generate Pass'}</span>
        </button>
      </div>
    </div>
  );
}