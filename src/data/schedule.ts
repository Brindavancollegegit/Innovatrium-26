export interface ScheduleEvent {
  time: string;
  title: string;
  description: string;
  icon: string;
}

export interface ScheduleDay {
  day: string;
  date: string;
  theme: 'blue' | 'green';
  events: ScheduleEvent[];
}

export const schedule: ScheduleDay[] = [
  {
    day: 'Competition Day',
    date: 'Sept 16, 2026',
    theme: 'green',
    events: [
      {
        time: '9:00 AM',
        title: 'Check-in & Briefing',
        description: 'Final team check-ins and distribution of problem statements.',
        icon: 'user-circle'
      },
      {
        time: '10:00 AM',
        title: 'Competitive Tracks Commence',
        description: 'All three tracks begin simultaneously.\nParticipants compete only in their registered track.\n\n→ Poster Presentation\n→ App 2.0 — Product Redesign Pitch\n→ Prompt Wars — Generative AI Arena',
        icon: 'sword'
      },
      {
        time: '1:30 PM',
        title: 'Lunch Break',
        description: '',
        icon: 'coffee'
      },
      {
        time: '2:00 PM',
        title: 'Final Pitches & Evaluation',
        description: 'Final presentations and judging.',
        icon: 'presentation-chart'
      },
      {
        time: '3:00 PM',
        title: 'Valedictory & Prize Distribution',
        description: 'Winner announcements and ₹30,000+ prize distribution.',
        icon: 'trophy'
      }
    ]
  }
];
