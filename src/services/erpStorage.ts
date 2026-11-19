import {
  Product,
  OnlineOrder,
  StaffMember,
  Vehicle,
  DispatchRecord,
  CustomerInquiry,
  NewsAnnouncement,
  GalleryItem,
  InventoryLogEntry,
  OrderStatus,
  CartItem,
  CustomerInfo,
  DeliveryConfirmation,
  CustomerTestimonial,
} from '../types/erp';
import galleryRollerHallImg from '../assets/images/regenerated_image_1794869856806.jpg';
import prod500mlImg from '../assets/images/regenerated_image_1794002269039.jpg';
import prod750mlImg from '../assets/images/regenerated_image_1794002273033.jpg';
import prodDispenserUnitImg from '../assets/images/regenerated_image_1794002273815.jpg';
import prodPumpImg from '../assets/images/regenerated_image_1794002274279.jpg';

const STORAGE_KEYS = {
  PRODUCTS: 'elim_erp_products',
  ORDERS: 'elim_erp_orders',
  STAFF: 'elim_erp_staff',
  VEHICLES: 'elim_erp_vehicles',
  DISPATCHES: 'elim_erp_dispatches',
  INQUIRIES: 'elim_erp_inquiries',
  NEWS: 'elim_erp_news',
  GALLERY: 'elim_erp_gallery',
  INVENTORY_LOGS: 'elim_erp_inventory_logs',
  ORDER_COUNTER: 'elim_erp_order_counter',
  TESTIMONIALS: 'elim_erp_testimonials',
};

// Realistic initial seed data reflecting an active, operational bottled & sachet water plant
const INITIAL_PRODUCTS: Product[] = [
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
    currentStock: 1850,
    reservedStock: 120,
    minReorderLevel: 300,
    isPubliclyVisible: true,
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
    image: prod500mlImg,
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
    currentStock: 1420,
    reservedStock: 80,
    minReorderLevel: 250,
    isPubliclyVisible: true,
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
    image: prod750mlImg,
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
    currentStock: 890,
    reservedStock: 45,
    minReorderLevel: 180,
    isPubliclyVisible: true,
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
    currentStock: 960,
    reservedStock: 30,
    minReorderLevel: 200,
    isPubliclyVisible: true,
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
    currentStock: 480,
    reservedStock: 55,
    minReorderLevel: 100,
    isPubliclyVisible: true,
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
    image: prodDispenserUnitImg,
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
    currentStock: 35,
    reservedStock: 3,
    minReorderLevel: 10,
    isPubliclyVisible: true,
    featured: false,
  },
  {
    id: 'prod-pump-manual',
    sku: 'ELM-EQP-PUMP',
    name: 'Elim Manual Hand-Press Dispenser Pump',
    category: 'Dispenser Bottles & Accessories',
    description:
      'Easy-to-use suction pump that clamps directly onto standard 19L bottles. Requires zero electricity; perfect for bedside, camping, and events.',
    image: prodPumpImg,
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
    currentStock: 160,
    reservedStock: 10,
    minReorderLevel: 25,
    isPubliclyVisible: true,
    featured: false,
  },
];

const INITIAL_STAFF: StaffMember[] = [
  {
    id: 'staff-01',
    employeeId: 'ELM-EMP-004',
    name: 'Folake Adeyemi',
    role: 'ORDER_MANAGER',
    roleTitle: 'Senior Order Desk & Fulfillment Coordinator',
    department: 'Customer Relations & Commercial Sales',
    phoneNumber: '+2348166399794',
    email: 'info@elimtablewater.com',
    active: true,
    avatar: '/assets/aistudio/ESS07886_fea005ff.jpg',
    assignedOrdersCount: 4,
  },
  {
    id: 'staff-02',
    employeeId: 'ELM-EMP-009',
    name: 'Babatunde Adeleke',
    role: 'DISPATCH_SUPERVISOR',
    roleTitle: 'Warehouse & Fleet Dispatch Supervisor',
    department: 'Plant Logistics & Dispatch',
    phoneNumber: '+2348166399794',
    email: 'dispatch@elimtablewater.com',
    active: true,
    avatar: '/assets/aistudio/ESS07824_c8de823c.jpg',
    assignedOrdersCount: 2,
  },
  {
    id: 'staff-03',
    employeeId: 'ELM-EMP-012',
    name: 'Jennifer Nnamdi',
    role: 'ORDER_MANAGER',
    roleTitle: 'Client Verification & Corporate Accounts Lead',
    department: 'Commercial Sales',
    phoneNumber: '+2348166399794',
    email: 'sales@elimtablewater.com',
    active: true,
    avatar: '/assets/aistudio/ESS07928_7722485a.jpg',
    assignedOrdersCount: 1,
  },
  {
    id: 'staff-04',
    employeeId: 'ELM-EMP-001',
    name: 'Engr. Tariq Hassan',
    role: 'ADMIN',
    roleTitle: 'Plant Operations Director',
    department: 'Executive Operations',
    phoneNumber: '+2348166399794',
    email: 'admin@elimtablewater.com',
    active: true,
    avatar: '/assets/aistudio/ESS07924_7ce8501f.jpg',
    assignedOrdersCount: 0,
  },
];

const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: 'veh-01',
    plateNumber: 'LSR-420-AA',
    model: 'Mitsubishi Canter 5-Ton Truck',
    vehicleType: 'CANTER',
    capacityCartons: 400,
    status: 'AVAILABLE',
    assignedDriverId: 'drv-01',
    assignedDriverName: 'Ibrahim Musa',
  },
  {
    id: 'veh-02',
    plateNumber: 'IKJ-881-XD',
    model: 'Isuzu Forward 7.5-Ton Heavy Hauler',
    vehicleType: 'TRUCK',
    capacityCartons: 650,
    status: 'IN_TRANSIT',
    assignedDriverId: 'drv-02',
    assignedDriverName: 'Emmanuel Adeleke',
  },
  {
    id: 'veh-03',
    plateNumber: 'KJA-319-BB',
    model: 'Toyota HiAce High-Roof Express Delivery Van',
    vehicleType: 'VAN',
    capacityCartons: 140,
    status: 'AVAILABLE',
    assignedDriverId: 'drv-03',
    assignedDriverName: 'Chidi Okonkwo',
  },
  {
    id: 'veh-04',
    plateNumber: 'APP-502-CC',
    model: 'Ford Transit Commercial Delivery Van',
    vehicleType: 'VAN',
    capacityCartons: 150,
    status: 'AVAILABLE',
    assignedDriverId: 'drv-04',
    assignedDriverName: 'Usman Bello',
  },
];

