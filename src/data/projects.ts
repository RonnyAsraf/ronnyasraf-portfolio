/**
 * Regular project pages (UX/UI and website case pages) and the full websites list.
 * Images: public/images/ui-ux/<slug>/ and public/images/websites/<slug>/ (every image in the folder is shown in order).
 * Card thumbnails: public/images/cards/<slug>.*
 */

export interface Project {
  slug: string;
  name: string;
  title: string; // lowercase hero title
  tags: string;
  year: string;
  credits: [string, string];
  summary: string;
  url?: string;
}

export const uxuiProjects: Project[] = [
  { slug: 'lerni', name: 'Lerni', title: 'lerni', tags: 'Branding, UI/UX', year: '2025', credits: ['Dana Gershon\n2025', 'Branding, dashboard\n& landing page'], summary: 'Branding, dashboard design and a landing page for Lerni, a teaching platform.' },
  { slug: 'bluex-ai', name: 'bluex AI', title: 'bluex ai', tags: 'UI/UX, dashboard', year: '2026', credits: ['Deploy\n2026', 'UX & UI, dashboard design\nMarketing'], summary: 'Dashboard UX and UI for bluex AI, an AI-powered marketing platform.' },
  { slug: 'sense', name: 'Sense', title: 'sense', tags: 'Branding, UI/UX', year: '2025', credits: ['Primak\n2024-25', 'UX & UI design\nHealthcare'], summary: 'UX and UI design for Sense, a healthcare app that helps people track and understand their emotional resilience.' },
  { slug: 'rge-onboarding', name: 'RGE Onboarding Platform', title: 'rge onboarding', tags: 'Dashboard, UI/UX', year: '2025', credits: ['Media Minder Solutions\n2025', 'Dashboard design, UX & UI\nHR'], summary: 'Dashboard, UX and UI design for RGE, an employee onboarding platform.' },
  { slug: 'oh-hi', name: 'OH-HI!', title: 'OH-HI!', tags: 'UX, mobile', year: '2024', credits: ['Keren Fox\n2024', 'UX design\nEvents & community'], summary: 'UX design for OH-HI!, an events app where members discover meetups and connect with other participants, with a separate view for community managers.' },
  { slug: 'greenclick', name: 'GreenClick', title: 'greenclick', tags: 'Dashboard', year: '2025', credits: ['GreenClick\n2025', 'Dashboard design\nFinance'], summary: 'Dashboard design for GreenClick, a finance technology product.' },
  { slug: 'memorit-co', name: 'Memorit.co', title: 'memorit.co', tags: 'Branding, UI/UX, mobile', year: '2023', credits: ['Harel Tussi\n2023', 'Branding, UX & UI\nLanding page & social'], summary: 'Branding, UX and UI, a landing page and social media for Memorit.co, a games brand.' },
];

export const websiteProjects: Project[] = [
  { slug: 'auto-fit', name: 'AutoFit', title: 'autofit', tags: 'Website, Code', year: '2026', credits: ['Website\n2026', 'Design & development\nCode'], summary: 'A management platform for personal trainers, studios and gyms, with client management, workout and nutrition plans, automated billing and a branded app.', url: 'https://auto-fit.co.il/' },
  { slug: 'cover-site', name: 'Cover', title: 'cover', tags: 'Website, Wix Studio', year: '2026', credits: ['Website\n2026', 'Design & development\nWix Studio'], summary: 'The marketing site for an all-in-one restaurant system. It explains the product to restaurant owners and books intro meetings.', url: 'https://www.coverpos.com/' },
  { slug: 'the-morning-club', name: 'The Morning Club', title: 'the morning club', tags: 'Website, Wix Studio', year: '2026', credits: ['Website\n2026', 'Design & development\nWix Studio'], summary: "Full food service for offices, from daily breakfast and stocked kitchenettes to lunches, happy hours and events, so teams don't have to manage suppliers themselves.", url: 'https://www.morningclubisr.com/' },
  { slug: 'the-code-of-creation', name: 'The Code of Creation', title: 'the code of creation', tags: 'Website, Wix Studio', year: '2026', credits: ['Website\n2026', 'Design & development\nWix Studio'], summary: 'A holistic healing space in Tel Aviv offering yoga classes, personal sessions that combine numerology and guided imagery, and sound healing workshops.', url: 'https://www.karin360.com/' },
  { slug: 'otto-seven-senses', name: 'Otto Seven Senses', title: 'otto seven senses', tags: 'Website, Wix Studio', year: '2025', credits: ['Website\n2025', 'Design & development\nWix Studio'], summary: 'A boutique hotel of four suites in a 19th-century stone building in downtown Haifa, with an art gallery, a rooftop pool and a personal, art-focused stay.', url: 'https://www.otto7senses.com/' },
  { slug: 'ganit-park', name: 'Ganit Park', title: 'ganit park', tags: 'Website, Elementor', year: '2025', credits: ['Website\n2025', 'Website design\nElementor'], summary: 'A company that has been designing, making and installing playgrounds, outdoor fitness equipment and urban furniture for cities and developers since 1978.', url: 'https://www.ganit.co.il/' },
  { slug: 'greenclick', name: 'GreenClick', title: 'greenclick', tags: 'Website, Code', year: '2025', credits: ['Website\n2025', 'Design & development\nWix Studio'], summary: 'A cloud distribution platform that lets cloud distributors, resellers and MSPs manage pricing, provisioning and billing for their whole reseller chain in one place.' },
  { slug: 'go-power', name: 'Go Power', title: 'go power', tags: 'E-commerce, Wix Studio', year: '2025', credits: ['E-commerce\n2025', 'Design & development\nWix Studio'], summary: 'An online store for backup power and energy storage, from portable power stations to home battery systems, for homes and businesses.', url: 'https://www.go-power.ai/' },
  { slug: 'qombat', name: 'Qombat', title: 'qombat', tags: 'Website, Wix Studio', year: '2025', credits: ['Website\n2025', 'Design & development\nWix Studio'], summary: 'A quantum technology company that protects sensitive data and communications for governments, defense and critical infrastructure against future quantum threats.' },
];

