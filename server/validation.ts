import type { CustomerInfo, InquiryRequest, InquiryType, OrderItem, Product } from '../shared/types';
import {
  calculateDeliveryFee,
  DELIVERY_STATES,
  FACTORY_ADDRESS,
  findDeliveryZone,
  minOrderQuantity,
} from '../shared/pricing';
import type { ValidatedOrder } from './erp/adapter';

export class ValidationError extends Error {}

const STATES = DELIVERY_STATES.map((s) => s.value as string);
const INQUIRY_TYPES: InquiryType[] = ['GENERAL', 'DISTRIBUTOR_PARTNERSHIP', 'BULK_EVENT_ORDER'];
const MAX_ITEMS = 50;
const MAX_QTY = 10000;

function str(value: unknown, field: string, { required = false, max = 200 } = {}): string {
  if (value === undefined || value === null || value === '') {
    if (required) throw new ValidationError(`${field} is required.`);
    return '';
  }
  if (typeof value !== 'string') throw new ValidationError(`${field} must be text.`);
  const trimmed = value.trim();
  if (required && !trimmed) throw new ValidationError(`${field} is required.`);
  if (trimmed.length > max) throw new ValidationError(`${field} is too long (max ${max} characters).`);
  return trimmed;
}

function phone(value: unknown): string {
  const p = str(value, 'Phone number', { required: true, max: 30 });
  const digits = p.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 15) {
    throw new ValidationError('Please enter a valid phone number.');
  }
  return p;
}

function email(value: unknown): string | undefined {
  const e = str(value, 'Email', { max: 200 });
  if (!e) return undefined;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) throw new ValidationError('Please enter a valid email address.');
  return e;
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export function validateOrder(body: any, catalogue: Product[]): ValidatedOrder {
  if (!body || typeof body !== 'object') throw new ValidationError('Invalid request.');
  const c = body.customer ?? {};
  const deliveryMethod = c.deliveryMethod === 'FACTORY_COLLECTION' ? 'FACTORY_COLLECTION' : 'DELIVERY';
  if (c.deliveryMethod !== 'DELIVERY' && c.deliveryMethod !== 'FACTORY_COLLECTION') {
    throw new ValidationError('Choose delivery or factory collection.');
  }

  const isDelivery = deliveryMethod === 'DELIVERY';

  // For delivery, the area decides both the state and the delivery fee.
  const zone = isDelivery ? findDeliveryZone(c.deliveryZone) : undefined;
  if (isDelivery && !zone) throw new ValidationError('Choose your delivery area.');
  const state = zone ? zone.state : str(c.state, 'State', { max: 50 }) || 'Abuja';
  if (!STATES.includes(state)) throw new ValidationError('We do not deliver to the selected state yet.');

  const preferredDeliveryDate = str(c.preferredDeliveryDate, 'Preferred date', { required: true, max: 10 });
  if (!/^\d{4}-\d{2}-\d{2}$/.test(preferredDeliveryDate) || isNaN(Date.parse(preferredDeliveryDate))) {
    throw new ValidationError('Preferred date is not a valid date.');
  }
  if (preferredDeliveryDate < today()) throw new ValidationError('Preferred date cannot be in the past.');

  const customer: CustomerInfo = {
    fullName: str(c.fullName, 'Full name', { required: true, max: 120 }),
    phoneNumber: phone(c.phoneNumber),
    email: email(c.email),
    businessName: str(c.businessName, 'Company name', { max: 160 }) || undefined,
    deliveryAddress: isDelivery
      ? str(c.deliveryAddress, 'Delivery address', { required: true, max: 300 })
      : FACTORY_ADDRESS,
    cityArea: isDelivery ? str(c.cityArea, 'City / area', { required: true, max: 120 }) : 'Kubwa',
    state: isDelivery ? state : 'Abuja',
    preferredDeliveryDate,
    preferredDeliveryWindow: str(c.preferredDeliveryWindow, 'Time window', { max: 60 }) || undefined,
    deliveryMethod,
    deliveryZone: zone?.id,
    specialInstructions: str(c.specialInstructions, 'Special instructions', { max: 1000 }) || undefined,
  };

  if (!Array.isArray(body.items) || body.items.length === 0) {
    throw new ValidationError('Your cart is empty.');
  }
  if (body.items.length > MAX_ITEMS) throw new ValidationError('Too many different items in one order.');

  const items: OrderItem[] = body.items.map((raw: any) => {
    const product = catalogue.find((p) => p.id === raw?.productId);
    const variant = product?.variants.find((v) => v.id === raw?.variantId);
    if (!product || !variant) {
      throw new ValidationError('One of the products in your cart is no longer available. Please refresh the page.');
    }
    const quantity = Number(raw.quantity);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QTY) {
      throw new ValidationError(`Invalid quantity for ${product.name}.`);
    }
    const min = minOrderQuantity(product);
    if (quantity < min) {
      throw new ValidationError(`The minimum order for ${product.name} is ${min}.`);
    }
    // Price always comes from the catalogue, never from the browser.
    return {
      productId: product.id,
      productName: product.name,
      variantId: variant.id,
      variantName: variant.name,
      packaging: variant.packaging,
      quantity,
      unitPrice: variant.price,
      totalPrice: variant.price * quantity,
    };
  });

  const subtotal = items.reduce((sum, i) => sum + i.totalPrice, 0);
  const deliveryFee = calculateDeliveryFee(subtotal, deliveryMethod, zone?.id);
  return { customer, items, subtotal, deliveryFee, totalAmount: subtotal + deliveryFee };
}

export function validateInquiry(body: any): InquiryRequest {
  if (!body || typeof body !== 'object') throw new ValidationError('Invalid request.');
  if (!INQUIRY_TYPES.includes(body.type)) throw new ValidationError('Choose an enquiry type.');
  return {
    type: body.type,
    fullName: str(body.fullName, 'Full name', { required: true, max: 120 }),
    phoneNumber: phone(body.phoneNumber),
    email: email(body.email),
    companyName: str(body.companyName, 'Company name', { max: 160 }) || undefined,
    city: str(body.city, 'City', { max: 120 }) || undefined,
    state: str(body.state, 'State', { required: true, max: 50 }),
    message: str(body.message, 'Message', { max: 3000 }),
  };
}