const INITIAL_NEWS: NewsAnnouncement[] = [
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

const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-team-chairman',
    title: 'Chairman / Chief Executive Officer — Executive Office',
    category: 'Team & Leadership',
    imageUrl: '/assets/aistudio/ESS08085_74002998.jpg',
    description: 'The Chairman & Chief Executive Officer of Elim Table Water in his Kubwa corporate office alongside industry excellence awards and product standards.',
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
    id: 'gal-new-01',
    title: 'Good-to-Go Finished Bottled Water Warehouse Stacks',
    category: 'Warehouse & Logistics',
    imageUrl: '/assets/aistudio/ESS07989_05ef32ab.jpg',
    description: 'Quality-cleared packs of Elim Table Water neatly stacked in the Good-to-Go dispatch bay awaiting loading onto delivery vehicles.',
  },
  {
    id: 'gal-new-02',
    title: 'Order Desk & Commercial Support Representative',
    category: 'Team & Leadership',
    imageUrl: '/assets/aistudio/ESS07824_c8de823c.jpg',
    description: 'Plant commercial desk officer coordinating customer bookings, invoice approvals, and daily truck dispatch schedules at our Kubwa headquarters.',
  },
  {
    id: 'gal-new-03',
    title: 'Van Dispatch & Direct Route Loading',
    category: 'Fleet & Logistics',
    imageUrl: '/assets/aistudio/ESS07838_25deb53f.jpg',
    description: 'Regional fleet drivers and logistics officers inspecting and loading Elim bottled water packs into delivery vans for door-to-door distribution across Abuja.',
  },
  {
    id: 'gal-new-04',
    title: 'Brand Ambassador with 18.9L Dispenser Bottle',
    category: 'Team & Leadership',
    imageUrl: '/assets/aistudio/ESS07846_ecabbb34.jpg',
    description: 'Official Elim Table Water brand ambassador showcasing our hermetically sealed, NAFDAC-certified 18.9-liter polycarbonate dispenser jar.',
  },
  {
    id: 'gal-new-05',
    title: 'Automated Conveyor & Shrink-Wrap Packaging Line',
    category: 'Bottling Line',
    imageUrl: '/assets/aistudio/ESS07853_92dc7a60.jpg',
    description: 'Plant technician in cleanroom attire guiding sealed Elim PET bottles along the high-speed automated conveyor and heat-shrink bundling tunnel.',
  },
  {
    id: 'gal-new-06',
    title: 'Finished Bottled Water Production Floor Stacks',
    category: 'Production Department',
    imageUrl: '/assets/aistudio/ESS07858_e0d82076.jpg',
    description: 'Freshly shrink-wrapped cartons of Elim Table Water stacked immediately off the automated bottling and labeling line awaiting warehouse transfer.',
  },
  {
    id: 'gal-new-07',
    title: 'High-Volume Finished Goods Storage Bay',
    category: 'Warehouse & Logistics',
    imageUrl: '/assets/aistudio/ESS07859_0a5e6882.jpg',
    description: 'Bulk reserve inventory of Elim Table Water packs stacked on insulated wood-paneled warehouse flooring to guarantee uninterrupted distributor supply.',
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
    description: 'Uniformed fleet operator ready for dispatch aboard Elim Table Water’s rapid cargo trikes serving Kubwa, Dutse, and surrounding districts.',
  },
  {
    id: 'gal-new-11',
    title: 'Customer Care & Front-Office Operations',
    category: 'Team & Leadership',
    imageUrl: '/assets/aistudio/ESS07886_fea005ff.jpg',
    description: 'Customer care specialist managing telephone bookings, client inquiries, and distributor correspondence at the Elim Table Water administrative office.',
  },
  {
    id: 'gal-new-12',
    title: 'Quality Assurance & Batch Documentation Desk',
    category: 'QA & Lab',
    imageUrl: '/assets/aistudio/ESS07892_b45493b2.jpg',
    description: 'QA compliance personnel logging batch inspection records, hygiene checklists, and laboratory release metrics into the plant ERP system.',
  },
  {
    id: 'gal-new-13',
    title: 'Production & Sample Verification Officer',
    category: 'QA & Lab',
    imageUrl: '/assets/aistudio/ESS07897_02cccf95.jpg',
    description: 'Plant supervisor reviewing batch sample bottles alongside production logs and coding schedules to uphold NAFDAC and ISO 9001 quality standards.',
  },
  {
    id: 'gal-new-14',
    title: 'Quality Control & Assurance Supervision',
    category: 'QA & Lab',
    imageUrl: '/assets/aistudio/ESS07977_cb893eb1.jpg',
    description: 'Senior Quality Control supervisor overseeing daily batch water testing, sanitary compliance, and laboratory release workflows.',
  },
  {
    id: 'gal-01',
    title: 'Automated 19L Dispenser Bottle Washing & Sterilization Dock',
    category: 'Factory Plant',
    imageUrl: '/assets/aistudio/ESS07939_37171100.jpg',
    description: 'Cleanroom technicians operating our multi-stage high-pressure interior washing and exterior sanitization line for 18.9L polycarbonate bottles.',
  },
  {
    id: 'gal-02',
    title: '3-in-1 Automated Rinsing, Filling & Capping Carousel',
    category: 'Bottling Line',
    imageUrl: '/assets/aistudio/ESS07903_cceef1e2.jpg',
    description: 'Uniformed cleanroom technicians overseeing the 3-in-1 stainless steel automated bottle rinsing, filling, and capping monoblock line.',
  },
  {
    id: 'gal-03',
    title: 'Dual-Operator Bottling Line & Quality Supervision',
    category: 'QA & Lab',
    imageUrl: '/assets/aistudio/ESS07856_4f774b9f.jpg',
    description: 'Cleanroom quality specialists overseeing bottle alignment, label integrity, and automated shrink-wrap sealing on the high-speed line.',
  },
  {
    id: 'gal-04',
    title: 'Elim Water Regional Dispatch Fleet at Loading Bay',
    category: 'Fleet & Logistics',
    imageUrl: '/assets/aistudio/ESS07967_563ed1c1.jpg',
    description: 'Logistics crew loading hermetically sealed 18.9L Elim dispenser jars into our blue Toyota delivery truck at the loading bay.',
  },
  {
    id: 'gal-05',
    title: 'Main Bottling Hall Roller Conveyor & Pallet Stacking',
    category: 'Factory Plant',
    imageUrl: galleryRollerHallImg,
    description: 'Continuous roller conveyor transporting shrink-wrapped Elim bottled water cartons into structured floor stacks for distribution.',
  },
  {
    id: 'gal-06',
    title: '18.9L Dispenser Bottle Sanitization & Filling Line',
    category: 'Production Department',
    imageUrl: '/assets/aistudio/ESS07944_5d5eefdb.jpg',
    description: 'Production team managing automatic high-pressure bottle washing, sterilization, and conveyor feeding in the dispenser cleanroom hall.',
  },
  {
    id: 'gal-prod-19l',
    title: '18.9L Tamper-Sealed Dispenser Bottle & SON Certification',
    category: 'QA & Lab',
    imageUrl: '/assets/aistudio/ESS07830_fbde1bf0.jpg',
    description: 'Close-up of the 18.9L Elim Table Water polycarbonate jar displaying NAFDAC Reg No. A1-5385, SON MANCAP FT-31611 mark, and neck seal.',
  },
  {
    id: 'gal-prod-sachet',
    title: 'Elim 50cl Pure Flow Sachet Water Unit',
    category: 'Production Department',
    imageUrl: '/assets/aistudio/ESS07833_6bee5d2d.jpg',
    description: 'Crystal-clear 50cl Elim Table Water sachet sealed with food-grade film, featuring NAFDAC Reg No. 01-0225L and SON certification.',
  },
  {
    id: 'gal-wh-sachet',
    title: 'Bulk 50cl Sachet Water Storage & Dispatch Staging',
    category: 'Warehouse & Logistics',
    imageUrl: '/assets/aistudio/ESS07834_eb5d98d0.jpg',
    description: 'Organized bags of freshly produced Elim 50cl sachet water staged on clean epoxy flooring ready for wholesale distributor loading.',
  },
  {
    id: 'gal-fleet-van-sachet',
    title: 'Dispatch Van Loading — Sachet & Bottled Water',
    category: 'Fleet & Logistics',
    imageUrl: '/assets/aistudio/ESS07837_cc1dba7f.jpg',
    description: 'Field dispatch personnel loading both Elim sachet bundles and bottled water cartons into express vans for morning delivery routes.',
  },
  {
    id: 'gal-prod-blow-01',
    title: 'In-House PET Bottle Blow-Molding Operations',
    category: 'Production Department',
    imageUrl: '/assets/aistudio/ESS07849_1db2e07c.jpg',
    description: 'Technical operators producing food-grade PET bottles in-house using automated blow-molding presses for sterile bottle availability.',
  },
  {
    id: 'gal-plant-blow-02',
    title: 'Automated PET Preform & Bottle Blowing Line',
    category: 'Factory Plant',
    imageUrl: '/assets/aistudio/ESS07851_0b094188.jpg',
    description: 'Dedicated PET bottle manufacturing bay feeding crystal-clear freshly blown bottles directly toward the sanitization and filling hall.',
  },
  {
    id: 'gal-fleet-van-full',
    title: 'Express Delivery Van Packed for Abuja Routes',
    category: 'Fleet & Logistics',
    imageUrl: '/assets/aistudio/ESS07870_b2202a27.jpg',
    description: 'Logistics team verifying packed cartons of Elim bottled table water inside a high-capacity express van ahead of dispatch.',
  },
  {
    id: 'gal-prod-1500-portrait',
    title: 'Elim 1.5L Family Table Water Bottle (NAFDAC Certified)',
    category: 'Production Department',
    imageUrl: '/assets/aistudio/ESS07909_60eee3e5.jpg',
    description: 'Crystal-clear 1.5-liter Elim Table Water bottle engineered for dining tables, households, and corporate hospitality suites.',
  },
  {
    id: 'gal-prod-1500-wide',
    title: 'Elim 1.5L Natural Mineral Table Water Showcase',
    category: 'Production Department',
    imageUrl: '/assets/aistudio/ESS07910_42d1ee19.jpg',
    description: 'Pure 1.5L Elim Table Water highlighting our crisp label design, ergonomic grip contours, and NAFDAC quality registration.',
  },
  {
    id: 'gal-plant-plaque',
    title: 'Kubwa Factory Extension Dedication Plaque (May 2026)',
    category: 'Factory Plant',
    imageUrl: '/assets/aistudio/ESS07911_a880fa68.jpg',
    description: 'Commemorative granite dedication plaque celebrating the commissioning of the expanded Elim Table Water Kubwa bottling complex on 4th May 2026.',
  },
  {
    id: 'gal-plant-blow-auto',
    title: 'PLC-Controlled Automatic PET Blow-Molding Unit',
    category: 'Factory Plant',
    imageUrl: '/assets/aistudio/ESS07916_774f3002.jpg',
    description: 'Modern PLC touchscreen-controlled automatic bottle blowing system producing uniform, hygienic PET containers at industrial speed.',
  },
  {
    id: 'gal-team-accounts',
    title: 'Accounts & Commercial Order Desk Supervisor',
    category: 'Team & Leadership',
    imageUrl: '/assets/aistudio/ESS07924_7ce8501f.jpg',
    description: 'Commercial accounts officer verifying wholesale distributor ledgers, invoice settlements, and daily plant order manifests.',
  },
  {
    id: 'gal-team-finance',
    title: 'Finance & Commercial Administration Desk',
    category: 'Team & Leadership',
    imageUrl: '/assets/aistudio/ESS07928_7722485a.jpg',
    description: 'Finance administrator overseeing distributor billing, payment reconciliation, and corporate account inquiries at Kubwa headquarters.',
  },
  {
    id: 'gal-team-office',
    title: 'Kubwa Plant Administrative & Accounts Office',
    category: 'Team & Leadership',
    imageUrl: '/assets/aistudio/ESS07933_baa3bbd3.jpg',
    description: 'Synchronized finance and commercial operations team working inside the administrative office to clear orders for warehouse dispatch.',
  },
  {
    id: 'gal-wh-sachet-pallet',
    title: 'Palletized Sachet Water Stock & Dispatch Staging',
    category: 'Warehouse & Logistics',
    imageUrl: '/assets/aistudio/ESS07947_3707c862.jpg',
    description: 'High-capacity plastic pallets loaded with Elim sachet water bags while warehouse staff coordinate outgoing batch release.',
  },
  {
    id: 'gal-bottle-19l-conveyor',
    title: '18.9L Dispenser Jar Conveyor Intake & Handling',
    category: 'Bottling Line',
    imageUrl: '/assets/aistudio/ESS07970_39dcd5d1.jpg',
    description: 'Cleanroom operator positioning sanitized 18.9-liter polycarbonate jars onto the stainless steel chain conveyor toward filling and capping.',
  },
  {
    id: 'gal-fleet-truck-trolley',
    title: 'Heavy Truck Loading — Bottled Water Pallets & Trolleys',
    category: 'Fleet & Logistics',
    imageUrl: '/assets/aistudio/ESS07979_98aff78b.jpg',
    description: 'Warehouse and truck crew loading shrink-wrapped bottled water packs from wooden pallets and steel trolleys onto our blue fleet truck.',
  },
  {
    id: 'gal-fleet-truck-bay',
    title: 'Regional Distribution Fleet Loading at Factory Yard',
    category: 'Fleet & Logistics',
    imageUrl: '/assets/aistudio/ESS07980_efbc9d24.jpg',
    description: 'Dual heavy-duty blue Elim distribution trucks staged in the sunny factory courtyard for bulk institutional and wholesale delivery across FCT.',
  },
  {
    id: 'gal-team-01',
    title: 'Elim Table Water Executive & Plant Staff Team',
    category: 'Team & Leadership',
    imageUrl: '/assets/aistudio/productsqw_4491fc0b.jpeg',
    description: 'Executive management, department supervisors, and field logistics staff assembled outside the Kubwa manufacturing plant.',
  },
  {
    id: 'gal-prod-01',
    title: 'Production Department & Cleanroom Technicians',
    category: 'Production Department',
    imageUrl: '/assets/aistudio/productsiyu_44e04553.jpeg',
    description: 'Cleanroom technicians and automated bottling specialists responsible for reverse osmosis filtration and sterile packaging.',
  },
  {
    id: 'gal-wh-01',
    title: 'Warehouse & Finished Goods Inventory Team',
    category: 'Warehouse & Logistics',
    imageUrl: '/assets/aistudio/products_69cca1f6.jpeg',
    description: 'Depot supervisors managing climate-controlled finished bottled water stacks, quality release seals, and fleet loading.',
  },
];

