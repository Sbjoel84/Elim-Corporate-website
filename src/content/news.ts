import type { NewsAnnouncement } from '../../shared/types';

// News & announcements shown on the News page. Edit this file to publish news.
// TODO(before launch): confirm each article is accurate (dates, test results,
// certifications) or set published: false.
export const NEWS: NewsAnnouncement[] = [
  {
    id: 'news-01',
    title: 'Elim Water Expands Cleanroom Automated Bottling Capacity to 15,000 Bottles Per Hour',
    slug: 'elim-water-expands-cleanroom-bottling-capacity',
    summary:
      'We have commissioned a state-of-the-art Italian monoblock rinsing, filling, and capping system ensuring zero human contact during the entire bottling lifecycle.',
    content:
      'To serve our rapidly growing commercial and residential clientele, Elim Water has commissioned a brand new multi-million naira automated bottling cleanroom. Operating under positive air pressure with HEPA filtration, our plant now achieves an output of over 15,000 bottles per hour. This massive upgrade reinforces our commitment to pure, untouched mineral hydration.',
    category: 'Company News',
    imageUrl: '/assets/aistudio/ESS07903_cceef1e2.jpg',
    publishedDate: '2026-10-28',
    published: true,
    featured: true,
    author: 'Corporate Communications Desk',
  },
  {
    id: 'news-02',
    title: 'NAFDAC & ISO 9001:2015 Recertification Concluded with Pristine Score',
    slug: 'nafdac-iso-recertification-success',
    summary:
      'Independent laboratory audits confirmed Elim Water surpasses all WHO chemical, physical, and microbiological drinking water safety metrics.',
    content:
      'During the bi-annual comprehensive water safety audit, independent microbial analyses demonstrated 0.00 coliform count and optimal balance of calcium, magnesium, and natural electrolytes. We express gratitude to our dedicated quality control chemistry team.',
    category: 'Quality & Standards',
    imageUrl: '/assets/aistudio/ESS07911_a880fa68.jpg',
    publishedDate: '2026-10-14',
    published: true,
    featured: false,
    author: 'QA Directorate',
  },
  {
    id: 'news-03',
    title: 'Elim Water Onboards 30 New Wholesale Distributors in Regional Growth Drive',
    slug: 'wholesale-distributor-onboarding-drive',
    summary:
      'Special incentive programs, dedicated delivery slots, and credit facilities are now open for verified regional water distributors.',
    content:
      'Retailers, supermarkets, event planners, and distributors can now apply online through our corporate portal. Accepted distributors enjoy priority factory loading docks and scheduled fleet dispatches.',
    category: 'Company News',
    imageUrl: '/assets/aistudio/ESS07979_98aff78b.jpg',
    publishedDate: '2026-09-30',
    published: true,
    featured: false,
    author: 'Commercial Sales Lead',
  },
];
