// All of the portfolio's content lives here. Everything factual below
// (roles, dates, tools, projects, education) comes from the resume.

import workImg1 from '../assets/images/Image1.png';
import workImg2 from '../assets/images/Image2.png';
import workImg3 from '../assets/images/Image3.png';
import workImg4 from '../assets/images/Image4.png';
import workImg5 from '../assets/images/Image5.png';
import workImg6 from '../assets/images/Image6.png';

export const profile = {
  name: 'Himansu Sekhar Patra',
  firstName: 'himansu',
  role: 'Full Stack Developer',
  location: 'Bhubaneswar',
  email: 'himansu72001@gmail.com',
  phone: '+91 77350 48476',
  linkedin: 'https://www.linkedin.com/in/himansu-sekhar-patra-540924227/'
};

// The tags that float around the 3D sphere in the hero.
export const skills = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Express',
  'React Native', 'PostgreSQL', 'Three.js', 'WebSockets', 'AWS'
];

// The six nodes of the capability diagram, in diagram order (see NODES in
// components/Capabilities.jsx, matched by index). `tools` shows on hover.
export const capabilities = [
  { id: 0, title: 'Frontend', tools: 'React.js · Next.js · TypeScript · Redux · Tailwind CSS', blurb: 'Interfaces that feel instant, not just look good.' },
  { id: 1, title: 'Backend APIs', tools: 'Node.js · Express.js · REST · GraphQL · WebSockets', blurb: 'The logic layer that makes the frontend honest.' },
  { id: 2, title: 'Mobile Apps', tools: 'React Native · Ionic', blurb: 'Same codebase, same care, two platforms.' },
  { id: 3, title: 'Databases', tools: 'PostgreSQL · SQL · AWS RDS', blurb: 'Where the product actually lives, long after the demo.' },
  { id: 4, title: 'Cloud & DevOps', tools: 'AWS (EC2, S3, RDS) · CI/CD · GitHub Actions', blurb: 'Shipping it so it stays shipped.' },
  { id: 5, title: '3D & Data Viz', tools: 'Three.js · D3.js', blurb: 'Globes, trees and roadmaps you can actually explore.' }
];

// The gallery shows the first six (its grid has six layout slots).
// Add an `image` field to any project to show a real screenshot instead of
// its placeholder gradient.
export const projects = [
  {
    title: 'Women Empowerment & Job Marketplace Platform',
    image: workImg1,
    desc: 'A responsive, production-stage platform connecting women job seekers, job providers and customers through job opportunities and online product sales. Includes job listings and applications, product browsing, and an admin portal for managing providers, seekers and customers.',
    tags: ['React.js', 'Tailwind CSS', 'REST APIs']
  },
  {
    title: 'Medical E-Commerce Mobile Application',
    image: workImg2,
    desc: 'A cross-platform mobile app, currently in development, where customers browse and buy medicines and healthcare products. Node.js and Express.js services integrate WooCommerce for product data and e-commerce functionality.',
    tags: ['Ionic', 'React.js', 'Node.js', 'Express.js', 'WooCommerce', 'JWT/OAuth']
  },
  {
    title: 'Full-Stack Admin & Inventory Management System',
    image: workImg3,
    desc: 'A scalable admin dashboard for managing stock inventory, tracking used items and monitoring operational data, with role-based views for inventory control and reporting. Talks to Node.js REST APIs for real-time updates and CRUD operations.',
    tags: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL', 'Tailwind CSS']
  },
  {
    title: 'Society Management & Community Engagement Platform',
    image: workImg4,
    desc: 'A feature-rich society management platform with an interactive 3D globe (Three.js) and 3D tree-structure visualizations (D3.js), plus an AI-powered chatbot with voice input and output and AI-generated form recommendations that speed up data entry.',
    tags: ['React.js', 'Three.js', 'D3.js', 'Context API', 'JWT/OAuth']
  },
  {
    title: 'Educational Roadmap & Career Guidance Platform',
    image: workImg5,
    desc: 'A multi-module frontend for career discovery, assessments and progress tracking, with interactive D3.js visualizations, lazy loading for large datasets and secure JWT/OAuth authentication.',
    tags: ['React.js', 'D3.js', 'Context API', 'JWT/OAuth']
  },
  {
    title: 'Multi-Role Health & Wellness Management Platform',
    image: workImg6,
    desc: 'A role-based, responsive UI with customized dashboards for multiple user types, integrated with RESTful APIs for real-time data flow and user-specific features.',
    tags: ['React.js', 'Bootstrap CSS']
  }
];

