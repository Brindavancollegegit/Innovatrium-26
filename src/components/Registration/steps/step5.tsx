import { useEffect, useMemo, useState, useRef } from 'react';
import Countdown from './Countdown';
import StepList from './StepList';
import SummaryPanel from './SummaryPanel';
import Step1Participant from './steps/Step1Participant';
import Step2Personal from './steps/Step2Personal';
import Step3Competition from './steps/Step3Competition';
import Step4Review from './steps/Step4Review';
import { registration, tracks } from '../../data/content';
import { submitRegistration, getLiveStats } from '../../lib/registrationApi';

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
  teamName?: string;
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
  const [liveStats, setLiveStats] = useState({ registrations: 0, colleges: 0 });

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const d = JSON.parse(raw);
        setParticipant(d.participant || null);
        setPersonal(d.personal || personal);
        setCompetition(d.competition || competition);
        setStep(d.step || 1);
      } catch {}
    }
  }, []);

  useEffect(() => {
    const payload = { participant, personal, competition, step };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [participant, personal, competition, step]);

  useEffect(() => {
    let mounted = true;
    getLiveStats().then((r: any) => {
      if (mounted) setLiveStats({ registrations: r.registrations || 0, colleges: r.colleges || 0 });
    });
    return () => { mounted = false; };
  }, []);

  const availableSteps = [1, 2, 3, 4];

  function goToStep(n: number) {
    setStep(n);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleSubmit(paymentDetails: { utrNumber: string; totalAmount: number }) {
    setSubmitting(true);
    try {
      const payload = {
        participant,
        personal,
        competition,
        payment: paymentDetails,
        timestamp: new Date().toISOString(),
      };
      
      const res: any = await submitRegistration(payload);
      setSubmitting(false);

      const regId = res?.id || 'REG-' + Math.floor(100000 + Math.random() * 900000);
      setSubmittedData({ ...payload, id: regId });
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      setSubmitting(false);
    }
  }

  // --- Printable Invoice Screen ---
  if (submittedData) {
    return (
      <section id="register" className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <RegistrationCard className="p-8 md:p-12 text-left print:p-0 print:bg-white print:text-black">
            <div className="flex justify-between items-start border-b border-white/10 pb-6 mb-6">
              <div>
                <h1 className="text-2xl font-bold font-display text-white">Event Registration Receipt</h1>
                <p className="text-sm text-white/60">ID: <span className="font-mono text-primary font-bold">{submittedData.id}</span></p>
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Payment Pending Verification
                </span>
                <p className="text-xs text-white/50 mt-1">{new Date(submittedData.timestamp).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-white/80">
              <div className="grid grid-cols-2 gap-4 bg-white/5 p-4 rounded-xl">
                <div>
                  <p className="text-xs text-white/50">Lead Participant</p>
                  <p className="font-semibold text-white">{submittedData.personal.fullName}</p>
                  <p className="text-xs">{submittedData.personal.email}</p>
                  <p className="text-xs">{submittedData.personal.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-white/50">College & Membership</p>
                  <p className="font-semibold text-white">{submittedData.personal.college}</p>
                  <p className="text-xs">{submittedData.participant === 'ieee' ? `IEEE ID: ${submittedData.personal.ieeeNumber}` : 'Non-IEEE Participant'}</p>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <p className="text-xs text-white/50 mb-1">Competition & Team</p>
                <p className="font-semibold text-white">{submittedData.competition.competitionId} (Team: {submittedData.competition.teamName})</p>
                <p className="text-xs text-white/60 mt-1">Total Members: {submittedData.competition.members.length + 1}</p>
              </div>

              <div className="border-t border-white/10 pt-4 flex justify-between items-center bg-primary/10 p-4 rounded-xl">
                <div>
                  <p className="text-xs text-white/60">UTR / Ref No: <span className="font-mono font-bold text-white">{submittedData.payment.utrNumber}</span></p>
                  <p className="text-xs text-white/50">Amount Paid</p>
                </div>
                <div className="text-2xl font-bold font-mono text-primary">₹{submittedData.payment.totalAmount}</div>
              </div>
            </div>

            <div className="mt-8 flex gap-4 print:hidden">
              <button onClick={() => window.print()} className="btn-gradient px-6 py-3 rounded-full font-medium">
                Print / Save PDF Invoice
              </button>
            </div>
          </RegistrationCard>
        </div>
      </section>
    );
  }

  // --- Form View ---
  return (
    <section id="register" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <RegistrationCard>
              <div className="flex flex-col md:flex-row md:items-start md:gap-8">
                <div className="w-full md:w-56">
                  <StepList steps={availableSteps} current={step} goTo={goToStep} participant={participant} />
                </div>
                <div className="flex-1 mt-6 md:mt-0">
                  {step === 1 && (
                    <Step1Participant value={participant} onChange={setParticipant} onNext={() => setStep(2)} />
                  )}
                  {step === 2 && (
                    <Step2Personal participant={participant} value={personal} onChange={setPersonal} onNext={() => setStep(3)} onBack={() => setStep(1)} />
                  )}
                  {step === 3 && (
                    <Step3Competition tracks={tracks} value={competition} onChange={setCompetition} onNext={() => setStep(4)} onBack={() => setStep(2)} />
                  )}
                  {step === 4 && (
                    <Step4Review participant={participant} personal={personal} competition={competition} onEdit={goToStep} onSubmit={handleSubmit} submitting={submitting} />
                  )}
                </div>
              </div>
            </RegistrationCard>
          </div>

          <div className="lg:col-span-1 space-y-4">
            <Countdown targetDate={registration.closesAt} />
            <SummaryPanel participant={participant} personal={personal} competition={competition} liveStats={liveStats} />
          </div>
        </div>
      </div>
    </section>
  );
}