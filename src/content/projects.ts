// Portfolio content. Facts here come from Quan; don't add metrics, user numbers
// or claims that aren't in the source material.

import type { BrandColors, Pattern, Shot } from '@/components/Mockup'

export type StackGroup = { label: string; items: string[] }

/** One step of a case study: a heading, a little text, and the screenshots that show it. */
export type Chapter = {
  title: string
  /** Short paragraphs. */
  body?: string[]
  /** Points, when a list reads better than prose. */
  items?: string[]
  /** One or two screenshots shown under the text. */
  shots?: Shot[]
}

export type Project = {
  slug: string
  name: string
  /** Short context shown in lists, e.g. who it was for. */
  client: string
  summary: string
  /** What I did, shown under "Show more" on the homepage. */
  highlights: string[]
  /** A one-line stack for the homepage. The full stack is in `stack`. */
  tech: string
  period: string
  role: string
  team?: string
  /** A label such as 'In development'. */
  status?: string
  /** Identity colours. Mockup backdrops are derived from these. */
  colors: BrandColors
  /** Backdrop patterns that suit the project's subject. */
  themes: Pattern[]
  /** Homepage strip. The first is also the case study cover. Empty means a placeholder. */
  images: Shot[]
  href?: string
  /** The opening paragraphs of the case study. */
  intro: string[]
  chapters: Chapter[]
  stack: StackGroup[]
  /** Set true to keep a project in the data but off the site. */
  hidden?: boolean
}

const fnol = (f: string) => `/images/work/fnol/${f}.jpg`
const mbv = (f: string) => `/images/work/mbv/${f}.jpg`
const gs = (n: number) => `/images/work/grapeseed/${n}.jpg`
const pul = (f: string) => `/images/work/pulnoci/${f}.jpg`

