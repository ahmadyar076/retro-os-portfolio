/**
 * Project data (Phase 4) — owner-supplied content, enriched.
 *
 * Single source of truth for desktop icons + ProjectViewer windows. Add/edit
 * projects by editing this array; the UI updates automatically.
 *
 * NOTE ON HONESTY: `highlights` are derived from the owner's own descriptions
 * plus reasonable inference from each tech stack — verify/trim them. Anything
 * marked `// TODO` (links, stacks for the LMS/Library systems) is a best guess
 * and needs confirming before launch.
 *
 * `icon` is a key resolved to a colored retro-folder accent in DesktopIcon.jsx.
 */
export const projectsData = [
  {
    id: 'macrobrain',
    title: 'MacroBrain',
    icon: 'fitness',
    category: 'Progressive Web App',
    status: 'In Development',
    description:
      'A Progressive Web App (PWA) for fitness and calorie tracking — log meals, track macros against daily targets, and install it to your home screen.',
    techStack: ['Next.js 16', 'React 19', 'Supabase', 'Tailwind CSS v4'],
    highlights: [
      'Next.js 16 App Router architecture with server components',
      'Supabase authentication + Postgres data layer',
      'Installable PWA with a custom manifest and offline-ready shell',
      'Daily calorie & macro tracking against personalized targets',
    ],
    github: 'https://github.com/ahmadyar076/MacroBrain', // TODO: verify once uploaded
    demo: '',
  },
  {
    id: 'netflix-clone',
    title: 'Netflix Clone',
    icon: 'video',
    category: 'Full-Stack Streaming Platform',
    status: 'Completed',
    description:
      'A responsive Netflix-inspired streaming platform with user authentication, dynamic content browsing, and category-based filtering.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Firebase'],
    highlights: [
      'Secure sign-in / sign-up via Firebase Auth',
      'RESTful Node.js + Express backend serving movie/show metadata',
      'TMDB API integration populating 1,000+ titles with posters & trailers',
      'Category-based browsing with a fully responsive UI',
    ],
    github: 'https://github.com/ahmadyar076/Netflix-clone',
    demo: '',
  },
  {
    id: 'ai-fitness',
    title: 'AI Fitness Coach',
    icon: 'ai',
    category: 'Machine Learning',
    status: 'Completed',
    description:
      'An intelligent fitness recommendation system that generates personalized workout and diet plans from user metrics (BMI, age, activity level, goals).',
    techStack: ['Python', 'Scikit-Learn', 'Pandas', 'Flask'],
    highlights: [
      'Random Forest & KNN classification models',
      'Trained on 5,000+ fitness profile records',
      '82% accuracy predicting optimal exercise categories',
      'Flask API serving personalized workout & diet plans',
    ],
    github: 'https://github.com/ahmadyar076/ai-fitness-coach', // TODO: verify link
    demo: '',
  },
  {
    id: 'cravix-food',
    title: 'Cravix Food Delivery',
    icon: 'mobile',
    category: 'Mobile App (Android)',
    status: 'Collaborative Project',
    description:
      'A custom-built native Android food-ordering app, developed as a collaborative team project at GIKI.',
    techStack: ['Kotlin', 'Android SDK'],
    highlights: [
      'Native Android UI built in Kotlin',
      'Menu browsing and food-ordering flow',
      'Built collaboratively as a team project',
    ],
    github: 'https://github.com/RabbinBatool210/CravixGIKI-Food_Ordering', // TODO: confirm full URL
    demo: '',
  },
  {
    id: 'timetable-scheduler',
    title: 'Automated Scheduler',
    icon: 'calendar',
    category: 'Automation Tool',
    status: 'Completed',
    description:
      'A Python-based automated timetable scheduler that generates conflict-free schedules from a set of constraints.',
    techStack: ['Python'],
    highlights: [
      'Constraint-based scheduling algorithm',
      'Automated conflict detection & resolution',
      'Generates complete, clash-free timetables',
    ],
    github: 'https://github.com/ahmadyar076/automated-timetable-scheduler',
    demo: '',
  },
  {
    id: 'lms-ittefaq',
    title: 'School LMS',
    icon: 'lms',
    category: 'Full-Stack Web App',
    status: 'Completed',
    description:
      'A custom Learning Management System built end-to-end for Ittefaq Model School — managing courses, content, and users across student/teacher/admin roles.',
    techStack: ['React', 'Node.js', 'MongoDB'], // TODO: confirm actual stack
    highlights: [
      'Role-based access for students, teachers, and admins',
      'Course & learning-content management',
      'End-to-end architecture (frontend + backend + database)',
    ],
    github: '', // TODO: add repo link
    demo: '',
  },
  {
    id: 'library-system',
    title: 'Library System',
    icon: 'library',
    category: 'Full-Stack Web App',
    status: 'Completed',
    description:
      'A comprehensive Library Management System for cataloguing books, handling lending/returns, and managing members.',
    techStack: ['React', 'Node.js', 'MongoDB'], // TODO: confirm actual stack
    highlights: [
      'Book catalogue with search & availability tracking',
      'Lending / return workflow with due dates',
      'Member management',
    ],
    github: '', // TODO: add repo link
    demo: '',
  },
]
