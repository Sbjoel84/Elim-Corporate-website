import type { Product } from '../../shared/types';

// Product catalogue used by the LOCAL adapter only (development / until the
// ERP is connected). Once an ERP adapter is in place, products, prices and
// availability come from the ERP and this file is no longer used.
//
// TODO(before launch): confirm every price, pack size and description with
// the commercial team. These values came from the original prototype.
export const LOCAL_CATALOGUE: Product[] = [
  {
    id: 'prod-sachet-01',
    sku: 'ELM-SCH-50CL',
    name: 'Elim Pure Flow Sachet Water (20 Bags Bundle)',
    category: 'Sachet Water',
    description:
      'Treated with multi-stage sand, carbon, and micron filtration followed by UV sterilization. Packaged in food-grade film for optimal freshness and daily hydration.',
    image: '/assets/aistudio/ESS07833_6bee5d2d.jpg',
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
    id: 'prod-bottle-500',
    sku: 'ELM-BTL-500ML',
    name: 'Elim Natural Spring Table Water 500ml',
    category: 'Bottled Water',
    description:
      'Crisp, refreshing table water purified via 7-stage reverse osmosis and ozonated for pristine clarity and perfect mineral balance. Packed in recyclable PET bottles.',
    image: '/assets/products/elim-500ml.jpg',
    additionalImages: [
      '/assets/aistudio/ESS07858_e0d82076.jpg',
    ],
    variants: [
      {
        id: 'var-btl-500-pack12',
        name: 'Carton of 12 Bottles (500ml)',
        size: '500ml',
        packaging: 'Shrink-wrapped Pack of 12',
        unitsPerPack: 12,
        unitOfMeasure: 'Pack',
        price: 1800,
        wholesalePrice: 1650,
        isDefault: true,
      },
      {
        id: 'var-btl-500-pallet',
        name: 'Pallet Bulk Deal (100 Packs)',
        size: '500ml',
        packaging: '100 Packs on Pallet',
        unitsPerPack: 100,
        unitOfMeasure: 'Pallet',
        price: 165000,
        wholesalePrice: 160000,
      },
    ],
    availability: 'IN_STOCK',
    featured: true,
    phLevel: '7.5',
    tdsLevel: '82 ppm',
    orderingNotes: 'Ideal for conferences, weddings, offices, and retail shelves.',
  },
  {
    id: 'prod-bottle-750',
    sku: 'ELM-BTL-750ML',
    name: 'Elim Sports Cap & Active Table Water 750ml',
    category: 'Bottled Water',
    description:
      'Ergonomic active bottle designed for gym-goers, commuters, and school lunchboxes. Enriched with natural electrolytes and essential minerals.',
    image: '/assets/products/elim-750ml.jpg',
    variants: [
      {
        id: 'var-btl-750-pack12',
        name: 'Carton of 12 Bottles (750ml)',
        size: '750ml',
        packaging: 'Shrink-wrapped Pack of 12',
        unitsPerPack: 12,
        unitOfMeasure: 'Pack',
        price: 2300,
        wholesalePrice: 2150,
        isDefault: true,
      },
    ],
    availability: 'IN_STOCK',
    featured: false,
    phLevel: '7.4',
    tdsLevel: '84 ppm',
  },
  {
    id: 'prod-bottle-1500',
    sku: 'ELM-BTL-1500ML',
    name: 'Elim Premium Table Water 1.5 Liters',
    category: 'Table Water',
    description:
      'Generous 1.5L family and dining table water. Engineered for home refrigeration and dinner tables, maintaining crisp mineral purity.',
    image: '/assets/aistudio/ESS07910_42d1ee19.jpg',
    variants: [
      {
        id: 'var-btl-1500-pack6',
        name: 'Pack of 6 Jumbo Bottles (1.5L)',
        size: '1.5 Liters',
        packaging: 'Shrink-wrapped Pack of 6',
        unitsPerPack: 6,
        unitOfMeasure: 'Pack',
        price: 2400,
        wholesalePrice: 2200,
        isDefault: true,
      },
    ],
    availability: 'IN_STOCK',
    featured: true,
    phLevel: '7.5',
    tdsLevel: '80 ppm',
  },
  {
    id: 'prod-dispenser-19l',
    sku: 'ELM-DSP-19L',
    name: 'Elim 19-Liter (5 Gallon) Premium Dispenser Bottle Refill',
    category: 'Dispenser Water',
    description:
      'Direct factory exchange refill for commercial and home hot & cold water dispensers. Sanitized using automatic high-pressure interior wash and sealed with tamper-evident hygienic caps.',
    image: '/assets/aistudio/ESS07830_fbde1bf0.jpg',
    variants: [
      {
        id: 'var-dsp-refill-only',
        name: 'Bottle Refill (Exchange Empty Bottle)',
        size: '19 Liters (5 Gallons)',
        packaging: 'Returnable 19L Polycarbonate Bottle',
        unitsPerPack: 1,
        unitOfMeasure: 'Refill',
        price: 1300,
        wholesalePrice: 1150,
        isDefault: true,
      },
      {
        id: 'var-dsp-new-bottle',
        name: 'New 19L Bottle + Water Included (No Empty Returned)',
        size: '19 Liters (5 Gallons)',
        packaging: 'New Heavy-Duty Polycarbonate Bottle + Cap',
        unitsPerPack: 1,
        unitOfMeasure: 'Bottle + Water',
        price: 6800,
        wholesalePrice: 6500,
      },
    ],
    availability: 'IN_STOCK',
    featured: true,
    phLevel: '7.4',
    tdsLevel: '76 ppm',
    orderingNotes:
      'For refills, please ensure an equal number of standard empty 19L bottles are available for our driver to swap.',
  },
  {
    id: 'prod-dispenser-unit',
    sku: 'ELM-EQP-HD01',
    name: 'Elim Hot & Cold Floor Standing Water Dispenser',
    category: 'Dispenser Bottles & Accessories',
    description:
      'Energy-efficient compressor cooling with instant child-safety hot water spout. Features a spacious lower storage cabinet for cups and accessories.',
    image: '/assets/products/dispenser-unit.jpg',
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
    image: '/assets/products/dispenser-pump.jpg',
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