const all: Project[] = [
  {
    slug: 'fnol-telemedicine',
    colors: { primary: '#2362a2', secondary: '#6aa6dc' },
    themes: ['pulse', 'grid', 'curves'],
    name: 'FNOL Telemedicine',
    client: 'University Hospital Olomouc and the Czech Ministry of Health',
    summary:
      'A telemedicine platform where clinicians monitor patients at home through device measurements, automatic clinical alarms, questionnaires, care requests and video consultations.',
    highlights: [
      'Created the shared React UI library and app shell the whole clinician app is built on.',
      'Built its most complex tools: a questionnaire designer with conditional logic and live preview, and step-by-step care programme templates.',
      'Built the screens clinicians use to act on alarms: take-over, trend charts with severity limits, and a live requests queue.',
      'Brought the app in line with the Czech government design system, with theming.',
      'Turned feedback from calls with the hospital’s clinicians into shipped releases.',
      'Fourth-largest contributor on a team of about 10, with 670+ commits in 13 months.'
    ],
    tech: 'Next.js, React, TypeScript, GraphQL, Tailwind CSS, NestJS, FHIR',
    period: 'Sep 2025 – present',
    role: 'Frontend developer on the clinician web app, with backend work in the NestJS API',
    team: 'About 10 developers. I’m the fourth-largest contributor, with 670+ commits over 13 months.',
    images: [
      {
        src: fnol('open-requests-chat-desktop'),
        second: fnol('request-chat-mobile'),
        frame: 'devices',
        base: 'browser',
        backdrop: 0
      },
      { src: fnol('patient-results-charts-desktop'), frame: 'float', backdrop: 1 },
      { src: fnol('patient-detail-desktop'), frame: 'browser', backdrop: 2 },
      {
        src: fnol('questionnaire-builder-desktop'),
        second: fnol('workflow-builder-desktop'),
        frame: 'cascade',
        backdrop: 0
      },
      { src: fnol('ecg-analysis-desktop'), frame: 'tilt', backdrop: 1 },
      { src: fnol('calendar-desktop'), frame: 'browser', backdrop: 2 },
      {
        src: fnol('login-desktop'),
        second: fnol('login-mobile'),
        frame: 'devices',
        backdrop: 0
      }
    ],
    intro: [
      'FNOL is the abbreviation of Fakultní nemocnice Olomouc, University Hospital Olomouc. The platform lets its clinicians follow patients who are being cared for at home. Measurements from home devices flow in, alarms fire when values cross clinical limits, and the care team works through questionnaires, screenings, requests and video calls.',
      'Most of my work, around 85% of my changes, is in the clinician web app and the shared UI library behind it.'
    ],
    chapters: [
      {
        title: 'Clinical workflows',
        body: [
          'Clinicians work from a patient’s record and their care programme. I built the screens they spend their day in.'
        ],
        items: [
          'Patient records, and the care programme detail with tabs for overview, measurements, alarms, tasks, questionnaires and requests.',
          'Taking over alarms, and trend charts with severity limits.',
          'An open-requests queue with live counters and request chat.',
          'The clinical dashboard.',
          'Medication, visit records, medical documentation, calendar and appointments, and printable patient lists and results.'
        ]
      },
      {
        title: 'Tools for building care',
        body: [
          'Care teams design their own questionnaires and care programmes, so two of the most complex parts of the app are builders.'
        ],
        items: [
          'A questionnaire designer with sections, conditional logic, a live preview and protection against losing unsaved changes.',
          'Care programme templates with a step-based creation flow, cloning, alarms, periodic triggers and conditions.'
        ]
      },
      {
        title: 'The platform underneath',
        items: [
          'I created the shared React UI library, the app shell and the navigation.',
          'Patient search in a command menu.',
          'Moved the UI to the Czech government design system colours and added theming.',
          'Czech and English throughout, with accessibility and performance passes.',
          'Redesigned the public open-data portal and built its dataset catalogue.',
          'On the API side: GraphQL endpoints backed by FHIR for medication, tasks, care programmes, questionnaire responses and clinical notes, and the dashboard backend.'
        ]
      },
      {
        title: 'Working with clinicians',
        body: [
          'I worked directly from feedback calls with clinicians at the hospital, turning what they told us into shipped releases.'
        ]
      }
    ],
    stack: [
      {
        label: 'Frontend',
        items: [
          'Next.js 16',
          'React 19',
          'TypeScript',
          'Apollo Client',
          'TanStack Query',
          'Tailwind CSS 4',
          'shadcn/ui',
          'React Hook Form',
          'Zod',
          'next-intl'
        ]
      },
      {
        label: 'Backend',
        items: [
          'NestJS 11',
          'GraphQL',
          'Drizzle ORM',
          'PostgreSQL',
          'TimescaleDB',
          'Redis',
          'BullMQ'
        ]
      },
      {
        label: 'Health and identity',
        items: ['FHIR (Medplum)', 'Keycloak SSO', 'mediasoup (WebRTC video)']
      },
      { label: 'Tooling', items: ['Nx monorepo', 'pnpm', 'Jest', 'Playwright', 'Biome'] }
    ]
  },
  {
    slug: 'mbv',
    colors: { primary: '#c4161c', secondary: '#e2b84a' },
    themes: ['columns', 'arc', 'plain'],
    name: 'MBV',
    client: 'MBV, a Vietnamese bank',
    summary:
      'The public website of MBV: personal and business banking, interest-rate and exchange-rate tools, news and careers.',
    highlights: [
      'Led the frontend of a bank’s new website, authoring more than half the merged pull requests (128 of 242) and reviewing the rest of the team’s.',
      'Designed how pages work: editors build any page in the CMS from around 25 section types, and the site renders it across five levels of pages.',
      'Created a library of reusable sections, from bento grids to sticky tabs, that editors combine without a developer.',
      'Gave the homepage a personal touch: a greeting that changes with the time of day.'
    ],
    tech: 'Next.js, React, TypeScript, Tailwind CSS, next-intl, GSAP',
    period: 'Nov 2024 – Mar 2025',
    role: 'Frontend lead (freelance, through an agency)',
    team: 'Six developers. I authored 128 of the 242 merged pull requests, and reviewed and merged the team’s work.',
    images: [
      { src: mbv('personal'), frame: 'laptop', backdrop: 0 },
      { src: mbv('home'), frame: 'browser', backdrop: 1 },
      { src: mbv('m-home'), second: mbv('m-loan'), frame: 'phone', backdrop: 2 },
      { src: mbv('careers'), frame: 'float', backdrop: 0 }
    ],
    href: 'https://www.mbv.com.vn',
    intro: [
      'I was the frontend lead on MBV’s new website, working freelance through an agency from designs provided to us. I set up the frontend, built most of its pages and sections, and reviewed and merged the rest of the team’s work.'
    ],
    chapters: [
      {
        title: 'Pages built from the CMS',
        body: [
          'Every page comes from the bank’s CMS. Editors assemble pages from a library of section types, and the frontend turns them into layouts across five levels of pages, in Vietnamese or English.'
        ],
        items: [
          'Dynamic routing for the five page levels, and the renderer that turns CMS sections into components.',
          'Navigation driven by the CMS: the desktop navbar, segment dropdown, third-level menus and a mobile membership menu.',
          'Loading states that wait for images, blurred and video backgrounds, and fallbacks when content is missing.'
        ],
        shots: [{ src: mbv('home'), frame: 'browser', backdrop: 1 }]
      },
      {
        title: 'A homepage that says hello',
        body: [
          'The homepage opens on a full-screen photo with a greeting that changes with the time of day, a search bar and the main menu in a frosted panel. Segment pages such as personal banking carry their own colour and call to action.'
        ],
        shots: [
          { src: mbv('m-home'), second: mbv('m-loan'), frame: 'phone', backdrop: 2 },
          { src: mbv('personal'), frame: 'float', backdrop: 0 }
        ]
      },
      {
        title: 'News, careers and search',
        items: [
          'News: article lists, article pages, and related and promoted articles.',
          'Careers: job categories, the careers homepage and about page, and news tabs.',
          'Search results, the utilities hub and team structure pages.'
        ],
        shots: [{ src: mbv('careers'), frame: 'tilt', backdrop: 1 }]
      },
      {
        title: 'Sections editors can reuse',
        items: [
          'Bento grid layouts for two to five cards.',
          'Image sliders with any number of slides, small card grids and description slides.',
          'Sticky section tabs with a current-section indicator and scroll-to-section.',
          'Every section responsive down to phone size.'
        ]
      }
    ],
    stack: [
      {
        label: 'Frontend',
        items: [
          'Next.js (App Router)',
          'React',
          'TypeScript',
          'Tailwind CSS',
          'next-intl',
          'GSAP',
          'Lottie',
          'Headless UI'
        ]
      },
      { label: 'Data', items: ['REST API from the bank’s CMS'] }
    ]
  },
  {
    slug: 'grapeseed',
    colors: { primary: '#4f009f', secondary: '#8dbb3f' },
    themes: ['confetti', 'curves', 'plain'],
    name: 'GrapeSEED',
    client: 'GrapeCity Europe',
    summary:
      'An English-learning programme for children. I worked across almost every GrapeSEED product as a frontend developer, then moved into UI/UX design for new features and products.',
    highlights: [
      'Led the UI redesign of GrapeSEED Connect, the video classroom teachers use for remote lessons.',
      'Worked across almost every GrapeSEED product, in both development and redesign.',
      'Modernised the frontend: introduced Tailwind CSS and led the move to Vue 3.',
      'Mentored junior developers and reviewed their code.',
      'Moved into UI/UX design in December 2024 to shape new features and products.'
    ],
    tech: 'Vue.js, React, Tailwind CSS, Agora, Canvas',
    period: 'Jan 2022 – Aug 2025',
    role: 'Frontend developer and UI/UX designer',
    images: [
      { src: gs(1), frame: 'laptop', backdrop: 0 },
      { src: gs(2), frame: 'tilt', backdrop: 2 },
      { src: gs(1), frame: 'detail', focus: [8, 45], backdrop: 1 },
      { src: gs(3), second: gs(4), frame: 'stack', backdrop: 0 }
    ],
    href: 'https://remote.grapeseed.com/',
    intro: [
      'GrapeSEED teaches English to children through a family of products: a video classroom, sites for schools, parents, teacher training and the curriculum team, and apps for students.',
      'I joined as a frontend developer and worked in almost every GrapeSEED codebase, with GrapeSEED Connect as my main project. Later I moved into a UI/UX design role, designing new features and products.'
    ],
    chapters: [
      {
        title: 'The video classroom',
        body: [
          'GrapeSEED Connect brings teachers and students together for remote lessons: video, lesson cards and a shared whiteboard, built on Agora video and Canvas. I led the redesign of its interface.'
        ],
        shots: [
          { src: gs(1), frame: 'detail', focus: [8, 45], backdrop: 1 },
          { src: gs(3), second: gs(4), frame: 'stack', backdrop: 0 }
        ]
      },
      {
        title: 'Across the ecosystem',
        body: [
          'Beyond Connect, I did development and redesign work on the Schools, Parent, Training and Curriculum sites.'
        ],
        items: [
          'Introduced Tailwind CSS.',
          'Led the migration to Vue 3.',
          'Ran code reviews and mentored junior developers.'
        ]
      }
    ],
    stack: [
      {
        label: 'Development',
        items: ['Vue.js', 'React', 'Tailwind CSS', 'SCSS', 'Agora', 'Canvas']
      }
    ]
  },
  {
    slug: 'pulnoci',
    colors: { primary: '#1d2b4f', secondary: '#f2b136' },
    themes: ['lines', 'grid', 'dots'],
    name: 'Půlnoci',
    client: 'Personal project',
    status: 'In development',
    summary:
      'A Czech-learning app for beginners: words with spaced repetition, grammar you can look up, short readings with audio, on any device.',
    highlights: [
      'Designed and built a complete product on my own: idea, UX, frontend, API, database and deployment.',
      'Spaced repetition, a grammar reference and readings with audio, in one app.',
      'Works offline as an installable app, and syncs across devices on Cloudflare Workers and D1.',
      'Built by directing Claude Code, with every change reviewed and tested.'
    ],
    tech: 'React, TypeScript, Tailwind CSS, Cloudflare Workers, D1, Drizzle',
    period: 'Nov 2026 – present',
    role: 'Product, design and development',
    images: [
      { src: pul('dark-1-learn'), frame: 'laptop', backdrop: 1 },
      {
        src: pul('phone-dark-2-word-question'),
        second: pul('phone-dark-3-word-answer'),
        frame: 'phone',
        backdrop: 0
      },
      { src: pul('dark-7-words'), frame: 'tilt', backdrop: 2 },
      {
        src: pul('phone-light-13-reading'),
        second: pul('phone-light-14-grammar-index'),
        frame: 'phone',
        backdrop: 1
      },
      { src: pul('light-11-noun-endings'), frame: 'float', backdrop: 0 },
      { src: pul('light-6-practice'), frame: 'browser', backdrop: 2 },
      { src: pul('dark-09-genitive-table'), frame: 'float', backdrop: 1 }
    ],
    intro: [
      'I’m learning Czech, so I built the app I wanted to practise with. Půlnoci is my own project from end to end: the product, the interface, the frontend, the API, the database and the deployment.'
    ],
    chapters: [
      {
        title: 'Learn, then review',
        body: [
          'Each lesson introduces a few words and a grammar point. Words come back for review on a spaced-repetition schedule (FSRS), mixed with grammar questions, so practice goes to what you’re about to forget.'
        ],
        shots: [
          {
            src: pul('phone-dark-2-word-question'),
            second: pul('phone-dark-3-word-answer'),
            frame: 'phone',
            backdrop: 0
          },
          { src: pul('dark-7-words'), frame: 'tilt', backdrop: 2 }
        ]
      },
      {
        title: 'Grammar you can look up',
        body: [
          'Czech grammar is mostly tables. Every rule has its own page with the full declension tables, worked examples and its exercises, and every answer explains why it’s right or wrong.'
        ],
        shots: [
          { src: pul('light-4-grammar-answer'), frame: 'browser', backdrop: 2 },
          { src: pul('light-11-noun-endings'), frame: 'float', backdrop: 1 }
        ]
      },
      {
        title: 'Reading and listening',
        body: [
          'Short readings let you tap any word to see what it means and how it’s formed. Words and sentences play with pre-recorded neural voices, and fall back to the browser’s Czech voice when a recording is missing.'
        ],
        shots: [
          {
            src: pul('phone-light-13-reading'),
            second: pul('phone-light-14-grammar-index'),
            frame: 'phone',
            backdrop: 1
          },
          { src: pul('light-12-search'), frame: 'corner', backdrop: 0 }
        ]
      },
      {
        title: 'Works on any device',
        body: [
          'It installs as an app and downloads lessons for offline use, for practice on the tram. Progress syncs across devices through a small API on Cloudflare Workers with a D1 database, behind Cloudflare Access. Light and dark themes follow the system.'
        ],
        shots: [{ src: pul('dark-8-settings'), frame: 'browser', backdrop: 2 }]
      },
      {
        title: 'Built by directing AI agents',
        body: [
          'I built Půlnoci with Claude Code: I set the product direction, the UX and the copy, and reviewed every change before it merged. In its first nine days that came to 266 commits, with tests across the content and the app logic, and every push to main tested and deployed automatically.'
        ]
      }
    ],
    stack: [
      {
        label: 'Frontend',
        items: [
          'React',
          'TypeScript',
          'Vite',
          'React Router',
          'TanStack Query',
          'Tailwind CSS 4',
          'shadcn/ui',
          'Dexie (IndexedDB)',
          'ts-fsrs',
          'Workbox (PWA)'
        ]
      },
      {
        label: 'Backend',
        items: ['Cloudflare Workers', 'Hono', 'D1 (SQLite)', 'Drizzle ORM', 'Cloudflare Access']
      },
      { label: 'Tooling', items: ['Vitest', 'GitHub Actions', 'Claude Code'] }
    ]
  }
]

