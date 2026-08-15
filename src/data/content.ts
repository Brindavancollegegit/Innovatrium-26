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
    teamSize: '1-3 Members',
    format: 'Offline / Presentation',

    icon: 'PresentationChart',
    rules: [
      'Standard poster format: A1 (594 × 841 mm) portrait orientation.',
      'Must clearly state problem statement, methodology, architecture, and results.',
      '5-minute presentation pitch followed by a 3-minute jury Q&A.',
      'Plagiarized research or unoriginal work leads to immediate disqualification.'
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
    tagline: 'Deconstruct complex systems, crack logic flows, and engineer optimized solutions.',
    teamSize: '2-4 Members',
    format: 'Offline / Hands-on',

    icon: 'Gear',
    rules: [
      'Teams will receive a compiled binary or black-box system module on-site.',
      'Round 1: System analysis, flow mapping, and architectural decoding.',
      'Round 2: Patching vulnerabilities and functional code reconstruction.',
      'Strictly offline sandbox environment with zero unauthorized external tools.'
    ],
    evaluation: [
      'Problem-Solving (30%)',
      'Accuracy & Completeness (50%)',
      'Code Optimization (20%)'
    ]
  },
  {
    competitionId: 'prompt-wars',
    title: 'Prompt Wars',
    tagline: 'Master generative AI, engineer high-precision prompts, and conquer live arena challenges.',
    teamSize: '2-4 Members',
    format: 'Offline / Live Arena',

    icon: 'TerminalWindow',
    rules: [
      'Multi-round tournament testing LLM steering, prompt chaining, and multimodal synthesis.',
      'Strict token limits and forbidden modifier keywords enforced per round.',
      'Real-time automated evaluation benchmarks combined with expert jury scoring.',
      'Zero external assistive browser extensions or plugins permitted.'
    ],
    evaluation: [
      'Prompt Precision (40%)',
      'Output Fidelity (40%)',
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
    'Accommodation & Food Available',
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
