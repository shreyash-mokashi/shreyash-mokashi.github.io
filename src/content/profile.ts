/**
 * Single source of truth for every word on this site.
 *
 * Nothing customer-facing is typed inline in a component — the same discipline
 * the production codebases this site describes enforce with a lint guard.
 *
 * Every figure in `metrics` is derived from real commit history, not estimated.
 * See README.md for the exact commands that produce them.
 */

export type Metric = { value: string; label: string; detail: string }
export type Project = {
  id: string
  title: string
  context: string
  summary: string
  contributions: string[]
  stack: string[]
  scale?: string
}
export type Role = {
  company: string
  title: string
  period: string
  location: string
  summary: string
  highlights: string[]
}
export type SkillGroup = { level: string; note: string; items: string[] }

export const meta = {
  name: 'Shreyash Mokashi',
  role: 'Software Engineer',
  tagline: 'Frontend engineer, travel & booking platforms',
  location: 'Pune, Maharashtra, India',
  // One honest sentence. No adjectives a reviewer can't verify.
  intro:
    'I build the screens people actually transact on — search, results, details, checkout and confirmation — for travel platforms that sell hotels, flights, holidays, insurance and activities.',
  availability: 'Open to frontend and full-stack engineering roles',
  /** Resolves the Open Graph image URL for link previews. Change this if the
   *  site moves to a custom domain. */
  siteUrl: 'https://shreyash-mokashi.github.io',
} as const

export const nav = [
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
] as const

export const metrics: Metric[] = [
  {
    value: '1,000+',
    label: 'commits merged',
    detail: 'across four production repositories since September 2025',
  },
  {
    value: '60k+',
    label: 'lines shipped',
    detail: 'added across ~2,300 file changes, excluding merges',
  },
  {
    value: '5',
    label: 'travel verticals',
    detail: 'hotel, flight, holiday, insurance and activities',
  },
  {
    value: '1.5 yrs',
    label: 'in production code',
    detail: 'in codebases with 20+ contributors and 55,000+ commits',
  },
]

export const about = {
  heading: 'About',
  paragraphs: [
    'I joined Vernost in June 2025 and have spent the time since inside large, long-lived travel booking codebases — the kind with a decade of history, twenty-plus contributors and real money moving through them.',
    'Most of my work sits on the revenue path: hotel search and results, property details, the booking form, fare breakdowns, payment-gateway charges, coupons and booking confirmation. These are the screens where a rendering bug costs a sale and a wrong total costs trust, so I have learned to treat edge states, loading behaviour and price arithmetic as the feature rather than an afterthought.',
    'I have worked across both generations of the platform: a mature Next.js 12 / React 18 JavaScript application serving five verticals, and a newer Next.js 15 / React 19 TypeScript monorepo built on pnpm and Turborepo with Vitest and Playwright coverage. Moving between them taught me what a codebase feels like when its conventions are enforced, and what it feels like when they are not.',
  ],
}

export const roles: Role[] = [
  {
    company: 'Vernost Tech Ventures',
    title: 'Software Engineer',
    period: 'June 2025 — Present',
    location: 'Pune, India',
    summary:
      'Frontend engineering across consumer travel booking and corporate travel products.',
    highlights: [
      'Ship customer-facing features across five travel verticals in a shared Next.js/React codebase, from Jira requirement through to production release.',
      'Own hotel search, property details, booking and confirmation screens end to end — layout, API integration, validation, loading and failure states.',
      'Build and maintain fare and price-breakdown components reused across hotel, flight, holiday and insurance — the most frequently revisited surface in my work.',
      'Integrate checkout mechanics: payment-gateway charge handling, coupon validation, price recheck before payment, and booking-status polling.',
      'Work in a modern TypeScript monorepo (Next.js 15, React 19, pnpm, Turborepo) with typed view-models, unit tests and DOM tests alongside each feature.',
      'Debug production issues through root-cause analysis across UI, API integration and data flow, then verify fixes with functional and regression passes.',
    ],
  },
]