/**
 * Case study pages are switched off for now. To bring them back, set this to true
 * and rename src/app/_work to src/app/work (folders starting with _ are not routed).
 */
export const showCaseStudies = false

export const projects = all.filter((p) => !p.hidden)

/** Devices layered beside the homepage headline, one project on each, to show the range. */
export const heroScreens = {
  label: 'FNOL Telemedicine on a laptop, GrapeSEED on a tablet, and Půlnoci and MBV on phones',
  laptop: fnol('patient-results-charts-desktop'),
  tablet: gs(2),
  phones: [pul('phone-dark-1-learn'), mbv('m-home')]
}

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}

export type EarlierProject = {
  /** Folder in /public/images/earlier/ and anchor on the archive page. */
  slug: string
  /** Number of screenshots, named 1.jpg, 2.jpg, … */
  shots: number
  colors: BrandColors
  themes: Pattern[]
  name: string
  description: string
  role: string
  stack: string
  href?: string
  /** Who the work was for or through, e.g. 'Freelance' or 'AMO Media'. */
  via: string
  /** When, if known. */
  year?: string
  /** Featured on the homepage; the rest are only named there and shown in the archive. */
  highlight?: boolean
  /** One short line for the homepage card. The archive shows the full description. */
  blurb?: string
  /** A custom image for the homepage card, e.g. a laptop-and-phone composition. Defaults to screenshot 1. */
  cover?: Shot
}

