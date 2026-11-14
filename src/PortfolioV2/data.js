// Shared content for PortfolioV2. Pulled from the same source of truth as
// the original Portfolio.jsx so both versions stay in sync if you update
// your experience/projects later — just edit here.

export const profile = {
  name: 'Himansu Sekhar Patra',
  role: 'Fullstack Engineer',
  location: 'Bhubaneswar, India',
  email: 'himansu72001@gmail.com',
  phone: '+91 77350 48476',
  linkedin: 'https://www.linkedin.com/in/himansu-sekhar-patra-540924227/',
  // Swap these for your real photos. Square-ish crops work best for the
  // hero tilt card; anything works for the about section.
  heroPhoto: null, // e.g. import heroPhoto from './assets/hero.jpg'
  aboutPhoto: null
};

export const calculateExperience = () => {
  const startDate = new Date('2023-06-01');
  const currentDate = new Date();
  const diffTime = Math.abs(currentDate - startDate);
  const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30.44));
  return { total: (diffMonths / 12).toFixed(1) };
};

export const facts = [
  { num: '3.3+', label: 'Years shipping' },
  { num: '18+', label: 'Products launched' },
  { num: '3', label: 'Companies' },
  { num: '2', label: 'Platforms — web & mobile' }
];

export const skillOrbit = [
  { name: 'React JS', radius: 110, duration: 22 },
  { name: 'Node JS', radius: 110, duration: 26 },
  { name: 'React Native', radius: 190, duration: 32 },
  { name: 'TypeScript', radius: 190, duration: 28 },
  { name: 'Next JS', radius: 190, duration: 36 },
  { name: 'GraphQL', radius: 270, duration: 40 },
  { name: 'gRPC', radius: 270, duration: 34 },
  { name: 'Angular', radius: 270, duration: 44 }
];

export const jobs = [
  {
    role: 'Fullstack Developer',
    company: 'SAIntellect Solutions PVT LTD',
    location: 'Bhubaneswar, India',
    dates: 'May 2026 — Present',
    current: true,
    points: [
      'Building end-to-end web and mobile solutions using React JS, React Native, Node JS, and Ionic Framework.',
      'Shipping "Pratibhabatee" — a career platform for women with a job portal and an integrated marketplace.',
      'Designing backend APIs and services in Node JS powering both web and Ionic mobile experiences.'
    ]
  },
  {
    role: 'Frontend Developer',
    company: 'Ohhpro Technologies',
    location: 'Bhubaneswar, India',
    dates: 'Dec 2024 — May 2026',
    points: [
      'Built scalable applications in React JS and Angular, integrated with RESTful and GraphQL APIs.',
      'Contributed to "Ohhpro Junction," a society management app with resident engagement tools.',
      'Built and maintained "Nuhealthmantra," a multi-role health and wellness platform.'
    ]
  },
  {
    role: 'Frontend Developer',
    company: 'Sulopa Technologies',
    location: 'Bangalore, India',
    dates: 'Jun 2023 — Nov 2024',
    points: [
      'Developed responsive web and mobile applications using React JS, React Native, and TypeScript.',
      'Shipped end-to-end features that improved user engagement and retention.'
    ]
  }
];

export const projects = [
  {
    title: 'Pratibhabatee',
    description: 'A career and empowerment platform for women — job postings and applications, plus an integrated marketplace.',
    tags: ['React JS', 'Node JS']
  },
  {
    title: 'Society Connect',
    description: 'Rebuild of a society management app with React and gRPC, cutting real-time update latency significantly.',
    tags: ['React JS', 'gRPC']
  },
  {
    title: 'Carrmos',
    description: 'Educational guidance platform with an interactive D3.js roadmap helping students map out career paths.',
    tags: ['D3.js', 'OAuth']
  },
  {
    title: 'Water Log (WLOG)',
    description: 'Water management platform with admin/user portals for data-driven level tracking and risk alerts.',
    tags: ['React JS', 'React Native']
  },
  {
    title: 'AITravelAssist',
    description: 'AI-powered chatbot platform enabling seamless flight bookings via a conversational interface.',
    tags: ['React JS', 'AI']
  },
  {
    title: 'DirectHire',
    description: 'Streamlined hiring platform with dual portals for clients posting jobs and candidates applying.',
    tags: ['React Native', 'TypeScript']
  }
];

export const education = {
  degree: 'Bachelor of Technology, Computer Science',
  school: 'Biju Pattnayak University of Technology',
  dates: 'April 2019 – May 2023',
  score: 'SGPA 8.5'
};