/** Every live site, as on the current Websites page. `page` links to an internal project page when one exists. */
/** archived: the live site changed or is offline, so the card opens a page with the full screen recording instead of linking out. */
export interface Site { slug: string; name: string; type: string; year: string; url?: string; page?: string; archived?: boolean; summary?: string; }

export const allSites: Site[] = [
  // Sorted by year (newest first); within a year live sites come before ones that are no longer live (TfilaTech is the exception, placed higher). Otto keeps its spot.
  { slug: 'cover-site', name: 'Cover', type: 'Landing Page, Wix Studio', year: '2026', url: 'https://www.coverpos.com/', page: '/websites/cover-site' },
  { slug: 'auto-fit', name: 'AutoFit', type: 'Landing Page, Code', year: '2026', url: 'https://auto-fit.co.il/', page: '/websites/auto-fit' },
  { slug: 'otto-seven-senses', name: 'Otto Seven Senses', type: 'Website, Wix Studio', year: '2025', url: 'https://www.otto7senses.com/', page: '/websites/otto-seven-senses' },
  { slug: 'the-morning-club', name: 'The Morning Club', type: 'Landing Page, Wix Studio', year: '2026', url: 'https://www.morningclubisr.com/', page: '/websites/the-morning-club' },
  { slug: 'petra', name: 'Petra', type: 'Template, Wix Studio', year: '2026', url: 'https://www.wix.com/marketplace/template/e16c9ada-0910-4839-80ec-5176eedac7a4' },
  { slug: 'the-code-of-creation', name: 'The Code of Creation', type: 'Landing Page, Wix Studio', year: '2026', url: 'https://www.karin360.com/', page: '/websites/the-code-of-creation' },
  { slug: 'neho-design', name: 'Neho Design', type: 'Landing Page, Code', year: '2026', url: 'https://nehodesign.co.il/' },
  { slug: 'avni-derech-school', name: 'Avni Derech School', type: 'Website, Wix Studio', year: '2026', url: 'https://www.montessori-herzliya.co.il/' },
  { slug: 'lerni-site', name: 'Lerni', type: 'Website, Wix Studio', year: '2026', page: '/websites/lerni-site', archived: true, summary: 'A website for a work management and hourly billing system for freelancers, private tutors and professionals: clients, scheduling, time tracking and payments in one place.' },
  { slug: 'ganit-park', name: 'Ganit Park', type: 'Website, Elementor', year: '2025', url: 'https://www.ganit.co.il/', page: '/websites/ganit-park' },
  { slug: 'go-power', name: 'Go Power', type: 'E-commerce, Wix Studio', year: '2025', url: 'https://www.go-power.ai/', page: '/websites/go-power' },
  { slug: 'rakafot-project', name: 'Rakafot Project', type: 'Landing Page, Wix Studio', year: '2025', url: 'https://www.mo-p.co.il/rakafot-project-landing-page' },
  { slug: 'velora-site', name: 'Velora', type: 'Website, Wix Studio', year: '2025', url: 'https://www.velora-finance.com/', page: '/case-studies/velora' },
  { slug: 'tfilatech', name: 'TfilaTech', type: 'Website, Elementor', year: '2025', page: '/websites/tfilatech', archived: true, summary: 'A website for a platform offering accessible, secular-friendly Jewish content: prayers, blessings, holidays and daily times.' },
  { slug: 'moshe-peretz', name: 'Moshe Peretz', type: 'Website, Wix Studio', year: '2025', url: 'https://www.mo-p.co.il/' },
  { slug: 'greenclick', name: 'GreenClick', type: 'Website, Code', year: '2025', page: '/websites/greenclick' },
  { slug: 'kami', name: 'Kami', type: 'E-commerce, Wix Studio', year: '2025', url: 'https://www.kami.hair/' },
  { slug: 'menasim', name: 'Menasim', type: 'Website, Wix Studio', year: '2025', url: 'https://www.menasim.org/' },
  { slug: 'go-fiber', name: 'Go Fiber', type: 'Website, Wix Studio', year: '2025', url: 'https://www.gofiber.ai/' },
  { slug: 'qombat', name: 'Qombat', type: 'Website, Elementor', year: '2025', page: '/websites/qombat' },
  { slug: 'terrasafe', name: 'TerraSafe', type: 'Website, Wix Studio', year: '2025', url: 'https://www.terrasafe.co.il/' },
  { slug: 'go-catalog', name: 'Go Catalog', type: 'Landing Page, Wix Studio', year: '2025', url: 'https://www.go-n-go.com/catalog' },
  { slug: 'ican', name: 'ICAN', type: 'Website, Wix Studio', year: '2025', url: 'https://www.icanstrategy.com/' },
  { slug: 'streetwise', name: 'StreetWise', type: 'Landing Page, Wix Studio', year: '2025', url: 'http://www.streetwisebi.com' },
  { slug: 'noam-physiotherapy', name: 'Noam Physiotherapy', type: 'Website, Wix', year: '2025', url: 'https://www.noamphysio.co.il/' },
  { slug: 'haetz-herzeliya', name: 'Haetz Herzeliya', type: 'Website, Wix Studio', year: '2025', url: 'http://www.haetz-herzelia.co.il' },
  { slug: 'eigenq', name: 'EigenQ', type: 'Website, Wix Studio', year: '2025', page: '/websites/eigenq', archived: true, summary: 'A website for a quantum security company that builds quantum hardware and software for enterprise and government, with pages for its products, technology, use cases and investors.' },
  { slug: 'yafo-ai', name: 'Yafo.ai', type: 'Website, Wix Studio', year: '2025', page: '/websites/yafo-ai', archived: true, summary: 'A website for an AI education and community hub for Israeli audiences, with events and content on the big questions AI raises.' },
  { slug: 'evel-israel', name: 'Evel Israel', type: 'Website, Wix Studio', year: '2025', page: '/websites/evel-israel', archived: true, summary: 'A clean, accessible website for a service that makes creating a memorial notice simple.' },
  { slug: 'makom-yafe-lecafe', name: 'Makom Yafe Lecafe', type: 'Landing Page, Wix Studio', year: '2024', url: 'http://www.makomyafelecafe.com' },
  { slug: 'orly-assaraf', name: 'Orly Assaraf', type: 'Website, Wix Studio', year: '2024', url: 'http://www.orlya.co.il' },
  { slug: 'emris-pharma', name: 'Emris Pharma', type: 'Website, Elementor', year: '2024', url: 'http://www.emris-pharma.com' },
  { slug: 'club-d', name: 'Club-D', type: 'Website, Elementor', year: '2024', url: 'http://www.clubd.fund' },
  { slug: 'urbanica', name: 'Urbanica', type: 'Website, Shopify', year: '2024', url: 'http://urbanicafurniture.com' },
  { slug: 'timelines-site', name: 'Timelines', type: 'Website, Wix Studio', year: '2024', page: '/websites/timelines-site', archived: true, summary: 'A website for a photo-sharing app used by kindergartens, where teachers share daily photos with parents.' },
  { slug: 'timelines-albums', name: 'Timelines Albums', type: 'Landing Page, Wix Studio', year: '2024', page: '/websites/timelines-albums', archived: true, summary: 'A landing page for an app that turns trip photos into printed albums automatically.' },
  { slug: 'sheleg', name: 'Sheleg', type: 'Website, Elementor', year: '2024', page: '/websites/sheleg', archived: true, summary: 'A website for a boutique construction company specializing in light-frame homes.' },
  { slug: 'roots-studio', name: "Root's Studio", type: 'Website, Wix Studio', year: '2023', url: 'http://ronnyasraf.wixstudio.com/galwuntch' },
];

/** Card order used on the home page and in the "Other ..." carousels at the bottom of project pages. */
export const HOME_UXUI = ['bluex-ai', 'sense', 'lerni', 'rge-onboarding', 'greenclick', 'memorit-co', 'oh-hi'];
export const HOME_SITES = ['auto-fit', 'cover-site', 'otto-seven-senses', 'the-code-of-creation', 'the-morning-club', 'ganit-park', 'go-power', 'greenclick', 'qombat'];
