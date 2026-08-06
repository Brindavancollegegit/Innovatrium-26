import React, { useState } from 'react';

export default function Step4Review({
  participant,
  personal,
  competition,
  onEdit,
  onSubmit,
  submitting,
}: any) {
  const [consent, setConsent] = useState(false);
  const [utrNumber, setUtrNumber] = useState('');
  const [utrError, setUtrError] = useState('');

  const totalAmount = participant === 'ieee' ? 300 : 350;
  const upiId = 'your-upi-id@okaxis'; // UPDATE YOUR UPI ID HERE
  const upiPayUrl = `upi://pay?pa=${upiId}&pn=EventRegistration&am=${totalAmount}&cu=INR`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
    upiPayUrl
  )}`;

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

        {/* Details Summary */}
        <div className="p-4 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] space-y-3">
          <div className="flex justify-between items-center text-sm">
            <div>
              <span className="text-white/60">Membership: </span>
              <span className="font-mono text-white">
                {participant === 'ieee' ? 'IEEE Member' : 'Non-IEEE Member'}
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

        <div className="flex flex-col sm:flex-row items-center gap-4 bg-black/40 p-4 rounded-xl">
          <img 
            src={qrCodeUrl} 
            alt="UPI Payment QR" 
            width="128" 
            height="128" 
            loading="lazy" 
            decoding="async" 
            className="w-32 h-32 rounded-lg bg-white p-1" 
          />
          <div className="text-xs text-white/70 space-y-2 text-center sm:text-left">
            <p className="font-semibold text-white">Scan with GPay / PhonePe / Paytm / BHIM</p>
            <p>UPI ID: <span className="font-mono text-primary">{upiId}</span></p>
            <p className="text-white/50">Amount is pre-set to ₹{totalAmount}. After payment, copy the 12-digit UTR/Ref No. from your bank app.</p>
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