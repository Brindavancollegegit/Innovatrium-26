import { useEffect, useMemo, useState, useRef } from 'react';
import { Printer, DownloadSimple, ArrowCounterClockwise, CheckCircle, ShieldCheck, WhatsappLogo } from '@phosphor-icons/react';
import Countdown from './Countdown';
import StepList from './StepList';
import SummaryPanel from './SummaryPanel';
import Step1Participant from './steps/Step1Participant';
import Step2Personal from './steps/Step2Personal';
import Step3Competition from './steps/Step3Competition';
import Step4Review from './steps/Step4Review';
import { registration, tracks } from '../../data/content';
import { submitRegistration } from '../../lib/registrationApi';

type ParticipantType = 'ieee' | 'non-ieee';

type Personal = {
  fullName: string;
  email: string;
  phone: string;
  college: string;
  branch: string;
  year: string;
  ieeeNumber?: string;
};

type CompetitionSelection = {
  competitionId?: string;
  teamName: string;
  members: { name: string; email: string; phone: string }[];
};

const STORAGE_KEY = 'innovatrium:registration:draft';

function RegistrationCard({ children, className = "p-8 md:p-12" }: { children: React.ReactNode, className?: string }) {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: -1000, y: -1000 })}
      className={`relative group rounded-3xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] shadow-2xl ${className}`}
    >
      <div
        className="absolute -inset-[1px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(56,189,248,0.6), transparent 100%)`,
          padding: '1px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default function Registration() {
  const [step, setStep] = useState(1);
  const [participant, setParticipant] = useState<ParticipantType | null>(null);
  const [personal, setPersonal] = useState<Personal>({ fullName: '', email: '', phone: '', college: '', branch: '', year: '', ieeeNumber: '' });
  const [competition, setCompetition] = useState<CompetitionSelection>({ competitionId: undefined, teamName: '', members: [] });
  const [submitting, setSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);

  const [submissionError, setSubmissionError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.participant) setParticipant(parsed.participant);
        if (parsed.personal) setPersonal(parsed.personal);
        if (parsed.competition) setCompetition(parsed.competition);
        if (parsed.step) setStep(parsed.step);
      }
    } catch (e) {
      // ignore parsing error
    }
  }, []);

  useEffect(() => {
    try {
      const draft = { participant, personal, competition, step };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch (e) {
      // ignore storage error
    }
  }, [participant, personal, competition, step]);

  const isStep1Valid = useMemo(() => participant !== null, [participant]);

  const isStep2Valid = useMemo(() => {
    if (!personal.fullName || !personal.email || !personal.phone || !personal.college) return false;
    if (participant === 'ieee' && !personal.ieeeNumber) return false;
    return true;
  }, [personal, participant]);

  const isStep3Valid = useMemo(() => {
    if (!competition.competitionId) return false;
    if (!competition.teamName) return false;
    return true;
  }, [competition]);

  const isStepAccessible = (targetStep: number) => {
    if (targetStep === 1) return true;
    if (targetStep === 2) return isStep1Valid;
    if (targetStep === 3) return isStep1Valid && isStep2Valid;
    if (targetStep === 4) return isStep1Valid && isStep2Valid && isStep3Valid;
    return false;
  };

  const goToStep = (s: number) => {
    if (isStepAccessible(s)) {
      setStep(s);
      const registerElement = document.getElementById('register');
      if (registerElement) {
        registerElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };



  const availableSteps = [1, 2, 3, 4];

  async function handleSubmit(paymentDetails: { utrNumber: string; totalAmount: number }) {
    if (!isStep3Valid) return;

    setSubmitting(true);
    setSubmissionError(null);

    try {
      const payload = {
        participant: (participant as 'ieee' | 'non-ieee') || 'non-ieee',
        personal,
        competition: {
          competitionId: competition.competitionId || '',
          teamName: competition.teamName || '',
          members: competition.members || [],
        },
        payment: paymentDetails,
        timestamp: new Date().toISOString(),
      };

      const res = await submitRegistration(payload);
      setSubmitting(false);

      if (!res.success) {
        setSubmissionError(res.error || 'Registration could not be completed. Please check your information.');
        return;
      }

      setSubmittedData({ ...payload, id: res.id });
      setShowWhatsAppModal(true);
      localStorage.removeItem(STORAGE_KEY);
    } catch (e: any) {
      setSubmitting(false);
      setSubmissionError('An unexpected network error occurred. Please try again.');
    }
  }

  const handlePrint = () => {
    try {
      window.print();
    } catch (e) {
      console.error('Window print error:', e);
      handleDownloadInvoice();
    }
  };

  const handleDownloadInvoice = () => {
    if (!submittedData) return;
    const invoiceHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Innovatrium '26 Pass - ${submittedData.id}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8fafc; color: #0f172a; margin: 0; padding: 40px 20px; }
    .receipt { max-width: 650px; margin: 0 auto; background: #ffffff; border: 1.5px solid #0f172a; border-radius: 16px; padding: 36px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
    .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #f1f5f9; padding-bottom: 20px; margin-bottom: 24px; }
    .title { font-size: 24px; font-weight: bold; color: #0f172a; margin: 0; }
    .id { font-family: monospace; font-size: 16px; color: #0284c7; font-weight: bold; margin-top: 4px; }
    .badge { display: inline-block; padding: 6px 14px; background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0; border-radius: 999px; font-size: 12px; font-weight: 600; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 18px; border-radius: 12px; margin-bottom: 20px; }
    .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; margin-bottom: 4px; font-weight: 600; }
    .val { font-size: 14px; font-weight: 600; color: #0f172a; }
    .section { border-top: 1px solid #f1f5f9; padding-top: 16px; margin-bottom: 20px; }
    .payment-box { background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 12px; padding: 18px; display: flex; justify-content: space-between; align-items: center; }
    .amount { font-size: 28px; font-weight: bold; color: #0284c7; font-family: monospace; }
    .footer { text-align: center; font-size: 12px; color: #94a3b8; margin-top: 30px; border-top: 1px solid #f1f5f9; padding-top: 16px; }
    @media print { body { background: #fff; padding: 0; } .receipt { box-shadow: none; border: 1.5px solid #000; } }
  </style>
</head>
<body>
  <div class="receipt">
    <div class="header">
      <div>
        <h1 class="title">Innovatrium '26</h1>
        <div class="id">Registration Pass: ${submittedData.id}</div>
      </div>
      <div style="text-align: right;">
        <span class="badge" style="background: #ecfdf5; color: #065f46; border-color: #a7f3d0;">Registration Confirmed</span>
        <div style="font-size: 12px; color: #64748b; margin-top: 6px;">${new Date(submittedData.timestamp).toLocaleDateString('en-US', { dateStyle: 'medium' })}</div>
      </div>
    </div>

    <div class="grid">
      <div>
        <div class="label">Lead Participant</div>
        <div class="val">${submittedData.personal.fullName}</div>
        <div style="font-size: 12px; color: #475569;">${submittedData.personal.email}</div>
        <div style="font-size: 12px; color: #475569;">${submittedData.personal.phone}</div>
      </div>
      <div>
        <div class="label">Institution & Category</div>
        <div class="val">${submittedData.personal.college}</div>
        <div style="font-size: 12px; color: #0284c7; font-weight: 500;">${submittedData.participant === 'ieee' ? `IEEE Member (ID: ${submittedData.personal.ieeeNumber || 'Verified'})` : 'General Participant'}</div>
        <div style="font-size: 12px; color: #475569;">Dept: ${submittedData.personal.branch} (${submittedData.personal.year})</div>
      </div>
    </div>

    <div class="section">
      <div class="label">Competition Track & Team</div>
      <div class="val" style="font-size: 16px;">${submittedData.competition.competitionId} — Team "${submittedData.competition.teamName}"</div>
      <div style="font-size: 12px; color: #64748b; margin-top: 4px;">Total Team Size: ${submittedData.competition.members.length + 1} Attendees</div>
    </div>



    <div class="footer">
      Official Registration Confirmation for Innovatrium '26. Present this pass at the desk on event day.
    </div>
  </div>
  <script>
    window.onload = function() { window.print(); };
  </script>
</body>
</html>`;

    const blob = new Blob([invoiceHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    // Open in printable popup window
    const printWin = window.open(url, '_blank');
    if (!printWin) {
      // Direct file fallback
      const link = document.createElement('a');
      link.href = url;
      link.download = `Innovatrium26_Pass_${submittedData.id}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleReset = () => {
    setSubmittedData(null);
    setStep(1);
    setParticipant(null);
    setPersonal({ fullName: '', email: '', phone: '', college: '', branch: '', year: '', ieeeNumber: '' });
    setCompetition({ competitionId: undefined, teamName: '', members: [] });
    localStorage.removeItem(STORAGE_KEY);
  };

  // Printable Invoice View
  if (submittedData) {
    return (
      <>
        {/* Full-Screen WhatsApp Modal Overlay */}
        {showWhatsAppModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020617]/90 backdrop-blur-md p-4 print:hidden">
            <div className="bg-[#0b1329] border border-[#25D366]/40 p-8 sm:p-10 rounded-3xl shadow-[0_0_50px_rgba(37,211,102,0.15)] max-w-md w-full text-center relative animate-in fade-in zoom-in duration-300">
              <div className="w-20 h-20 bg-[#25D366]/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <WhatsappLogo weight="fill" className="w-10 h-10 text-[#25D366]" />
              </div>
              <h2 className="text-3xl font-extrabold text-white mb-3 font-display tracking-tight">You're In!</h2>
              <p className="text-slate-300 mb-8 text-sm leading-relaxed">
                Your registration pass has been generated. Before you view it, <strong>you must join the official WhatsApp group</strong> to receive important event updates and coordinate with other participants.
              </p>
              
              <div className="flex flex-col gap-4">
                <a 
                  href="https://chat.whatsapp.com/BEnG1v55C6oGuIHpn4olcb" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => setShowWhatsAppModal(false)}
                  className="w-full inline-flex justify-center items-center gap-2 px-6 py-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black text-sm font-bold tracking-wide transition-all shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:scale-[1.02] hover:-translate-y-1"
                >
                  <WhatsappLogo weight="bold" className="w-6 h-6" />
                  Join WhatsApp Group Now
                </a>
                
                <button 
                  onClick={() => setShowWhatsAppModal(false)}
                  className="text-slate-500 text-xs hover:text-white transition-colors mt-2 underline underline-offset-4"
                >
                  I'll do this later, show my pass
                </button>
              </div>
            </div>
          </div>
        )}

      <section id="register" className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <div id="printable-receipt-card" className="p-8 md:p-12 rounded-3xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] shadow-2xl text-left">
            <div className="flex justify-between items-start border-b border-white/10 pb-6 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <ShieldCheck weight="duotone" className="w-6 h-6 text-sky-400 shrink-0" />
                  <h1 className="text-2xl font-bold font-display text-white">Event Registration Pass</h1>
                </div>
                <p className="text-sm text-white/60 mt-1">Pass ID: <span className="font-mono text-primary font-bold">{submittedData.id}</span></p>
              </div>
              <div className="text-right">
                <span className="print-status-badge inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Registration Confirmed
                </span>
                <p className="text-xs text-white/50 mt-1">{new Date(submittedData.timestamp).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-white/80">
              <div className="print-card-box grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/5 p-4 rounded-xl">
                <div>
                  <p className="text-xs text-white/50">Lead Participant</p>
                  <p className="font-semibold text-white">{submittedData.personal.fullName}</p>
                  <p className="text-xs">{submittedData.personal.email}</p>
                  <p className="text-xs">{submittedData.personal.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-white/50">College & Category</p>
                  <p className="font-semibold text-white">{submittedData.personal.college}</p>
                  <p className="text-xs print-highlight">{submittedData.participant === 'ieee' ? `IEEE Member (ID: ${submittedData.personal.ieeeNumber || 'Verified'})` : 'Non-IEEE Participant'}</p>
                  <p className="text-xs text-white/60">{submittedData.personal.branch} — {submittedData.personal.year}</p>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <p className="text-xs text-white/50 mb-1">Competition Track & Team</p>
                <p className="font-semibold text-white">{submittedData.competition.competitionId} (Team: {submittedData.competition.teamName})</p>
                <p className="text-xs text-white/60 mt-1">Total Members: {submittedData.competition.members.length + 1}</p>
              </div>


            </div>

            {/* Email Notification Alert */}
            <div className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3 print:hidden">
              <CheckCircle weight="duotone" className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-emerald-400 text-sm">Check your email for your Digital ID</p>
                <p className="text-xs text-white/70 mt-1 leading-relaxed">
                  Your official digital ID cards and entry pass have been generated. Please check your inbox at <span className="text-white font-medium">{submittedData.personal.email}</span> (including the spam folder). You will need to present this digital ID at the registration desk on the day of the event.
                </p>
              </div>
            </div>

            {/* WhatsApp Community Alert */}
            <div className="mt-4 p-5 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden">
              <div className="flex items-start gap-3">
                <WhatsappLogo weight="duotone" className="w-6 h-6 text-[#25D366] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#25D366] text-sm">Join the Official WhatsApp Group</p>
                  <p className="text-xs text-white/70 mt-1">
                    Get instant event updates, announcements, and coordinate with other participants.
                  </p>
                </div>
              </div>
              <a 
                href="https://chat.whatsapp.com/BEnG1v55C6oGuIHpn4olcb" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-5 py-2.5 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] text-xs font-bold tracking-wide border border-[#25D366]/30 transition-all cursor-pointer shadow-lg shadow-[#25D366]/10 hover:shadow-[#25D366]/20"
              >
                Join Group
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 print:hidden">
              <button
                type="button"
                onClick={handlePrint}
                className="btn-gradient inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-primary/30 transition-all cursor-pointer"
              >
                <Printer weight="duotone" className="w-4 h-4" /> Print / Save PDF
              </button>

              <button
                type="button"
                onClick={handleDownloadInvoice}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium border border-white/15 transition-all cursor-pointer"
              >
                <DownloadSimple weight="duotone" className="w-4 h-4" /> Download Pass (HTML)
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-sm transition-all ml-auto cursor-pointer"
              >
                <ArrowCounterClockwise weight="duotone" className="w-3.5 h-3.5" /> Register Another
              </button>
            </div>
          </div>
        </div>
      </section>
      </>
    );
  }

  // Main Form View
  return (
    <section id="register" className="py-24 relative overflow-hidden bg-[#020617]">
      {/* Clean Dark Background */}
      <div className="absolute inset-0 bg-[#020617] z-0 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <RegistrationCard>
              <div className="flex flex-col md:flex-row md:items-start md:gap-8">
                <div className="w-full md:w-56">
                  <StepList
                    steps={availableSteps}
                    current={step}
                    goTo={goToStep}
                    isStepAccessible={isStepAccessible}
                  />
                </div>
                <div className="flex-1 mt-6 md:mt-0">
                  {step === 1 && (
                    <Step1Participant
                      value={participant}
                      onChange={setParticipant}
                      onNext={() => isStep1Valid && goToStep(2)}
                    />
                  )}
                  {step === 2 && (
                    <Step2Personal
                      participant={participant}
                      value={personal}
                      onChange={setPersonal}
                      onNext={() => isStep2Valid && goToStep(3)}
                      onBack={() => goToStep(1)}
                    />
                  )}
                  {step === 3 && (
                    <Step3Competition
                      tracks={tracks}
                      value={competition}
                      onChange={setCompetition}
                      onNext={() => isStep3Valid && goToStep(4)}
                      onBack={() => goToStep(2)}
                    />
                  )}
                  {step === 4 && (
                    <Step4Review
                      participant={participant}
                      personal={personal}
                      competition={competition}
                      onEdit={goToStep}
                      onSubmit={handleSubmit}
                      submitting={submitting}
                      submissionError={submissionError}
                    />
                  )}
                </div>
              </div>
            </RegistrationCard>
          </div>

          <div className="lg:col-span-1 lg:sticky lg:top-24 space-y-4 self-start">
            <Countdown targetDate={registration.closesAt} />
            <SummaryPanel participant={participant} personal={personal} competition={competition} />
          </div>
        </div>
      </div>
    </section>
  );
}
