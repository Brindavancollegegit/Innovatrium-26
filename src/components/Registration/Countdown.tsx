import { useEffect, useMemo, useState } from 'react';

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
};

function getTimeLeft(target: string): TimeLeft {
  const now = Date.now();
  const end = new Date(target).getTime();
  const total = Math.max(0, end - now);
  const secondsTotal = Math.floor(total / 1000);
  const days = Math.floor(secondsTotal / 86400);
  const hours = Math.floor((secondsTotal % 86400) / 3600);
  const minutes = Math.floor((secondsTotal % 3600) / 60);
  const seconds = Math.floor(secondsTotal % 60);
  return { days, hours, minutes, seconds, total };
}

export default function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(targetDate));

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(t);
  }, [targetDate]);

  const isUrgent = useMemo(() => timeLeft.total > 0 && timeLeft.total <= 48 * 60 * 60 * 1000, [timeLeft.total]);
  const isClosed = timeLeft.total <= 0;

  if (isClosed) return null;

  const accent = isUrgent ? 'from-amber-400 to-orange-700' : 'from-blue-400 to-green-400';

  const pill = (value: number, label: string) => (
    <div className="flex flex-col items-center">
      <div className="px-3 py-2 rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] backdrop-blur-sm text-center min-w-[64px] transform transition-transform duration-200 hover:scale-105">
        <div className="font-mono text-lg md:text-xl font-semibold text-white tabular-nums">{String(value).padStart(2, '0')}</div>
      </div>
      <div className="mt-1 text-[11px] uppercase tracking-[0.05em] text-white/60">{label}</div>
    </div>
  );

  return (
    <div className="w-full mb-4 rounded-3xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] p-4">
      <div className="flex items-center justify-center mb-3 gap-3">
        <div className="text-[13px] text-white/70">Registration closes in</div>
        <div className="flex items-center">
          {isUrgent && <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse mr-2" />}
          <div className={`w-16 h-1 rounded-full bg-gradient-to-r ${accent}`}></div>
        </div>
      </div>

      <div className="flex items-center gap-4 justify-center">
        {pill(timeLeft.days, 'DAYS')}
        {pill(timeLeft.hours, 'HRS')}
        {pill(timeLeft.minutes, 'MINS')}
        {pill(timeLeft.seconds, 'SECS')}
      </div>
    </div>
  );
}
