/**
 * The four in-depth case studies.
 * Images live in public/images/case-studies/<slug>/ and are referenced by base name (no extension):
 *   hero.*            the large opening panel
 *   01.*, 02.*, ...   one file per section panel (05-b.* for a second panel in the same section)
 * Any missing image renders as a labelled grey placeholder, so the site builds before the exports arrive.
 */

export interface Section {
  num: string;
  title: string;
  caption: string;
  images: string[]; // base names inside the case study folder
  inset?: string[]; // images shown small and centred on a grey panel (e.g. a single phone video)
}

export interface CaseStudy {
  slug: string;
  title: string; // shown lowercase in the hero, as in the Figma
  name: string; // proper name for cards, titles and SEO
  tags: string; // card meta line
  year: string;
  credits: [string, string];
  summary: string;
  sections: Section[];
  quote?: { text: string; author: string };
  next: string; // slug of the next case study
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'cover',
    title: 'cover',
    name: 'Cover',
    tags: 'Product design, UI/UX',
    year: '2026',
    credits: ['Cover, early-stage startup\n2026', 'Sole product designer\nTablet, mobile & desktop'],
    summary:
      'Sole product designer for Cover, a startup building one operating system for restaurants. I merged the four tools restaurants run side by side (ordering, back office, staff scheduling and POS) into a single product across tablet, mobile and desktop, drawing on four years of waiting tables myself. Now live in its first restaurant, with pilots starting November 2026.',
    sections: [
      { num: '01', title: 'One system, three devices', caption: "Each device does the job it's best at. The tablet is the waiter's workstation, the phone keeps the floor in their pocket, and the desktop is the manager's control room. One design language ties them together.", images: ['01'] },
      { num: '02', title: 'Ordering', caption: 'Built around the table: covers, table number and server on top, the menu and the live order side by side, and AI suggestions for what to add next.', images: ['02'] },
      { num: '03', title: 'Payment', caption: "Every real-world case on one screen: tips, discounts, partial payments and seven payment methods. A discount above the limit asks for a manager's code without leaving the flow.", images: ['03'] },
      { num: '04', title: 'On the floor', caption: "Tables, orders and shifts in the waiter's pocket. Clear status colors and swipe actions make what matters readable at a glance, even mid-shift.", images: ['04'] },
      { num: '05', title: 'Back office', caption: "The manager's control room: live sales, food and labor costs, AI recommendations and the floor plan of today's reservations.", images: ['05', '05-b'] },
      { num: '06', title: 'Marketing website', caption: 'I also designed and built coverpos.com, the site that explains Cover to restaurant owners and books intro meetings.', images: ['06'] },
    ],
    // quote: { text: '', author: 'Liran Elaiof, Founder, Cover' }, // waiting for Liran's testimonial
    next: 'the-money-map',
  },
  {
    slug: 'the-money-map',
    title: 'the money\nmap',
    name: 'The Money Map',
    tags: 'Branding, UI/UX, mobile',
    year: '2026',
    credits: ['Guy Natan & Mor Yogev\n2026', 'Sole designer\nProduct design & branding'],
    summary:
      'Sole designer of The Money Map, a mobile app by financial expert Guy Natan and economics TV host Mor Yogev that makes personal finance approachable for everyone. It turns a stressful subject into a 12-day guided journey: one short video and one small task a day. I designed the product and the brand identity end to end. Now in its third pilot, ahead of launch.',
    sections: [
      { num: '01', title: 'Twelve days, one map', caption: 'Each day unlocks a single task. The home screen shows exactly where you are on the journey, and a home-screen widget brings you back tomorrow.', images: ['01'] },
      { num: '02', title: 'Learn, then do', caption: 'Every day pairs a short video from Guy and Mor with one practical task, broken into small steps so it never feels like paperwork.', images: ['02'] },
      { num: '03', title: 'AI does the heavy lifting', caption: 'Upload a payslip or a statement and AI reads it for you, turning raw numbers into a plain-language insight about where you stand.', images: ['03'] },
      { num: '04', title: 'Your money, finally clear', caption: 'A financial health score, income versus expenses and a running total of what the journey has already saved you, all in plain language.', images: ['04'] },
      { num: '05', title: 'Brand identity', caption: 'Built around the logo, an identity that feels calm and optimistic rather than corporate: soft purples, a fresh mint accent and playful coin illustrations.', images: ['05'] },
      { num: '06', title: 'App Store', caption: 'Store screenshots that sell the promise in one line each: one task a day, ten minutes, twelve days.', images: ['06'] },
    ],
    next: 'velora',
  },
  {
    slug: 'velora',
    title: 'velora',
    name: 'Velora',
    tags: 'Branding, UI/UX, dashboard, website',
    year: '2025-26',
    credits: ['Velora, startup\n2025-26', 'Sole designer\nBrand, web app, mobile & website'],
    summary:
      'Sole designer of Velora, a platform that gives financial advisors everything they need in one place. Advisors run their practice from a single dashboard, and their clients follow their money in a companion app with AI insights. I designed the brand, the advisor platform, the client app and the website. Live today, with more than 50 advisors on board.',
    sections: [
      { num: '01', title: "The advisor's day", caption: 'Open tasks, upcoming meetings and the status of every client on one screen, so an advisor knows where to start the day.', images: ['01'] },
      { num: '02', title: 'One client, the full picture', caption: 'Assets, liabilities, goals and progress in a single client view, replacing the mix of spreadsheets and documents advisors used to juggle.', images: ['02'] },
      { num: '03', title: 'Planning tools', caption: 'Scenario comparison and cash-flow planning turn numbers into clear visuals an advisor can walk a client through in a meeting.', images: ['03'] },
      { num: '04', title: 'Meetings', caption: 'A calendar built for client work: schedule in a click, see upcoming meetings and save a summary right after each one.', images: ['04'] },
      { num: '05', title: 'The client app', caption: 'Clients get their own window into their money: budget, cash flow, capital and an emergency fund, always in sync with their advisor.', images: ['05'] },
      { num: '06', title: 'AI insights', caption: "AI turns the client's data into plain-language insights, and a chat lets them ask about their money anytime between meetings.", images: ['06'] },
      { num: '07', title: 'White label', caption: 'Velora is also sold as a white-label product. Each advisory firm gets the same app in its own brand, with its own logo, colors and advisor photo, built on one flexible design system.', images: ['07-white-label'], inset: ['07-white-label'] },
      { num: '08', title: 'App Store', caption: 'Store screenshots that tell the product story in one line each, designed as a template every white-label brand can reuse.', images: ['08'] },
      { num: '09', title: 'Brand and website', caption: 'A calm, confident identity in black and fresh mint, carried from the logo through the product and the marketing website.', images: ['09'] },
    ],
    next: 'timelines',
  },
  {
    slug: 'timelines',
    title: 'timelines',
    name: 'Timelines',
    tags: 'Branding, UI/UX, website',
    year: '2021-24',
    credits: ['Harel Hasky\n2021-24', 'Sole designer\nBrand, app, web & social'],
    summary:
      'Sole designer of Timelines, an app that lets kindergarten teachers turn everyday moments into private digital albums for parents. I designed the brand, the app, the website and landing pages, and the social campaigns. Today it serves over 10,000 monthly active users across 400 kindergartens.',
    sections: [
      { num: '01', title: 'Albums, not a camera roll', caption: "Photos live in timelines instead of flooding parents' phones, so families get every moment without filling up their storage.", images: ['01'] },
      { num: '02', title: 'A printed album in one flow', caption: "Turn a timeline into a printed album: pick a date range, let the app flag photos that won't print well, and send it off.", images: ['02'] },
      { num: '03', title: 'Brand identity', caption: 'A light, optimistic identity in turquoise, made to feel at home with teachers and parents alike.', images: ['03'] },
      { num: '04', title: 'Website and landing pages', caption: 'A marketing site for kindergartens and landing pages for printed albums, each with one clear action.', images: ['04', '04-b'] },
      { num: '05', title: 'Social campaigns', caption: 'Instagram posts and stories for album campaigns and seasonal promotions, built from the same visual language.', images: ['05', '05-b'] },
    ],
    quote: {
      text: "Timelines made a huge difference in our kindergarten. Parents love that their child's photos reach them first, and they really appreciate the effort we put in.",
      author: 'Dikla, Brosh Kindergarten, Haifa',
    },
    next: 'cover',
  },
];

/** Pages go live one at a time, after approval. */
export const RELEASED_CASE_STUDIES = ['cover', 'the-money-map', 'velora', 'timelines'];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug)!;
