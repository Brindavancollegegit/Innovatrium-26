import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import Countdown from './Countdown';
import StepList from './StepList';
import SummaryPanel from './SummaryPanel';
import Step1Participant from './steps/Step1Participant';
import Step2Personal from './steps/Step2Personal';
import Step3Competition from './steps/Step3Competition';
import Step4Review from './steps/Step4Review';
import { registration, tracks } from '../../data/content';
import { submitRegistration, getLiveStats } from '../../lib/registrationApi';

type ParticipantType = 'day1' | 'day2' | 'both';

type Personal = {
  fullName: string;
  email: string;
  phone: string;
  college: string;
  branch: string;
  year: string;
};

type TeamMember = {
  name: string;
  email: string;
  phone: string;
};

type CompetitionSelection = {
  competitionId?: string;
  category?: string;
  teamName?: string;
  members: TeamMember[];
};

const STORAGE_KEY = 'innovatrium:registration:draft';

function parseTeamMax(teamSize: string) {
  const m = teamSize.match(/(\d+)-?(\d+)?/);
  if (!m) return 1;
  if (m[2]) return parseInt(m[2], 10);
  return parseInt(m[1], 10);
}

export default function Registration() {
  const [step, setStep] = useState(1);
  const [participant, setParticipant] = useState<ParticipantType | null>(null);
  const [personal, setPersonal] = useState<Personal>({ fullName: '', email: '', phone: '', college: '', branch: '', year: '' });
  const [competition, setCompetition] = useState<CompetitionSelection>({ competitionId: undefined, category: 'General', teamName: '', members: [] });
  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [liveStats, setLiveStats] = useState({ registrations: 0, colleges: 0 });

  // load/save draft
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

  const availableSteps = useMemo(() => {
    // If Day1 only, skip competition/team step
    if (participant === 'day1') return [1, 2, 4];
    return [1, 2, 3, 4];
  }, [participant]);

  function goToStep(n: number) {
    setStep(n);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleSubmit(honeypot?: string) {
    if (honeypot) return { success: false };
    setSubmitting(true);
    try {
      const payload = { participant, personal, competition };
      const res: any = await submitRegistration(payload);
      setSubmitting(false);
      if (res && (res.success || res.id)) {
        setSubmittedId(res.id || 'LOCAL-' + Date.now());
        localStorage.removeItem(STORAGE_KEY);
        return { success: true, id: res.id };
      }
      return { success: false };
    } catch (e) {
      setSubmitting(false);
      return { success: false };
    }
  }

  if (submittedId) {
    return (
      <section id="register" className="py-24">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="glass-card p-12 md:p-16 text-center">
            <div className="text-6xl mb-4">✅</div>
            <div className="font-display text-2xl mb-2">Registration Submitted</div>
            <div className="font-sans text-sm text-white/70 mb-4">Your Registration ID: <span className="font-mono">{submittedId}</span></div>
            <div className="font-sans text-sm text-white/70">We'll contact you with payment details shortly.</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="register" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="glass-card p-8 md:p-12">
              <div className="flex flex-col md:flex-row md:items-start md:gap-8">
                <div className="w-full md:w-56">
                  <StepList steps={availableSteps} current={step} goTo={goToStep} participant={participant} />
                </div>
                <div className="flex-1 mt-6 md:mt-0">
                  {/* Step content area */}
                  {step === 1 && (
                    <Step1Participant value={participant} onChange={(v:any)=>{setParticipant(v); if (v==='day1' && step===3) setStep(4);}} onNext={()=>setStep(2)} />
                  )}
                  {step === 2 && (
                    <Step2Personal value={personal} onChange={setPersonal} onNext={()=>setStep( availableSteps.includes(3) ? 3 : 4 )} onBack={()=>setStep(1)} />
                  )}
                  {step === 3 && (
                    <Step3Competition tracks={tracks} value={competition} onChange={setCompetition} onNext={()=>setStep(4)} onBack={()=>setStep(2)} />
                  )}
                  {step === 4 && (
                    <Step4Review participant={participant} personal={personal} competition={competition} onEdit={goToStep} onSubmit={handleSubmit} submitting={submitting} />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="space-y-4">
              <Countdown targetDate={registration.closesAt} />
              <SummaryPanel participant={participant} personal={personal} competition={competition} liveStats={liveStats} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
