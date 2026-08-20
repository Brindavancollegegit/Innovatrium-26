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
    competitionId: 'app-2.0',
    title: 'App 2.0',
    tagline: 'Redesign iconic everyday apps to solve real-world constraints through rapid product logic and live defense.',
    teamSize: '2 Members',
    format: 'Offline / Pitch',
    icon: 'Gear',
    rules: [
      'Draw a random chit pairing a popular everyday app with a unique real-world problem constraint.',
      'Get 15 minutes of offline prep to map out a 3-step redesigned user flow and solution on chart paper.',
      'Deliver a crisp 3-minute pitch covering user frustration, redesign logic, and practical adoption.',
      'Tackle a live 45-second judge curveball testing feature abuse, accessibility, or edge case defense.',
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
      'Round 1 (Visual Replication): Recreate a complex reference image with maximum visual and compositional fidelity in limited attempts.',
      'Round 2 (Guardrail Jailbreak): Prompt a heavily restricted LLM to bypass builtin rules and reveal a forbidden secret token.',
      'Work under strict prompt count limits and token caps—shorter, more precise prompts win tie-breakers.',
      'Standardized workstations and identical AI models provided on-site for zero-luck, equal fairness.',
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
