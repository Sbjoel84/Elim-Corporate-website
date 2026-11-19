// Every public page: its URL, browser-tab title and search-engine description.
// Components navigate by page id (e.g. onNavigate('products')).

export const PAGES = {
  home: {
    path: '/',
    title: 'Elim Water | Sachet, Bottled & Dispenser Water in Abuja',
    description:
      'Elim Water produces sachet, bottled and 19-litre dispenser water at our Kubwa, Abuja plant. Order online for delivery or factory collection.',
  },
  about: {
    path: '/about',
    title: 'About Us | Elim Water',
    description: 'The story, mission and team behind Elim Water, a water production company in Kubwa, FCT Abuja.',
  },
  operations: {
    path: '/operations',
    title: 'Quality & Operations | Elim Water',
    description: 'How Elim Water treats, tests, packages and delivers drinking water from our Kubwa plant.',
  },
  products: {
    path: '/products',
    title: 'Products & Prices | Elim Water',
    description:
      'Sachet water, 500ml, 750ml and 1.5L bottled water, 19-litre dispenser refills and dispensers. Order online from Elim Water.',
  },
  news: {
    path: '/news',
    title: 'News | Elim Water',
    description: 'News and announcements from Elim Water.',
  },
  gallery: {
    path: '/gallery',
    title: 'Gallery / Facilities | Elim Water',
    description: 'Photos of the Elim Water factory, production lines, warehouse and delivery fleet.',
  },
  contact: {
    path: '/contact',
    title: 'Contact Us | Elim Water',
    description: 'Contact Elim Water for enquiries, bulk and event orders, or to become a distributor.',
  },
  notFound: {
    path: '',
    title: 'Page Not Found | Elim Water',
    description: 'The page you are looking for does not exist.',
  },
} as const;

export type PageId = Exclude<keyof typeof PAGES, 'notFound'>;

export function pathForPage(page: string): string {
  return page in PAGES && page !== 'notFound' ? PAGES[page as PageId].path : '/';
}

export function pageForPath(pathname: string): PageId | null {
  const clean = pathname.replace(/\/+$/, '') || '/';
  const match = (Object.keys(PAGES) as (keyof typeof PAGES)[]).find(
    (id) => id !== 'notFound' && PAGES[id].path === clean
  );
  return (match as PageId) ?? null;
}
