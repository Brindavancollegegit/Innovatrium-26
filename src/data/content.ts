export const tracks = [
  {
    competitionId: 'poster-presentation',
    title: 'Poster Presentation',
    tagline: 'Showcase your research and ideas visually.',
    teamSize: '1-3 Members',
    format: 'Offline / Presentation',
    slotsRemaining: 15,
  },
  {
    competitionId: 'ideathon',
    title: 'Ideathon',
    tagline: 'Solve real-world problems with innovative tech solutions.',
    teamSize: '2-4 Members',
    format: 'Offline / Pitching',
    slotsRemaining: 20,
  },
  {
    competitionId: 'prompt-wars',
    title: 'Prompt Wars',
    tagline: 'Solve real-world problems with innovative tech solutions.',
    teamSize: '2-4 Members',
    format: 'Offline / Pitching',
    slotsRemaining: 20,
  }
];

export const stats = [
  { label: 'Colleges Represented', value: '0', key: 'colleges' },
  { label: 'Registrations', value: '0', key: 'registrations' },
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
    name: 'Mohan H',
    role: 'IEEE Chair',
    phone: '+91 98765 43211',
    email: 'john.smith@example.com',
  }
];

export const venue = {
  name: 'Main Auditorium, Brindavan College of Engineering',
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
  website: 'https://brindavancollege.com'
};

export const registration = {
  // ISO 8601 UTC time when registration closes. Change this value in one place to update the countdown.
  closesAt: '2026-09-10T12:00:00Z'
};
