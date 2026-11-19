import type { DeliveryMethod } from './types';

// Single source of truth for delivery charges. Used by the cart, the checkout
// form and the server (which is the one that actually records the total).
export const DELIVERY_FEE = 4000;
export const FREE_DELIVERY_THRESHOLD = 150000;

export function calculateDeliveryFee(subtotal: number, method: DeliveryMethod): number {
  if (method !== 'DELIVERY') return 0;
  return subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
}

/** States the fleet delivers to. The server rejects any other value. */
export const DELIVERY_STATES = [
  { value: 'Abuja', label: 'Abuja FCT' },
  { value: 'Niger', label: 'Niger State (Suleja / Madalla)' },
  { value: 'Nasarawa', label: 'Nasarawa State' },
  { value: 'Kaduna', label: 'Kaduna State' },
  { value: 'Lagos', label: 'Lagos State' },
] as const;

export const FACTORY_ADDRESS =
  'Plot No. 188A, FCDA Scheme Extension III, Off Bwari/Dutse Road, By Power Station, Opp. KAS Guest House, Kubwa, FCT Abuja';
