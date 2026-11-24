import type { DeliveryMethod } from './types';

// Single source of truth for delivery charges. Used by the booking form, the
// cart, the checkout and the server (which is the one that records the total).
//
// TO CHANGE A DELIVERY FEE: edit the `fee` of the area below. Fees are in naira.
// To add an area, copy a line and give it a new, unique `id` (never reuse or
// rename an id once orders use it).

/** Orders at or above this amount get free delivery, in areas marked `freeOver`. */
export const FREE_DELIVERY_THRESHOLD = 150000;

export interface DeliveryZone {
  /** Stable id sent to the server. */
  id: string;
  /** What the customer sees in the list. */
  label: string;
  /** State recorded on the order. Must be one of DELIVERY_STATES. */
  state: (typeof DELIVERY_STATES)[number]['value'];
  /** Delivery charge in naira. */
  fee: number;
  /** True if big orders (FREE_DELIVERY_THRESHOLD and above) are delivered free here. */
  freeOver: boolean;
}

/** States the fleet delivers to. The server rejects any other value. */
export const DELIVERY_STATES = [
  { value: 'Abuja', label: 'Abuja FCT' },
  { value: 'Niger', label: 'Niger State (Suleja / Madalla)' },
  { value: 'Nasarawa', label: 'Nasarawa State' },
  { value: 'Kaduna', label: 'Kaduna State' },
  { value: 'Lagos', label: 'Lagos State' },
] as const;

/** Delivery areas, nearest to the Kubwa factory first. */
export const DELIVERY_ZONES: DeliveryZone[] = [
  { id: 'abj-kubwa', label: 'Kubwa, Dutse, Bwari, Byazhin', state: 'Abuja', fee: 2000, freeOver: true },
  { id: 'abj-gwarinpa', label: 'Gwarinpa, Jahi, Katampe, Life Camp, Dawaki', state: 'Abuja', fee: 3000, freeOver: true },
  { id: 'abj-central', label: 'Maitama, Wuse, Garki, Asokoro, Utako, Jabi, Central Area', state: 'Abuja', fee: 4000, freeOver: true },
  { id: 'abj-outer', label: 'Lugbe, Apo, Lokogoma, Galadimawa, Airport Road', state: 'Abuja', fee: 5000, freeOver: true },
  { id: 'abj-satellite', label: 'Gwagwalada, Kuje, Bwari outskirts, other FCT towns', state: 'Abuja', fee: 7000, freeOver: true },
  { id: 'niger-suleja', label: 'Suleja, Madalla, Zuba (Niger)', state: 'Niger', fee: 3500, freeOver: true },
  { id: 'nas-karu', label: 'Mararaba, Masaka, Karu, Nyanya (Nasarawa)', state: 'Nasarawa', fee: 5000, freeOver: true },
  { id: 'nas-keffi', label: 'Keffi and other Nasarawa towns', state: 'Nasarawa', fee: 10000, freeOver: false },
  { id: 'kaduna', label: 'Kaduna State', state: 'Kaduna', fee: 25000, freeOver: false },
  { id: 'lagos', label: 'Lagos State', state: 'Lagos', fee: 60000, freeOver: false },
];

export const DEFAULT_DELIVERY_ZONE_ID = DELIVERY_ZONES[0].id;

export function findDeliveryZone(id: string | undefined): DeliveryZone | undefined {
  return DELIVERY_ZONES.find((z) => z.id === id);
}

/**
 * Delivery charge for an order. Factory collection is always free.
 * An unknown zone falls back to the default area, so the browser always shows
 * a number; the server rejects unknown zones before calling this.
 */
export function calculateDeliveryFee(subtotal: number, method: DeliveryMethod, zoneId?: string): number {
  if (method !== 'DELIVERY') return 0;
  const zone = findDeliveryZone(zoneId) ?? DELIVERY_ZONES[0];
  if (zone.freeOver && subtotal >= FREE_DELIVERY_THRESHOLD) return 0;
  return zone.fee;
}

/** Smallest quantity allowed for a product or cart line (1 unless the catalogue says otherwise). */
export function minOrderQuantity(item: { minOrderQuantity?: number } | undefined): number {
  return Math.max(1, item?.minOrderQuantity ?? 1);
}

export const FACTORY_ADDRESS =
  'Plot No. 188A, FCDA Scheme Extension III, Off Bwari/Dutse Road, By Power Station, Opp. KAS Guest House, Kubwa, FCT Abuja';