const INITIAL_ORDERS: OnlineOrder[] = [
  {
    id: 'ord-seed-001',
    orderReference: 'ELM-WEB-2026-000101',
    createdAt: '2026-11-04T08:30:00.000Z',
    updatedAt: '2026-11-04T09:15:00.000Z',
    customer: {
      fullName: 'Chief Adebayo Adeleke',
      phoneNumber: '+234 803 234 5678',
      email: 'adebayo.adeleke@metroholdings.ng',
      businessName: 'Metro Heights Corporate Suites',
      deliveryAddress: 'Plot 14, Victoria Island Boulevard, Phase 2',
      cityArea: 'Victoria Island',
      state: 'Lagos',
      preferredDeliveryDate: '2026-11-05',
      preferredDeliveryWindow: 'Morning (8:00 AM - 12:00 PM)',
      deliveryMethod: 'DELIVERY',
      specialInstructions: 'Security gate will direct truck to lower basement dock. Security clearance confirmed.',
    },
    items: [
      {
        productId: 'prod-dispenser-19l',
        productName: 'Elim 19-Liter (5 Gallon) Premium Dispenser Bottle Refill',
        variantId: 'var-dsp-refill-only',
        variantName: 'Bottle Refill (Exchange Empty Bottle)',
        quantity: 25,
        unitPrice: 1300,
        totalPrice: 32500,
        packaging: 'Returnable 19L Polycarbonate Bottle',
      },
      {
        productId: 'prod-bottle-500',
        productName: 'Elim Natural Spring Table Water 500ml',
        variantId: 'var-btl-500-pack12',
        variantName: 'Carton of 12 Bottles (500ml)',
        quantity: 30,
        unitPrice: 1800,
        totalPrice: 54000,
        packaging: 'Shrink-wrapped Pack of 12',
      },
    ],
    subtotal: 86500,
    deliveryFee: 4000,
    totalAmount: 90500,
    status: 'READY_FOR_DISPATCH',
    assignedStaffId: 'staff-01',
    assignedStaffName: 'Folake Adeyemi',
    assignedAt: '2026-11-04T08:45:00.000Z',
    stockReserved: true,
    stockReservedAt: '2026-11-04T09:00:00.000Z',
    dispatchId: 'dsp-001',
    statusHistory: [
      {
        id: 'hist-1',
        status: 'NEW',
        changedAt: '2026-11-04T08:30:00.000Z',
        changedBy: 'System (Online Portal)',
        notes: 'Booking submitted by customer from website.',
      },
      {
        id: 'hist-2',
        status: 'ASSIGNED',
        changedAt: '2026-11-04T08:45:00.000Z',
        changedBy: 'Admin Desk',
        notes: 'Assigned to Folake Adeyemi for review and customer phone verification.',
      },
      {
        id: 'hist-3',
        status: 'ACCEPTED',
        changedAt: '2026-11-04T09:00:00.000Z',
        changedBy: 'Folake Adeyemi',
        notes: 'Customer verified by phone. Stock availability checked against warehouse.',
      },
      {
        id: 'hist-4',
        status: 'READY_FOR_DISPATCH',
        changedAt: '2026-11-04T09:15:00.000Z',
        changedBy: 'Folake Adeyemi',
        notes: 'Warehouse pick list issued. Vehicle queued.',
      },
    ],
    internalNotes: [
      {
        id: 'note-1',
        createdAt: '2026-11-04T08:50:00.000Z',
        authorName: 'Folake Adeyemi',
        content: 'Spoke with facility manager Mr. Kelechi. They have 25 empty 19L bottles stacked ready for swap.',
        isCustomerVisible: false,
      },
    ],
  },
  {
    id: 'ord-seed-002',
    orderReference: 'ELM-WEB-2026-000102',
    createdAt: '2026-11-04T09:10:00.000Z',
    updatedAt: '2026-11-04T09:10:00.000Z',
    customer: {
      fullName: 'Mrs. Fatima Danjuma',
      phoneNumber: '+234 812 987 6543',
      email: 'fatima.d@danjumaevents.com',
      businessName: 'Grand Oasis Banquet & Events',
      deliveryAddress: 'Km 14 Lekki-Epe Expressway, Near Chevron Roundabout',
      cityArea: 'Lekki Phase 1',
      state: 'Lagos',
      preferredDeliveryDate: '2026-11-06',
      preferredDeliveryWindow: 'Afternoon (1:00 PM - 5:00 PM)',
      deliveryMethod: 'DELIVERY',
      specialInstructions: 'Call 30 minutes before arrival for warehouse bay access.',
    },
    items: [
      {
        productId: 'prod-sachet-01',
        productName: 'Elim Pure Flow Sachet Water (20 Bags Bundle)',
        variantId: 'var-sch-bundle-20',
        variantName: 'Standard Wholesale Bundle (20 Bags x 20 Sachets)',
        quantity: 15,
        unitPrice: 3600,
        totalPrice: 54000,
        packaging: '20 Bags Bundle (400 sachets total)',
      },
      {
        productId: 'prod-bottle-500',
        productName: 'Elim Natural Spring Table Water 500ml',
        variantId: 'var-btl-500-pack12',
        variantName: 'Carton of 12 Bottles (500ml)',
        quantity: 50,
        unitPrice: 1800,
        totalPrice: 90000,
        packaging: 'Shrink-wrapped Pack of 12',
      },
      {
        productId: 'prod-bottle-1500',
        productName: 'Elim Premium Table Water 1.5 Liters',
        variantId: 'var-btl-1500-pack6',
        variantName: 'Pack of 6 Jumbo Bottles (1.5L)',
        quantity: 20,
        unitPrice: 2400,
        totalPrice: 48000,
        packaging: 'Shrink-wrapped Pack of 6',
      },
    ],
    subtotal: 192000,
    deliveryFee: 5000,
    totalAmount: 197000,
    status: 'NEW',
    stockReserved: false,
    statusHistory: [
      {
        id: 'hist-201',
        status: 'NEW',
        changedAt: '2026-11-04T09:10:00.000Z',
        changedBy: 'System (Online Portal)',
        notes: 'New booking awaiting review and staff assignment.',
      },
    ],
    internalNotes: [],
  },
  {
    id: 'ord-seed-003',
    orderReference: 'ELM-WEB-2026-000103',
    createdAt: '2026-11-04T07:15:00.000Z',
    updatedAt: '2026-11-04T10:05:00.000Z',
    customer: {
      fullName: 'Pastor Michael Ogundipe',
      phoneNumber: '+234 805 112 3344',
      email: 'admin@graceassembly.org',
      businessName: 'Grace Assembly Cathedral',
      deliveryAddress: '12 Church Street, Alausa Secretariat',
      cityArea: 'Ikeja',
      state: 'Lagos',
      preferredDeliveryDate: '2026-11-04',
      deliveryMethod: 'FACTORY_COLLECTION',
      specialInstructions: 'We will bring our pickup truck for direct loading at Gate B.',
    },
    items: [
      {
        productId: 'prod-bottle-500',
        productName: 'Elim Natural Spring Table Water 500ml',
        variantId: 'var-btl-500-pack12',
        variantName: 'Carton of 12 Bottles (500ml)',
        quantity: 40,
        unitPrice: 1800,
        totalPrice: 72000,
        packaging: 'Shrink-wrapped Pack of 12',
      },
      {
        productId: 'prod-sachet-01',
        productName: 'Elim Pure Flow Sachet Water (20 Bags Bundle)',
        variantId: 'var-sch-bundle-20',
        variantName: 'Standard Wholesale Bundle (20 Bags x 20 Sachets)',
        quantity: 10,
        unitPrice: 3600,
        totalPrice: 36000,
        packaging: '20 Bags Bundle (400 sachets total)',
      },
    ],
    subtotal: 108000,
    deliveryFee: 0,
    totalAmount: 108000,
    status: 'ACCEPTED',
    assignedStaffId: 'staff-01',
    assignedStaffName: 'Folake Adeyemi',
    assignedAt: '2026-11-04T07:45:00.000Z',
    stockReserved: true,
    stockReservedAt: '2026-11-04T08:00:00.000Z',
    statusHistory: [
      {
        id: 'hist-301',
        status: 'NEW',
        changedAt: '2026-11-04T07:15:00.000Z',
        changedBy: 'System (Online Portal)',
      },
      {
        id: 'hist-302',
        status: 'ASSIGNED',
        changedAt: '2026-11-04T07:45:00.000Z',
        changedBy: 'Admin Desk',
      },
      {
        id: 'hist-303',
        status: 'ACCEPTED',
        changedAt: '2026-11-04T08:00:00.000Z',
        changedBy: 'Folake Adeyemi',
        notes: 'Factory pickup confirmed for 2:00 PM today. Bay ticket #44 generated.',
      },
    ],
    internalNotes: [],
  },
];

