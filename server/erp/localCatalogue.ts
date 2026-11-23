import type { Product, ProductCategory } from '../../shared/types';

// Product catalogue used by the LOCAL adapter only (development / until the
// ERP is connected). Once an ERP adapter is in place, products, prices and
// availability come from the ERP and this file is no longer used.
//
// Bottled and dispenser products and prices come from the company price list.
// Sachet water, the floor-standing dispenser and the hand pump still use the
// original prototype prices (TODO: confirm before launch).

const BOTTLE_PHOTO = '/assets/aistudio/elim-bottled-water.png';
const JUG_PHOTO = '/assets/aistudio/elim-dispenser-jar.png';
const BOTTLED_TEXT = 'Enjoy the convenience of our portable Elim bottled water.';
const DISPENSER_TEXT = 'Our water for dispensers provides long-lasting refreshment in homes and offices.';

/** A price-list product sold in a single unit (Pack, Bottle, ...). */
function priceListItem(
  id: string,
  sku: string,
  name: string,
  category: ProductCategory,
  unit: string,
  price: number,
  image: string,
  description: string
): Product {
  return {
    id,
    sku,
    name,
    category,
    description,
    image,
    variants: [
      { id: `${id}-${unit.toLowerCase()}`, name: unit, size: '', packaging: unit, unitsPerPack: 1, unitOfMeasure: unit, price, isDefault: true },
    ],
    availability: 'IN_STOCK',
    featured: true,
  };
}

// Order matches the price list. shared/homeProducts.ts controls the home page.
export const LOCAL_CATALOGUE: Product[] = [
  priceListItem('prod-bottle-1500', 'ELM-BTL-150CL', '1.5Ltr Bottled Water', 'Bottled Water', 'Pack', 1700, BOTTLE_PHOTO, BOTTLED_TEXT),
  priceListItem('prod-bottle-1000', 'ELM-BTL-100CL', '1Ltr Bottled Water', 'Bottled Water', 'Pack', 1000, BOTTLE_PHOTO, BOTTLED_TEXT),
  priceListItem('prod-bottle-350', 'ELM-BTL-35CL', '35cl Bottled Water', 'Bottled Water', 'Pack', 2550, BOTTLE_PHOTO, BOTTLED_TEXT),
  priceListItem('prod-bottle-500', 'ELM-BTL-50CL', '50cl Bottled Water', 'Bottled Water', 'Pack', 2650, BOTTLE_PHOTO, BOTTLED_TEXT),
  priceListItem('prod-bottle-750', 'ELM-BTL-75CL', '75cl Bottled Water', 'Bottled Water', 'Pack', 1700, BOTTLE_PHOTO, BOTTLED_TEXT),
  priceListItem('prod-empty-jug', 'ELM-DSP-JUG', 'Empty Jug', 'Dispenser Water', 'Bottle', 3000, JUG_PHOTO, DISPENSER_TEXT),
  priceListItem('prod-dispenser-19l', 'ELM-DSP-JUGW', 'Jug + Water', 'Dispenser Water', 'Bottle', 4200, JUG_PHOTO, DISPENSER_TEXT),
  priceListItem('prod-dispenser-refill', 'ELM-DSP-REFILL', 'Dispenser Water', 'Dispenser Water', 'Bottle', 1200, JUG_PHOTO, DISPENSER_TEXT),
  {
    id: 'prod-sachet-01',
    sku: 'ELM-SCH-50CL',
    name: 'Elim Pure Flow Sachet Water (20 Bags Bundle)',
    category: 'Sachet Water',
    description:
      'Treated with multi-stage sand, carbon, and micron filtration followed by UV sterilization. Packaged in food-grade film for optimal freshness and daily hydration.',
    image: '/assets/aistudio/elim-sachet-water.png',
    additionalImages: [
      '/assets/aistudio/ESS07834_eb5d98d0.jpg',
    ],
    variants: [
      {
        id: 'var-sch-bundle-20',
        name: 'Standard Wholesale Bundle (20 Bags x 20 Sachets)',
        size: '50cl per sachet',
        packaging: '20 Bags Bundle (400 sachets total)',
        unitsPerPack: 20,
        unitOfMeasure: 'Bundle',
        price: 3600,
        wholesalePrice: 3400,
        isDefault: true,
      },
      {
        id: 'var-sch-retail-1',
        name: 'Single Bag (20 Sachets of 50cl)',
        size: '50cl per sachet',
        packaging: '1 Bag (20 sachets)',
        unitsPerPack: 1,
        unitOfMeasure: 'Bag',
        price: 200,
        wholesalePrice: 190,
      },
    ],
    availability: 'IN_STOCK',
    featured: true,
    phLevel: '7.4',
    tdsLevel: '78 ppm',
    orderingNotes: 'Minimum delivery for wholesale rate is 5 bundles. Same-day dispatch available.',
  },
  {
    id: 'prod-dispenser-unit',
    sku: 'ELM-EQP-HD01',
    name: 'Elim Hot & Cold Floor Standing Water Dispenser',
    category: 'Dispenser Bottles & Accessories',
    description:
      'Energy-efficient compressor cooling with instant child-safety hot water spout. Features a spacious lower storage cabinet for cups and accessories.',
    image: '/assets/aistudio/image_b039644a.png',
    variants: [
      {
        id: 'var-eqp-dispenser-standard',
        name: 'Floor Standing Unit (Stainless Spout)',
        size: 'Standard Dual Tap',
        packaging: 'Individually Boxed with Warranty',
        unitsPerPack: 1,
        unitOfMeasure: 'Unit',
        price: 85000,
        wholesalePrice: 80000,
        isDefault: true,
      },
    ],
    availability: 'IN_STOCK',
    featured: false,
  },
  {
    id: 'prod-pump-manual',
    sku: 'ELM-EQP-PUMP',
    name: 'Elim Manual Hand-Press Dispenser Pump',
    category: 'Dispenser Bottles & Accessories',
    description:
      'Easy-to-use suction pump that clamps directly onto standard 19L bottles. Requires zero electricity; perfect for bedside, camping, and events.',
    image: '/assets/aistudio/image_b039644a.png',
    variants: [
      {
        id: 'var-pump-manual-1',
        name: 'Manual Hand Press Pump',
        size: 'Universal 19L Fit',
        packaging: 'Boxed with extension tubes',
        unitsPerPack: 1,
        unitOfMeasure: 'Piece',
        price: 3500,
        wholesalePrice: 3000,
        isDefault: true,
      },
    ],
    availability: 'IN_STOCK',
    featured: false,
  },
];

