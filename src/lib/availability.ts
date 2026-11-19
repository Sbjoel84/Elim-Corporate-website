import type { Availability } from '../../shared/types';

export const AVAILABILITY_BADGE: Record<Availability, { label: string; className: string; dot: string }> = {
  IN_STOCK: { label: 'In Stock', className: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
  LIMITED: { label: 'Limited Stock', className: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
  MADE_TO_ORDER: { label: 'Produced on Order', className: 'bg-blue-50 text-blue-700 border-blue-200', dot: 'bg-blue-500' },
};