export const projects: Project[] = [
  {
    id: 'maps',
    title: 'Map experience for hotel search & details',
    context: 'Consumer travel marketplace · 2026',
    summary:
      'A map view on hotel search results and a nearby-places panel on the property details page, both built on the Google Maps JavaScript API.',
    contributions: [
      'Built the search-results map view as a versioned widget with its own layout config, styles and DOM tests.',
      'Wrote the viewport-bounds utility that fits the map to the current result set and keeps pins and the list in sync, covered by its own unit tests.',
      'Built the nearby-places panel on the details page, sharing one Google Maps loader module rather than initialising the SDK twice.',
      'Extended the search and detail API layers to carry the coordinate data the map needs, rather than inventing fallback positions when the supplier omits them.',
    ],
    stack: ['React 19', 'TypeScript', 'Google Maps JS API', 'CSS Modules', 'Vitest'],
    scale: 'Search + details, desktop and mobile',
  },
  {
    id: 'checkout',
    title: 'Hotel booking & checkout flow',
    context: 'Consumer travel marketplace · 2026',
    summary:
      'The booking page a guest fills in before paying: traveller details, cancellation terms, what is payable now versus at the hotel, and the final price.',
    contributions: [
      'Built the guest and contact forms with validation, each with DOM tests covering the states a reviewer would actually try to break.',
      'Built the cancellation policy banner and timeline so the guest sees exactly when free cancellation ends and what it costs after.',
      'Built the pay-at-hotel breakdown, separating what is charged now from what the property collects on arrival.',
      'Shaped typed view-models between the API response and the UI, so a field the supplier does not send renders an honest empty state instead of a fabricated value.',
    ],
    stack: ['Next.js 15', 'React 19', 'TypeScript', 'Vitest', 'Testing Library'],
    scale: 'Revenue-path surface',
  },
  {
    id: 'fare',
    title: 'Fare & price breakdown across five verticals',
    context: 'Consumer travel platform · 2025 — 2026',
    summary:
      'The price-breakup surface that explains a total: base fare, taxes, fees, discounts, coupons and payment-gateway charges — shared across hotel, flight, holiday and insurance.',
    contributions: [
      'Maintained and extended the shared breakdown components, the single most-touched area of my work across the codebase.',
      'Implemented payment-gateway charge display and reshaped the payment payload to match the gateway contract.',
      'Handled coupon application and validation behaviour in the review and checkout steps.',
      'Reconciled breakdown behaviour across verticals that each had their own historical quirks, without regressing any of them.',
    ],
    stack: ['React 18', 'Next.js 12', 'JavaScript', 'CSS Modules'],
    scale: 'Hotel · flight · holiday · insurance · activities',
  },
  {
    id: 'corporate',
    title: 'Corporate travel: policy compliance & approvals',
    context: 'Corporate booking tool · 2026',
    summary:
      'Business travel has a layer consumer travel does not: every trip is checked against company policy and routed to the right approvers before it can be booked.',
    contributions: [
      'Rendered in-policy and out-of-policy outcomes dynamically from the API on trip request and details screens, rather than hard-coding rules in the UI.',
      'Built multi-level approver binding so a request displays the correct approval chain for its organisation.',
      'Implemented the email approve/discard flow that lets an approver act without signing in to the tool.',
      'Built confirmation and manage-booking screens, multi-room handling and add-to-calendar.',
    ],
    stack: ['Next.js 15', 'React 19', 'TypeScript', 'Turborepo', 'pnpm'],
    scale: '~15,000 lines across 850 file changes',
  },
  {
    id: 'account',
    title: 'My Trips & account profile',
    context: 'Consumer travel platform · 2026',
    summary:
      'The signed-in area: a traveller’s booking history across every vertical, and the profile they manage it from.',
    contributions: [
      'Built the My Trips page — my single largest feature contribution by volume — listing and filtering bookings across hotel, flight, holiday and insurance.',
      'Rebuilt the profile section, including the shared profile components used by more than one vertical.',
      'Handled the states that matter in an account area: no bookings yet, a booking that failed, and a session that has expired.',
    ],
    stack: ['React 18', 'Next.js 12', 'JavaScript', 'CSS Modules'],
    scale: '~5,700 lines across two feature commits',
  },
  {
    id: 'perf',
    title: 'Image loading on hotel search results',
    context: 'Performance · 2026',
    summary:
      'Hotel results are image-heavy. The blur-up placeholder held every image blurred for a fixed one second after it had already decoded.',
    contributions: [
      'Traced the delay to a hard-coded timeout in the shared blur-image component rather than to network or decode time.',
      'Made the hold configurable per caller and set it to zero on the search results list and tiles, so images sharpen the moment they decode.',
      'Kept the original one-second default for every other caller, so the change could not regress surfaces I had not tested.',
    ],
    stack: ['React', 'Next.js Image', 'CSS Modules'],
    scale: 'Search results list & tiles',
  },
]

export const skills: SkillGroup[] = [
  {
    level: 'Daily',
    note: 'What I work in every day and would be comfortable being interviewed on.',
    items: [
      'React 18 / 19',
      'Next.js 12 → 15',
      'TypeScript',
      'JavaScript (ES2022)',
      'CSS Modules & design tokens',
      'REST API integration',
      'Responsive & mobile-first UI',
      'Git / Bitbucket, PR workflow',
    ],
  },
  {
    level: 'Working knowledge',
    note: 'Used regularly on real features, with room to go deeper.',
    items: [
      'Vitest & Testing Library',
      'Playwright',
      'Node.js & Express',
      'pnpm & Turborepo monorepos',
      'Google Maps Platform',
      'Payment gateway integration',
      'Tailwind CSS',
      'MUI / Material UI',
    ],
  },
  {
    level: 'Familiar',
    note: 'Have worked with these, but would not claim depth.',
    items: ['MongoDB', 'Docker', 'Kubernetes manifests', 'SonarQube', 'PWA / next-pwa'],
  },
]

export const education = {
  heading: 'Education',
  items: [
    {
      qualification: 'Bachelor of Engineering, Computer Science',
      institution:
        'Shri Chhatrapati Shivajiraje College of Engineering, Bhor, Pune',
      period: 'August 2020 — January 2024',
      note: 'Rajgad Dnyanpeeth\u2019s \u00b7 Affiliated to Savitribai Phule Pune University (SPPU)',
    },
  ],
}

export const contact = {
  heading: 'Get in touch',
  blurb:
    'Open to frontend and full-stack engineering roles. The fastest way to reach me is email.',
  email: 'shreyashmokashi0268@gmail.com',
  phone: '+91 93703 14430',
  linkedin: 'https://www.linkedin.com/in/shreyash-mokashi-425163224/',
  github: '',
  resumeHref: '/Shreyash-Mokashi-Resume.pdf',
}

export const footer = {
  note: 'Built with Next.js 15, React 19 and TypeScript. No UI text lives in a component — every word on this page comes from a single typed content file.',
  metricsNote:
    'Figures above are counted from commit history across the repositories I contribute to, excluding merge commits.',
}