const INITIAL_DISPATCHES: DispatchRecord[] = [
  {
    id: 'dsp-001',
    dispatchNumber: 'DSP-2026-00045',
    orderId: 'ord-seed-001',
    orderReference: 'ELM-WEB-2026-000101',
    driverId: 'drv-01',
    driverName: 'Ibrahim Musa',
    driverPhone: '+234 803 777 1234',
    vehicleId: 'veh-01',
    vehiclePlate: 'LSR-420-AA',
    vehicleModel: 'Mitsubishi Canter 5-Ton Truck',
    dispatchDate: '2026-11-05',
    expectedDeliveryDate: '2026-11-05',
    deliveryAddress: 'Plot 14, Victoria Island Boulevard, Phase 2, Lagos',
    customerName: 'Chief Adebayo Adeleke',
    customerPhone: '+234 803 234 5678',
    status: 'READY_FOR_DISPATCH',
    dispatchedItems: [
      {
        productId: 'prod-dispenser-19l',
        productName: 'Elim 19-Liter (5 Gallon) Premium Dispenser Bottle Refill',
        variantName: 'Bottle Refill',
        orderedQuantity: 25,
        dispatchedQuantity: 25,
      },
      {
        productId: 'prod-bottle-500',
        productName: 'Elim Natural Spring Table Water 500ml',
        variantName: 'Pack of 12',
        orderedQuantity: 30,
        dispatchedQuantity: 30,
      },
    ],
    notes: 'Morning run scheduled with driver Ibrahim Musa.',
    createdAt: '2026-11-04T09:20:00.000Z',
  },
];

const INITIAL_INQUIRIES: CustomerInquiry[] = [
  {
    id: 'inq-01',
    type: 'DISTRIBUTOR_PARTNERSHIP',
    fullName: 'Alhaji Sanusi Bello',
    email: 'sanusi.b@bellotrading.com',
    phoneNumber: '+234 802 334 9911',
    companyName: 'Bello & Sons FMCG Distribution Ltd',
    city: 'Ibadan',
    state: 'Oyo State',
    message:
      'We operate 4 wholesale distribution warehouses in Ibadan and require 2 full trailers of 500ml bottles and 19L refills per week. Requesting credit line terms and wholesale price list.',
    status: 'CONTACTED',
    createdAt: '2026-11-03T14:15:00.000Z',
    handledBy: 'Jennifer Nnamdi',
  },
  {
    id: 'inq-02',
    type: 'BULK_EVENT_ORDER',
    fullName: 'Ngozi Eze',
    email: 'ngozi@apexweddings.ng',
    phoneNumber: '+234 813 555 8822',
    companyName: 'Apex Event Planners',
    city: 'Lekki',
    state: 'Lagos',
    message:
      'We have a 1,200-guest presidential wedding reception on Nov 21. We need 300 cartons of 500ml bottles with customized branded labels if possible.',
    status: 'NEW',
    createdAt: '2026-11-04T10:30:00.000Z',
  },
];