export const earlierWork: EarlierProject[] = [
  {
    slug: 'veevoy-website',
    via: 'veevoy',
    year: '2026',
    shots: 6,
    colors: { primary: '#8b74e8', secondary: '#c9bdf7' },
    themes: ['dots', 'grid'],
    name: 'veevoy.com',
    description:
      'I led the V3 redesign of the studio’s bilingual website from Figma: interactive WebGL hero scenes, iOS polish and a new Telemed case study. Lighthouse: 92 performance, 100 accessibility, 96 best practices, 100 SEO. Shown as shipped in July 2026; the site has been redesigned since.',
    role: 'Led the V3 redesign',
    stack: 'Next.js, React, TypeScript, Tailwind CSS 4, GSAP, Unicorn Studio',
    href: 'https://www.veevoy.com',
    blurb: 'Led the V3 redesign of the studio’s website, with interactive WebGL hero scenes.',
    highlight: true
  },
  {
    slug: 'medihome-care',
    via: 'veevoy',
    year: '2026',
    shots: 3,
    cover: {
      src: '/images/earlier/medihome-care/1.jpg',
      second: '/images/earlier/medihome-care/m-login.jpg',
      frame: 'devices'
    },
    colors: { primary: '#4f4fd8', secondary: '#a9b8f5' },
    themes: ['curves', 'plain'],
    name: 'Medihome Care',
    description:
      'A home health monitoring platform. The web app had no designer, so I defined its visual identity: design tokens, restyled base components, and a new login screen and navigation.',
    role: 'Visual identity and frontend for the web app',
    stack: 'Next.js, React 19, TypeScript, Tailwind CSS, shadcn/ui, Untitled UI',
    blurb: 'Defined the web app’s visual identity, with no designer on the project.',
    highlight: true
  },
  {
    slug: 'msb-concert',
    via: 'Freelance',
    year: '2024 – 2025',
    shots: 5,
    colors: { primary: '#0b2a5b', secondary: '#c9a46a' },
    themes: ['rays', 'plain'],
    name: 'MSB Private Concert: Tâm Thức Tinh Hoa',
    description:
      'The event site for an exclusive concert MSB held for its loyal customers in February 2025: a countdown, the artist line-up and a ticket sign-up form that saves to Google Sheets. Built from the provided design in under a week.',
    role: 'Full stack',
    stack: 'Next.js, React, TypeScript, Tailwind, Google Sheets API',
    blurb: 'Event site for MSB’s private concert, built from the design in under a week.',
    highlight: true
  },
  {
    slug: 'westlife-tour',
    via: 'Freelance, for AMO Media',
    year: '2023',
    shots: 3,
    colors: { primary: '#963155', secondary: '#aa5993' },
    themes: ['equalizer', 'rays'],
    name: 'Westlife: The Wild Dreams Tour HCMC',
    description:
      'The event page for Westlife’s November 2023 concert at Thống Nhất Stadium in Ho Chi Minh City.',
    role: 'Full stack',
    stack: 'Laravel, Vue, Inertia',
    blurb: 'Event page for Westlife’s 2023 concert in Ho Chi Minh City.',
    highlight: true
  },
  {
    slug: '911',
    via: 'Freelance, for AMO Media',
    year: '2022',
    shots: 3,
    colors: { primary: '#911b23', secondary: '#670e15' },
    themes: ['equalizer', 'rays'],
    name: '911',
    description:
      'The official website of the 90s UK boyband, built on a CSS template, with an admin portal I built from scratch.',
    role: 'Full stack',
    stack: 'Laravel, Inertia',
    blurb: 'Official website of the 90s UK boyband, with a custom admin portal.',
    highlight: true
  },
  {
    slug: 'maci-vitamin',
    via: 'Freelance',
    year: '2022',
    shots: 6,
    colors: { primary: '#29672c', secondary: '#8fbf7f' },
    themes: ['confetti', 'curves'],
    name: 'MaCi Vitamin',
    description:
      'An online shop for a health-products startup, with a quiz that recommends products from the customer’s answers. I built it end to end and managed the project.',
    role: 'Full stack, project manager',
    stack: 'Laravel, Vue, Inertia, Tailwind',
    blurb: 'Health-products shop with a quiz that recommends products. Built end to end.',
    highlight: true
  },
  {
    slug: 'msb',
    via: 'Freelance',
    year: '2022',
    shots: 5,
    colors: { primary: '#e82921', secondary: '#17b005' },
    themes: ['columns', 'plain'],
    name: 'MSB: Cùng Vươn Tầm',
    description:
      'A richly detailed, forest-themed page for MSB’s tree-planting campaign across Vietnam.',
    role: 'Full stack',
    stack: 'Laravel, Vue, Inertia, Tailwind'
  },
  {
    slug: 'morinaga-yogurt',
    via: 'Freelance',
    year: '2022 – 2023',
    shots: 3,
    colors: { primary: '#3f8fd0', secondary: '#75bdf5' },
    themes: ['waves', 'ripples'],
    name: 'Morinaga Yogurt',
    description: 'A bright, colourful landing page for Morinaga’s yogurt in Vietnam.',
    role: 'Full stack',
    stack: 'Laravel, Vue, Inertia, Tailwind',
    href: 'https://suachuamorinaga.vn/'
  },
  {
    slug: 'climeal',
    via: 'Freelance',
    year: '2022 – 2023',
    shots: 4,
    colors: { primary: '#9eb427', secondary: '#fbd168' },
    themes: ['waves', 'plain'],
    name: 'Climeal',
    description: 'A landing page introducing Climeal, a Japanese nutrition drink, in Vietnam.',
    role: 'Full stack',
    stack: 'Laravel, Vue, Inertia, Tailwind',
    href: 'https://climeal.vn/'
  },
  {
    slug: 'seabank',
    via: 'Freelance',
    year: '2022',
    shots: 4,
    colors: { primary: '#cc0018', secondary: '#f08a94' },
    themes: ['columns', 'plain'],
    name: 'SeABank: Doanh nghiệp nữ chủ',
    description:
      'A campaign page for SeABank about women-owned businesses, with a sign-up form for consultations.',
    role: 'Full stack',
    stack: 'Laravel, Vue, Inertia, Tailwind'
  },
  {
    slug: 'bcure',
    via: 'Freelance',
    year: '2022',
    shots: 4,
    colors: { primary: '#f68e1e', secondary: '#ffb76a' },
    themes: ['rays', 'plain'],
    name: 'B-Cure Laser Vietnam',
    description:
      'A multi-language website bringing B-Cure Laser, a medical device from the UK, to Vietnam.',
    role: 'Full stack',
    stack: 'Laravel, Inertia, Tailwind'
  },
  {
    slug: 'maci-care',
    via: 'Freelance',
    year: '2022 – 2023',
    shots: 5,
    colors: { primary: '#1a4c5d', secondary: '#99aba6' },
    themes: ['curves', 'plain'],
    name: 'MaCi Care',
    description:
      'The website for MaCi’s psychological care service. I built it and managed the project.',
    role: 'Full stack, project manager',
    stack: 'Laravel, Vue, Inertia, Tailwind'
  },
  {
    slug: 'viso-spa',
    via: 'AMIT Group',
    year: '2021',
    shots: 5,
    colors: { primary: '#11998e', secondary: '#38ef7d' },
    themes: ['ripples', 'curves'],
    name: 'Viso Spa',
    description:
      'A startup idea for a multi-tenant booking platform for spas in the United States, where each spa would run as its own branded website. I built the UI.',
    role: 'Full stack',
    stack: 'Laravel, Livewire, Vue, Inertia, Tailwind'
  },
  {
    slug: 'ats-fair',
    via: 'Freelance',
    year: '2022',
    shots: 3,
    colors: { primary: '#233a81', secondary: '#f38e25' },
    themes: ['grid', 'dots'],
    name: 'ATS Fair',
    description:
      'An online study-abroad fair, where visitors could download schools’ documents, enter for scholarships and talk to school representatives. I maintained it and added smaller features.',
    role: 'Maintenance and smaller features',
    stack: 'Node.js, Vue'
  },
  {
    slug: 'vrtg',
    via: 'AMO Media',
    shots: 4,
    colors: { primary: '#ff7878', secondary: '#f8c5c5' },
    themes: ['confetti', 'rays'],
    name: 'Vươn Ra Thế Giới',
    description:
      'A nationwide video competition run with the Central Council of the Ho Chi Minh Young Pioneers and promoted to every school in Vietnam. Children aged 6 to 15 filmed themselves presenting their province’s culture, then a Southeast Asian country in the second round, and visitors watched the entries and voted for their favourites.',
    role: 'Frontend maintenance',
    stack: 'Node.js, Vue'
  },
  {
    slug: 'dsvtl',
    via: 'AMO Media',
    shots: 4,
    colors: { primary: '#fdc60b', secondary: '#ff8400' },
    themes: ['confetti', 'lines'],
    name: 'Đọc Sách Vì Tương Lai',
    description:
      'A nationwide reading competition run with the Central Council of the Ho Chi Minh Young Pioneers and promoted to every school in Vietnam. Children aged 6 to 15 filmed themselves introducing a book, and visitors watched the entries and voted for their favourites.',
    role: 'Frontend maintenance',
    stack: 'Node.js, Vue'
  }
]
