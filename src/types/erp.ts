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

export type DeliveryMethod = 'DELIVERY' | 'FACTORY_COLLECTION';

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
  currentStock: number; // Current physical stock in ERP finished goods warehouse
  reservedStock: number; // Stock reserved for accepted online orders
  minReorderLevel: number;
  isPubliclyVisible: boolean;
  featured: boolean;
  phLevel?: string;
  tdsLevel?: string;
  orderingNotes?: string;
}

export type ProductCategory =
  | 'Sachet Water'
  | 'Bottled Water'
  | 'Table Water'
  | 'Dispenser Water'
  | 'Dispenser Bottles & Accessories';

export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
  unitPrice: number;
  productName: string;
  variantName: string;
  packaging: string;
  image: string;
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
  specialInstructions?: string;
}

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
  id: string;
  status: OrderStatus;
  changedAt: string;
  changedBy: string;
  notes?: string;
  reason?: string;
}

export interface OrderNote {
  id: string;
  createdAt: string;
  authorName: string;
  content: string;
  isCustomerVisible: boolean;
}

export interface OnlineOrder {
  id: string;
  orderReference: string; // e.g. ELM-WEB-2026-000142
  createdAt: string;
  updatedAt: string;
  customer: CustomerInfo;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  status: OrderStatus;
  rejectionReason?: string;
  assignedStaffId?: string;
  assignedStaffName?: string;
  assignedAt?: string;
  stockReserved: boolean;
  stockReservedAt?: string;
  dispatchId?: string;
  statusHistory: OrderStatusHistoryItem[];
  internalNotes: OrderNote[];
}

export interface StaffMember {
  id: string;
  employeeId: string;
  name: string;
  role: 'ADMIN' | 'ORDER_MANAGER' | 'DISPATCH_SUPERVISOR' | 'DRIVER' | 'QA_OFFICER';
  roleTitle: string;
  department: string;
  phoneNumber: string;
  email: string;
  active: boolean;
  avatar?: string;
  assignedOrdersCount: number;
}

export interface Vehicle {
  id: string;
  plateNumber: string;
  model: string;
  vehicleType: 'TRUCK' | 'CANTER' | 'VAN';
  capacityCartons: number;
  status: 'AVAILABLE' | 'IN_TRANSIT' | 'MAINTENANCE';
  assignedDriverId?: string;
  assignedDriverName?: string;
}

export interface DispatchRecord {
  id: string;
  dispatchNumber: string; // e.g. DSP-2026-00045
  orderId: string;
  orderReference: string;
  driverId: string;
  driverName: string;
  driverPhone: string;
  vehicleId: string;
  vehiclePlate: string;
  vehicleModel: string;
  dispatchDate: string;
  expectedDeliveryDate: string;
  deliveryAddress: string;
  customerName: string;
  customerPhone: string;
  status:
    | 'PREPARING'
    | 'DRIVER_ASSIGNED'
    | 'READY_FOR_DISPATCH'
    | 'DISPATCHED'
    | 'IN_TRANSIT'
    | 'DELIVERED'
    | 'PARTIALLY_DELIVERED'
    | 'FAILED_RETURNED';
  dispatchedItems: {
    productId: string;
    productName: string;
    variantName: string;
    orderedQuantity: number;
    dispatchedQuantity: number;
    deliveredQuantity?: number;
    returnedQuantity?: number;
  }[];
  deliveryConfirmation?: DeliveryConfirmation;
  notes?: string;
  createdAt: string;
  dispatchedAt?: string;
}

export interface DeliveryConfirmation {
  deliveredAt: string;
  confirmedBy: string;
  recipientName: string;
  recipientPhone: string;
  isPartialDelivery: boolean;
  deliveredQuantity: number;
  undeliveredQuantity: number;
  notes?: string;
  evidencePhotoUrl?: string;
  returnReason?: string;
  returnCondition?: 'INTACT_RESTOCKABLE' | 'DAMAGED_REJECTED';
}

export interface CustomerInquiry {
  id: string;
  type: 'GENERAL' | 'DISTRIBUTOR_PARTNERSHIP' | 'BULK_EVENT_ORDER' | 'COMPLAINT';
  fullName: string;
  email?: string;
  phoneNumber: string;
  companyName?: string;
  city: string;
  state: string;
  message: string;
  status: 'NEW' | 'CONTACTED' | 'RESOLVED';
  createdAt: string;
  handledBy?: string;
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
    | 'Production Department'
    | 'Warehouse & Logistics';
  imageUrl: string;
  description: string;
}

export interface InventoryLogEntry {
  id: string;
  timestamp: string;
  productId: string;
  productName: string;
  variantName: string;
  transactionType:
    | 'PRODUCTION_IN'
    | 'ONLINE_ORDER_RESERVED'
    | 'ONLINE_ORDER_RELEASED'
    | 'DISPATCH_DEDUCTION'
    | 'CUSTOMER_RETURN_HOLD'
    | 'MANUAL_ADJUSTMENT';
  quantityChange: number;
  balanceAfter: number;
  referenceDoc: string;
  performedBy: string;
  notes: string;
}

export type TestimonialCategory =
  | 'Home Subscriber'
  | 'Corporate Client'
  | 'Healthcare Facility'
  | 'Authorized Distributor';

export interface CustomerTestimonial {
  id: string;
  customerName: string;
  roleOrLocation: string;
  category: TestimonialCategory;
  rating: number;
  feedback: string;
  productPurchased: string;
  submittedAt: string;
  verified: boolean;
}
