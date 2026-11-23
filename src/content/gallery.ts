import type { GalleryItem } from '../../shared/types';

// Photos shown on the Gallery page. Edit this file to add or remove photos.
const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-team-store',
    title: 'Store',
    category: 'Warehouse & Logistics',
    imageUrl: '/assets/aistudio/Store-ESS07822.jpg',
    description: 'Store office keeping records of materials, supplies and stock issued to the plant.',
  },
  {
    id: 'gal-team-all',
    title: 'Elim Table Water Plant-Wide Workforce & Staff',
    category: 'Team & Leadership',
    imageUrl: '/assets/aistudio/ESS07806_7a78374e.jpg',
    description: 'Our united team across cleanroom bottling, sachet packaging, laboratory quality control, warehouse operations, and logistics outside the Kubwa plant.',
  },
  {
    id: 'gal-team-mgmt',
    title: 'Plant Management & Supervisory Leadership Team',
    category: 'Team & Leadership',
    imageUrl: '/assets/aistudio/ESS07808-_952f4c20.jpg',
    description: 'Department heads, production supervisors, quality assurance leads, and commercial managers coordinating daily plant output.',
  },
  {
    id: 'gal-team-mgmt-wide',
    title: 'Management & Department Supervisors Group Portrait',
    category: 'Team & Leadership',
    imageUrl: '/assets/aistudio/ESS07808_7b59f9cd.jpg',
    description: 'Senior management and operations leads standing together outside the Elim Table Water administrative building in Kubwa, Abuja.',
  },
  {
    id: 'gal-new-02',
    title: 'Warehouse 1',
    category: 'Warehouse & Logistics',
    imageUrl: '/assets/aistudio/ESS07824_c8de823c.jpg',
    description: 'Warehouse office managing finished-goods stock records, transfers from production and documentation for outgoing dispatch.',
  },
  {
    id: 'gal-new-04',
    title: 'Brand Ambassador with 18.9L Dispenser Bottle',
    category: 'Team & Leadership',
    imageUrl: '/assets/aistudio/ESS07846_ecabbb34.jpg',
    description: 'Official Elim Table Water brand ambassador showcasing our sealed, NAFDAC-registered 18.9-litre dispenser jar.',
  },
  {
    id: 'gal-new-08',
    title: 'Utility Cargo Fleet Operator Inside Warehouse Bay',
    category: 'Fleet & Logistics',
    imageUrl: '/assets/aistudio/ESS07873_d23163a2.jpg',
    description: 'Elim Table Water dispatch rider operating our blue electric cargo trike inside the finished goods bay for swift residential and estate deliveries.',
  },
  {
    id: 'gal-new-09',
    title: 'Indoor Rapid-Dispatch Utility Fleet Bay',
    category: 'Fleet & Logistics',
    imageUrl: '/assets/aistudio/ESS07880_83ec7ec6.jpg',
    description: 'Dedicated blue cargo trikes maintained inside our indoor safety-compliant dispatch bay for prompt doorstep water delivery across local Abuja zones.',
  },
  {
    id: 'gal-new-10',
    title: 'Dispatch Rider & Local Fleet Operations',
    category: 'Fleet & Logistics',
    imageUrl: '/assets/aistudio/ESS07882_8dd301ae.jpg',
    description: 'Uniformed fleet operator standing between two of Elim Table Water’s blue cargo tricycles that serve Kubwa, Dutse and surrounding districts.',
  },
  {
    id: 'gal-new-11',
    title: 'Warehouse 2',
    category: 'Warehouse & Logistics',
    imageUrl: '/assets/aistudio/ESS07886_fea005ff.jpg',
    description: 'Warehouse office tracking stock levels, recording deliveries and preparing loading lists for customer orders.',
  },
  {
    id: 'gal-new-12',
    title: 'Production 2',
    category: 'Production Department',
    imageUrl: '/assets/aistudio/ESS07892_b45493b2.jpg',
    description: 'Production office recording batch output, line schedules and production documentation for the plant.',
  },
  {
    id: 'gal-new-13',
    title: 'Production Manager',
    category: 'Production Department',
    imageUrl: '/assets/aistudio/ESS07897_02cccf95.jpg',
    description: 'Production Manager overseeing daily production runs, batch records and product quality across the bottling and packaging lines.',
  },
  {
    id: 'gal-new-14',
    title: 'Quality Control & Assurance Supervision',
    category: 'QA & Lab',
    imageUrl: '/assets/aistudio/ESS07977_cb893eb1.jpg',
    description: 'Senior Quality Control supervisor overseeing daily batch water testing, sanitary compliance, and laboratory release workflows.',
  },
  {
    id: 'gal-03',
    title: 'Dual-Operator Bottling Line & Quality Supervision',
    category: 'Bottling Line',
    imageUrl: '/assets/aistudio/ESS07856_4f774b9f.jpg',
    description: 'Two operators in hairnets checking bottles on the conveyor as they move into the automatic shrink-wrap machine.',
  },
  {
    id: 'gal-prod-19l',
    title: 'Elim 18.9L Dispenser Water',
    category: 'Production Department',
    imageUrl: '/assets/aistudio/elim-dispenser-jar.png',
    fitWhole: true,
    description: 'Large 18.9L Elim Table Water jars for water dispensers, giving homes and offices long-lasting, refreshing drinking water.',
  },
  {
    id: 'gal-prod-sachet',
    title: 'Elim Sachet Water',
    category: 'Production Department',
    imageUrl: '/assets/aistudio/elim-sachet-water.png',
    fitWhole: true,
    description: 'Affordable 50cl Elim Table Water sachets sealed in food-grade film, serving workshops, markets, rural areas and the wider public.',
  },
  {
    id: 'gal-fleet-van-full',
    title: 'Express Delivery Van Packed for Abuja Routes',
    category: 'Fleet & Logistics',
    imageUrl: '/assets/aistudio/ESS07870_b2202a27.jpg',
    description: 'Two staff members checking packs of Elim bottled water loaded in a delivery van before it leaves for customer routes.',
  },
  {
    id: 'gal-prod-1500-portrait',
    title: 'Elim Bottled Water',
    category: 'Production Department',
    imageUrl: '/assets/aistudio/elim-bottled-water.png',
    fitWhole: true,
    description: 'Pure, safe and refreshing Elim Table Water in portable bottles from 35cl to 1.5L, ideal for homes, offices, events and on the go.',
  },
  {
    id: 'gal-plant-plaque',
    title: 'Kubwa Factory Extension Dedication Plaque (May 2026)',
    category: 'Factory Plant',
    imageUrl: '/assets/aistudio/ESS07911_a880fa68.jpg',
    description: 'Commemorative granite dedication plaque celebrating the commissioning of the expanded Elim Table Water Kubwa bottling complex on 4th May 2026.',
  },
  {
    id: 'gal-team-office',
    title: 'Kubwa Plant Administrative & Accounts Office',
    category: 'Finance/Account',
    imageUrl: '/assets/aistudio/ESS07933_baa3bbd3.jpg',
    description: 'Administrative and accounts staff at work in the plant office, handling records, payments and customer orders.',
  },
  {
    id: 'gal-bottle-19l-conveyor',
    title: '18.9L Dispenser Jar Conveyor Intake & Handling',
    category: 'Bottling Line',
    imageUrl: '/assets/aistudio/ESS07970_39dcd5d1.jpg',
    description: 'Operator in a hairnet placing an 18.9-litre jar onto the conveyor that carries it to washing, filling and capping.',
  },
  {
    id: 'gal-fleet-truck-trolley',
    title: 'Truck Loading — Bottled Water from Pallets & Trolleys',
    category: 'Fleet & Logistics',
    imageUrl: '/assets/aistudio/ESS07979_98aff78b.jpg',
    description: 'Loader stacking shrink-wrapped packs of Elim bottled water from a pallet and steel trolley onto one of our blue delivery trucks.',
  },
  {
    id: 'gal-team-01',
    title: 'Visiting Guests with Elim Table Water Staff',
    category: 'Team & Leadership',
    imageUrl: '/assets/aistudio/productsqw_4491fc0b.jpeg',
    description: 'Visiting guests and Elim Table Water staff gathered outside the factory during a visit to the plant.',
  },
  {
    id: 'gal-prod-01',
    title: 'Production Department Team',
    category: 'Production Department',
    imageUrl: '/assets/aistudio/productsiyu_44e04553.jpeg',
    description: 'Members of the production department responsible for water treatment, bottling and packaging.',
  },
];

