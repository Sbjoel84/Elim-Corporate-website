// Types shared by the website (src/) and the API server (server/).
// These describe what the public website needs. The ERP adapter on the server
// is responsible for mapping the ERP's own records into these shapes.

export type DeliveryMethod = 'DELIVERY' | 'FACTORY_COLLECTION';

export type ProductCategory =
  | 'Sachet Water'
  | 'Bottled Water'
  | 'Table Water'
  | 'Dispenser Water'
  | 'Dispenser Bottles & Accessories';

/** Coarse stock signal shown to customers. Exact quantities stay in the ERP. */
export type Availability = 'IN_STOCK' | 'LIMITED' | 'MADE_TO_ORDER';

export interface ProductVariant {
  id: string;
  name: string;
  size: string;
  packaging: string;
  unitsPerPack: number;
  unitOfMeasure: string;
  price: number;
  wholesalePrice?: number;
  isDefault?: boolean;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: ProductCategory;
  description: string;
  image: string;
  additionalImages?: string[];
  variants: ProductVariant[];
  availability: Availability;
  featured: boolean;
  phLevel?: string;
  tdsLevel?: string;
  orderingNotes?: string;
  /** Smallest quantity a customer may order of each pack size (default 1). */
  minOrderQuantity?: number;
}

export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
  unitPrice: number;
  productName: string;
  variantName: string;
  packaging: string;
  image: string;
  /** Copied from the product so the cart can enforce it. */
  minOrderQuantity?: number;
}

export interface CustomerInfo {
  fullName: string;
  phoneNumber: string;
  email?: string;
  businessName?: string;
  deliveryAddress: string;
  cityArea: string;
  state: string;
  preferredDeliveryDate: string;
  preferredDeliveryWindow?: string;
  deliveryMethod: DeliveryMethod;
  /** Delivery area id from shared/pricing.ts DELIVERY_ZONES (delivery orders only). */
  deliveryZone?: string;
  specialInstructions?: string;
}

export type OrderStatus =
  | 'NEW'
  | 'UNDER_REVIEW'
  | 'AWAITING_CUSTOMER_CONFIRMATION'
  | 'ACCEPTED'
  | 'ASSIGNED'
  | 'AWAITING_STOCK_CONFIRMATION'
  | 'PROCESSING'
  | 'READY_FOR_DISPATCH'
  | 'DISPATCH_ASSIGNED'
  | 'DISPATCHED'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'COMPLETED'
  | 'REJECTED'
  | 'CANCELLED';

export interface OrderItem {
  productId: string;
  productName: string;
  variantId: string;
  variantName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  packaging: string;
}

export interface OrderStatusHistoryItem {
  status: OrderStatus;
  changedAt: string;
  notes?: string;
}

/** What the website receives about an order. No internal staff or ERP data. */
export interface PublicOrder {
  orderReference: string;
  createdAt: string;
  status: OrderStatus;
  statusHistory: OrderStatusHistoryItem[];
  rejectionReason?: string;
  customer: CustomerInfo;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
}

/** Body of POST /api/orders. Prices are NOT trusted from the browser. */
export interface OrderRequest {
  customer: CustomerInfo;
  items: { productId: string; variantId: string; quantity: number }[];
}

export type InquiryType = 'GENERAL' | 'DISTRIBUTOR_PARTNERSHIP' | 'BULK_EVENT_ORDER';

/** Body of POST /api/inquiries. */
export interface InquiryRequest {
  type: InquiryType;
  fullName: string;
  phoneNumber: string;
  email?: string;
  companyName?: string;
  city?: string;
  state: string;
  message: string;
}

export interface NewsAnnouncement {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: 'Company News' | 'Quality & Standards' | 'Community' | 'Health Tips';
  imageUrl: string;
  publishedDate: string;
  published: boolean;
  featured: boolean;
  author: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category:
    | 'Factory Plant'
    | 'Bottling Line'
    | 'QA & Lab'
    | 'Fleet & Logistics'
    | 'Events'
    | 'Team & Leadership'
    | 'Finance/Account'
    | 'Production Department'
    | 'Warehouse & Logistics';
  imageUrl: string;
  description: string;
  /** Show the whole photo inside the frame instead of cropping it (for tall product shots). */
  fitWhole?: boolean;
}
