export const portfolioData = {
  brand: 'GUNATH',
  fullName: 'Gunath',
  navItems: [
    { label: 'Home', to: '/' },
    { label: 'About Me', to: '/about' },
    { label: 'Projects', to: '/projects' },
    { label: 'Publications', to: '/publications' },
    { label: 'Contact Me', to: '/contact' },
  ],
  hero: {
    badge: 'Software Engineer and Problem Solver',
    title: 'Colorful software experiences with clean architecture and real-world impact.',
    description:
      'I build modern web platforms, cloud-ready APIs, and automation workflows that help teams ship better products faster.',
    ctaPrimary: { label: 'Explore Projects', to: '/projects' },
    ctaSecondary: { label: 'Read Publications', to: '/publications' },
  },
  stats: [
    { value: '20+', label: 'Production features delivered' },
    { value: '12', label: 'Projects completed successfully' },
    { value: '4+', label: 'Domains worked across' },
  ],
  highlightTags: ['React', 'Next.js', 'TypeScript', 'Python', 'Node.js', 'Azure'],
  about: [
    'I am Gunath, a full-stack software engineer focused on building high-quality products that are simple to use and easy to scale.',
    'My approach combines practical engineering, thoughtful UI decisions, and strong collaboration so teams can ship features confidently.',
  ],
  skillCategories: [
    {
      title: 'Frontend Development',
      items: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Responsive UI Design'],
    },
    {
      title: 'Backend and APIs',
      items: ['Node.js', 'Express', 'Python', 'Flask', 'REST API Architecture'],
    },
    {
      title: 'Cloud and Data',
      items: ['Azure', 'Docker', 'MongoDB', 'PostgreSQL', 'CI/CD Automation'],
    },
  ],
  features: [
    {
      id: '01',
      title: 'Software Development',
      description:
        'From idea to deployment, I create maintainable applications with clean code and reliable performance.',
      accentClass: 'bg-sky-100 text-sky-700 border-sky-200',
    },
    {
      id: '02',
      title: 'Software Design and Architecture',
      description:
        'I design scalable systems and feature structures that remain robust as teams and requirements grow.',
      accentClass: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    },
    {
      id: '03',
      title: 'Problem Solving and Debugging',
      description:
        'I identify root causes quickly and deliver practical fixes while maintaining product momentum.',
      accentClass: 'bg-rose-100 text-rose-700 border-rose-200',
    },
  ],
  projects: [
    {
      title: 'Urban Flow Smart City Reporter',
      category: 'Full-Stack Web Development',
      summary:
        'An intelligent civic reporting platform that routes issues with AI-assisted triage and automated authority workflows.',
      tags: ['Next.js', 'Node.js', 'MongoDB', 'Tailwind'],
      toneClass: 'from-sky-50 to-cyan-50',
    },
    {
      title: 'Neura AI Health Prediction',
      category: 'AI and ML',
      summary:
        'A real-time health prediction system using CNN-LSTM models for patient-specific scoring and risk alerts.',
      tags: ['Python', 'TensorFlow', 'Flask', 'NumPy'],
      toneClass: 'from-violet-50 to-fuchsia-50',
    },
    {
      title: 'Education Insight Portal',
      category: 'Web Platform',
      summary:
        'A responsive education platform delivering structured content, better discoverability, and strong performance.',
      tags: ['React', 'Spring Boot', 'PostgreSQL', 'Vite'],
      toneClass: 'from-amber-50 to-orange-50',
    },
    {
      title: 'Cloud Workflow Automation Hub',
      category: 'Cloud and Automation',
      summary:
        'A workflow orchestration dashboard that automates recurring operations and integrates multiple cloud services.',
      tags: ['React', 'Azure', 'Node.js', 'Docker'],
      toneClass: 'from-emerald-50 to-teal-50',
    },
  ],
  publications: [
    {
      title: 'Transforming Healthcare IT: Practical AI Insights',
      category: 'Healthcare IT',
      date: 'September 18, 2025',
      readTime: '5 min read',
      categoryClass: 'bg-rose-100 text-rose-700',
    },
    {
      title: 'Cloud Infrastructure Strategies for Product Teams',
      category: 'Cloud Infrastructure',
      date: 'October 4, 2025',
      readTime: '8 min read',
      categoryClass: 'bg-sky-100 text-sky-700',
    },
    {
      title: 'Responsible AI in Customer Experience',
      category: 'Artificial Intelligence',
      date: 'November 2, 2025',
      readTime: '7 min read',
      categoryClass: 'bg-violet-100 text-violet-700',
    },
    {
      title: 'Developer Security Checklist for Fast Teams',
      category: 'Cybersecurity',
      date: 'December 10, 2025',
      readTime: '6 min read',
      categoryClass: 'bg-amber-100 text-amber-700',
    },
  ],
  testimonials: [
    {
      name: 'Poona Palihakkara',
      role: 'Software Engineering Student',
      quote:
        'Gunath consistently transforms complex technical ideas into reliable, practical software while keeping the team motivated.',
    },
    {
      name: 'Sasindu Akash',
      role: 'Medical Faculty Undergraduate',
      quote:
        'He brings strong analytical thinking and calm execution. Even challenging tasks become manageable around his process.',
    },
  ],
  contact: {
    subtitle: 'I am here to help you build and grow with technology.',
    details: [
      'Email: gunathkodi@gmail.com',
      'Phone: +94 77 300 7426',
      'Location: Hambantota, Sri Lanka',
    ],
  },
  chatbot: {
    greeting: 'Hi, I am Gunath Bot. Ask me about projects, skills, publications, or contact details.',
    quickReplies: ['Show projects', 'What skills?', 'How to contact?'],
  },
}
