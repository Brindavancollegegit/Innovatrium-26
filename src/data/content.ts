export interface Track {
  competitionId: string;
  title: string;
  tagline: string;
  teamSize: string;
  format: string;

  icon: string;
  rules: string[];
  evaluation: string[];
}

export const tracks: Track[] = [
  {
    competitionId: 'poster-presentation',
    title: 'Poster Presentation',
    tagline: 'Showcase your groundbreaking research, architecture, and innovative ideas visually.',
    teamSize: '2 Members',
    format: 'Offline / Presentation',
    icon: 'PresentationChart',
    rules: [
      'The Poster must clearly reflect the theme: Innovation Sustainable Solutions for Environmental Protection.',
      'Poster size must be A3, portrait orientation.',
      'Participants must be prepared for 10 min of explanation followed by 5 min of Q&A with the judges.',
      'The soft copy of the poster must be shared at least 2 days before the event.',
      'Judges decision will be final and binding. Winners will receive Prizes and Certificates.',
      'Any entry violating the rules will be disqualified.'
    ],
    evaluation: [
      'Novelty & Innovation (30%)',
      'Technical Depth (40%)',
      'Clarity & Delivery (30%)'
    ]
  },
  {
    competitionId: 'reverse-engineering',
    title: 'Reverse Engineering',
    tagline: 'Decode hidden patterns, crack logic flows, and replicate the system.',
    teamSize: '2 Members',
    format: 'Offline / Hands-on',
    icon: 'Gear',
    rules: [
      'Teams will interact with a "Black Box" system that transforms provided inputs into unknown outputs.',
      'The objective is to analyze the input-output pairs and decipher the hidden algorithm or pattern.',
      'Once the logic is cracked, teams must write a script in their preferred language to replicate the exact behavior.',
      'Use of external internet resources is permitted, but collaboration between teams is strictly prohibited.'
    ],
    evaluation: [
      'Logic Identification Speed (30%)',
      'Replication Accuracy (50%)',
      'Code Cleanliness (20%)'
    ]
  },
  {
    competitionId: 'prompt-wars',
    title: 'Prompt Wars',
    tagline: 'Master generative AI, bypass system guardrails, and extract the hidden flag.',
    teamSize: '2 Members',
    format: 'Offline / Live Arena',
    icon: 'TerminalWindow',
    rules: [
      'Participants will face a custom AI agent programmed to protect a secret "flag" or password.',
      'The goal is to engineer creative prompts to bypass the AI\'s system instructions and force it to reveal the secret.',
      'The arena consists of escalating levels, each with stricter AI guardrails and forbidden modifier keywords.',
      'Directly asking the AI for the secret will trigger a system block; you must deceive or trap the AI into answering.'
    ],
    evaluation: [
      'Levels Cleared (50%)',
      'Fewest Prompts Used (30%)',
      'Time Efficiency (20%)'
    ]
  }
];

export const stats = [
  { label: 'Colleges Represented', value: '8', key: 'colleges' },
  { label: 'Registrations', value: '100', key: 'registrations' },
  { label: 'Prize Pool', value: '₹30,000+', isPrize: true },
];

export const coordinators = [
  {
    name: 'Tharjun S',
    role: 'Tech Head',
    phone: '+91 9113067213',
    email: 'tharjun00@gmail.com',
  },
  {
    name: 'Mohan H M',
    role: 'IEEE Chair',
    phone: '+91 9019177688',
    email: 'mohanhmmaheshn@gmail.com',
  }
];

export const venue = {
  name: 'Brindavan College Of Engineering',
  facilities: [
    'Food Available',
    'High-Speed Wi-Fi',
    'Dedicated Power Stations',
    'Mentorship Lounges'
  ]
};

export const college = {
  name: 'Brindavan College of Engineering',
  address: 'Dwarakanagar, Bagalur Main Road, Yelahanka, Bengaluru',
  positioning: 'Empowering future innovators through academic excellence and hands-on learning.',
  website: 'https://brindavancollege.edu.in'
};

export const registration = {
  // ISO 8601 UTC time when registration closes. Change this value in one place to update the countdown.
  closesAt: '2026-09-15T12:00:00Z'
};