// Display order on the Gallery / Facilities page: offices by rank, then group
// photos, loading, warehouses with products, and finally production & plant.
const GALLERY_ORDER = [
  // Offices (by rank)
  'gal-team-office',
  'gal-team-store', // 1. Store
  'gal-new-14', // 2. Quality Control & Assurance Supervision
  'gal-new-13', // 3. Production Manager
  'gal-new-02', // 4. Warehouse 1
  'gal-new-11', // 5. Warehouse 2
  'gal-new-12', // 6. Production 2
  'gal-new-04',
  // Group photos
  'gal-team-mgmt',
  'gal-team-mgmt-wide',
  'gal-team-all',
  'gal-team-01',
  'gal-prod-01',
  // Loading
  'gal-fleet-van-full',
  'gal-fleet-truck-trolley',
  'gal-new-08',
  'gal-new-09',
  'gal-new-10',
  // Warehouses with products
  'gal-prod-sachet',
  'gal-prod-1500-portrait',
  'gal-prod-19l',
  // Production & plant
  'gal-03',
  'gal-bottle-19l-conveyor',
  'gal-plant-plaque',
];

const byId = new Map(GALLERY_ITEMS.map((item) => [item.id, item]));
// Listed items first, in order; anything not listed (e.g. newly added) goes at the end.
export const GALLERY: GalleryItem[] = [
  ...GALLERY_ORDER.flatMap((id) => byId.get(id) ?? []),
  ...GALLERY_ITEMS.filter((item) => !GALLERY_ORDER.includes(item.id)),
];
