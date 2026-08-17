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
        description: 'Final team check-ins and distribution of problem statements for the competitive tracks.',
        icon: 'user-circle'
      },
      {
        time: '10:00 AM',
        title: 'Competitive Tracks Commence',
        description: 'Reverse Engineering, Prompt Wars, and Poster Presentation tracks begin simultaneously.',
        icon: 'sword'
      },
      {
        time: '1:30 PM',
        title: 'Lunch Break',
        description: 'Refuel your energy before the final sprint of the competitions.',
        icon: 'coffee'
      },
      {
        time: '2:00 PM',
        title: 'Final Pitches & Evaluations',
        description: 'Teams present their final solutions and architectures to the jury.',
        icon: 'presentation-chart'
      },
      {
        time: '3:00 PM',
        title: 'Valedictory & Prize Distribution',
        description: 'Announcement of winners, distribution of the ₹30,000+ prize pool, and closing remarks.',
        icon: 'trophy'
      }
    ]
  }
];