const INITIAL_TESTIMONIALS: CustomerTestimonial[] = [
  {
    id: 'test-01',
    customerName: 'Dr. Chinelo Nwosu',
    roleOrLocation: 'Apex Specialist Hospital, Wuse II',
    category: 'Healthcare Facility',
    rating: 5,
    feedback:
      'Consistent clinical-grade purity is non-negotiable for our wards and outpatient clinics. Elim Table Water delivers on schedule every Tuesday and Friday with intact tamper seals and batch lab traceability.',
    productPurchased: '19L Dispenser Bottle Refills',
    submittedAt: '2026-11-11T14:20:00.000Z',
    verified: true,
  },
  {
    id: 'test-02',
    customerName: 'Engr. Ibrahim Danjuma',
    roleOrLocation: 'Gwarinpa Estate, Abuja',
    category: 'Home Subscriber',
    rating: 5,
    feedback:
      'We switched our household to Elim 19L dispenser refills six months ago. The water tastes crisp and clean, zero aftertaste, and their delivery riders are always courteous and prompt even in Kubwa & Gwarinpa.',
    productPurchased: '19L Dispenser & 500ml Packs',
    submittedAt: '2026-11-10T09:45:00.000Z',
    verified: true,
  },
  {
    id: 'test-03',
    customerName: 'Mrs. Funke Adebayo',
    roleOrLocation: 'Sterling Axis Corporate Towers, Maitama',
    category: 'Corporate Client',
    rating: 5,
    feedback:
      'Our boardrooms and 180 staff members rely on Elim 500ml bottles and dispenser refills daily. Their ERP booking confirmation and morning loading bay dispatch make office facility management effortless.',
    productPurchased: '500ml Table Water (Cartons)',
    submittedAt: '2026-11-08T16:10:00.000Z',
    verified: true,
  },
  {
    id: 'test-04',
    customerName: 'Alhaji Sani Abdullahi',
    roleOrLocation: 'Kubwa Phase 4 Depot Partner',
    category: 'Authorized Distributor',
    rating: 5,
    feedback:
      'As a bulk distributor in Kubwa, product turnover is fast because customers specifically ask for Elim by name. Shrink-wrap bundles always arrive tight, clean, and fresh straight from the conveyor line.',
    productPurchased: 'Sachet Water Bundles & 750ml',
    submittedAt: '2026-11-06T11:30:00.000Z',
    verified: true,
  },
  {
    id: 'test-05',
    customerName: 'Amaka Okafor',
    roleOrLocation: 'Garki Area 11, Abuja',
    category: 'Home Subscriber',
    rating: 5,
    feedback:
      'Ordered 15 packs of 500ml and 1.5L bottles for our family thanksgiving via the online portal. Received WhatsApp tracking updates and the electric cargo van arrived right in our morning delivery window.',
    productPurchased: '1.5L Family & 500ml Packs',
    submittedAt: '2026-11-03T13:05:00.000Z',
    verified: true,
  },
  {
    id: 'test-06',
    customerName: 'Tunde Bakare',
    roleOrLocation: 'Crestview Academy, Bwari',
    category: 'Corporate Client',
    rating: 4,
    feedback:
      'Reliable institutional partner for our school cafeteria and staff rooms. Knowing the plant runs microbiological checks every 30 minutes gives parents and school administrators total peace of mind.',
    productPurchased: '19L Dispenser & Sachet Bundles',
    submittedAt: '2026-10-30T08:50:00.000Z',
    verified: true,
  },
];

