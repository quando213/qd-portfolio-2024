export const profile = {
  name: 'Quan Do',
  role: 'Frontend developer',
  location: 'Prague, Czech Republic',
  email: 'quando213x@gmail.com',
  siteUrl: 'https://quando.dev',
  /** Shown under the email in the footer. The CV link is added automatically when public/quan-do-cv.pdf exists. */
  links: [{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/quan-do-6846611ab/' }] as {
    label: string
    href: string
  }[],
  cvFile: 'quan-do-cv.pdf',
  headline: 'I turn complex products into polished, easy-to-use interfaces.',
  intro:
    'Frontend developer with a strong UI/UX eye. I turn complex products into polished, accessible, easy-to-use web apps with React and Next.js, and ship fast by directing AI coding agents.',
  /** Not shown on the site at the moment. */
  about: [
    'I’ve been building for the web since 2018. My strength is complex, data-heavy interfaces: form builders with conditional logic, live request queues, trend charts with alert thresholds, multi-step creation flows. I care about the details that make them feel finished, from keyboard access and screen-reader labels to responsive layouts and the wording on every button.',
    'I like owning the foundations as much as the screens. On my current project I created the shared UI library and app shell the rest of the team builds on. At GrapeCity I introduced Tailwind CSS, started the move to Vue 3 and mentored junior developers. When a feature needs an API, I write that too, in NestJS and GraphQL. I also work directly with the people who use what I build, and turn their feedback into shipped releases.',
    'AI coding agents are part of how I work every day. I treat them as a team to direct, not as autocomplete: I set the scope, make the UX and copy decisions, and review every change before it merges. That’s how I ship fast without lowering the bar.'
  ],
  facts: [
    { label: 'Now', value: 'Frontend developer at veevoy', href: 'https://www.veevoy.com' },
    { label: 'Based in', value: 'Prague, Czech Republic' },
    { label: 'Works with', value: 'React, Next.js, TypeScript, Tailwind CSS, GraphQL' },
    { label: 'Languages', value: 'English (professional), Czech (A2), Vietnamese (native)' }
  ] as { label: string; value: string; href?: string }[]
}

export type Job = {
  /** Leave out for freelance work. */
  company?: string
  title: string
  period: string
  summary?: string
}

export const experience: Job[] = [
  {
    company: 'veevoy',
    title: 'Frontend Developer',
    period: 'Sep 2025 – present',
    summary:
      'Clinician web app for FNOL Telemedicine, the Medihome Care web app, and the V3 redesign of veevoy.com.'
  },
  {
    title: 'Freelance Frontend Developer',
    period: '2022 – present',
    summary:
      'Alongside full-time roles: frontend lead for MBV’s website, MSB’s private concert site, and campaign sites for brands like Westlife and Morinaga.'
  },
  {
    company: 'GrapeCity Europe',
    title: 'Frontend Developer, then UI/UX Designer',
    period: 'Jan 2022 – Aug 2025',
    summary:
      'GrapeSEED products in Vue.js and React. Led the Connect redesign, introduced Tailwind CSS and Vue 3, and mentored juniors. UI/UX design from December 2024.'
  },
  {
    company: 'AMIT Group',
    title: 'Full Stack Developer',
    period: 'Feb – Dec 2021',
    summary: 'Multi-tenant apps, shops and landing pages in Vue, Nuxt and Laravel.'
  },
  {
    company: 'AMO Media',
    title: 'Tech Specialist',
    period: 'Aug 2018 – Jan 2021',
    summary: 'Conceived and maintained web projects for clients.'
  }
]

export type Study = {
  school: string
  programme: string
  period: string
  note?: string
}

export const education: Study[] = [
  {
    school: 'FPT Aptech, Hanoi',
    programme: 'Software Engineering Education Programme',
    period: 'Sep 2020 – Oct 2022',
    note: '1st place, Website Design & Development, TechWiz 2022 (Aptech Global)'
  },
  {
    school: 'Foreign Trade University, Hanoi',
    programme: 'Bachelor of International Business Administration',
    period: 'Sep 2014 – Jul 2018'
  }
]
