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
    day: 'Day 1',
    date: 'Sept 15, 2026',
    theme: 'blue',
    events: [
      {
        time: '9:00 AM',
        title: 'Registration & Check-in',
        description: 'Collect your badges, swags, and get settled in. Breakfast will be served at the lounge.',
        icon: 'identification-card'
      },
      {
        time: '10:00 AM',
        title: 'Inauguration Ceremony',
        description: 'Welcome address by the IEEE SB Chair and keynotes from our distinguished chief guests.',
        icon: 'microphone-stage'
      },
      {
        time: '11:00 AM',
        title: 'Expert Workshop Begins',
        description: 'Immersive hands-on session on advanced cloud architecture and generative AI workflows.',
        icon: 'laptop'
      },
      {
        time: '1:30 PM',
        title: 'Networking Lunch',
        description: 'Connect with peers and mentors over a buffet lunch at the cafeteria.',
        icon: 'coffee'
      },
      {
        time: '2:30 PM',
        title: 'Workshop: Phase 2',
        description: 'Deep dive into practical implementation and deployment strategies.',
        icon: 'code'
      },
      {
        time: '4:30 PM',
        title: 'Q&A and Day 1 Wrap-up',
        description: 'Interactive session with the speakers followed by high tea.',
        icon: 'chat-teardrop-text'
      }
    ]
  },
  {
    day: 'Day 2',
    date: 'Sept 16, 2026',
    theme: 'green',
    events: [
      {
        time: '8:30 AM',
        title: 'Check-in & Briefing',
        description: 'Final team check-ins and distribution of problem statements for the competitive tracks.',
        icon: 'user-circle'
      },
      {
        time: '9:00 AM',
        title: 'Competitive Tracks Commence',
        description: 'Reverse Engineering, Prompt Wars, and Poster Presentation tracks begin simultaneously.',
        icon: 'sword'
      },
      {
        time: '1:00 PM',
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
        time: '4:00 PM',
        title: 'Valedictory & Prize Distribution',
        description: 'Announcement of winners, distribution of the ₹30,000+ prize pool, and closing remarks.',
        icon: 'trophy'
      }
    ]
  }
];
