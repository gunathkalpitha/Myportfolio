import nbroImg from '../assets/images/nbro.png'
import sentryImg from '../assets/images/sentry.png'
import lustraImg from '../assets/images/Lustra.png'
import heroEngineering from '../assets/images/hero-engineering.webp'
import heroCloud from '../assets/images/hero-cloud.webp'
import heroMobile from '../assets/images/hero-mobile.webp'
import heroCollaboration from '../assets/images/hero-collaboration.webp'

export const portfolioData = {
  brand: 'GUNATH KALPITHA',
  fullName: 'Gunath Kalpitha',
  navItems: [
    { label: 'Home', to: '#home' },
    { label: 'About', to: '#about' },
    { label: 'Skills', to: '#skills' },
    { label: 'Projects', to: '#projects' },
    { label: 'Blogs', to: '#blogs' },
    { label: 'Contact', to: '#contact' },
  ],
  hero: {
    badge: 'Software Engineer | Lifelong Learner',
    title: 'Crafting Innovative Software',
    description: 'Building modern web and mobile applications',
    ctaPrimary: { label: 'Talk to me', to: '#contact' },
    ctaSecondary: { label: 'View Projects', to: '#projects' },
    slides: [
      {
        id: 'engineering-workspace',
        caption: 'Crafting Innovative Software',
        subtitle: 'Building modern web and mobile applications',
        imageUrl: heroEngineering,
      },
      {
        id: 'cloud-app-development',
        caption: 'Engineering Scalable Solutions',
        subtitle: 'Delivering clean architecture from concept to deployment',
        imageUrl: heroCloud,
      },
      {
        id: 'mobile-development',
        caption: 'Building Mobile Experiences',
        subtitle: 'Cross-platform apps with Flutter, Dart and modern mobile UX',
        imageUrl: heroMobile,
      },
      {
        id: 'innovation-competition',
        caption: 'Innovation Through Collaboration',
        subtitle: 'Creating real-world solutions by working as a team',
        imageUrl: heroCollaboration,
      },
    ],
  },
  stats: [
    { value: '2+', label: 'Years of Experience' },
    { value: '15+', label: 'Projects Completed' },
    { value: '5+', label: 'Happy Clients' },
  ],
  highlightTags: ['React', 'Node.js', 'Flutter', 'Supabase', 'Next.js', 'TypeScript'],
  about: [
    'I am a Computer Engineering undergraduate at the Faculty of Engineering, University of Ruhuna, building secure full-stack systems and scalable mobile applications.',
    'I want to inspire student communities as much as possible with all my skills and capabilities.',
    'A purpose driven community, globally, instead of everyone going with the flow.',
    'If we can change the way we see the world, we can change the world we see.',
    
  ],
  skillCategories: [
    {
      title: 'Programming Languages',
      items: ['Java', 'JavaScript', 'Python', 'C++', 'Dart'],
    },
    {
      title: 'Frontend Development',
      items: ['React', 'Tailwind CSS', 'HTML', 'CSS', 'Responsive UI Design','Flutter','Angular'],
    },
    {
      title: 'Backend Development',
      items: ['Node.js', 'Express.js','Spring Boot', 'RESTful APIs', 'Authentication', 'Server Integration'],
    },
    {
      title: 'Databases',
      items: ['MongoDB', 'MySQL', 'PostgreSQL',],
    },
    {
      title: 'Cloud Technologies',
      items: ['Firebase', 'Supabase','AWS','InfluxDB'],
    },
    {
      title: 'DevOps and Version Control',
      items: ['Git', 'GitHub', 'Docker', 'Release Management','Jenkins'],
    },
  ],
  features: [
    {
      id: '01',
      title: 'Software Development',
      description: 'Designing and delivering secure, maintainable web and mobile systems with React, Node.js, and modern API architecture.',
      accentClass: 'bg-sky-100 text-sky-700 border-sky-200',
    },
    {
      id: '02',
      title: 'Software Design and Architecture',
      description: 'Planning and structuring software systems to ensure they are scalable, efficient, and maintainable. This involves creating blueprints, selecting appropriate technologies, and establishing coding standards.',
      accentClass: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    },
    {
      id: '03',
      title: 'Problem Solving and Debugging',
      description: 'Identifying and resolving complex technical issues across the full stack, ensuring optimal performance and reliability.',
      accentClass: 'bg-rose-100 text-rose-700 border-rose-200',
    },
    {
      id: '04',
      title: 'Project Management',
      description: 'Leading software projects from concept to deployment, ensuring timely delivery and alignment with business goals.',
      accentClass: 'bg-amber-100 text-amber-700 border-amber-200',
    },
    {
      id: '05',
      title: 'System Integration',
      description: 'Seamlessly connecting diverse software systems and third-party APIs to create unified and powerful solutions.',
      accentClass: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    },
  ],
  projects: [
    {
      id: 'nbro',
      title: 'Digital Inspection System for NBRO',
      category: 'Cross-Platform Field Inspection Platform',
      filterCategory: 'mobile',
      image: nbroImg,
      liveUrl: 'https://gunathkalpitha.github.io/Digital-Inspection-System-NBRO-manual-/',
      summary: 'Built a cross-platform digital inspection and pre-crack survey system for infrastructure projects with GPS-tagged records, image capture, offline-first workflows, and web-based administration.',
      tags: ['Flutter', 'Supabase', 'PostgreSQL', 'Google Maps API', 'Web Dashboard'],
      toneClass: 'from-sky-50 to-cyan-50',
      badge: 'Field Engineering',
    },
    {
      id: 'sentry',
      title: 'Project Sentry (2025)',
      category: 'Software Management System',
      filterCategory: 'iot',
      image: sentryImg,
      liveUrl: 'https://gunathkalpitha.github.io/IoT-sentry-project/',
      summary: 'Contributed to the design and development of an energy and safety management system selected as a Top 8 finalist in the FINC25 competition organized by the IEEE Student Branch, University of Moratuwa.',
      tags: ['Software Engineering', 'Energy Monitoring', 'Team Collaboration', 'ESP32 & IoT'],
      toneClass: 'from-emerald-50 to-teal-50',
      badge: 'IEEE FINC25 Top 8',
    },
    {
      id: 'lustra',
      title: 'Lustra Smart App (2025)',
      category: 'Mobile Ecosystem',
      filterCategory: 'mobile',
      image: lustraImg,
      liveUrl: null,
      summary: 'Developed a companion mobile app with synchronized data, personalized tracking, and real-time notifications, integrating modern mobile UX with backend services.',
      tags: ['Flutter', 'Dart', 'Real-Time Notifications', 'UX/UI', 'Smart Ecosystem'],
      toneClass: 'from-amber-50 to-orange-50',
      badge: 'Smart Wearable UX',
    },
  ],
  credentials: [
    {
      title: 'Web Development Certificate',
      category: 'Certificate',
      issuer: 'Professional Learning Program',
      year: 'Completed',
      note: 'Foundational web development training covering front-end development concepts.',
      categoryClass: 'bg-sky-100 text-sky-700',
    },
    {
      title: 'Introduction to C#',
      category: 'Certificate',
      issuer: 'Professional Learning Program',
      year: 'Completed',
      note: 'Covered core C# syntax, object-oriented programming fundamentals, and development basics.',
      categoryClass: 'bg-emerald-100 text-emerald-700',
    },
    {
      title: 'C# Intermediate',
      category: 'Certificate',
      issuer: 'Professional Learning Program',
      year: 'Completed',
      note: 'Expanded intermediate programming knowledge in C# for practical application development.',
      categoryClass: 'bg-amber-100 text-amber-700',
    },
  ],
  achievements: [
    {
      title: 'BSc (Hons) in Computer Engineering',
      meta: 'Faculty of Engineering, University of Ruhuna',
      detail: 'Current undergraduate with active engagement in hands-on software engineering projects.',
    },
    {
      title: 'FINC25 Top 8 Finalist',
      meta: 'IEEE Student Branch, University of Moratuwa',
      detail: 'Selected among finalist teams for Project Sentry, a safety and energy management solution.',
    },
    {
      title: 'Full Lifecycle Product Building',
      meta: 'Field systems to cloud ecosystems',
      detail: 'Experienced in taking products from idea to implementation across mobile apps and cloud-backed dashboards.',
    },
  ],
  testimonials: [],
  blogs: [],
  medium: {
    username: '@gbgunathkalpitha18',
    profileUrl: 'https://medium.com/@gbgunathkalpitha18/',
    feedUrl: 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@gbgunathkalpitha18',
  },
  contact: {
    subtitle: 'Open to internships, collaborations, and software engineering opportunities.',
    details: [
      'Email: gbgunathkalpitha18@gmail.com',
      'Phone: +94 70 355 1607',
      'LinkedIn: linkedin.com/in/gunath-kalpitha',
      'GitHub: github.com/gunathkalpitha',
      'Medium: medium.com/@gbgunathkalpitha18',
      'Facebook: facebook.com/share/1d3jijfBY9',
      'Instagram: @gunath_kalpitha',
      'Portfolio: gunath.netlify.app',
    ],
    email: 'gbgunathkalpitha18@gmail.com',
    phone: '+94 70 355 1607',
    location: 'Sri Lanka',
    links: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/gunath-kalpitha/' },
      { label: 'GitHub', url: 'https://github.com/gunathkalpitha' },
      { label: 'Medium', url: 'https://medium.com/@gbgunathkalpitha18/' },
      { label: 'Facebook', url: 'https://www.facebook.com/share/1d3jijfBY9/' },
      { label: 'Instagram', url: 'https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=22x9wt9' },
      { label: 'Portfolio', url: 'https://gunath.netlify.app/' },
    ],
  },
  chatbot: {
    greeting: 'Hi, I am Gunath Assistant. Ask me about projects, skills, certifications, or contact details.',
    quickReplies: ['Show projects', 'What skills?', 'Show certifications', 'How to contact?'],
  },
}