class ErpStorageService {
  private notifyListeners() {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('elim_erp_updated'));
    }
  }

  private isStaleMediaUrl(url?: string): boolean {
    if (!url) return true;
    if (url.includes('images.unsplash.com')) return true;
    if (
      url.includes('/assets/aistudio/image_') &&
      !url.includes('image_6cafc13e') &&
      !url.includes('image_b039644a')
    ) {
      return true;
    }
    if (
      url.includes('1794869852223') ||
      url.includes('1794869853699') ||
      url.includes('1794869855283') ||
      url.includes('1794869861214')
    ) {
      return true;
    }
    return false;
  }

  // --- Products ---
  public getProducts(): Product[] {
    const raw = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    try {
      const stored: Product[] = JSON.parse(raw);
      const initialById = new Map(INITIAL_PRODUCTS.map((p) => [p.id, p]));
      let modified = false;
      const migrated = stored.map((prod) => {
        const fresh = initialById.get(prod.id);
        if (!fresh) return prod;
        const imageStale = this.isStaleMediaUrl(prod.image);
        const additionalStale = (prod.additionalImages || []).some((img) => this.isStaleMediaUrl(img));
        if (imageStale || additionalStale) {
          modified = true;
          return {
            ...prod,
            image: imageStale ? fresh.image : prod.image,
            additionalImages: additionalStale ? fresh.additionalImages : prod.additionalImages,
          };
        }
        return prod;
      });
      if (modified) {
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(migrated));
      }
      return migrated;
    } catch {
      return INITIAL_PRODUCTS;
    }
  }

  public getPublicApprovedProducts(): Product[] {
    return this.getProducts().filter((p) => p.isPubliclyVisible);
  }

  public getProductById(id: string): Product | undefined {
    return this.getProducts().find((p) => p.id === id);
  }

  public updateProduct(updated: Product): void {
    const products = this.getProducts();
    const idx = products.findIndex((p) => p.id === updated.id);
    if (idx !== -1) {
      products[idx] = updated;
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
      this.notifyListeners();
    }
  }

  // Stock check: verifies if requested quantities are available (currentStock - reservedStock)
  public checkStockAvailability(items: { productId: string; quantity: number }[]): {
    allAvailable: boolean;
    issues: { productId: string; productName: string; requested: number; available: number }[];
  } {
    const products = this.getProducts();
    const issues: { productId: string; productName: string; requested: number; available: number }[] = [];

    for (const item of items) {
      const prod = products.find((p) => p.id === item.productId);
      if (!prod) {
        issues.push({
          productId: item.productId,
          productName: 'Unknown Product',
          requested: item.quantity,
          available: 0,
        });
        continue;
      }
      const available = Math.max(0, prod.currentStock - prod.reservedStock);
      if (item.quantity > available) {
        issues.push({
          productId: prod.id,
          productName: prod.name,
          requested: item.quantity,
          available,
        });
      }
    }

    return {
      allAvailable: issues.length === 0,
      issues,
    };
  }

  // Replenish stock in ERP finished goods warehouse (e.g. from production line batch)
  public replenishStock(productId: string, quantityToAdd: number, notes: string, operator: string): void {
    const products = this.getProducts();
    const prod = products.find((p) => p.id === productId);
    if (!prod) return;

    prod.currentStock += quantityToAdd;
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));

    this.logInventoryMovement({
      productId: prod.id,
      productName: prod.name,
      variantName: 'Batch Production',
      transactionType: 'PRODUCTION_IN',
      quantityChange: quantityToAdd,
      balanceAfter: prod.currentStock,
      referenceDoc: `PRD-${Date.now().toString().slice(-6)}`,
      performedBy: operator,
      notes: notes || 'Production line bottling finished goods intake.',
    });

    this.notifyListeners();
  }

  // --- Orders ---
  public getOrders(): OnlineOrder[] {
    const raw = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_ORDERS;
    }
  }

  public getOrderById(id: string): OnlineOrder | undefined {
    return this.getOrders().find((o) => o.id === id);
  }

  public getOrderByReferenceAndPhone(orderRef: string, phone: string): OnlineOrder | undefined {
    const cleanRef = orderRef.trim().toUpperCase();
    const cleanPhone = phone.trim().replace(/[^0-9]/g, '');

    return this.getOrders().find((o) => {
      const matchRef = o.orderReference.toUpperCase() === cleanRef;
      const orderPhoneClean = o.customer.phoneNumber.replace(/[^0-9]/g, '');
      const matchPhone = orderPhoneClean.includes(cleanPhone) || cleanPhone.includes(orderPhoneClean);
      return matchRef && matchPhone;
    });
  }

  // Generates collision-safe order reference e.g. ELM-WEB-2026-000104
  private generateOrderReference(): string {
    const currentYear = new Date().getFullYear();
    const rawCounter = localStorage.getItem(STORAGE_KEYS.ORDER_COUNTER);
    let counter = rawCounter ? parseInt(rawCounter, 10) : 104;
    counter += 1;
    localStorage.setItem(STORAGE_KEYS.ORDER_COUNTER, counter.toString());
    const padded = counter.toString().padStart(6, '0');
    return `ELM-WEB-${currentYear}-${padded}`;
  }

  public createOnlineOrder(data: {
    customer: CustomerInfo;
    items: CartItem[];
    deliveryFee: number;
  }): OnlineOrder {
    const orderRef = this.generateOrderReference();
    const now = new Date().toISOString();

    const orderItems: OnlineOrder['items'] = data.items.map((i) => ({
      productId: i.productId,
      productName: i.productName,
      variantId: i.variantId,
      variantName: i.variantName,
      quantity: i.quantity,
      unitPrice: i.unitPrice,
      totalPrice: i.quantity * i.unitPrice,
      packaging: i.packaging,
    }));

    const subtotal = orderItems.reduce((acc, curr) => acc + curr.totalPrice, 0);
    const totalAmount = subtotal + data.deliveryFee;

    // Automatically auto-assign to the Senior Order Desk Manager (Folake Adeyemi) as requested
    const staff = this.getStaff();
    const primaryOrderDesk = staff.find((s) => s.role === 'ORDER_MANAGER' && s.active) || staff[0];

    const newOrder: OnlineOrder = {
      id: `ord-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      orderReference: orderRef,
      createdAt: now,
      updatedAt: now,
      customer: data.customer,
      items: orderItems,
      subtotal,
      deliveryFee: data.deliveryFee,
      totalAmount,
      status: 'NEW',
      assignedStaffId: primaryOrderDesk ? primaryOrderDesk.id : undefined,
      assignedStaffName: primaryOrderDesk ? primaryOrderDesk.name : undefined,
      assignedAt: primaryOrderDesk ? now : undefined,
      stockReserved: false,
      statusHistory: [
        {
          id: `hist-${Date.now()}`,
          status: 'NEW',
          changedAt: now,
          changedBy: 'System (Online Portal)',
          notes: 'Customer submitted booking through corporate website.',
        },
      ],
      internalNotes: [],
    };

    if (primaryOrderDesk) {
      newOrder.statusHistory.push({
        id: `hist-${Date.now() + 1}`,
        status: 'ASSIGNED',
        changedAt: now,
        changedBy: 'System (Auto-Routing)',
        notes: `Automatically routed to designated Order Manager: ${primaryOrderDesk.name}.`,
      });
      newOrder.status = 'ASSIGNED';
      this.incrementStaffWorkload(primaryOrderDesk.id);
    }

    const orders = this.getOrders();
    orders.unshift(newOrder);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));

    this.notifyListeners();
    return newOrder;
  }

  public assignStaff(orderId: string, staffId: string, assignedBy: string): boolean {
    const orders = this.getOrders();
    const order = orders.find((o) => o.id === orderId);
    if (!order) return false;

    const staffList = this.getStaff();
    const staff = staffList.find((s) => s.id === staffId);
    if (!staff) return false;

    // decrement old staff if different
    if (order.assignedStaffId && order.assignedStaffId !== staffId) {
      this.decrementStaffWorkload(order.assignedStaffId);
    }

    order.assignedStaffId = staff.id;
    order.assignedStaffName = staff.name;
    order.assignedAt = new Date().toISOString();
    order.updatedAt = new Date().toISOString();

    if (order.status === 'NEW') {
      order.status = 'ASSIGNED';
    }

    order.statusHistory.push({
      id: `hist-${Date.now()}`,
      status: order.status,
      changedAt: new Date().toISOString(),
      changedBy: assignedBy,
      notes: `Order assigned to ${staff.name} (${staff.roleTitle}).`,
    });

    this.incrementStaffWorkload(staffId);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    this.notifyListeners();
    return true;
  }

  public acceptBooking(orderId: string, acceptedBy: string, reserveStockNow = true): boolean {
    const orders = this.getOrders();
    const order = orders.find((o) => o.id === orderId);
    if (!order) return false;

    const now = new Date().toISOString();
    order.status = 'ACCEPTED';
    order.updatedAt = now;

    if (reserveStockNow && !order.stockReserved) {
      this.reserveStockForOrder(order, acceptedBy);
    }

    order.statusHistory.push({
      id: `hist-${Date.now()}`,
      status: 'ACCEPTED',
      changedAt: now,
      changedBy: acceptedBy,
      notes: 'Booking accepted by order manager. Customer phone confirmed.',
    });

    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    this.notifyListeners();
    return true;
  }

  public rejectBooking(orderId: string, reason: string, rejectedBy: string): boolean {
    const orders = this.getOrders();
    const order = orders.find((o) => o.id === orderId);
    if (!order) return false;

    const now = new Date().toISOString();
    order.status = 'REJECTED';
    order.rejectionReason = reason;
    order.updatedAt = now;

    // Release any reserved stock if previously reserved
    if (order.stockReserved) {
      this.releaseStockForOrder(order, rejectedBy);
    }

    if (order.assignedStaffId) {
      this.decrementStaffWorkload(order.assignedStaffId);
    }

    order.statusHistory.push({
      id: `hist-${Date.now()}`,
      status: 'REJECTED',
      changedAt: now,
      changedBy: rejectedBy,
      reason,
      notes: `Booking rejected. Reason: ${reason}`,
    });

    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    this.notifyListeners();
    return true;
  }

  public updateOrderStatus(orderId: string, newStatus: OrderStatus, changedBy: string, notes?: string): boolean {
    const orders = this.getOrders();
    const order = orders.find((o) => o.id === orderId);
    if (!order) return false;

    const now = new Date().toISOString();
    order.status = newStatus;
    order.updatedAt = now;

    // If cancelled, release reservations
    if (newStatus === 'CANCELLED' && order.stockReserved) {
      this.releaseStockForOrder(order, changedBy);
    }

    order.statusHistory.push({
      id: `hist-${Date.now()}`,
      status: newStatus,
      changedAt: now,
      changedBy,
      notes: notes || `Status updated to ${newStatus}`,
    });

    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    this.notifyListeners();
    return true;
  }

  public addOrderNote(orderId: string, authorName: string, content: string, isCustomerVisible = false): void {
    const orders = this.getOrders();
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;

    order.internalNotes.push({
      id: `note-${Date.now()}`,
      createdAt: new Date().toISOString(),
      authorName,
      content,
      isCustomerVisible,
    });

    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    this.notifyListeners();
  }

  // --- ERP Stock Reservation Engine ---
  private reserveStockForOrder(order: OnlineOrder, actor: string): void {
    const products = this.getProducts();

    for (const item of order.items) {
      const prod = products.find((p) => p.id === item.productId);
      if (prod) {
        prod.reservedStock += item.quantity;
        this.logInventoryMovement({
          productId: prod.id,
          productName: prod.name,
          variantName: item.variantName,
          transactionType: 'ONLINE_ORDER_RESERVED',
          quantityChange: item.quantity,
          balanceAfter: prod.currentStock - prod.reservedStock,
          referenceDoc: order.orderReference,
          performedBy: actor,
          notes: `Stock reserved for online booking ${order.orderReference}`,
        });
      }
    }

    order.stockReserved = true;
    order.stockReservedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }

  private releaseStockForOrder(order: OnlineOrder, actor: string): void {
    const products = this.getProducts();

    for (const item of order.items) {
      const prod = products.find((p) => p.id === item.productId);
      if (prod) {
        prod.reservedStock = Math.max(0, prod.reservedStock - item.quantity);
        this.logInventoryMovement({
          productId: prod.id,
          productName: prod.name,
          variantName: item.variantName,
          transactionType: 'ONLINE_ORDER_RELEASED',
          quantityChange: -item.quantity,
          balanceAfter: prod.currentStock - prod.reservedStock,
          referenceDoc: order.orderReference,
          performedBy: actor,
          notes: `Reservation released for booking ${order.orderReference}`,
        });
      }
    }

    order.stockReserved = false;
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }

  // --- Dispatches & Deliveries ---
  public getDispatches(): DispatchRecord[] {
    const raw = localStorage.getItem(STORAGE_KEYS.DISPATCHES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.DISPATCHES, JSON.stringify(INITIAL_DISPATCHES));
      return INITIAL_DISPATCHES;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_DISPATCHES;
    }
  }

  public createDispatch(data: {
    orderId: string;
    driverId: string;
    vehicleId: string;
    dispatchDate: string;
    expectedDeliveryDate: string;
    dispatchedQuantities?: { productId: string; quantity: number }[];
    notes?: string;
    createdBy: string;
  }): DispatchRecord | null {
    const orders = this.getOrders();
    const order = orders.find((o) => o.id === data.orderId);
    if (!order) return null;

    const vehicles = this.getVehicles();
    const vehicle = vehicles.find((v) => v.id === data.vehicleId);
    const staff = this.getStaff();
    const driver = staff.find((s) => s.id === data.driverId);

    const dispatchNum = `DSP-2026-${(this.getDispatches().length + 101).toString().padStart(5, '0')}`;
    const now = new Date().toISOString();

    const dispatchedItems = order.items.map((i) => {
      const customQty = data.dispatchedQuantities?.find((q) => q.productId === i.productId);
      return {
        productId: i.productId,
        productName: i.productName,
        variantName: i.variantName,
        orderedQuantity: i.quantity,
        dispatchedQuantity: customQty ? customQty.quantity : i.quantity,
      };
    });

    const newDispatch: DispatchRecord = {
      id: `dsp-${Date.now()}`,
      dispatchNumber: dispatchNum,
      orderId: order.id,
      orderReference: order.orderReference,
      driverId: data.driverId,
      driverName: driver ? driver.name : (vehicle?.assignedDriverName || 'Assigned Driver'),
      driverPhone: driver ? driver.phoneNumber : '+234 803 000 0000',
      vehicleId: data.vehicleId,
      vehiclePlate: vehicle ? vehicle.plateNumber : 'LSR-420-AA',
      vehicleModel: vehicle ? vehicle.model : 'Standard Delivery Van',
      dispatchDate: data.dispatchDate,
      expectedDeliveryDate: data.expectedDeliveryDate,
      deliveryAddress: order.customer.deliveryAddress,
      customerName: order.customer.fullName,
      customerPhone: order.customer.phoneNumber,
      status: 'READY_FOR_DISPATCH',
      dispatchedItems,
      notes: data.notes,
      createdAt: now,
    };

    const dispatches = this.getDispatches();
    dispatches.unshift(newDispatch);
    localStorage.setItem(STORAGE_KEYS.DISPATCHES, JSON.stringify(dispatches));

    // Update order status
    order.dispatchId = newDispatch.id;
    order.status = 'READY_FOR_DISPATCH';
    order.statusHistory.push({
      id: `hist-${Date.now()}`,
      status: 'READY_FOR_DISPATCH',
      changedAt: now,
      changedBy: data.createdBy,
      notes: `Scheduled with Vehicle ${vehicle?.plateNumber} and Driver ${newDispatch.driverName}. Dispatch ticket ${dispatchNum}.`,
    });
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));

    this.notifyListeners();
    return newDispatch;
  }

  // Mark dispatch as In-Transit
  public markDispatchInTransit(dispatchId: string, performedBy: string): boolean {
    const dispatches = this.getDispatches();
    const dsp = dispatches.find((d) => d.id === dispatchId);
    if (!dsp) return false;

    const now = new Date().toISOString();
    dsp.status = 'IN_TRANSIT';
    dsp.dispatchedAt = now;
    localStorage.setItem(STORAGE_KEYS.DISPATCHES, JSON.stringify(dispatches));

    // Update vehicle status
    const vehicles = this.getVehicles();
    const veh = vehicles.find((v) => v.id === dsp.vehicleId);
    if (veh) {
      veh.status = 'IN_TRANSIT';
      localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(vehicles));
    }

    // Deduct physical stock from ERP warehouse upon leaving factory gates!
    const products = this.getProducts();
    for (const item of dsp.dispatchedItems) {
      const prod = products.find((p) => p.id === item.productId);
      if (prod) {
        prod.currentStock = Math.max(0, prod.currentStock - item.dispatchedQuantity);
        prod.reservedStock = Math.max(0, prod.reservedStock - item.dispatchedQuantity);

        this.logInventoryMovement({
          productId: prod.id,
          productName: prod.name,
          variantName: item.variantName,
          transactionType: 'DISPATCH_DEDUCTION',
          quantityChange: -item.dispatchedQuantity,
          balanceAfter: prod.currentStock,
          referenceDoc: dsp.dispatchNumber,
          performedBy,
          notes: `Physical dispatch deduction on departure with ${dsp.vehiclePlate}.`,
        });
      }
    }
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));

    // Update order status to DISPATCHED / OUT_FOR_DELIVERY
    const orders = this.getOrders();
    const ord = orders.find((o) => o.id === dsp.orderId);
    if (ord) {
      ord.status = 'OUT_FOR_DELIVERY';
      ord.statusHistory.push({
        id: `hist-${Date.now()}`,
        status: 'OUT_FOR_DELIVERY',
        changedAt: now,
        changedBy: performedBy,
        notes: `Vehicle ${dsp.vehiclePlate} departed plant. In transit with driver ${dsp.driverName}.`,
      });
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    }

    this.notifyListeners();
    return true;
  }

  // Delivery confirmation: Handles full delivery AND partial delivery (Phase 7 rule)
  public recordDeliveryConfirmation(data: {
    dispatchId: string;
    deliveredQuantity: number;
    undeliveredQuantity: number;
    recipientName: string;
    recipientPhone: string;
    notes?: string;
    isFailed?: boolean;
    failReason?: string;
    returnCondition?: 'INTACT_RESTOCKABLE' | 'DAMAGED_REJECTED';
    confirmedBy: string;
  }): boolean {
    const dispatches = this.getDispatches();
    const dsp = dispatches.find((d) => d.id === data.dispatchId);
    if (!dsp) return false;

    const now = new Date().toISOString();
    const isPartial = data.undeliveredQuantity > 0 && data.deliveredQuantity > 0;
    const isTotalFail = data.isFailed || (data.deliveredQuantity === 0 && data.undeliveredQuantity > 0);

    const confirmation: DeliveryConfirmation = {
      deliveredAt: now,
      confirmedBy: data.confirmedBy,
      recipientName: data.recipientName,
      recipientPhone: data.recipientPhone,
      isPartialDelivery: isPartial,
      deliveredQuantity: data.deliveredQuantity,
      undeliveredQuantity: data.undeliveredQuantity,
      notes: data.notes,
      returnReason: isTotalFail || isPartial ? data.failReason : undefined,
      returnCondition: data.returnCondition,
    };

    dsp.deliveryConfirmation = confirmation;
    dsp.status = isTotalFail ? 'FAILED_RETURNED' : isPartial ? 'PARTIALLY_DELIVERED' : 'DELIVERED';
    localStorage.setItem(STORAGE_KEYS.DISPATCHES, JSON.stringify(dispatches));

    // Release vehicle back to available
    const vehicles = this.getVehicles();
    const veh = vehicles.find((v) => v.id === dsp.vehicleId);
    if (veh) {
      veh.status = 'AVAILABLE';
      localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(vehicles));
    }

    // Update parent order
    const orders = this.getOrders();
    const ord = orders.find((o) => o.id === dsp.orderId);
    if (ord) {
      ord.status = isTotalFail ? 'PROCESSING' : isPartial ? 'PROCESSING' : 'DELIVERED';

      let statusNote = `Delivery confirmed by ${data.recipientName} (${data.recipientPhone}). Total delivered: ${data.deliveredQuantity}.`;
      if (isPartial) {
        statusNote = `PARTIAL DELIVERY: ${data.deliveredQuantity} units delivered. ${data.undeliveredQuantity} units remain pending further dispatch!`;
      } else if (isTotalFail) {
        statusNote = `DELIVERY FAILED: ${data.failReason || 'Customer unreachable'}. Goods returned to plant quarantine.`;
      }

      ord.statusHistory.push({
        id: `hist-${Date.now()}`,
        status: ord.status,
        changedAt: now,
        changedBy: data.confirmedBy,
        notes: statusNote,
      });

      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    }

    // Critical Phase 7.F Rule: If goods returned, do NOT automatically increase warehouse stock until QA inspection!
    if (data.undeliveredQuantity > 0) {
      this.logInventoryMovement({
        productId: dsp.dispatchedItems[0]?.productId || 'UNKNOWN',
        productName: dsp.dispatchedItems[0]?.productName || 'Returned Goods',
        variantName: 'Quarantine Hold',
        transactionType: 'CUSTOMER_RETURN_HOLD',
        quantityChange: 0, // Not restored yet!
        balanceAfter: 0,
        referenceDoc: dsp.dispatchNumber,
        performedBy: data.confirmedBy,
        notes: `Returned goods (${data.undeliveredQuantity} units) placed in QA receiving quarantine pending inspection. Reason: ${data.failReason || 'Incomplete handover'}`,
      });
    }

    this.notifyListeners();
    return true;
  }

  // --- Staff & Vehicles ---
  public getStaff(): StaffMember[] {
    const raw = localStorage.getItem(STORAGE_KEYS.STAFF);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(INITIAL_STAFF));
      return INITIAL_STAFF;
    }
    try {
      const stored: StaffMember[] = JSON.parse(raw);
      const initialById = new Map(INITIAL_STAFF.map((s) => [s.id, s]));
      let modified = false;
      const migrated = stored.map((member) => {
        const fresh = initialById.get(member.id);
        if (fresh && this.isStaleMediaUrl(member.avatar)) {
          modified = true;
          return { ...member, avatar: fresh.avatar };
        }
        return member;
      });
      if (modified) {
        localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(migrated));
      }
      return migrated;
    } catch {
      return INITIAL_STAFF;
    }
  }

  public getVehicles(): Vehicle[] {
    const raw = localStorage.getItem(STORAGE_KEYS.VEHICLES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(INITIAL_VEHICLES));
      return INITIAL_VEHICLES;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_VEHICLES;
    }
  }

  private incrementStaffWorkload(staffId: string): void {
    const staff = this.getStaff();
    const member = staff.find((s) => s.id === staffId);
    if (member) {
      member.assignedOrdersCount = (member.assignedOrdersCount || 0) + 1;
      localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(staff));
    }
  }

  private decrementStaffWorkload(staffId: string): void {
    const staff = this.getStaff();
    const member = staff.find((s) => s.id === staffId);
    if (member && member.assignedOrdersCount > 0) {
      member.assignedOrdersCount -= 1;
      localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(staff));
    }
  }

  // --- Inquiries ---
  public getInquiries(): CustomerInquiry[] {
    const raw = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(INITIAL_INQUIRIES));
      return INITIAL_INQUIRIES;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_INQUIRIES;
    }
  }

  public submitInquiry(inquiry: Omit<CustomerInquiry, 'id' | 'status' | 'createdAt'>): CustomerInquiry {
    const newInq: CustomerInquiry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      status: 'NEW',
      createdAt: new Date().toISOString(),
    };
    const inquiries = this.getInquiries();
    inquiries.unshift(newInq);
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    this.notifyListeners();
    return newInq;
  }

  public updateInquiryStatus(id: string, status: CustomerInquiry['status'], handledBy: string): void {
    const inquiries = this.getInquiries();
    const inq = inquiries.find((i) => i.id === id);
    if (inq) {
      inq.status = status;
      inq.handledBy = handledBy;
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
      this.notifyListeners();
    }
  }

  // --- News & Gallery ---
  public getNews(): NewsAnnouncement[] {
    const raw = localStorage.getItem(STORAGE_KEYS.NEWS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(INITIAL_NEWS));
      return INITIAL_NEWS;
    }
    try {
      const stored: NewsAnnouncement[] = JSON.parse(raw);
      const initialById = new Map(INITIAL_NEWS.map((n) => [n.id, n]));
      let modified = false;
      const migrated = stored.map((item) => {
        const fresh = initialById.get(item.id);
        if (fresh && this.isStaleMediaUrl(item.imageUrl)) {
          modified = true;
          return { ...item, imageUrl: fresh.imageUrl };
        }
        return item;
      });
      if (modified) {
        localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(migrated));
      }
      return migrated;
    } catch {
      return INITIAL_NEWS;
    }
  }

  public saveNews(item: NewsAnnouncement): void {
    const news = this.getNews();
    const idx = news.findIndex((n) => n.id === item.id);
    if (idx !== -1) {
      news[idx] = item;
    } else {
      news.unshift(item);
    }
    localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(news));
    this.notifyListeners();
  }

  public getGallery(): GalleryItem[] {
    const raw = localStorage.getItem(STORAGE_KEYS.GALLERY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(INITIAL_GALLERY));
      return INITIAL_GALLERY;
    }
    try {
      const stored: GalleryItem[] = JSON.parse(raw);
      const initialById = new Map(INITIAL_GALLERY.map((item) => [item.id, item]));
      let modified = false;

      const refreshed = stored.map((item) => {
        const fresh = initialById.get(item.id);
        if (!fresh) return item;
        const hasWatermarkedOrLegacyAsset =
          this.isStaleMediaUrl(item.imageUrl) ||
          (item.imageUrl.includes('regenerated_image_') && item.imageUrl !== fresh.imageUrl) ||
          (item.id === 'gal-new-14' && item.title !== fresh.title);

        if (hasWatermarkedOrLegacyAsset) {
          modified = true;
          return fresh;
        }
        return item;
      });

      const storedIds = new Set(refreshed.map((g) => g.id));
      const missingInitial = INITIAL_GALLERY.filter((item) => !storedIds.has(item.id));
      if (missingInitial.length > 0 || modified) {
        const customItems = refreshed.filter((item) => !initialById.has(item.id));
        const refreshedById = new Map(refreshed.map((item) => [item.id, item]));
        const orderedInitial = INITIAL_GALLERY.map((item) => refreshedById.get(item.id) || item);
        const merged = [...customItems, ...orderedInitial];
        localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(merged));
        return merged;
      }
      return refreshed;
    } catch {
      return INITIAL_GALLERY;
    }
  }

  public saveGalleryItem(item: GalleryItem): void {
    const gallery = this.getGallery();
    const idx = gallery.findIndex((g) => g.id === item.id);
    if (idx !== -1) {
      gallery[idx] = item;
    } else {
      gallery.unshift(item);
    }
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(gallery));
    this.notifyListeners();
  }

  // --- Inventory Ledger Logs ---
  public getInventoryLogs(): InventoryLogEntry[] {
    const raw = localStorage.getItem(STORAGE_KEYS.INVENTORY_LOGS);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  private logInventoryMovement(entry: Omit<InventoryLogEntry, 'id' | 'timestamp'>): void {
    const logs = this.getInventoryLogs();
    logs.unshift({
      ...entry,
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
    });
    // Keep last 250 logs
    if (logs.length > 250) logs.pop();
    localStorage.setItem(STORAGE_KEYS.INVENTORY_LOGS, JSON.stringify(logs));
  }

  // Reset to factory defaults if ever needed
  public resetToFactoryDefaults(): void {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
    localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(INITIAL_STAFF));
    localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(INITIAL_VEHICLES));
    localStorage.setItem(STORAGE_KEYS.DISPATCHES, JSON.stringify(INITIAL_DISPATCHES));
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(INITIAL_INQUIRIES));
    localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(INITIAL_NEWS));
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(INITIAL_GALLERY));
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(INITIAL_TESTIMONIALS));
    this.notifyListeners();
  }

  // --- Customer Testimonials & Recent Feedback ---
  public getTestimonials(): CustomerTestimonial[] {
    const raw = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(INITIAL_TESTIMONIALS));
      return INITIAL_TESTIMONIALS;
    }
    try {
      const parsed: CustomerTestimonial[] = JSON.parse(raw);
      return [...parsed].sort(
        (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      );
    } catch {
      return INITIAL_TESTIMONIALS;
    }
  }

  public async fetchRecentTestimonials(limit?: number): Promise<CustomerTestimonial[]> {
    // Simulate realistic async API retrieval delay while returning sorted recent feedback
    await new Promise((resolve) => setTimeout(resolve, 260));
    const all = this.getTestimonials();
    return typeof limit === 'number' ? all.slice(0, limit) : all;
  }

  public addTestimonial(
    entry: Omit<CustomerTestimonial, 'id' | 'submittedAt' | 'verified'>
  ): CustomerTestimonial {
    const existing = this.getTestimonials();
    const newTestimonial: CustomerTestimonial = {
      ...entry,
      id: `test-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      submittedAt: new Date().toISOString(),
      verified: true,
    };
    const updated = [newTestimonial, ...existing];
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(updated));
    this.notifyListeners();
    return newTestimonial;
  }
}

export const erpStorage = new ErpStorageService();