export const jobs = [
  {
    role: 'Full Stack Developer',
    company: 'SAIntellect Solutions',
    location: 'Bhubaneswar, India',
    dates: 'May 2026 – Present',
    current: true,
    points: [
      'Develop web and mobile applications using React.js, React Native, Ionic, Node.js, and Express.js, working across frontend interfaces and backend functionality.',
      'Build reusable UI components, RESTful APIs, and backend business logic to support application features and reliable data flow.',
      'Integrate frontend applications with backend services and develop cross-platform mobile solutions, focusing on maintainability, responsiveness, and consistent user experiences.'
    ]
  },
  {
    role: 'Frontend Developer',
    company: 'Ohhpro Technologies',
    location: 'Bhubaneswar, India',
    dates: 'Dec 2024 – May 2026',
    points: [
      'Migrated an existing application from Angular to React.js, rebuilding the frontend with reusable components, improved UI architecture, and interactive animations using Framer Motion.',
      'Integrated RESTful APIs and WebSocket-based communication to support dynamic data updates, chatbot action execution, and real-time application workflows.',
      'Implemented performance optimization, state management, voice recognition, and live voice output to improve application responsiveness and user interaction.'
    ]
  },
  {
    role: 'Software Engineer',
    company: 'Sulopa Technologies',
    location: 'Bangalore, India',
    dates: 'Jun 2023 – Nov 2024',
    points: [
      'Developed responsive web and mobile interfaces using React.js, React Native, and TypeScript for water monitoring, travel booking, and e-commerce applications.',
      'Built interactive dashboards and AI-powered chatbot interfaces, integrating RESTful APIs and WebSockets to support real-time data updates and conversational workflows.',
      'Developed reusable UI components and optimized frontend rendering and state management to improve application maintainability, responsiveness, and cross-device usability.'
    ]
  }
];

export const education = {
  degree: 'B.Tech in Computer Science & Engineering',
  school: 'Biju Pattnayak University of Technology (BPUT)',
  dates: 'April 2019 – May 2023',
  score: 'SGPA 8.5'
};

// Shown in the Story section's "Bio" block, one paragraph each.
export const bio = [
  <>Full stack developer based in <strong>Bhubaneswar, India</strong>, with over three and a half years of experience building web and mobile applications in React.js, React Native, Next.js, Node.js and Express.js. Right now I'm at SAIntellect Solutions, working across frontend interfaces and backend functionality.</>,
  'I started in June 2023 as a Software Engineer at Sulopa Technologies in Bangalore, building responsive web and mobile interfaces for water monitoring, travel booking and e-commerce applications, including interactive dashboards and AI-powered chatbot interfaces fed by REST APIs and WebSockets.',
  'At Ohhpro Technologies I migrated an existing application from Angular to React.js, rebuilding the frontend with reusable components and Framer Motion animations, and added real-time features: WebSocket-driven updates, chatbot action execution, voice recognition and live voice output.',
  "Across all of it the focus is the same: reusable components, maintainable code, performance, and reliable data flow between the interface and the API. I've led frontend development efforts to deliver client-specific requirements and keep sprints on schedule, and received client recognition for the AI-powered chatbot and intelligent form recommendations I built, which simplified user interactions and data entry.",
  'I also build interactive 3D and data visualizations with Three.js and D3.js: a 3D globe and tree-structure views in a society management platform, and interactive visualizations in a career guidance one. This portfolio is built with React and Three.js as well.'
];

export const manifest = {
  eyebrow: 'PHILOSOPHY',
  heading: ['One developer.', 'Full stack.', 'Zero handoffs.'],
  paragraphs: [
    "Most products don't fail because the idea was bad — they stall in the handoff. Design waits on backend. Backend waits on infra. Nothing ships while everyone's waiting on someone else.",
    "I build the whole path myself — interface, API, database — so there's no handoff to wait on. What used to need three specialists and a project manager now needs one developer and a clear head.",
    <>That doesn't mean cutting corners. It means fewer meetings about the work, and more time actually doing it. <strong>Same craft. Less overhead.</strong></>
  ],
  closing: 'Built. Shipped. Repeat.'
};