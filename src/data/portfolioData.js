export const portfolioData = {
  brand: 'GUNATH K.',
  fullName: 'Gunath Kalpitha',
  navItems: [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Projects', to: '/projects' },
    { label: 'Certifications', to: '/publications' },
    { label: 'Contact', to: '/contact' },
  ],
  hero: {
    badge: 'Computer Engineering Undergraduate | Full-Stack and IoT Developer',
    title: 'Building practical engineering solutions across mobile, web, and embedded systems.',
    description:
      'I am a Computer Engineering undergraduate at the University of Ruhuna focused on secure full-stack development, IoT applications, and cloud-integrated products.',
    ctaPrimary: { label: 'View Projects', to: '/projects' },
    ctaSecondary: { label: 'View Certifications', to: '/publications' },
    slides: [
      {
        id: 'engineering-workspace',
        caption: 'Engineering solutions with clean architecture and practical delivery',
        imageUrl:
          'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=2200&q=80',
      },
      {
        id: 'iot-electronics',
        caption: 'IoT, embedded systems, and real-time data experiences',
        imageUrl:
          'https://images.unsplash.com/photo-1581092160607-ee22731e8f4c?auto=format&fit=crop&w=2200&q=80',
      },
      {
        id: 'cloud-app-development',
        caption: 'Cloud-backed full-stack applications from concept to deployment',
        imageUrl:
          'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2200&q=80',
      },
    ],
  },
  stats: [
    { value: '3.0', label: 'Current GPA' },
    { value: '3', label: 'Major projects completed' },
    { value: 'Top 8', label: 'FINC25 finalist team' },
  ],
  highlightTags: ['React', 'Node.js', 'Flutter', 'Supabase', 'IoT', 'Embedded Systems'],
  about: [
    'I am a Computer Engineering undergraduate at the Faculty of Engineering, University of Ruhuna, with a multidisciplinary background in embedded systems, IoT, and full-stack development.',
    'I build secure mobile applications and scalable backend systems using Java, Node.js, React, and Flutter, while applying cloud-native and machine-learning concepts to deliver robust end-to-end products.',
  ],
  skillCategories: [
    {
      title: 'Programming Languages',
      items: ['Java', 'JavaScript', 'Python (Basic)', 'C++ (Basic)', 'Dart (Basic)'],
    },
    {
      title: 'Frontend Development',
      items: ['React', 'Tailwind CSS', 'HTML', 'CSS', 'Responsive UI Design'],
    },
    {
      title: 'Backend Development',
      items: ['Node.js', 'Express.js', 'RESTful APIs', 'Authentication', 'Server Integration'],
    },
    {
      title: 'Databases',
      items: ['MongoDB', 'MySQL (Basic)', 'PostgreSQL', 'Supabase Storage'],
    },
    {
      title: 'Cloud Technologies',
      items: ['Firebase', 'Supabase', 'Edge Functions', 'Offline Data Sync'],
    },
    {
      title: 'DevOps and Version Control',
      items: ['Git', 'GitHub', 'Docker', 'Release Management'],
    },
  ],
  features: [
    {
      id: '01',
      title: 'Full-Stack Engineering',
      description:
        'Designing and delivering secure, maintainable web and mobile systems with React, Node.js, and modern API architecture.',
      accentClass: 'bg-sky-100 text-sky-700 border-sky-200',
    },
    {
      id: '02',
      title: 'IoT and Embedded Integration',
      description:
        'Developing connected embedded and mobile experiences with reliable device synchronization and practical field-ready workflows.',
      accentClass: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    },
    {
      id: '03',
      title: 'Cloud and Data-Centric Delivery',
      description:
        'Building cloud-backed products with robust data models, secure auth flows, and real-time or delayed synchronization support.',
      accentClass: 'bg-rose-100 text-rose-700 border-rose-200',
    },
  ],
  projects: [
    {
      title: 'Digital Inspection System for NBRO',
      category: 'Cross-Platform Field Inspection Platform',
      summary:
        'Built a cross-platform digital inspection and pre-crack survey system for infrastructure projects with GPS-tagged records, image capture, offline-first workflows, and web-based administration.',
      tags: ['Flutter', 'Supabase', 'PostgreSQL', 'Google Maps API', 'Web Dashboard'],
      toneClass: 'from-sky-50 to-cyan-50',
    },
    {
      title: 'Project Sentry (2025)',
      category: 'IoT Competition Project',
      summary:
        'Contributed to the design and development of an IoT-based household electrical energy and safety management system selected as a Top 8 finalist in the FINC25 competition organized by the IEEE Student Branch, University of Moratuwa.',
      tags: ['IoT', 'Embedded Systems', 'Energy Monitoring', 'Team Collaboration'],
      toneClass: 'from-emerald-50 to-teal-50',
    },
    {
      title: 'Lustra Smart Watch (2025)',
      category: 'Embedded and Mobile Ecosystem',
      summary:
        'Developed an ESP32-S3 based smart watch and companion mobile app with synchronized device data, personalized tracking, and real-time notifications, integrating LVGL-based embedded interfaces with modern mobile UX.',
      tags: ['ESP32-S3', 'LVGL', 'Flutter', 'Dart', 'Real-Time Notifications'],
      toneClass: 'from-amber-50 to-orange-50',
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
    {
      title: 'Organizing Committee Member - Rextro 2025 Silver Jubilee Exhibition',
      category: 'Leadership',
      issuer: 'Faculty of Engineering, University of Ruhuna',
      year: '2025',
      note: 'Supported event organization and planning for a large faculty-level exhibition.',
      categoryClass: 'bg-violet-100 text-violet-700',
    },
    {
      title: 'Member - Gaveshakayo Hiking Club',
      category: 'Volunteering',
      issuer: 'University of Ruhuna',
      year: 'Ongoing',
      note: 'Participated in faculty-organized hikes showcasing teamwork, planning, and endurance.',
      categoryClass: 'bg-rose-100 text-rose-700',
    },
  ],
  achievements: [
    {
      title: 'BSc (Hons) in Computer Engineering',
      meta: 'Faculty of Engineering, University of Ruhuna',
      detail: 'Current undergraduate with a 3.0 GPA and active engagement in hands-on engineering projects.',
    },
    {
      title: 'FINC25 Top 8 Finalist',
      meta: 'IEEE Student Branch, University of Moratuwa',
      detail: 'Selected among finalist teams for Project Sentry, an IoT-based safety and energy management solution.',
    },
    {
      title: 'Full Lifecycle Product Building',
      meta: 'Field systems to embedded ecosystems',
      detail: 'Experienced in taking products from idea to implementation across mobile apps, embedded devices, and cloud-backed dashboards.',
    },
  ],
  contact: {
    subtitle: 'Open to internships, collaborations, and software engineering opportunities.',
    details: [
      'Email: bgunathkalpitha18@gmail.com',
      'Phone: +94 70 355 1607',
      'LinkedIn: linkedin.com/in/gunath-kalpitha',
      'GitHub: github.com/gunathkalpitha',
      'Portfolio: gunath.netlify.app',
    ],
    email: 'bgunathkalpitha18@gmail.com',
    phone: '+94 70 355 1607',
    location: 'Sri Lanka',
    links: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/gunath-kalpitha/' },
      { label: 'GitHub', url: 'https://github.com/gunathkalpitha' },
      { label: 'Portfolio', url: 'https://gunath.netlify.app/' },
    ],
  },
  chatbot: {
    greeting: 'Hi, I am Gunath Assistant. Ask me about projects, skills, certifications, or contact details.',
    quickReplies: ['Show projects', 'What skills?', 'Show certifications', 'How to contact?'],
  },
}
