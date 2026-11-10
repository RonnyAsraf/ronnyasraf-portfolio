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
  { slug: 'otto-seven-senses', name: 'Otto Seven Senses', title: 'otto seven senses', tags: 'Website, Wix Studio', year: '2025', credits: ['Website\n2025', 'Design & development\nWix Studio'], summary: 'Design and development of the Otto Seven Senses website, built in Wix Studio.', url: 'https://www.otto7senses.com/' },
  { slug: 'ganit-park', name: 'Ganit Park', title: 'ganit park', tags: 'Website, Elementor', year: '2025', credits: ['Website\n2025', 'Website design\nElementor'], summary: 'Website design for Ganit Park, developed in Elementor.', url: 'https://www.ganit.co.il/' },
  { slug: 'greenclick', name: 'GreenClick', title: 'greenclick', tags: 'Website, Code', year: '2025', credits: ['Website\n2025', 'Design & development\nWix Studio'], summary: 'Design and development of the GreenClick website, built in Wix Studio.', url: 'https://greenclick.cloud/' },
  { slug: 'go-power', name: 'Go Power', title: 'go power', tags: 'E-commerce, Wix Studio', year: '2025', credits: ['E-commerce\n2025', 'Design & development\nWix Studio'], summary: 'Design and development of the Go Power e-commerce site, built in Wix Studio.', url: 'https://www.go-power.ai/' },
  { slug: 'qombat', name: 'Qombat', title: 'qombat', tags: 'Website, Wix Studio', year: '2025', credits: ['Website\n2025', 'Design & development\nWix Studio'], summary: 'Design and development of the Qombat website, built in Wix Studio.', url: 'http://www.qombat.ltd' },
];

/** Every live site, as on the current Websites page. `page` links to an internal project page when one exists. */
export interface Site { slug: string; name: string; type: string; year: string; url: string; page?: string; }

export const allSites: Site[] = [
  { slug: 'the-morning-club', name: 'The Morning Club', type: 'Landing Page, Wix Studio', year: '2026', url: 'https://www.morningclubisr.com/' },
  { slug: 'cover-site', name: 'Cover', type: 'Landing Page, Wix Studio', year: '2026', url: 'https://www.coverpos.com/' },
  { slug: 'auto-fit', name: 'Auto-Fit', type: 'Landing Page, Code', year: '2026', url: 'https://auto-fit.co.il/' },
  { slug: 'otto-seven-senses', name: 'Otto Seven Senses', type: 'Website, Wix Studio', year: '2025', url: 'https://www.otto7senses.com/', page: '/websites/otto-seven-senses' },
  { slug: 'petra', name: 'Petra', type: 'Template, Wix Studio', year: '2026', url: 'https://www.wix.com/marketplace/template/e16c9ada-0910-4839-80ec-5176eedac7a4' },
  { slug: 'the-code-of-creation', name: 'The Code of Creation', type: 'Landing Page, Wix Studio', year: '2026', url: 'https://www.karin360.com/' },
  { slug: 'neho-design', name: 'Neho Design', type: 'Landing Page, Code', year: '2026', url: 'https://nehodesign.co.il/' },
  { slug: 'ganit-park', name: 'Ganit Park', type: 'Website, Elementor', year: '2025', url: 'https://www.ganit.co.il/', page: '/websites/ganit-park' },
  { slug: 'avni-derech-school', name: 'Avni Derech School', type: 'Website, Wix Studio', year: '2026', url: 'https://www.montessori-herzliya.co.il/' },
  { slug: 'go-power', name: 'Go Power', type: 'E-commerce, Wix Studio', year: '2025', url: 'https://www.go-power.ai/', page: '/websites/go-power' },
  { slug: 'rakafot-project', name: 'Rakafot Project', type: 'Landing Page, Wix Studio', year: '2025', url: 'https://www.mo-p.co.il/rakafot-project-landing-page' },
  { slug: 'velora-site', name: 'Velora', type: 'Website, Wix Studio', year: '2025', url: 'https://www.velora-finance.com/', page: '/case-studies/velora' },
  { slug: 'moshe-peretz', name: 'Moshe Peretz', type: 'Website, Wix Studio', year: '2025', url: 'https://www.mo-p.co.il/' },
  { slug: 'greenclick', name: 'GreenClick', type: 'Website, Code', year: '2025', url: 'https://greenclick.cloud/', page: '/websites/greenclick' },
  { slug: 'kami', name: 'Kami', type: 'E-commerce, Wix Studio', year: '2025', url: 'https://www.kami.hair/' },
  { slug: 'menasim', name: 'Menasim', type: 'Website, Wix Studio', year: '2025', url: 'https://www.menasim.org/' },
  { slug: 'go-fiber', name: 'Go Fiber', type: 'Website, Wix Studio', year: '2025', url: 'https://www.gofiber.ai/' },
  { slug: 'qombat', name: 'Qombat', type: 'Website, Elementor', year: '2025', url: 'http://www.qombat.ltd', page: '/websites/qombat' },
  { slug: 'terrasafe', name: 'TerraSafe', type: 'Website, Wix Studio', year: '2025', url: 'https://www.terrasafe.co.il/' },
  { slug: 'go-catalog', name: 'Go Catalog', type: 'Landing Page, Wix Studio', year: '2025', url: 'https://www.go-n-go.com/catalog' },
  { slug: 'eigenq', name: 'EigenQ', type: 'Website, Wix Studio', year: '2025', url: 'http://www.eigenq.com' },
  { slug: 'makom-yafe-lecafe', name: 'Makom Yafe Lecafe', type: 'Landing Page, Wix Studio', year: '2024', url: 'http://www.makomyafelecafe.com' },
  { slug: 'ican', name: 'ICAN', type: 'Website, Wix Studio', year: '2025', url: 'https://www.icanstrategy.com/' },
  { slug: 'roots-studio', name: "Root's Studio", type: 'Website, Wix Studio', year: '2023', url: 'http://ronnyasraf.wixstudio.com/galwuntch' },
  { slug: 'streetwise', name: 'StreetWise', type: 'Landing Page, Wix Studio', year: '2025', url: 'http://www.streetwisebi.com' },
  { slug: 'triplecyber', name: 'TripleCyber', type: 'Website, Wix Studio', year: '2025', url: 'https://www.triplecyberinfosec.com/' },
  { slug: 'noam-physiotherapy', name: 'Noam Physiotherapy', type: 'Website, Wix', year: '2025', url: 'https://www.noamphysio.co.il/' },
  { slug: 'orly-assaraf', name: 'Orly Assaraf', type: 'Website, Wix Studio', year: '2024', url: 'http://www.orlya.co.il' },
  { slug: 'emris-pharma', name: 'Emris Pharma', type: 'Website, Elementor', year: '2024', url: 'http://www.emris-pharma.com' },
  { slug: 'club-d', name: 'Club-D', type: 'Website, Elementor', year: '2024', url: 'http://www.clubd.fund' },
  { slug: 'haetz-herzeliya', name: 'Haetz Herzeliya', type: 'Website, Wix Studio', year: '2025', url: 'http://www.haetz-herzelia.co.il' },
  { slug: 'urbanica', name: 'Urbanica', type: 'Website, Shopify', year: '2024', url: 'http://urbanicafurniture.com' },
];
