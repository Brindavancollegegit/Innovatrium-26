import React, { useState } from 'react';
import { Copy, Check, ExternalLink, AlertCircle } from 'lucide-react';

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
        <div className="font-display text-xl text-white mb-1">Review & Payment</div>
        <div className="text-sm text-white/70 mb-4">
          Confirm your details, make payment via UPI, and submit your UTR number.
        </div>

        {/* Server Submission Error Banner */}
        {submissionError && (
          <div className="mb-4 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-rose-300">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-400" />
            <div className="text-sm">
              <p className="font-semibold text-rose-200">Registration Error</p>
              <p className="text-rose-300/90 text-xs mt-0.5">{submissionError}</p>
            </div>
          </div>
        )}

        {/* Details Summary */}
        <div className="p-4 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] space-y-3">
          <div className="flex justify-between items-center text-sm">
            <div>
              <span className="text-white/60">Membership: </span>
              <span className="font-mono text-white">
                {participant === 'ieee' ? 'IEEE Member (₹300)' : 'Non-IEEE Participant (₹350)'}
              </span>
              {participant === 'ieee' && (
                <span className="text-xs text-primary block">IEEE ID: {personal.ieeeNumber}</span>
              )}
            </div>
            <button onClick={() => onEdit(1)} className="text-primary text-xs hover:underline">
              Edit
            </button>
          </div>

          <div className="flex justify-between items-center text-sm border-t border-white/5 pt-2">
            <div>
              <span className="text-white/60">Lead: </span>
              <span className="font-mono text-white">
                {personal.fullName} ({personal.email})
              </span>
            </div>
            <button onClick={() => onEdit(2)} className="text-primary text-xs hover:underline">
              Edit
            </button>
          </div>

          <div className="flex justify-between items-center text-sm border-t border-white/5 pt-2">
            <div>
              <span className="text-white/60">Event: </span>
              <span className="font-mono text-white">
                {competition.competitionId} — Team: {competition.teamName} ({competition.members.length + 1} members)
              </span>
            </div>
            <button onClick={() => onEdit(3)} className="text-primary text-xs hover:underline">
              Edit
            </button>
          </div>
        </div>
      </div>

      {/* Paywall & UTR Section */}
      <div className="mb-6 p-5 rounded-2xl bg-primary/5 border border-primary/20 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-white text-sm font-medium">Total Payable Amount:</span>
          <span className="text-2xl font-bold font-mono text-primary">₹{totalAmount}</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-5 bg-black/40 p-4 rounded-xl">
          <img 
            src={qrCodeUrl} 
            alt="UPI Payment QR" 
            width="128" 
            height="128" 
            loading="lazy" 
            decoding="async" 
            className="w-32 h-32 rounded-lg bg-white p-1 shrink-0" 
          />
          <div className="text-xs text-white/70 space-y-2.5 text-center sm:text-left flex-1">
            <p className="font-semibold text-white">Scan with GPay / PhonePe / Paytm / BHIM</p>
            
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <span className="text-white/60">UPI ID:</span>
              <span className="font-mono text-primary font-bold">{upiId}</span>
              <button
                type="button"
                onClick={handleCopyUpi}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white/80 text-[11px] transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>

            <p className="text-white/50">Amount is pre-set to ₹{totalAmount}. After paying, copy the 12-digit UTR/Ref No. from your bank app.</p>
            
            {/* Mobile Instant Pay Intent */}
            <div className="pt-1 block sm:hidden">
              <a
                href={upiPayUrl}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary/20 border border-primary/40 text-primary font-medium text-xs hover:bg-primary/30 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Pay Directly via UPI App
              </a>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm text-white mb-1 font-medium">
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
            className="w-full p-3 rounded-xl bg-black/50 border border-primary/40 focus:border-primary text-white font-mono tracking-widest outline-none"
          />
          {utrError && <div className="text-rose-400 text-xs mt-1">{utrError}</div>}
        </div>
      </div>

      <div className="mb-6">
        <label className="inline-flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="rounded border-white/20 bg-black/40 text-primary"
          />
          <span className="text-sm text-white/80">I agree to event terms and confirm payment info is accurate.</span>
        </label>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={() => onEdit(3)} className="px-6 py-3 rounded-full bg-[rgba(255,255,255,0.05)] text-white">
          Back
        </button>
        <button
          disabled={!consent || utrNumber.length !== 12 || submitting}
          onClick={handleFormSubmit}
          className={`btn-gradient px-8 py-3 rounded-full font-medium ${
            !consent || utrNumber.length !== 12 || submitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {submitting ? 'Submitting...' : 'Submit & Get Invoice'}
        </button>
      </div>
    </div>
  );
}